package fleisch.lab.routing

import fleisch.lab.service.MusicService
import fleisch.lab.service.Result
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.testing.*
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.koin.dsl.module
import org.koin.ktor.plugin.Koin
import org.koin.test.KoinTest

class BandRoutingTest : KoinTest {
    companion object {
        const val BAND_PATH = "/bands/createWithDescription"
    }

    @Test
    fun `POST create band with description - deserialized & return 201`() = runBlocking {
        val mockMusicService = mockk<MusicService>()
        val testModule = module {
            single { mockMusicService }
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
            coEvery { mockMusicService.createWithDescriptions(any()) } returns Result.Created("sepultura", "ok")

            var response = client.post(BAND_PATH) {
                contentType(ContentType.Application.Json)
                setBody(
                    """{"name": "sepultura", "imagePath": "/test", "description": { "EN": "eng sep mong description", "RU":"" }}"""
                        .trimIndent()
                )
            }
            assertEquals(HttpStatusCode.Created, response.status)
            coEvery { mockMusicService.createWithDescriptions(any()) } returns Result.Failed("sepultura", "failure")

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

    //todo test with bad json structure - 400 in response
    @Test
    @Disabled
    fun todoWithMock() {
        //todo use for mock service response\result in test
    }
}
