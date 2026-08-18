import { DataTypes } from "sequelize";
import { db } from "../index";
import { CategoryModel } from "./CategoryModel";
import { UserModel } from "./UserModel";

const ProductsModel = db.define("products", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
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
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryProduct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estoque: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ProductsModel.belongsTo(CategoryModel, {
  foreignKey: "category_ID",
});

ProductsModel.belongsTo(UserModel, {
  foreignKey: "user_ID",
  onDelete: "CASCADE",
});





export { ProductsModel };
