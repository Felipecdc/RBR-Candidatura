"use client";

import { Box, Button, Input, Select } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomTable from "./_components/custom-Table";

export interface EmployeeProps {
  id: string;
  fullname: string;
  jobTitle: string;
  department: string;
  hireDate: Date;
}

export default function Home() {
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3333/employees", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        }
      } catch (error) {
        console.log("Failed to fetch data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchValue = filterValue.toLowerCase();
    switch (filterType) {
      case "name":
        return employee.fullname.toLowerCase().includes(searchValue);
      case "jobTitle":
        return employee.jobTitle.toLowerCase().includes(searchValue);
      case "department":
        return employee.department.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  if (loading) return <div>Loading...</div>;

  return (
    <Box className="flex flex-col items-center justify-center w-full mx-auto p-5 max-w-[1000px]">
      <Box className="flex w-full h-14 items-center px-5 bg-cyan-900">
        <Link href={"/"} className="text-white text-2xl font-bold">
          Gerenciando
        </Link>
      </Box>{" "}
      <div className="w-full py-2">
        <div className="flex w-full items-center justify-between">
          <Box className="flex items-center">
            <Input
              placeholder={`Pesquisar por ${filterType}`}
              value={filterValue}
              onChange={handleInputChange}
            />
            <Select
              value={filterType}
              onChange={handleFilterChange}
              mr={4}
              ml={1}
              minWidth={140}
              width={140}
              fontSize="sm"
            >
              <option value="name">Nome</option>
              <option value="jobTitle">Cargo</option>
              <option value="department">Departamento</option>
            </Select>
          </Box>
          <Box>
            <Button>
              <Link href={"/new"}>Novo</Link>
            </Button>
          </Box>
        </div>
      </div>
      <div className=" w-full py-2">
        <CustomTable employees={filteredEmployees} />
      </div>
    </Box>
  );
}
