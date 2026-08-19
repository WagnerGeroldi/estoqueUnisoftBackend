"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const configEmail_1 = require("./configEmail");
class HandleEmailService {
    handleTime(date) {
        const time = ("0" + date.getDate()).slice(-2) +
            "/" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear() +
            " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2);
        return time;
    }
    async runPassInitial(email, name, passProvisional) {
        const message = `<h1> Parabéns ${name}, sua conta foi criada!! </h1> <br />
      
    Para acessar sua conta use as credenciais abaixo: <br/>

    email: ${email} <br/>
    senha: <strong style= "background: yellow, font-size: 16px"> ${passProvisional} </strong> <br /><br />
      
    Sugerimos que após fazer login, vá até as configurações e troque a senha.
      <br />
      <br />
      Aproveite seu novo sistema de controle de clientes!
      <br />
      <br />
      Atenciosamente, <br />
      Rede Unisoft
      `;
        configEmail_1.transporter.sendMail({
            subject: `Olá ${name}. CONTA CRIADA COM SUCESSO!`,
            from: "Rede Unisoft <controle.unisoft@outlook.com>",
            to: `${email}`,
            html: message,
        });
    }
    async runPassProvisional(user, passProvisional) {
        const message = `<h1> Sua senha provisória chegou!! </h1> <br />
      
      Olá ${user.name}, aqui está sua senha para acesso ao sistema: <strong style= "background: yellow"> ${passProvisional} </strong> <br />
      Na próxima vez que acessar o sistema, você deverá trocá-la para sua segurança!
      <br />
      Atenciosamente, <br />
      Rede Unisoft
      `;
        configEmail_1.transporter.sendMail({
            subject: `Olá ${user.name}. Sua senha provisória chegou - Rede Unisoft`,
            from: "Rede Unisoft <controle.unisoft@outlook.com>",
            to: `${user.email}`,
            html: message,
        });
    }
    async runInfoUpdatePassword(user) {
        const date = new Date(user.update);
        const updateDate = this.handleTime(date);
        const message = `<h1> Senha alterada </h1> <br />
      
      Olá ${user.name} sua senha foi alterada com sucesso em nosso sistema! <br /><br />
      Data da alteração: ${updateDate}
      <br />
      <br />
      Atenciosamente, <br />
      Rede Unisoft
      `;
        configEmail_1.transporter.sendMail({
            subject: `Olá ${user.name}. Recado Importante!`,
            from: "Rede Unisoft <controle.unisoft@outlook.com>",
            to: `${user.email}`,
            html: message,
        });
    }
    async runInfoDeleteAccount(user) {
        const date = new Date();
        const updateDate = this.handleTime(date);
        const message = `<h1> Conta cancelada </h1> <br />
      
      Olá ${user.name} sua conta foi cancelada com sucesso em nosso sistema! <br /><br />
      Data do cancelamento: ${updateDate}
      <br />
      Lembramos que todo o banco de dados existente foi excluído e não é mais possível recuperar as informações.
      <br />
      Atenciosamente, <br />
      Rede Unisoft
      `;
        configEmail_1.transporter.sendMail({
            subject: `Olá ${user.name}. Recado Importante!`,
            from: "Rede Unisoft <controle.unisoft@outlook.com>",
            to: `${user.email}`,
            html: message,
        });
    }
}
exports.default = new HandleEmailService();
