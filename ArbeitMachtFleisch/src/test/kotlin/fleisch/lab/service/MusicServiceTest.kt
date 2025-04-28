package fleisch.lab.service

import com.mongodb.client.result.InsertOneResult
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.MongoDatabase
import fleisch.lab.model.BandWithDescription
import fleisch.lab.model.Lang
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.reactive.asPublisher
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import org.bson.Document
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import org.koin.core.context.GlobalContext.startKoin
import org.koin.core.context.stopKoin
import org.koin.dsl.module
import org.koin.java.KoinJavaComponent.getKoin
import java.sql.*


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MusicServiceTest {
    private val musicService = MusicService()

    //mongo mocks
    private val mockCollection =
        mockk<MongoCollection<Document>>(relaxed = true) // relax means if no concrete behave - provide non-null
    private val mongoDB = mockk<MongoDatabase>()
    private val descriptionService = mockk<DescriptionService>()

    //postgres mocks
    private val postgresDB = mockk<Connection>()
    private val bandService = mockk<BandService>()
    private val resultSet = mockk<ResultSet>()
    private val mockedStatementCreate: PreparedStatement = mockk<PreparedStatement>()
    private val mockedStatementDelete: PreparedStatement = mockk<PreparedStatement>()

    private val testModulesMocked =
        module {
            single { bandService }
            single { descriptionService }
        }

    private val testModulesDeepMock =
        module {
            single { mongoDB }
            single { postgresDB }
            single { musicService }
            single { BandService(get()) }
            single { DescriptionService(get()) }
        }

    fun startKoin(isDeepMock: Boolean) {
        stopKoin()
        if (!isDeepMock) {
            startKoin {
                modules(testModulesDeepMock)
            }
        } else {
            startKoin {
                modules(testModulesDeepMock)
            }
        }
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
    fun `Test validation - success`() {
        fun validateBand() =
            Utils.DescriptionLanguage.validateBandWithDescription(createBandWithDescription("sepultura"))

        assertDoesNotThrow { validateBand() }
    }

    @Test
    fun `Test validation empty band name- failure`() {
        runBlocking {
            assertThrows<IllegalStateException> { musicService.createWithDescriptions(createBandWithDescription(name = "")) }
        }
    }

    @Test
    fun `Test create band with description - Band service db respond error`() {
        startKoin(false)

        val bandWithDesc = createBandWithDescription()

        every {
            postgresDB.prepareStatement(
                "INSERT INTO bands (band_name, description, image_path) VALUES (?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS
            )
        } returns mockedStatementCreate
        every { mockedStatementCreate.setString(any(), any()) } returns Unit
        every { mockedStatementCreate.executeUpdate() } throws SQLException("failed to insert band")

        val musicService: MusicService = getKoin().get()
        runBlocking {
            val result = musicService.createWithDescriptions(bandWithDesc)
            assertEquals(Result.Failed(bandWithDesc.name, "SQL error: failed to insert band"), result)
        }
    }

    @Test
    fun `Test create band with description - Description service db respond error`() {
        startKoin(false)

        val bandWithDesc = createBandWithDescription()
        //bandService create - success
        every {
            postgresDB.prepareStatement(
                "INSERT INTO bands (band_name, description, image_path) VALUES (?, ?, ?)",
                Statement.RETURN_GENERATED_KEYS
            )
        } returns mockedStatementCreate
        every { mockedStatementCreate.setString(any(), any()) } returns Unit
        every { mockedStatementCreate.executeUpdate() } returns 1
        every { mockedStatementCreate.generatedKeys } returns resultSet
        every { resultSet.next() } returns true

        //descriptionService create - failure
        val insertOneResult = mockk<InsertOneResult>(relaxed = true)
        val doc = Document()
            .append("band_name", bandWithDesc.name)
            .append("band_description_en", bandWithDesc.description.getOrElse(Lang.EN, { "" }))
            .append("band_description_ru", bandWithDesc.description.getOrElse(Lang.RU, { "" }))

        coEvery { mongoDB.getCollection("bands_data") } returns mockCollection
        coEvery { mockCollection.insertOne(doc) } returns flowOf(insertOneResult).asPublisher()
        coEvery { insertOneResult.wasAcknowledged() } returns false

        //bandService delete - success
        every {
            postgresDB.prepareStatement(
                "DELETE FROM bands WHERE band_name = ?"
            )
        } returns mockedStatementDelete
        every { mockedStatementDelete.setString(any(), any()) } returns Unit
        every { mockedStatementDelete.executeUpdate() } returns 1

        val musicService: MusicService = getKoin().get()
        runBlocking {
            val result = musicService.createWithDescriptions(bandWithDesc)
            assertEquals(result, Result.Failed(bandWithDesc.name, "failed to create band"))
        }
    }
}
