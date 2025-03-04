package fleisch.lab.config

import io.ktor.server.application.*

fun Application.mongoConfig(): DbConfig {
    return DbConfig(
        url = environment.config.property("database.mongo.url").getString(),
        user = environment.config.property("database.mongo.user").getString(),
        password = environment.config.property("database.mongo.password").getString(),
        driver = "",
        maxPoolSize = 0,
    )
}