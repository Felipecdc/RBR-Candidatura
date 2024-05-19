"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [jobTitle, setJobTittle] = useState<string>();
  const [department, setDepartment] = useState<string>();

  const router = useRouter();

  const handleCreateClick = async () => {
    if (
      firstName === "" ||
      lastName === "" ||
      jobTitle === "" ||
      department === ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const data = { firstName, lastName, jobTitle, department };
      const response = await fetch("http://localhost:3333/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      setFirstName("");
      setLastName("");
      setJobTittle("");
      setDepartment("");

      router.back();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert(
        "Erro ao cadastrar usuário. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center w-full mx-auto p-5 max-w-[1000px]">
      <Box className="flex w-full h-14 items-center px-5 bg-cyan-900">
        <Link href={"/"} className="text-white text-2xl font-bold">
          Gerenciando
        </Link>
      </Box>{" "}
      <Box className="flex w-[400px] flex-col mt-8 p-2 border rounded-lg shadow-md gap-5">
        <FormControl id="firstName" isRequired>
          <FormLabel>Primeiro Nome</FormLabel>
          <Input
            placeholder="Digite o primeiro nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Último Nome</FormLabel>
          <Input
            placeholder="Digite o último nome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl id="jobTitle" isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input
            placeholder="Digite o cargo"
            value={jobTitle}
            onChange={(e) => setJobTittle(e.target.value)}
          />
        </FormControl>
        <FormControl id="department" isRequired>
          <FormLabel>Departamento</FormLabel>
          <Select
            placeholder="Selecione o departamento"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="CFC">CFC</option>
            <option value="Back end">Back end</option>
            <option value="Front end">Front end</option>
            <option value="Tool crib">Tool crib</option>
            <option value="CCB">CCB</option>
            <option value="RH">RH</option>
          </Select>
        </FormControl>
        <Button mt={8} colorScheme="blue" onClick={handleCreateClick}>
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEmployee;
