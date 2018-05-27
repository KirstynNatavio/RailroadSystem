module.exports = (sequelize, DataTypes) => {
	var STOPS_AT = sequelize.define('STOPS_AT', {
		
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			allowNull: false
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


