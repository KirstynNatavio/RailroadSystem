module.exports = (sequelize, DataTypes) => {
	var SPECIAL_FARE = sequelize.define('SPECIAL_FARE', {
		TYPE: {
			type: DataTypes.STRING,
			primaryKey:true,
			allowNull: false,
		},
		FACTOR: {
			type: DataTypes.FLOAT,
			allowNull: false
		}
	});

	return SPECIAL_FARE; 


};


