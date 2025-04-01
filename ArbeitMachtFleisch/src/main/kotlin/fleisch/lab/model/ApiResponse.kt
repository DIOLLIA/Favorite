package fleisch.lab.model

import io.ktor.http.*
import kotlinx.serialization.Serializable

@Serializable
open class ApiResponse<T>(

        val data: T? = null,
        val message: String,
        val status: Int
) {
    companion object {
        fun <T> created(data: T, message: String): ApiResponse<T> =
            ApiResponse(data = data, message = "created", status = HttpStatusCode.Created.value)

        fun <T> error(data: T, message: String): ApiResponse<T> =
            ApiResponse(data = data, message = "error", status = HttpStatusCode.InternalServerError.value)

        fun <T> success(data: T, message: String): ApiResponse<T> =
            ApiResponse(data = data, message = "success", status = HttpStatusCode.OK.value)


    }
}

/*
@Serializable
open class ApiResponse<T> {
    @Serializable
    class Created<T: @Serializable Any>(
        val data: T? = null,
        val message: String = "Created"
    ) : ApiResponse<T>() {
        val status: Int = HttpStatusCode.Created.value
    }

    @Serializable
    class Success<T>(
        val data: T? = null,
        val message: String = "Success"
    ) : ApiResponse<T>() {
        val status: Int = HttpStatusCode.OK.value
    }

    @Serializable
    class Error<T>(
        val data: T? = null,
        val message: String = "Error"
    ) : ApiResponse<T>() {
        val status: Int = HttpStatusCode.InternalServerError.value
    }
}
*/