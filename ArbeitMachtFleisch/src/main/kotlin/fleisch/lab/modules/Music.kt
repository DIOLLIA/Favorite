package fleisch.lab.modules

import fleisch.lab.service.MusicService
import org.koin.dsl.module


val musicModule = module { single { MusicService() } }