import { DataTypes } from "sequelize";
import { db } from "../index";

const CertificadoModel = db.define("certificados", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tem algum nome vazio",
      },
    },
  },

  curso: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tem algum nome do curso vazio",
      },
    },
  },

  periodo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tem algum periodo vazio",
      },
    },
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Tem alguma cidade vazia",
      },
    },
  },
  entrega: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Campo da entrega está vazio",
      },
    },
  },
  data_entrega: {
    type: DataTypes.DATE,
  },
});



export { CertificadoModel };
