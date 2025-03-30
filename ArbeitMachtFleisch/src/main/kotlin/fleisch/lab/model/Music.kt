package fleisch.lab.model

import kotlinx.serialization.Serializable

@Serializable
data class Band(val bandName: String, var description: String, val imagePath: String)

@Serializable
data class BandDescription(val name: String, val description: Map<Lang, String>)

@Serializable
enum class Lang(val lang: String) {
    EN("en"),
    RU("ru")
}
