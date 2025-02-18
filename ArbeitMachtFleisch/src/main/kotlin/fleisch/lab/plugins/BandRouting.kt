package fleisch.lab.plugins

import fleisch.lab.model.Band
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
    }
    routing {
        get("/bands") {
            call.respond(getBands())
        }
    }
}

fun getBands(): Set<Band> {

    val rmst = Band(bandName = "Rammstein", description = "Heavy metal aus Deutschland", imagePath = "tbd")
    val slk = Band(bandName = "Slipknot", description = "From db", imagePath = "tbd_slk")
    return setOf(rmst, slk)
}
