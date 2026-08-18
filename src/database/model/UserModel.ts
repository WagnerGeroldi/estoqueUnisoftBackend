import { DATE } from "sequelize";
import { DataTypes } from "sequelize";
import { db } from "../index";


const UserModel = db.define("users", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Este campo não pode ser vazio!",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Este campo não pode ser vazio!",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Este campo não pode ser vazio!",
      },
    },
  },
  lastAcess: {
    type: DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  newAcess: {
    type: DATE,
    defaultValue: new Date()   
  }

});


export { UserModel };
