package fleisch.lab.service

import fleisch.lab.model.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class MusicService : KoinComponent {
    private val log: Logger = LoggerFactory.getLogger(javaClass)

    /*
    This is the recommended way to inject dependencies in Koin.
    by inject() is lazy initialization (will be created on first access).
    KoinComponent makes the class a participant of the DI container.
    Great for services, controllers and other components.
    Pros: Scales well.
    Cleaner architecture, easier to write unit tests.
    Less reliance on the DI framework in the rest of the code.
     */
    private val bandService: BandService by inject()
    private val descriptionService: DescriptionService by inject()

    suspend fun create(band: Band) =
        bandService.create(band)

    suspend fun createWithDescriptions(band: BandWithDescription): ApiResponse {
        if (band.name == "sepultura") {
            return ApiResponseCreated(data = mapOf(), message = "created")
        } else {
            return ApiResponseError(data = mapOf(), message = "error")
        }
    }

    suspend fun getAllBandsDescriptions(lang: String?): Map<String, String> =
        descriptionService.getAllBandsDescriptions(lang)


    suspend fun addBandDescription(description: BandDescription) =
        descriptionService.addBandDescription(description)


    suspend fun updateBandDescription(description: BandDescription) =
        descriptionService.updateBandDescription(description)


    //It switches the execution context of the current coroutine to another CoroutineDispatcher - in this case Dispatchers.IO.
    suspend fun getBandsWithPagination(page: Int?): BandResponse = withContext(Dispatchers.IO) {
        bandService.getBands(page)
    }

    suspend fun getBandsWithDescriptions(lang: String?, page: Int?): BandResponse {
        return coroutineScope {
            val bandsDeferred = async {
                bandService.getBands(page)
            }
            //todo pass page param to the mongo for getting proper descriptions
            val descriptionsDeferred = async {
                descriptionService.getAllBandsDescriptions(lang)
            }

            val bandResponse = bandsDeferred.await()
            val descriptions = descriptionsDeferred.await()

            val bands = bandResponse.bands.associateWith { band ->
                descriptions.getCaseInsensitive(band.bandName) ?: band.description
            }
                .map { (band, newDescription) -> band.copy(description = newDescription) }
                .toSet()

            BandResponse(bands, bandResponse.hasMore)
        }
    }

    private fun Map<String, String>.getCaseInsensitive(key: String): String? {
        val matchedKey = keys.firstOrNull { it.equals(key, ignoreCase = true) }
        if (matchedKey == null) {
            log.warn("No matching description found for band: $key")
        }
        return matchedKey?.let { this[it] }
    }
}