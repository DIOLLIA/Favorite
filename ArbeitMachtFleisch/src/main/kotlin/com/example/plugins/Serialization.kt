package com.example.plugins

import com.example.model.Band
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json()
    }
    routing {
        get("/json") {
            call.respond(getOneBand())
        }
    }
}

fun getOneBand(): Band = Band(bandName = "Rammstein", description = "Heavy metal aus Deutschland", imagePath = "tbd")
