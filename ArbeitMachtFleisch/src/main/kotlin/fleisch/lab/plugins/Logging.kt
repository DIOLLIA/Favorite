package fleisch.lab.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*


fun Application.configureLogging() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            this@configureLogging.log.error("Unhandled exception", cause)
            call.respondText(
                text = "Internal server error",
                status = HttpStatusCode.InternalServerError
            )
        }
    }
}