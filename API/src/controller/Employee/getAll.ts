import { Request, Response } from "express";
import employee, { EmployeeProps } from "../../models/employee";
import { format } from "date-fns";

// Props customizadas de EmployeeProps
export type CustomEmployeeProps = Pick<
  EmployeeProps,
  "firstName" | "jobTitle" | "department"
>;

class GetAllEmployeesController {
  async handle(req: Request, res: Response) {
    try {
      const { firstName, jobTitle, department } = req.query;

      //   Criando logica de filtro para busca personalizada
      //   Caso filter igual a any, return all employees
      const filter: Partial<CustomEmployeeProps> = {};
      if (firstName) filter.firstName = firstName as string;
      if (jobTitle) filter.jobTitle = jobTitle as string;
      if (department) filter.department = department as string;

      // Get employee basiado em filter
      const getEmployees = await employee.find(filter);

      // Caso de unknown
      if (!getEmployees) {
        return res.status(500).json({ message: "Erro ao encontrar employees" });
      }

      // Retornando informacoes especificas dos employees
      const employeeResponse = getEmployees.map((data) => {
        return {
          id: data.id,
          fullname: data.fullname,
          jobTitle: data.jobTitle,
          department: data.department,
          hireDate: format(new Date(data.hireDate), "dd/MM/yyyy HH:mm:ss"),
        };
      });

      res.status(200).json(employeeResponse);
    } catch (error) {
      console.log("Erro ao encontrar employees: ", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default GetAllEmployeesController;
