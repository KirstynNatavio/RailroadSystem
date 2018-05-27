module.exports = (sequelize, DataTypes) => {
	var STATION = sequelize.define('STATION', {
		STATION_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		CITY: {
			type: DataTypes.STRING,
			allowNull: false
		},
		STATE: {
			type: DataTypes.STRING,
			allowNull: false
		}

	}, {
		freezeTableName: true,
		timestamps: false
	});

	STATION.associate = function(models) {
		models.STATION.hasMany(models.TRAIN, {foreignKey: 'ORIGIN', sourceKey: 'STATION_ID', targetKey: 'ORIGIN'});
		models.STATION.hasMany(models.TRAIN, {foreignKey: 'DESTINATION', sourceKey: 'STATION_ID', targetKey: 'DESTINATION'});

		models.STATION.hasMany(models.TRIP, {foreignKey: 'ORIGIN', sourceKey: 'STATION_ID', targetKey: 'ORIGIN'});
		models.STATION.hasMany(models.TRIP, {foreignKey: 'DESTINATION', sourceKey: 'STATION_ID', targetKey: 'DESTINATION'});

		models.STATION.hasMany(models.SEGMENT, {foreignKey: 'NORTH_END', sourceKey: 'STATION_ID', targetKey: 'NORTH_END'});
		models.STATION.hasMany(models.SEGMENT, {foreignKey: 'SOUTH_END', sourceKey: 'STATION_ID', targetKey: 'SOUTH_END'});

		// models.STATION.belongsTo(models.TRAIN, {sourceKey: 'STATION_ID', targetKey: 'ORIGIN'})

		// models.STATION.belongsTo(models.TRIP, {sourceKey: 'STATION_ID', targetKey: 'ORIGIN'});
		// models.STATION.belongsTo(models.TRIP, {sourceKey: 'STATION_ID', targetKey: 'DESTINATION'});


		// models.STATION.belongsTo(models.SEGMENT, {foreignKey: 'STATION_ID', targetKey: 'NORTH_END'});
		// models.STATION.belongsTo(models.SEGMENT, {foreignKey: 'STATION_ID', targetKey: 'SOUTH_END'});

		models.STATION.belongsToMany(models.TRAIN, {through: models.STOPS_AT })	


	};
	return STATION; 


};


