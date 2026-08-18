import { DataTypes } from "sequelize";
import { db } from "../index";
import { UserModel } from "./UserModel";

const DecreaseOrderModel = db.define("decrease_order", {
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
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

DecreaseOrderModel.belongsTo(UserModel, {
  foreignKey: "user_ID",
});

export { DecreaseOrderModel };
