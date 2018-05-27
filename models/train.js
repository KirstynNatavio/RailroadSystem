module.exports = (sequelize, DataTypes) => {
	var TRAIN = sequelize.define('TRAIN', {
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		TIME_DAY: {
			type: DataTypes.STRING,
			allowNull: false
		},
		WKD_BIN: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});

	TRAIN.associate = function(models) {
		models.TRAIN.hasMany(models.SEATS_FREE);
		models.TRAIN.hasMany(models.TRIP);
		models.TRAIN.belongsToMany(models.STATION, {through: models.STOPS_AT});
	};
	return TRAIN; 


};

