import { DataTypes } from "sequelize";
import { db } from "../index";


const EstoqueModel = db.define("estoque_cidade", {
  
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  estoque: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Este campo não pode ser vazio!",
      },
    },
  },
});

export { EstoqueModel };
