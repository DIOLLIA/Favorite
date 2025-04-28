package fleisch.lab.routing

import fleisch.lab.model.ApiResponse
import fleisch.lab.model.ApiResponseCreated
import fleisch.lab.model.ApiResponseError
import fleisch.lab.model.ApiResponseSuccess
import fleisch.lab.service.Result
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*


suspend fun ApplicationCall.customResponse(response: ApiResponse) {
    respond(HttpStatusCode.fromValue(response.status), response)
}

suspend fun ApplicationCall.buildResponse(result: Result) {
    val response: ApiResponse = when (result) {
        is Result.Created -> ApiResponseCreated(
            data = mapOf("name" to result.name),
            message = result.message
        )

        is Result.Updated -> ApiResponseSuccess(
            data = mapOf("name" to result.name),
            message = result.message
        )

        is Result.Deleted -> ApiResponseSuccess(
            data = mapOf("name" to result.name),
            message = result.message ?: "Successfully deleted"
        )

        is Result.Success -> ApiResponseSuccess(
            data = null,
            message = result.message
        )

        is Result.Failed -> ApiResponseError(
            data = mapOf("name" to result.name),
            message = result.message
        )

        is Result.GetBands -> ApiResponseSuccess(
            data = result.bands.associate { it.bandName to (it.description ?: "") },
            message = result.message
        )
    }

    respond(HttpStatusCode.fromValue(response.status), response)
}
