package fleisch.lab.model

import kotlinx.serialization.Serializable

@Serializable
data class Band(val bandName:String, val description: String, val imagePath: String)