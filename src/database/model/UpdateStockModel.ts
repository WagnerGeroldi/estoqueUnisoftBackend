import { DataTypes } from "sequelize";
import { db } from "../index";
import { UserModel } from "./UserModel";

const UpdateStockModel = db.define("update_stock", {
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
});

UpdateStockModel.belongsTo(UserModel, {
  foreignKey: "user_ID",
  onDelete: "CASCADE",
});

export { UpdateStockModel };
