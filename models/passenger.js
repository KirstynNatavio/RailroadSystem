module.exports = (sequelize, DataTypes) => {
	var PASSENGER = sequelize.define('PASSENGER', {
		PASSENGER_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		FIRST_NAME: {
			type: DataTypes.STRING,
			allowNull: false
		},
		LAST_NAME: {
			type: DataTypes.STRING,
			allowNull: false
		},
		PHONE_NUMBER: {
			type: DataTypes.STRING,
			allowNull: false
		},
		EMAIL: {
			type: DataTypes.STRING,
			allowNull: false
		}

	},
	{
		freezeTableName: true,
		timestamps: false
	});

	return PASSENGER; 


};

