package fleisch.lab.plugins

import com.mongodb.MongoWriteException
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.model.BandDescription
import fleisch.lab.model.Lang
import io.ktor.server.application.*
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import kotlinx.coroutines.reactive.collect
import org.bson.BsonInt64
import org.bson.Document
import org.koin.dsl.module
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class MongoService(private val database: MongoDatabase) {
    private val log: Logger = LoggerFactory.getLogger(javaClass)

    suspend fun ping() {
        database.runCommand(Document("ping", BsonInt64(1))).awaitFirstOrNull()
            ?: throw Exception("Error during establishing mongo connection")
        log.info("MongoDB connection established")
    }

    suspend fun getAllBandsDescs(): String {
        val documents = mutableListOf<Document>()
        database.getCollection("bands_data").find().collect { document ->
            documents.add(document)
        }
        return documents.joinToString("\n")
    }

    suspend fun addBandDescription(bandDescription: BandDescription): Boolean {
        log.info("Adding BandDescription to database")
        return try {
            val result = database.getCollection("bands_data")
                .insertOne(buildDocument(bandDescription))
                .awaitFirst()

            if (!result.wasAcknowledged()) {
                log.error("Error during adding BandDescription")
                false
            } else
                true
        } catch (exc: MongoWriteException) {
            if (exc.code == 11000) {
                log.error("Band with name '${bandDescription.bandName}' already exists")
            } else {
                log.error("Error during adding BandDescription. Cause: $exc")
            }
            false
        } catch (exc: Exception) {
            log.error("Error during adding BandDescription. Cause: $exc")
            false
        }
    }
}

private fun buildDocument(band: BandDescription): Document {
    return Document()
        .append("band_name", band.bandName)
        .append("band_description_en", band.bandDescription.getOrElse(Lang.EN, { "" }))
        .append("band_description_de", band.bandDescription.getOrElse(Lang.RU, { "" }))

}