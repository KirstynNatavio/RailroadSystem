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
		}
    }, {
    	freezeTableName: true,
    	timestamps: false
    });

	SEGMENT.associate = function(models) {
		SEGMENT.hasMany(models.SEATS_FREE);
		SEGMENT.hasOne(models.STATION, {foreignKey: 'NORTH_END'});
		SEGMENT.hasOne(models.STATION, {foreignKey: 'SOUTH_END'});
	};
	return SEGMENT;
};