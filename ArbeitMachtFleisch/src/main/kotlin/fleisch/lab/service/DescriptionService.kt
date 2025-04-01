package fleisch.lab.service

import com.mongodb.MongoWriteException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Updates
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.model.*
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

    suspend fun addBandDescription(bandDescription: BandDescription): ApiResponse {
        val alreadyExistsCode = 11000
        val errorMsg: (String) -> String = { cause ->
            "Error during creating band description. Cause: $cause"
        }

        log.info("Creating description for `${bandDescription.name}`")

        return try {
            val result = bandCollection
                .insertOne(buildDocument(bandDescription))
                .awaitFirst()

            if (!result.wasAcknowledged()) {
                log.error("band description wasn't acknowledged during insert to the db ")
                ApiResponseError(data = mapOf("band" to bandDescription.name), message = errorMsg("wasn't acknowledged"))
            }
            ApiResponseCreated(data = mapOf("band" to bandDescription.name), message = "band description successfully created")

        } catch (exc: Exception) {
            when {
                exc is MongoWriteException && exc.code == alreadyExistsCode -> {
                    log.error(errorMsg("'${bandDescription.name}' already exists"))
                    ApiResponseError(mapOf("band" to bandDescription.name), message = errorMsg("Band already exists"))
                }
                else -> {
                    log.error(errorMsg(exc.toString()))
                    ApiResponseError(mapOf("band" to bandDescription.name), message = errorMsg(exc.toString()))
                }
            }
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