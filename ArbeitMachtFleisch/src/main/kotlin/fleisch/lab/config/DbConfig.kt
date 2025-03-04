package fleisch.lab.config

data class DbConfig(val url: String, val user: String, val password: String, val driver: String, val maxPoolSize: Int)