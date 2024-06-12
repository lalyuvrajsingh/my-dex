const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize('dex', 'myuser', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres',
});

const Swap = sequelize.define('Swap', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenB: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amountA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amountB: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

app.post('/swap', async (req, res) => {
  const { user, tokenA, tokenB, amountA, amountB } = req.body;
  try {
    const swap = await Swap.create({ user, tokenA, tokenB, amountA, amountB });
    res.json(swap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
