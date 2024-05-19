import { Request, Response } from "express";
import employee, { EmployeeProps } from "../../models/employee";
import { format } from "date-fns";

// Props customizadas de EmployeeProps
export type CustomEmployeeProps = Pick<
  EmployeeProps,
  "firstName" | "lastName" | "jobTitle" | "department"
>;

class CreateEmployeeController {
  async handle(req: Request, res: Response) {
    try {
      const { firstName, lastName, jobTitle, department }: CustomEmployeeProps =
        req.body;

      // Verifica se todos os campos obrigatórios foram fornecidos
      if (!firstName || !lastName || !jobTitle || !department) {
        return res.status(400).json({
          message: "Por favor, forneça todos os campos obrigatórios.",
        });
      }

      const fullname = `${firstName} ${lastName}`;

      // Buscando employee existente
      const existentEmployee = await employee.findOne({ fullname });

      // Verificando se já existe um funcionário com o mesmo nome
      if (existentEmployee) {
        return res.status(400).json({ message: "Funcionário já existente!" });
      }

      // Crinado new Date com formate ISO 8601
      const hireDate = new Date().toISOString();

      const newEmployee = await employee.create({
        firstName,
        lastName,
        fullname,
        jobTitle,
        department,
        hireDate,
      });

      // Convertendo a strinf ISO 8601 em foramto Date
      const hireDateObject = new Date(newEmployee.hireDate);

      // Formata o retorno da data para o formato brasileiro (dd/MM/yyyy HH:mm:ss)
      const formattedDate = format(hireDateObject, "dd/MM/yyyy HH:mm:ss");

      // Quais campos retornar no objeto de resposta
      const employeeResponse = {
        fullname: newEmployee.fullname,
        jobTitle: newEmployee.jobTitle,
        department: newEmployee.department,
        hireDate: formattedDate,
      };

      res.status(201).json(employeeResponse);
    } catch (error) {
      console.error("Erro ao criar employee: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default CreateEmployeeController;
