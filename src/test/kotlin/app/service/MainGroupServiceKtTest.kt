package app.service

import org.junit.jupiter.api.Test

class MainGroupServiceKtTest {
    @Test
    fun testMainGroupService() {
        val service = MainGroupService().getGroups()
        println(service)
    }
}
