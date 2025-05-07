### grpc server
use grpcurl to check server availability

use command in bash to:
* get services list `grpcurl -plaintext localhost:8085 list`

ProtoReflectionService is used for it (comes with _io.grpc:grpc-services_ package)

* show methods of the service `grpcurl -plaintext localhost:8085 describe ost.OstService`

* get movie title and track (OST) by band name `grpcurl -plaintext -d '{"band_name": "slipknot"}' localhost:8085 ost.OstService.MoviesAndTrackByBand`
