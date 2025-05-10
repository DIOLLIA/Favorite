package fleisch.lab

import fleisch.lab.plugins.configureDI
import fleisch.lab.plugins.configureLogging
import fleisch.lab.plugins.configureSecurity
import fleisch.lab.plugins.configureSerialization
import fleisch.lab.proto.OstService
import fleisch.lab.routing.configureRouting
import fleisch.lab.service.MusicService
import io.ktor.server.application.*
import org.koin.ktor.ext.inject

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    val musicService: MusicService by inject()
    val grpcClient: OstService by inject()

    configureDI()
    configureLogging()
    configureSerialization()
    configureSecurity()
    configureRouting(musicService, grpcClient)
}

