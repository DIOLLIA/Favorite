package fleisch.lab.model

import kotlinx.serialization.Serializable
import java.util.*

@Serializable
data class Band(val bandName: String, var description: String, val imagePath: String)

@Serializable
data class BandDescription(val name: String, val description: Map<Lang, String>)

@Serializable
enum class Lang(val lang: String) {
    EN("en"),
    RU("ru")
}


//This constant is created until
// 1)there are integration with mongoDB exist and
// 2)DB contains this data
fun getMockedBandData(): TreeMap<String, String> {
    val pairs = sequenceOf(
        "rammstein" to "ramm data",
        "Slipknot" to "slk data",
        "Disturbed" to "dist data",
        "korn" to "korn data",
        "sepultura" to "sep data"
    )
    val mockedBandData = TreeMap<String, String>(String.CASE_INSENSITIVE_ORDER)

    mockedBandData.putAll(pairs)
    return mockedBandData
}
