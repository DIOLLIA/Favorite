package fleisch.lab.plugins

import com.example.plugins.BandService
import io.ktor.server.application.*
import io.ktor.server.request.*
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
    // curl -X POST -H 'Content-Type: application/json' -d '{"bandName": "SepulturA", "description": "description","imagePath": "/music_images/sepultura.jpg" }' http://localhost:8083/bands/create
    routing {
        post("/bands/create") {
            call.respond(bandService.create(call.receive()))
        }
    }
}

