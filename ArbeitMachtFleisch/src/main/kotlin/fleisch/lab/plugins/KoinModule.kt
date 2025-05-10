package fleisch.lab.plugins

import fleisch.lab.config.*
import fleisch.lab.modules.*
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.dsl.module
import org.koin.ktor.ext.getKoin
import org.koin.ktor.ext.inject
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger

fun Application.configureDI() {
    install(Koin) {
        slf4jLogger()
        modules(
            module { single { this@configureDI } }, // to receive `this` on other components
            musicModule,
            postgresDbModule(postgresConfig()),
            bandConnectionModule,
            descriptionModule(this@configureDI),
            flywayModule,
            grpcModule
        )
    }
    runMigrations()
}

fun Application.runMigrations() {
    val mongoMigration: MongoLiquibaseService by inject()
    mongoMigration.runMigrations()

    getKoin().get<Flyway>()
}
