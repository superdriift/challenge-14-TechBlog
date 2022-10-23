const { Model, DataTypes } = require('sequelize');
const sequelize = require('..config/connection');
const { reference } = require('@popperjs/core');

class BlogPost extends Model {} 

BlogPost.init(
    {
        post_id: { 
            autoIncrement: true,
            primaryKey: true
        },
        title: {

        },
        contents: {

        },
        username: {

        },
        date: {

        }
    }
)