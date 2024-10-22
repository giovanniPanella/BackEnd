'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pedidos.init({
    OP: DataTypes.INTEGER,
    item: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    produzido: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pedidos',
  });
  return pedidos;
};