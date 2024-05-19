import { Router } from "express";

import CreateEmployeeController from "./controller/Employee/create";
import GetAllEmployeesController from "./controller/Employee/getAll";
import DeleteEmployeeController from "./controller/Employee/delete";
import FindEmployeesByIdController from "./controller/Employee/findById";
import UpdateEmployeeController from "./controller/Employee/update";

const router = Router();

router.get("/employees", new GetAllEmployeesController().handle);
router.post("/employees", new CreateEmployeeController().handle);
router.delete("/employees/:id", new DeleteEmployeeController().handle);
router.get("/employees/:id", new FindEmployeesByIdController().handle);
router.patch("/employees/:id", new UpdateEmployeeController().handle);

export { router };
