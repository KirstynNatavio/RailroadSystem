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
		models.STATION.belongsTo(models.TRAIN, {as: 'ORIGIN_ID'});
		models.STATION.belongsTo(models.TRAIN, {as: 'DESTINATION_ID'});

		models.STATION.belongsTo(models.TRIP, {as: 'ORIGIN'});
		models.STATION.belongsTo(models.TRIP, {as: 'DESTINATION'});


		models.STATION.belongsTo(models.SEGMENT, {foreignKey: 'STATION_ID', targetKey: 'NORTH_END'});
		models.STATION.belongsTo(models.SEGMENT, {foreignKey: 'STATION_ID', targetKey: 'SOUTH_END'});

		models.STATION.belongsToMany(models.TRAIN, {through: models.STOPS_AT })	

	};
	return STATION; 


};


