package fleisch.lab

import fleisch.lab.plugins.configureDbs
import fleisch.lab.plugins.configureSecurity
import fleisch.lab.plugins.configureSerialization
import fleisch.lab.routing.configureRouting
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureDbs()
    configureSerialization()
    configureSecurity()
    configureRouting()
}
