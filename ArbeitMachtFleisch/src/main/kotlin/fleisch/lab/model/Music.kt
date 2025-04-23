package fleisch.lab.model

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.Serializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

@Serializable
data class BandWithDescription(val name: String, val imagePath: String, val description: Map<Lang, String>)

@Serializable
data class Band(val bandName: String, var description: String, val imagePath: String)

@Serializable
data class BandDescription(val name: String, val description: Map<Lang, String>)

@Serializable(with = LangSerializer::class)
enum class Lang(val lang: String) {
    EN("en"),
    RU("ru")
}


@Serializer(forClass = Lang::class)
object LangSerializer : KSerializer<Lang> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Lang", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: Lang) {
        encoder.encodeString(value.lang)
    }

    override fun deserialize(decoder: Decoder): Lang {
        val value = decoder.decodeString()
        return Lang.values().find { it.lang.equals(value, true) }
            ?: throw SerializationException("Unknown lang: $value")
    }
}

fun BandWithDescription.toBand(): Band {
    return Band(bandName = this.name, description = "${this.name} default description", imagePath = this.imagePath)
}

fun BandWithDescription.toBandDescription(): BandDescription {
    return BandDescription(name = this.name, description = this.description)
}