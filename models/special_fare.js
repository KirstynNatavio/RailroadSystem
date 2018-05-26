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
	}, {
		freezeTableName: true, 
		createdAt: false,
		updatedAt: false
	});

	return SPECIAL_FARE; 


};


