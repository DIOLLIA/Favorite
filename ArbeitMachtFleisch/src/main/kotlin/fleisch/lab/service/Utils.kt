package fleisch.lab.service

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
    }
}