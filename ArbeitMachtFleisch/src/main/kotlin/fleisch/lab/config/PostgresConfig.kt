package fleisch.lab.config

import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.dsl.module
import java.sql.Connection
import java.sql.DriverManager

fun Application.postgresConfig(): DbConfig {
    return DbConfig(
        url = environment.config.property("database.postgres.url").getString(),
        user = environment.config.property("database.postgres.user").getString(),
        password = environment.config.property("database.postgres.password").getString(),
        driver = environment.config.property("database.postgres.driver").getString(),
        maxPoolSize = environment.config.property("database.postgres.maxPoolSize").getString().toInt(),
    )
}

fun connectToPostgres(dbConfig: DbConfig): Connection {
    Class.forName("org.postgresql.Driver")

    return DriverManager.getConnection(dbConfig.url, dbConfig.user, dbConfig.password)
}


val flywayModule = module { // single initialize by request, to invoke it - flyway.migrate() is used
    single {
        val config = get<DbConfig>()
        val flyway = Flyway.configure()
            .dataSource(config.url, config.user, config.password)
            .locations("classpath:db/migration")
            .load()

        flyway.migrate()
        flyway
    }
}