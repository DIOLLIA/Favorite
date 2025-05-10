package fleisch.lab.modules

import fleisch.lab.proto.OstService
import org.koin.dsl.module


val grpcModule = module {
    single { OstService() }
}
