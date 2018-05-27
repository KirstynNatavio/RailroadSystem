module.exports = (sequelize, DataTypes) => {
	var TRAIN = sequelize.define('TRAIN', {
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			allowNull: false,
			autoIncrement: true
		},
		ORIGIN: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		DESTINATION: {
			type: DataTypes.INTEGER,
			allowNull: false
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
		models.TRAIN.hasOne(models.TRIP, {targetKey: 'TRAIN_ID', sourceKey: 'TRAIN_ID', foreignKey: 'TRAIN_ID'})
		models.TRAIN.hasMany(models.SEATS_FREE, {targetKey: 'TRAIN_ID', sourceKey: 'TRAIN_ID', foreignKey: 'TRAIN_ID'});
		//SEATS_FREE.belongsTo(models.TRAIN, {foreignKey: 'TRAIN_ID', targetKey: 'TRAIN_ID', sourceKey: 'TRAIN_ID'})

		// models.TRAIN.hasOne(models.STATION, {targetKey: 'STATION_ID', sourceKey: 'ORIGIN'});
		// models.TRAIN.hasOne(models.STATION, {targetKey: 'STATION_ID', sourceKey: 'DESTINATION'});

		// models.TRAIN.hasMany(models.SEATS_FREE);
		models.TRAIN.belongsToMany(models.STATION, {through: models.STOPS_AT, foreignKey: 'TRAIN_ID'})
	};
	return TRAIN; 


};

