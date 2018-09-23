const Sequelize = require('sequelize')
let sequelize = null
let Data = null

module.exports = {
  async connect (config) {
    sequelize = new Sequelize(config)

    Data = sequelize.define('data', {
      temperatura: Sequelize.INTEGER,
      humedad: Sequelize.INTEGER,
      timestamp: Sequelize.STRING
    }, {
      timestamps: false
    })

    return Data.sync()
  },

  save (data) {
    return Data.create({
      temperatura: data.temperatura,
      humedad: data.humedad,
      timestamp: data.timestamp
    })
  }
}
