const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  operatorsAliases: false,
  logging: false // default console.log()
});

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.STRING,
  }
});

module.exports = {
  Sequelize,
  sequelize,
  Post,
}