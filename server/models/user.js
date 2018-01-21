module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    userPassword: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  User.associate = function(models) {
    
     User.hasMany(models.Card, {
       onDelete: "cascade"
     });

  };

  return User;
};
