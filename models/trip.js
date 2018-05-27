module.exports = (sequelize, DataTypes) => {
	var TRIP = sequelize.define('TRIP', {
		TRIP_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		TRIP_DATE: {
			type: DataTypes.DATE,
			allowNull: false
		},
		TRIP_TIME: {
			type: DataTypes.TIME,
			allowNull: false
		},
		PRICE: {
			type: DataTypes.FLOAT,
			allowNull: false
		}

	}, {
		freezeTableName: true,
		timestamps: false
	});

	TRIP.associate = function(models) {
		models.TRIP.hasOne(models.TRAIN, {foreignKey: "TRAIN_ID"});
		models.TRIP.belongsTo(models.PASSENGER);
		models.TRIP.belongsTo(models.RESERVATION);
		models.TRIP.hasMany(models.STATION);

	};
	return TRIP; 


};

