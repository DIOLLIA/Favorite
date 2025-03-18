package fleisch.lab.plugins

import com.mongodb.MongoWriteException
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.model.BandDescription
import fleisch.lab.model.Lang
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactive.collect
import org.bson.BsonInt64
import org.bson.Document
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class MongoService(private val database: MongoDatabase) {
    private val log: Logger = LoggerFactory.getLogger(javaClass)
    private val bandCollection: MongoCollection<Document> = database.getCollection("bands_data")

    suspend fun ping() {
        database.runCommand(Document("ping", BsonInt64(1))).awaitFirstOrNull()
            ?: throw Exception("Error during establishing mongo connection")
        log.info("MongoDB connection established")
    }

    suspend fun getAllBandsDescs(): String {
        val documents = mutableListOf<Document>()
        bandCollection.find().collect { document ->
            documents.add(document)
        }
        return documents.joinToString("\n")
    }

    suspend fun addBandDescription(bandDescription: BandDescription): Boolean {
        log.info("Adding BandDescription to database")
        return try {
            val result = bandCollection
                .insertOne(buildDocument(bandDescription))
                .awaitFirst()

            if (!result.wasAcknowledged()) {
                log.error("Error during adding BandDescription")
                false
            } else
                true
        } catch (exc: MongoWriteException) {
            if (exc.code == 11000) {
                log.error("Band with name '${bandDescription.name}' already exists")
            } else {
                log.error("Error during adding BandDescription. Cause: $exc")
            }
            false
        } catch (exc: Exception) {
            log.error("Error during adding BandDescription. Cause: $exc")
            false
        }
    }

    suspend fun updateBandDescription(bandDescription: BandDescription): Boolean {
        val mongoColumnsToBandDescription: Map<Lang, String> =
            mapOf(Lang.EN to "band_description_en",
                Lang.RU to "band_description_ru")

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