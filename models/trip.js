module.exports = (sequelize, DataTypes) => {
	var TRIP = sequelize.define('TRIP', {
		TRIP_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		PASSENGER_ID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		RESERVATION_ID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ORIGIN: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		DESTINATION: {
			type: DataTypes.INTEGER,
			allowNull: false
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

		models.TRIP.belongsTo(models.RESERVATION, {foreignKey: 'RESERVATION_ID', sourceKey: 'RESERVATION_ID', targetKey: 'RESERVATION_ID'});
		// // models.TRIP.hasOne(models.STATION, {targetKey: 'STATION_ID', sourceKey: 'ORIGIN'});
		// models.TRIP.hasOne(models.STATION, {targetKey: 'STATION_ID', sourceKey: 'DESTINATION'});

	};
	return TRIP; 


};

