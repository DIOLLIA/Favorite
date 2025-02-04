package com.example.config


import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.dsl.module

public fun Application.dbConfig(): DbConfig {
    return DbConfig(
        url = environment.config.property("database.url").getString(),
        user = environment.config.property("database.user").getString(),
        password = environment.config.property("database.password").getString(),
        driver = environment.config.property("database.driver").getString(),
        maxPoolSize = environment.config.property("database.maxPoolSize").getString().toInt(),
    )
}

data class DbConfig(
    val url: String,
    val user: String,
    val password: String,
    val driver: String,
    val maxPoolSize: Int,
)

//read config from the props
fun databaseModule(dbConfig: DbConfig) = module {
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
        println("INIT flyway module")
        val flyway = Flyway.configure()
            .dataSource(config.url, config.user, config.password)
            .locations("classpath:db/migration")
            .load()

        flyway.migrate()
        flyway
    }
}