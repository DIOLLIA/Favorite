package fleisch.lab.plugins

import com.example.plugins.BandService
import fleisch.lab.config.databaseModule
import fleisch.lab.config.dbConfig
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.dsl.module
import org.koin.ktor.ext.getKoin
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger
import java.sql.Connection
import java.sql.DriverManager

val databaseBandModule = module {
    single { get<Application>().connectToPostgres() }
    single { BandService(get<Connection>()) }
}

fun Application.configureDatabase() {
    install(Koin) {
        slf4jLogger()
        modules(
            module { single { this@configureDatabase } },
            databaseModule(dbConfig()), fleisch.lab.config.flywayModule, databaseBandModule
        )
    }

    getKoin().get<Flyway>()
}

fun Application.connectToPostgres(): Connection {
    Class.forName("org.postgresql.Driver")
    val url = environment.config.property("database.url").getString()
    val user = environment.config.property("database.user").getString()
    val password = environment.config.property("database.password").getString()

    return DriverManager.getConnection(url, user, password)
}
