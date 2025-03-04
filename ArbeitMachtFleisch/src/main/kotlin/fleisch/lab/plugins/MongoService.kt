package fleisch.lab.plugins

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import com.mongodb.reactivestreams.client.MongoDatabase
import io.ktor.server.application.*
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.bson.BsonInt64
import org.bson.Document
import org.koin.dsl.module
import org.slf4j.Logger
import org.slf4j.LoggerFactory

fun mongoDbModule(app: Application) = module {
    val envConfig = app.environment.config
    single {
        MongoClients.create(envConfig.property("database.mongo.url").getString())
    }
    single {
        val mongoClient = get<MongoClient>()
        mongoClient.getDatabase(envConfig.property("database.mongo.dbName").getString())
    }
}

class MongoService(private val database: MongoDatabase) {
    private val log: Logger = LoggerFactory.getLogger(javaClass)

    suspend fun ping() {
        database.runCommand(Document("ping", BsonInt64(1))).awaitFirstOrNull()
            ?: throw Exception("Error during establishing mongo connection")
        log.info("MongoDB connection established")
    }
}
