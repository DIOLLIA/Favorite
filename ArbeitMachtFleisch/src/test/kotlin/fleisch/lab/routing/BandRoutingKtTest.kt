package fleisch.lab.routing

import fleisch.lab.service.MusicService
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.testing.*
import kotlinx.coroutines.runBlocking
import org.junit.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Disabled
import org.koin.core.context.GlobalContext.startKoin
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.test.KoinTest

class BandRoutingTest : KoinTest {
    companion object {
        const val BAND_PATH = "/bands/createWithDescription"
    }

    private val testModule = module {
        single { MusicService() }
    }

    @Test
    fun `POST create band with description - deserialized & return 201`() = runBlocking {
        startKoin {
            modules(testModule)
        }
        testApplication {
            application {
                install(ContentNegotiation) {
                    json()
                }
                install(Koin) {
                    modules(testModule)
                }
                configureRouting()
            }

            var response = client.post(BAND_PATH) {
                contentType(ContentType.Application.Json)
                setBody(
                    """{"name": "sepultura", "imagePath": "/test", "description": { "EN": "eng sep mong description", "RU":"" }}"""
                        .trimIndent()
                )
            }
            assertEquals(HttpStatusCode.Created, response.status)

            response = client.post(BAND_PATH) {
                contentType(ContentType.Application.Json)
                setBody(
                    """{"name": "no_such_band", "imagePath": "/dgaf", "description": { "EN": "en", "RU":"ru" }}"""
                        .trimIndent()
                )
            }
            assertEquals(HttpStatusCode.InternalServerError, response.status)
        }
    }


    @Test
    @Disabled
    fun todoWithMock() {
        //todo use for mock service response\result in test

//            coEvery { mockMusicService.createWithDescriptions(any()) } returns ApiResponseCreated(
//                data = mapOf(),
//                message = "created",
//            )
    }
}
