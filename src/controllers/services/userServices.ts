import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../database/model/UserModel";
import bcrypt from "bcrypt";
import "dotenv/config";
import JWT from "jsonwebtoken";
import { passProvisional } from "../../services/email/generatePassword";
import HandleEmailService from "../../services/email/HandleEmailService";

class userServices {
  async verifyEmailExsits(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    await UserModel.count({
      where: {
        email: email,
      },
    }).then((count) => {
      if (count != 0) {
        return res.status(400).json({ message: "Email já cadastrado" });
      } else {
        next();
      }
    });
  }

  async verifyIdExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    await UserModel.count({
      where: {
        id: id,
      },
    }).then((count) => {
      if (count == 0) {
        return res.status(400).json({ message: "Usuário não cadastrado" });
      } else {
        next();
      }
    });
  }

  async recoverPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user: any = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Email não cadastrado" });
    } else {
      HandleEmailService.runPassProvisional(user, passProvisional);

      const passwordCript = await bcrypt.hash(passProvisional, 10);

      await UserModel.update(
        {
          password: passwordCript,
          updatePass: true,
        },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(200).json({ message: "Enviamos um email com sua nova senha" });
    }
  }

  async verifyUpdatePassword(req: Request, res: Response, next: NextFunction) {
    const { password, newpassword } = req.body.data;
    const { id } = req.body.user;

    const user: any = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Erro: Usuário não cadastrado" });
    }

    const result = await bcrypt.compare(
      password,
      user.getDataValue("password")
    );

    if (result === true) {
      const passwordCript = await bcrypt.hash(newpassword, 10);
      await UserModel.update(
        {
          password: passwordCript,
          updatePass: false,
        },
        {
          where: {
            id: id,
          },
        }
      );

      const dataUser: any = {
        email: user.email,
        name: user.name,
        update: new Date(),
      };

      HandleEmailService.runInfoUpdatePassword(dataUser);

      res.status(201).json({ message: "Senha atualizada com sucesso" });
    } else {
      res.status(400).json({ message: "Algo deu errado, tente novamente" });
    }
  }

  async handleLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user: any = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Usuário não cadastrado" });
    } else {
      const result = await bcrypt.compare(
        password,
        user.getDataValue("password")
      );

      const token = JWT.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: 10000,
      });

      if (user.dataValues.updatePass === true && result === true) {
        res.status(300).json({
          message: "Redirecionando para troca de senha",
          auth: true,
          token,
          user,
        });
      } else {
        await UserModel.update(
          {
            newAcess: new Date(),
            lastAcess: user.newAcess,
          },
          {
            where: {
              email: email,
            },
          }
        );

        result === true
          ? res.status(200).json({ auth: true, token, user })
          : res.status(401).send(false);
      }
    }
  }

  verifyJWT(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers["x-access-token"];
    JWT.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Usuário não autenticado" });
      } else {
        next();
      }
    });
  }
}

export default new userServices();
