package app.model

enum class MainGroup(val ref: String) {
    MOVIES("/movies"),
    MUSIC("/music"),
    GAMES("/games");

}

/**
 * Using `object` to create singleton of the class with method.
 * It behaves as a static object
 */
object MainGroups {
    fun getGroups(): Map<String, String> {
        val map = mutableMapOf<String, String>()
        MainGroup.entries.map {
            map.put(it.name, it.ref)
        }
        return map
    }
}