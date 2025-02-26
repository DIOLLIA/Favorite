package com.example.plugins

import fleisch.lab.model.Band
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import java.sql.Connection
import java.sql.Statement

@Serializable
class BandService(private val connection: Connection) {
    companion object {
        private const val SELECT_BANDS = "SELECT * FROM bands"
        private const val SELECT_BAND_BY_ID = "SELECT * FROM bands WHERE band_name = ?"
        private const val INSERT_BAND = "INSERT INTO bands (band_name, description, image_path) VALUES (?, ?, ?)"
        private const val UPDATE_BAND = "UPDATE bands SET band_name = ?, description = ?, image_path = ? WHERE id = ?"
        private const val DELETE_BAND = "DELETE FROM bands WHERE id = ?"
    }

    // Create new Band
      suspend fun create(band: Band): Int = withContext(Dispatchers.IO) {
            val statement = connection.prepareStatement(INSERT_BAND, Statement.RETURN_GENERATED_KEYS)
            statement.setString(1, band.bandName)
            statement.setString(2, band.description)
            statement.setString(3, band.imagePath)
            statement.executeUpdate()

            val generatedKeys = statement.generatedKeys
            if (generatedKeys.next()) {
                return@withContext generatedKeys.getInt(1)
            } else {
                throw Exception("Unable to retrieve the id of the newly inserted Band")
            }
        }

    // Read a Band
    /*    suspend fun read(id: Int): Band = withContext(Dispatchers.IO) {
            val statement = connection.prepareStatement(SELECT_BAND_BY_ID)
            statement.setInt(1, id)
            val resultSet = statement.executeQuery()

            if (resultSet.next()) {
                val name = resultSet.getString("name")
                val population = resultSet.getInt("population")
                return@withContext Band(name, population)
            } else {
                throw Exception("Record not found")
            }
        }*/
    // Read a Band
    suspend fun read(): Set<Band> = withContext(Dispatchers.IO) {
        val statement = connection.prepareStatement(SELECT_BANDS)
        val resultSet = statement.executeQuery()
        val bands = mutableSetOf<Band>()
        while (resultSet.next()) {
            bands.add(
                Band(
                    bandName = resultSet.getString("band_name"),
                    description = "description",
                    imagePath = resultSet.getString("image_path")
                )
            )
        }
        if (bands.isEmpty()) {
            throw Exception("Record not found")
        }
        return@withContext bands
    }

    // Update a Band
    /*
        suspend fun update(id: Int, Band: Band) = withContext(Dispatchers.IO) {
            val statement = connection.prepareStatement(UPDATE_Band)
            statement.setString(1, Band.name)
            statement.setInt(2, Band.population)
            statement.setInt(3, id)
            statement.executeUpdate()
        }
    */

    // Delete a Band
    /*    suspend fun delete(id: Int) = withContext(Dispatchers.IO) {
            val statement = connection.prepareStatement(DELETE_Band)
            statement.setInt(1, id)
            statement.executeUpdate()
        }*/
}

