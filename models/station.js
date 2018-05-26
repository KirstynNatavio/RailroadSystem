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

	});

	STATION.associate = function(models) {
		models.STATION.belongsTo(models.TRAIN, {as: 'ORIGIN_ID'});
		models.STATION.belongsTo(models.TRAIN, {as: 'DESTINATION_ID'});

		models.STATION.belongsTo(models.TRIP, {as: 'ORIGIN'});
		models.STATION.belongsTo(models.TRIP, {as: 'DESTINATION'});

		models.STATION.belongsTo(models.SEGMENT, {as: 'NORTH_END'});
		models.STATION.belongsTo(models.SEGMENT, {as: 'SOUTH_END'});

		models.STATION.belongsToMany(models.TRAIN, {through: models.STOPS_AT })	

	};
	return STATION; 


};


