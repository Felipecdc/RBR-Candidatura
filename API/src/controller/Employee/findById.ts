import { Request, Response } from "express";
import employee from "../../models/employee";
import { format } from "date-fns";

class FindEmployeesByIdController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Verifica se o ID está definido e é uma string válida
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      const getEmployee = await employee.findById(id);

      // Verifica se o funcionário foi encontrado
      if (!getEmployee) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      res.status(200).json(getEmployee);
    } catch (error) {
      console.log("Erro ao encontrar employees: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default FindEmployeesByIdController;
