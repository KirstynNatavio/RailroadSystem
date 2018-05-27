module.exports = (sequelize, DataTypes) => {
	var SEATS_FREE = sequelize.define('SEATS_FREE', {
		SEGMENT_ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		TRAIN_ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		DATE: {
			type: DataTypes.DATE,
			allowNull: false
		},
		SEATS_FREE: {
			type: DataTypes.INTEGER,
			allowNull: false
		}

	}, {
		freezeTableName: true, 
		timestamps: false
	});

	return SEATS_FREE; 
};


