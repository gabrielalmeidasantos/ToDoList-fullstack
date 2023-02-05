const sequelize = require("sequelize");
const database = require("../db");
const schema = "";

class Tarefa extends sequelize.Model {}

Tarefa.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: sequelize.STRING,
      allowNull: false,
    },
    finalizado: {
      type: sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "tarefa",
    schema,
  }
);

module.exports = Tarefa;
