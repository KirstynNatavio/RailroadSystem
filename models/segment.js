module.exports = (sequelize, DataTypes) => {
    var SEGMENT = sequelize.define('SEGMENT', {
        SEGMENT_ID: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
        },
        NORTH_END: {
        	type: DataTypes.INTEGER,
        	allowNull: false
        },
        SOUTH_END: {
        	type: DataTypes.INTEGER,
        	allowNull: false
        },
		FARE: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		TRAVEL_TIME: {
			type: DataTypes.TIME,
			allowNull: false
		}
    }, {
    	freezeTableName: true,
    	timestamps: false
    });

	SEGMENT.associate = function(models) {
		models.SEGMENT.hasMany(models.SEATS_FREE, {foreignKey: 'SEGMENT_ID', targetKey: 'SEGMENT_ID', sourceKey: 'SEGMENT_ID'})
		//SEATS_FREE.belongsTo(models.SEGMENT, {foreignKey: 'SEGMENT_ID', targetKey: 'SEGMENT_ID', sourceKey: 'SEGMENT_ID'});

		// SEGMENT.hasMany(models.SEATS_FREE);
		// SEGMENT.hasOne(models.STATION, {foreignKey: 'STATION_ID', sourceKey: 'NORTH_END'});
		// SEGMENT.hasOne(models.STATION, {foreignKey: 'STATION_ID', sourceKey: 'SOUTH_END'});
	};
	return SEGMENT;
};