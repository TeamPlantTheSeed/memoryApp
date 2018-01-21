module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
    seed: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    soil: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    shownCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    lastShown: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
  Card.associate = function(models) {
    // We're saying that a Card should belong to an User
    // A Card can't be created without a User due to the foreign key constraint
    Card.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Card;
};
