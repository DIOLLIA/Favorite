package app.server

import app.model.MainGroups
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        // Static plugin. Try to access `/static/index.html`
        staticResources("/static", "static")
        get("/") {
            call.respondText("Hello Andrei!")
        }

        route("/main") {
            get {
                val groups = MainGroups.getGroups()
                call.respond(groups)
            }

        }
    }
}
