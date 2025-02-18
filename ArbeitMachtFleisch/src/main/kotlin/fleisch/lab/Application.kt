package fleisch.lab

import fleisch.lab.plugins.configureDatabase
import fleisch.lab.plugins.configureDatabases
import fleisch.lab.plugins.configureRouting
import fleisch.lab.plugins.configureSecurity
import fleisch.lab.plugins.configureSerialization
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureDatabase()
    configureSerialization()
//    configureDatabases()
    configureSecurity()
    configureRouting()
}
