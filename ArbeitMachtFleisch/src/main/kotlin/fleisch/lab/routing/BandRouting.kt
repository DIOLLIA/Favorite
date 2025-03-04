package fleisch.lab.routing

import com.example.plugins.BandService
import fleisch.lab.model.Band
import fleisch.lab.model.getMockedBandData
import fleisch.lab.plugins.MongoService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import org.koin.java.KoinJavaComponent.getKoin
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
    routing {
        get("/coroutbands") {
            var bands: Set<Band> = setOf()
            val bandJob = GlobalScope.launch {
                delay(1000L)
                bands = bandService.read()
            }
            val otherData = mainCoroutine()
            invokePing()
            bandJob.join()
            call.respond(BandResponse(bands, otherData))
        }
    }
}

suspend fun invokePing() {
    val mongoService: MongoService = getKoin().get()
    mongoService.ping()
}

@Serializable
data class BandResponse private constructor(
    val bands: Set<Band>
) {
    constructor(bands: Set<Band>, descriptions: Map<String, String>) : this(
        bands.map { band ->
            descriptions[band.bandName]?.let { newDescription ->
                band.copy(description = newDescription)
            } ?: band // if not band found - leave initial band
        }.toSet()
    )
}

fun mainCoroutine(): Map<String, String> = runBlocking {
    GlobalScope.launch {
        delay(3000L)
    }
    return@runBlocking getMockedBandData()
}


