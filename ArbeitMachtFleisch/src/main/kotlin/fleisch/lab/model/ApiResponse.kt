package fleisch.lab.model

import io.ktor.http.*
import kotlinx.serialization.Serializable

@Serializable
sealed class ApiResponse {
    abstract val data: Map<String, String>?
    abstract val message: String
    abstract val status: Int
}

@Serializable
data class ApiResponseCreated(
    override val data: Map<String, String>,
    override val message: String,
    override val status: Int = HttpStatusCode.Created.value
) : ApiResponse()

@Serializable
data class ApiResponseError(
    override val data: Map<String, String>?,
    override val message: String,
    override val status: Int = HttpStatusCode.InternalServerError.value
) : ApiResponse()

@Serializable
data class ApiResponseSuccess(
    override val data: Map<String, String>?,
    override val message: String,
    override val status: Int = HttpStatusCode.OK.value
) : ApiResponse()
