package fleisch.lab.config

import liquibase.Liquibase
import liquibase.database.Database
import liquibase.database.DatabaseFactory
import liquibase.ext.mongodb.database.MongoLiquibaseDatabase
import liquibase.resource.ClassLoaderResourceAccessor

class MongoLiquibaseService {

    fun runMigrations() {
//          val props = TODO() // take DB data from properties

        val mongoDatabase: Database = MongoLiquibaseDatabase().apply {
            connection = DatabaseFactory.getInstance()
                .openConnection(
                    "mongodb://bands_user:bands_secret@localhost:27017/bands",
                    null, null, null,
                    ClassLoaderResourceAccessor()
                )
        }

        Liquibase("mongo/migration/01_init_band_data.yml", ClassLoaderResourceAccessor(), mongoDatabase).use { liquibase ->
            liquibase.update("")
        }
    }
}