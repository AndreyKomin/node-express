module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: true,
  });
  User.associate = function (models) {
    models.User.hasMany(models.AuthProvider, {
      onDelete: 'CASCADE',
    });
  };

  return User;
};
