module.exports = (sequelize, DataTypes) => {
	var RESERVATION = sequelize.define('RESERVATION', {
		RESERVATION_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		PASSENGER_ID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		RES_DATE: {
			type: DataTypes.DATE,
			allowNull: false
		},
		PAYMENT_METHOD: {
			type: DataTypes.STRING,
			allowNull: false
		}

	},
	{
		freezeTableName: true,
		timestamps: false
	});

	RESERVATION.associate = function(models) {
		models.RESERVATION.belongsTo(models.PASSENGER, {foreignKey: 'PASSENGER_ID'});
	};
	return RESERVATION; 


};

