import { Request, Response } from "express";
import employee, { EmployeeProps } from "../../models/employee";

export type CustomEmployeeProps = Partial<
  Pick<EmployeeProps, "firstName" | "lastName" | "jobTitle" | "department">
>;

class UpdateEmployeeController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstName, lastName, jobTitle, department }: CustomEmployeeProps =
        req.body;

      // Verifica se o ID está definido e é uma string válida
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "ID inválido" });
      }

      // Verifica se o funcionário existe com o ID fornecido
      const existingEmployee = await employee.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      // Atualiza apenas os campos fornecidos no corpo da solicitação
      const updateFields: Partial<EmployeeProps> = {};
      if (firstName) updateFields.firstName = firstName;
      if (lastName) updateFields.lastName = lastName;
      if (firstName || lastName) {
        const fullname = `${firstName} ${lastName}`;
        updateFields.fullname = fullname;
      }
      if (jobTitle) updateFields.jobTitle = jobTitle;
      if (department) updateFields.department = department;

      const updateEmployee = await employee.findByIdAndUpdate(
        id,
        updateFields,
        { new: true }
      );

      res.status(200).json(updateEmployee);
    } catch (error) {
      console.log("Erro ao encontrar employees: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default UpdateEmployeeController;
