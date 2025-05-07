package lock.stock.twosmokingbarrels.service;

import io.grpc.stub.StreamObserver;
import lock.stock.twosmokingbarrels.BandRequest;
import lock.stock.twosmokingbarrels.MovieTracks;
import lock.stock.twosmokingbarrels.OstServiceGrpc;
import lock.stock.twosmokingbarrels.dao.OstRepo;
import org.springframework.stereotype.Service;

@Service
public class OstService extends OstServiceGrpc.OstServiceImplBase {
    private final OstRepo ostRepo;

    public OstService(OstRepo ostRepo) {
        this.ostRepo = ostRepo;
    }

    @Override
    public void moviesAndTrackByBand(BandRequest request, StreamObserver<MovieTracks> responseObserver) {
        var data = ostRepo.findMoviesByBandName(request.getBandName());
        responseObserver.onNext(data);
        responseObserver.onCompleted();
    }
}
