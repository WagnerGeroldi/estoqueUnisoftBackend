import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { UserModel } from "../database/model/UserModel";
import bcrypt from "bcrypt";

import HandleEmailService from "../services/email/HandleEmailService";
import { passProvisional } from "../services/email/generatePassword";

class userController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    HandleEmailService.runPassInitial(email, name, passProvisional);

    const passwordCript = await bcrypt.hash(passProvisional, 10);

    UserModel.create({
      id: uuidV4(),
      name,
      email,
      password: passwordCript,
      updatePass: false,
      lastAcess: new Date(),
    });

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  }

  async findAll(req: Request, res: Response) {
    const allUsers = await UserModel.findAll();

    return res.status(200).json(allUsers);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user: any = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user: any = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    
    const deleteUser = await UserModel.destroy({
      where: {
        id: id,
      },
    });

    if (!deleteUser) {
      return res.status(404).json({ message: "Usuário não cadastrado" });
    } else {

      HandleEmailService.runInfoDeleteAccount(user)

      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await UserModel.update(req.body, {
      where: {
        id: id,
      },
    });

    const user: any = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Usuário Atualizado com sucesso", user, auth: true });
  }
}

export default new userController();
