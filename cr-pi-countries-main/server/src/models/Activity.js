const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
