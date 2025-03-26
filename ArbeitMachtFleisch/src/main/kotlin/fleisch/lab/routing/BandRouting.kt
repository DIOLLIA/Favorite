package fleisch.lab.routing

import fleisch.lab.model.Band
import fleisch.lab.model.BandDescription
import fleisch.lab.service.DescriptionService
import fleisch.lab.service.MusicService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.java.KoinJavaComponent.getKoin
import org.koin.ktor.ext.inject

fun Application.configureRouting() {
    val musicService: MusicService by inject()

    routing {
        get("/") {
            call.respondText("You are on the music REST API!")
        }
    }

    routing {
        get("/bands") {
            val lang = call.request.queryParameters["lang"] ?: "en"
            val page = call.request.queryParameters["page"]?.toIntOrNull() ?: 0

            call.respond(musicService.getBandsWithDescriptions(lang, page))
        }

        post("/bands/create") {
            val band = call.receive<Band>()

            call.respond(musicService.create(band))
        }

        get("/bands/descriptions") {
            val lang = call.request.queryParameters["lang"]

            call.respond(musicService.getAllBandsDescriptions(lang))
        }

        post("/bands/description/add") {
            val bandDescription = call.receive<BandDescription>()

            call.respond(musicService.addBandDescription(bandDescription))
        }

        patch("/bands/description/update") {
            val bandDescription = call.receive<BandDescription>()
            val updated = musicService.updateBandDescription(bandDescription)

            if (updated) {
                call.respond(HttpStatusCode.OK, "Band description updated successfully")
            } else {
                call.respond(HttpStatusCode.NotFound, "Band not found")
            }
        }
    }
}

/*
This is a manual way to get a dependency from Koin.

Pros: works anywhere in the code (inside a function, file, etc.).
explicitly request the dependency at the time of the call.
suitable for quick access, for example, in utilities or scripts.

Cons: strong coupling with the Koin API.
less testable and less convenient for scaling.
not lazy - the dependency is initialized immediately upon call.
 */
suspend fun invokePing() {
    val mongoService: DescriptionService = getKoin().get()
    mongoService.ping()
}
