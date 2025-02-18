package fleisch.lab.plugins

import fleisch.lab.config.databaseModule
import fleisch.lab.config.dbConfig
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.ktor.ext.getKoin
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger


fun Application.configureDatabase() {
    install(Koin) {
        slf4jLogger()
        modules(databaseModule(dbConfig()), fleisch.lab.config.flywayModule)
    }

    getKoin().get<Flyway>()
}

