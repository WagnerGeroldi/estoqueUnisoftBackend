import { DataTypes } from "sequelize";
import { db } from "../index";
import { UserModel } from "./UserModel";

const CategoryModel = db.define("category", {
  id: {
    type: DataTypes.STRING,
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
});

CategoryModel.belongsTo(UserModel, {
  foreignKey: "user_ID",
});



export { CategoryModel };
