package fleisch.lab.service

import com.mongodb.MongoWriteException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Updates
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.model.BandDescription
import fleisch.lab.model.Lang
import fleisch.lab.service.Utils.DescriptionLanguage.validateLanguage
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.bson.BsonInt64
import org.bson.Document
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class DescriptionService(private val database: MongoDatabase) {
    private val utils: Utils = Utils()
    private val log: Logger = LoggerFactory.getLogger(javaClass)
    private val bandCollection: MongoCollection<Document> = database.getCollection("bands_data")

    suspend fun ping() {
        database.runCommand(Document("ping", BsonInt64(1))).awaitFirstOrNull()
            ?: throw Exception("Error during establishing mongo connection")
        log.info("MongoDB connection established")
    }

    suspend fun getAllBandsDescriptions(lang: String?): Map<String, String> {
        val descriptionLang = getDescriptionColumn(validateLanguage(lang))
        log.info("Getting bands description in $descriptionLang")

        val bandNameField = "band_name"

        val result = bandCollection.find()
            .projection(
                Projections.fields(
                    Projections.include(bandNameField, descriptionLang),
                    Projections.excludeId()
                )
            )
            .asFlow()
            .toList()

        return result.associate { document ->
            document.getString(bandNameField) to document.getString(descriptionLang)
        }
    }

    //todo change method to return more info
    suspend fun addBandDescription(bandDescription: BandDescription): Boolean {
        val alreadyExistsCode = 11000
        log.info("Adding description for ${bandDescription.name}")
        val errorMsg = "Error during adding BandDescription. Cause: "

        return try {
            val result = bandCollection
                .insertOne(buildDocument(bandDescription))
                .awaitFirst()

            if (!result.wasAcknowledged()) {
                log.error("Error during adding BandDescription")
            }
            result.wasAcknowledged()

        } catch (exc: MongoWriteException) {
            if (exc.code == alreadyExistsCode) {
                log.error("Band with name '${bandDescription.name}' already exists")
            } else {
                log.error(errorMsg, exc)
            }
            false
        } catch (exc: Exception) {
            log.error(errorMsg, exc)
            false
        }
    }

    suspend fun updateBandDescription(bandDescription: BandDescription): Boolean {
        log.info("updating description for band: ${bandDescription.name}")

        val mongoColumnsToBandDescription: Map<Lang, String> =
            mapOf(
                Lang.EN to "band_description_en",
                Lang.RU to "band_description_ru"
            )

        val updates = bandDescription.description
            .filterValues { it.isNotEmpty() }
            .mapNotNull { (lang, desc) ->
                mongoColumnsToBandDescription[lang]?.let { columnName ->
                    Updates.set(columnName, desc)
                }
            }

        bandCollection.updateOne(
            Filters.eq("band_name", bandDescription.name),
            Updates.combine(updates)
        ).awaitFirst()
        return true
    }
}

private fun buildDocument(band: BandDescription): Document {
    return Document()
        .append("band_name", band.name)
        .append("band_description_en", band.description.getOrElse(Lang.EN, { "" }))
        .append("band_description_ru", band.description.getOrElse(Lang.RU, { "" }))
}

private fun getDescriptionColumn(lang: String): String {
    return when (lang) {
        Lang.EN.lang -> "band_description_en"
        Lang.RU.lang -> "band_description_ru"
        else -> {
            "non reachable statement"
        }
    }
}