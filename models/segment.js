module.exports = (sequelize, DataTypes) => {
    var SEGMENT = sequelize.define('SEGMENT', {
        SEGMENT_ID: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
        },
		FARE: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
    });

	SEGMENT.associate = function(models) {
		SEGMENT.hasMany(models.SEATS_FREE);
		SEGMENT.hasMany(models.STATION);
	};
	return SEGMENT;
};