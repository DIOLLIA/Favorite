package fleisch.lab.plugins

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import com.mongodb.reactivestreams.client.MongoDatabase
import io.ktor.server.application.*
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.bson.BsonInt64
import org.bson.Document
import org.koin.dsl.module
import org.slf4j.Logger
import org.slf4j.LoggerFactory

fun mongoDbModule(app: Application) = module {
    val envConfig = app.environment.config
    val url = envConfig.property("database.mongo.url").getString()
    val user = envConfig.property("database.mongo.user").getString()
    val password = envConfig.property("database.mongo.password").getString()
    val dsn = "mongodb://$user:$password@$url/?authSource=mem_db"

    single {
        MongoClients.create(dsn)
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

    suspend fun getAllMems(): String {
        return database.getCollection("mems_").find().first().awaitFirst().toJson()
    }
}

