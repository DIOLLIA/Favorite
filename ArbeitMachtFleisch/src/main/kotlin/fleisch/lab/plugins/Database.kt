package fleisch.lab.plugins

import com.example.plugins.BandService
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.config.connectToPostgres
import fleisch.lab.config.flywayModule
import fleisch.lab.config.postgresConfig
import fleisch.lab.config.postgresDbModule
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.dsl.module
import org.koin.ktor.ext.getKoin
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger
import java.sql.Connection

val dbBandConnection = module {
    single { connectToPostgres(dbConfig = get<Application>().postgresConfig()) }
    single { BandService(get<Connection>()) }
}

val mongoServiceConnection = module {
    single { MongoService(get<MongoDatabase>()) }
}

fun Application.configureDbs() {
    install(Koin) {
        slf4jLogger()
        modules(
            module { single { this@configureDbs } }, // зачем данный модуль? что означает this@configureDbs
            postgresDbModule(postgresConfig()),
            flywayModule,
            dbBandConnection,
            mongoDbModule(this@configureDbs), //что означает this@configureDbs
            mongoServiceConnection
        )
    }
    getKoin().get<MongoDatabase>()
    getKoin().get<Flyway>()
}
