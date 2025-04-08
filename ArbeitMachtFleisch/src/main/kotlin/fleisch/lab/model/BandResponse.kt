package fleisch.lab.model

import kotlinx.serialization.Serializable

@Serializable
data class BandResponse(val bands: Set<Band>, val hasMore: Boolean)