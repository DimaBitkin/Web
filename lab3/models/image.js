'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model { }

    Image.init(
        {
            path: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            dislikes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        },
        {
            sequelize,
            modelName: 'Image',
            tableName: 'Images',
            timestamps: true,  // Добавляем автоматическое создание createdAt и updatedAt
        }
    );

    return Image;
};
