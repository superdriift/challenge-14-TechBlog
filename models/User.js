const { Model, DataType } = require ('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('..config/connection');

class User extends Model {}

User.init(
    {
        username: {

        },
        password: {

        }
    }
)
