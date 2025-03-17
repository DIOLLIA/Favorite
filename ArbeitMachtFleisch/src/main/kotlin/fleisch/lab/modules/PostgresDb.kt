package fleisch.lab.modules

import com.example.plugins.BandService
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import fleisch.lab.config.DbConfig
import fleisch.lab.config.connectToPostgres
import fleisch.lab.config.postgresConfig
import io.ktor.server.application.*
import org.koin.dsl.module
import java.sql.Connection


val dbBandConnection = module {
    single { connectToPostgres(dbConfig = get<Application>().postgresConfig()) }
    single { BandService(get<Connection>()) }
}

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