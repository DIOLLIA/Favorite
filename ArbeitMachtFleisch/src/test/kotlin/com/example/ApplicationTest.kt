package com.example

import fleisch.lab.proto.OstService
import fleisch.lab.routing.configureRouting
import fleisch.lab.service.MusicService
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import io.mockk.mockk
import kotlin.test.Test
import kotlin.test.assertEquals

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        val mockMusicService = mockk<MusicService>()
        val mockGrpcClient = mockk<OstService>()

        application {
            configureRouting(mockMusicService, mockGrpcClient)
        }
        client.get("/").apply {
            assertEquals(HttpStatusCode.OK, status)
            assertEquals("You are on the music REST API!", bodyAsText())
        }
    }
}
