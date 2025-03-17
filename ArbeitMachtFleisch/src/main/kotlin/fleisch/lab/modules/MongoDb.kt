package fleisch.lab.modules

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.config.MongoLiquibaseService
import fleisch.lab.plugins.MongoService
import io.ktor.server.application.*
import org.koin.dsl.module

val mongoServiceConnection = module {
    single { MongoService(get<MongoDatabase>()) }
}

val mongoMigration = module {
    single { MongoLiquibaseService() }
}

fun mongoDbModule(app: Application) = module {
    val envConfig = app.environment.config
    val url = envConfig.property("database.mongo.url").getString()
    val user = envConfig.property("database.mongo.user").getString()
    val password = envConfig.property("database.mongo.password").getString()
    val dsn = "mongodb://$user:$password@$url/?authSource=bands"

    single {
        MongoClients.create(dsn)
    }
    single {
        val mongoClient = get<MongoClient>()
        mongoClient.getDatabase(envConfig.property("database.mongo.dbName").getString())
    }
}