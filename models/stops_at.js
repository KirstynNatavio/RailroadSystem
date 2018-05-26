module.exports = (sequelize, DataTypes) => {
	var STOPS_AT = sequelize.define('STOPS_AT', {
		ARRIVAL: {
			type: DataTypes.TIME,
			allowNull: false
		},
		DEPARTURE: {
			type: DataTypes.TIME,
			allowNull: false
		}
	});

	return STOPS_AT; 


};


