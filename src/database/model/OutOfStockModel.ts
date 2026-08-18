import { DataTypes } from "sequelize";
import { db } from "../index";
import { UserModel } from "./UserModel";

const OutOfStockModel = db.define("out_of_stock", { 
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  product: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Este campo não pode ser vazio!",
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

OutOfStockModel.belongsTo(UserModel, {
  foreignKey: "user_ID",
  onDelete: "CASCADE",
});

export { OutOfStockModel };
