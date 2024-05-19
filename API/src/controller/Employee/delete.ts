import { Request, Response } from "express";
import employee from "../../models/employee";

class DeleteEmployeeController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Verifica se o ID está definido e é uma string válida
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      // Exclui o funcionário pelo ID
      const deleteResult = await employee.findByIdAndDelete(id);

      // Verifica se o funcionário foi encontrado e excluído com sucesso
      if (!deleteResult) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      res.status(200).json(deleteResult);
    } catch (error) {
      console.error("Erro ao deletar employee: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default DeleteEmployeeController;
