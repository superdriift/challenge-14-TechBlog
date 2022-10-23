const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        post_id: {

        },
        content: {

        },
        user: {

        },
        date: {

        }
    }
)