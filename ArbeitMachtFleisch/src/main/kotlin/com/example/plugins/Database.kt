package com.example.plugins

import com.example.config.*
import io.ktor.server.application.*
import org.flywaydb.core.Flyway
import org.koin.ktor.ext.getKoin
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger


fun Application.configureDatabase() {
    install(Koin) {
        slf4jLogger()
        modules(databaseModule(dbConfig()), flywayModule)
    }

    getKoin().get<Flyway>()
}

