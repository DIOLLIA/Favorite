package fleisch.lab.plugins

import com.example.plugins.BandService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Application.configureRouting() {
    val bandService: BandService by inject()
    routing {
        get("/") {
            call.respondText("You are on the music REST API!")
        }
    }
    routing {
        get("/bands") {
            call.respond(bandService.read())
        }
    }
}