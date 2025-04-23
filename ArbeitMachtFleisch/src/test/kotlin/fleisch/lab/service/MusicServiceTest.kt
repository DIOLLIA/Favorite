package fleisch.lab.service

import fleisch.lab.model.*
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.koin.core.context.GlobalContext
import org.koin.core.context.GlobalContext.startKoin
import org.koin.dsl.module

//this test requires     useJUnitPlatform() plugin in gradle

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MusicServiceTest {

    @BeforeAll
    fun startKoin() {
        if (GlobalContext.getOrNull() == null) {
            startKoin {
                modules(testModules)
            }
        }
    }

    private val bandService = mockk<BandService>()
    private val descriptionService = mockk<DescriptionService>()
    private val musicService = MusicService()


    private val testModules =
        module {
            single { bandService }
            single { descriptionService }
        }

    fun createBandWithDescription(
        name: String = "korn",
        imagePath: String = "/test",
        description: Map<Lang, String> = mapOf(
            Lang.EN to "eng", Lang.RU to "рус яз"
        )
    ): BandWithDescription {
        val ruDesc = description[Lang.RU]
        val enDesc = description[Lang.EN]
        return Json.decodeFromString<BandWithDescription>(
            """
        {"name": "$name",
         "imagePath": "$imagePath",
          "description": {
          "${Lang.EN}": "$enDesc",
            "${Lang.RU}": "$ruDesc"
}}"""
        )
    }

    @Test
    fun `Test create and validate band with description - success`() {
        val bandWithDesc = createBandWithDescription("sepultura")
        val expectedResult = Result.Created("sepultura", "Created")

        coEvery { bandService.create(bandWithDesc.toBand()) } returns Result.Created("sepultura", "Created")
        coEvery { descriptionService.addBandDescription(bandWithDesc.toBandDescription()) } returns Result.Created(
            "sepultura",
            "Created"
        )

        runBlocking {
            val result = musicService.createWithDescriptions(bandWithDesc)

            assertEquals(expectedResult, result)
        }
    }

    @Test
    fun `Test band with empty name - throw validation error`() {

        val band = createBandWithDescription(name = "")

        runBlocking {
            assertThrows<IllegalStateException> { musicService.createWithDescriptions(band) }
        }
    }

    //TODO make the bandService real but mock connection interaction
    @Test
    fun `Test band creation error - 500, no data written`() {

        val bandWithDesc = createBandWithDescription()
        val expectedResult =
            Result.Failed(bandWithDesc.name, "failed to create band")

        coEvery { bandService.create(bandWithDesc.toBand()) } returns Result.Created(bandWithDesc.name, "Created")
        coEvery { descriptionService.addBandDescription(bandWithDesc.toBandDescription()) } returns Result.Failed(
            bandWithDesc.name,
            message = "Something went wrong"
        )
        coEvery { bandService.delete(bandWithDesc.name) } returns Result.Success()

        runBlocking {
            val result = musicService.createWithDescriptions(bandWithDesc)

            assertEquals(expectedResult, result)
        }
    }
}