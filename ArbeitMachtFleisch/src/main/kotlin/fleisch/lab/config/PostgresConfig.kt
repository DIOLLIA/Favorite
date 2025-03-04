package fleisch.lab.config


import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
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

//read config from the props
fun postgresDbModule(dbConfig: DbConfig) = module {
    single { dbConfig } //configure gradle to put app.yaml to the root of resources (now its in resources/main)

//    this manage db connections
    single {
        HikariDataSource(HikariConfig().apply {
            jdbcUrl = get<DbConfig>().url
            username = get<DbConfig>().user
            password = get<DbConfig>().password
            driverClassName = get<DbConfig>().driver
            maximumPoolSize = get<DbConfig>().maxPoolSize
        })
    }
}

val flywayModule = module { // single initialize by request, to invoke it we use flyway.migrate()
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