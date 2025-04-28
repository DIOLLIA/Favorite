package fleisch.lab.service

import fleisch.lab.model.Band
import fleisch.lab.model.BandWithDescription
import fleisch.lab.model.Lang
import org.slf4j.LoggerFactory

class Utils {
    companion object DescriptionLanguage {
        private val log = LoggerFactory.getLogger(Utils::class.java)

        fun validateLanguage(lang: String?): String {
            return when (lang) {
                Lang.EN.lang, Lang.RU.lang -> lang
                else -> {
                    log.warn("Unsupported language: '$lang'. Defaulting to 'en'.")
                    Lang.EN.lang
                }
            }
        }

        fun validateBandWithDescription(band: BandWithDescription): Boolean {
            if (
                band.name.isNotEmpty() &&
                band.description.values.size == 2 &&
                !band.description.values.contains<String?>(null) &&
                band.imagePath.isNotEmpty()
            )
                return true
            else {
                throw IllegalStateException("Band is not valid")
            }
        }
    }
}

sealed class Result {
    data class Created(val name: String, val message: String) : Result()
    data class Deleted(val name: String, val message: String? = null) : Result()
    data class Updated(val name: String, val message: String) : Result()
    data class Success(val message: String = "Success") : Result()
    data class Failed(val name: String, val message: String) : Result()

    data class GetBands(val bands: Set<Band>, val message: String, val hasMore: Boolean) : Result()
}