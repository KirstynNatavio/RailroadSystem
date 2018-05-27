module.exports = (sequelize, DataTypes) => {
	var SEATS_FREE = sequelize.define('SEATS_FREE', {
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

	SEATS_FREE.associate = function(models) {
		SEATS_FREE.belongsTo(models.SEGMENT, {foreignKey: 'SEGMENT_ID', targetKey: 'SEGMENT_ID', sourceKey: 'SEGMENT_ID'});
		SEATS_FREE.belongsTo(models.TRAIN, {foreignKey: 'TRAIN_ID', targetKey: 'TRAIN_ID', sourceKey: 'TRAIN_ID'})
		// SEATS_FREE.belongsTo(models.TRAIN);
	};
	return SEATS_FREE; 
};


