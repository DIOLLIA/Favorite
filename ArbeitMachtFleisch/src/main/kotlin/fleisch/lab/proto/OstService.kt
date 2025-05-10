package fleisch.lab.proto

import fleisch.lab.ost.BandRequest
import fleisch.lab.ost.OstServiceGrpcKt.OstServiceCoroutineStub
import io.grpc.ManagedChannelBuilder
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class OstService(
    host: String = "localhost",
    port: Int = 8085
) {
    private val channel = ManagedChannelBuilder
        .forAddress(host, port)
        .usePlaintext()
        .build()

    private val stub = OstServiceCoroutineStub(channel)

    suspend fun getOstAndMovies(bandName: String): List<Pair<String, String>> = withContext(Dispatchers.IO) {
        val request = BandRequest.newBuilder()
            .setBandName(bandName)
            .build();

        val response = stub.moviesAndTrackByBand(request)
        response.movieTracksList.map { it.movieTitle to it.track }
    }
}