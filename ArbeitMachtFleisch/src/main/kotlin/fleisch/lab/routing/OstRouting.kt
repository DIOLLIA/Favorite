package fleisch.lab.routing

import fleisch.lab.proto.OstService
import io.ktor.server.response.*
import io.ktor.server.routing.*


fun Route.ostRoute(grpcClient: OstService) {
    route("/music/ost") {
        get("/{band}") {
            val band = call.parameters["band"] ?: return@get call.respondText("Missing band")
            val result = grpcClient.getOstAndMovies(band)
            call.respond(result.map { (movie, track) -> mapOf("movie" to movie, "track" to track) })
        }
    }
}