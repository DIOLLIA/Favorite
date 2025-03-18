package fleisch.lab.routing

import com.example.plugins.BandService
import fleisch.lab.model.Band
import fleisch.lab.model.BandDescription
import fleisch.lab.model.getMockedBandData
import fleisch.lab.plugins.MongoService
import io.ktor.http.*
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
    val mongoService: MongoService by inject()
    routing {
        get("/") {
            call.respondText("You are on the music REST API!")
        }
    }
    routing {
        get("/bands") {
            call.respond(bandService.read())
        }
        // curl -X POST -H 'Content-Type: application/json' -d '{"bandName": "SepulturA", "description": "description","imagePath": "/music_images/sepultura.jpg" }' http://localhost:8083/bands/create
        post("/bands/create") {
            call.respond(bandService.create(call.receive()))
        }
        get("/bands/descs") {
            call.respond(mongoService.getAllBandsDescs())
        }
// curl -X POST -H 'Content-Type: application/json' -d '{"bandName":"sepultura","bandDescription":{"EN":"eng sep mong description"}}' http://localhost:8083/bands/description/add
        post("/bands/description/add") {
            val bandDescription = call.receive<BandDescription>()
            call.respond(mongoService.addBandDescription(bandDescription))
        }
// curl -X PATCH -H 'Content-Type: application/json' -d '{"name":"rammstein","description":{"EN":"deutsche band", "RU": "Наказывай меня"}}' http://localhost:8083/bands/description/update
        patch("/bands/description/update") {
            log.info("Inside patch")
            val bandDescription = call.receive<BandDescription>()
            val updated = mongoService.updateBandDescription(bandDescription)

            if (updated) {
                call.respond(HttpStatusCode.OK, "Band description updated successfully")
            } else {
                call.respond(HttpStatusCode.NotFound, "Band not found")
            }
        }
    }
    routing {
//  curl -X POST -H 'Content-Type: application/json' -d '{"test":"лцоудшйощшов"}' http://localhost:8083/ru_test
        post("/ru_test") {
            val testVal = call.receive<RuTest>()
            call.respond(HttpStatusCode.OK, "this is test ${testVal.test}")

        }
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
            } ?: band // if not band found - leave initial band's description
        }.toSet()
    )
}


fun mainCoroutine(): Map<String, String> = runBlocking {
    GlobalScope.launch {
        delay(3000L)
    }
    return@runBlocking getMockedBandData()
}

@Serializable
data class RuTest(val test: String)