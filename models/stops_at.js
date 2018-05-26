module.exports = (sequelize, DataTypes) => {
	var STOPS_AT = sequelize.define('STOPS_AT', {
		STATION_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		ARRIVAL: {
			type: DataTypes.TIME,
			allowNull: false
		},
		DEPARTURE: {
			type: DataTypes.TIME,
			allowNull: false
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});


	return STOPS_AT; 


};


