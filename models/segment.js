module.exports = (sequelize, DataTypes) => {
    var SEGMENT = sequelize.define('SEGMENT', {
        SEGMENT_ID: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
        },
		FARE: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
    }, {
    	freezeTableName: true,
    	createdAt: false,
		updatedAt: false
    });

	SEGMENT.associate = function(models) {
		SEGMENT.hasMany(models.SEATS_FREE);
		SEGMENT.hasMany(models.STATION);
	};
	return SEGMENT;
};