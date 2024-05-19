"use client";

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EmployeeProps } from "../page";
import Link from "next/link";
import { useState } from "react";

interface EmployeePageProps {
  employees: EmployeeProps[];
}

const CustomTable = ({ employees }: EmployeePageProps) => {
  const [selectedEmployeeId, setSelectedEmployeeId] =
    useState<EmployeeProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleDeleteClick = (Iemployee: EmployeeProps) => {
    setSelectedEmployeeId(Iemployee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/employees/${selectedEmployeeId?.id}`,
        {
          method: "DELETE", // Método DELETE para excluir o usuário
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <Box className="w-full overflow-x-auto">
      {!isMobile ? (
        <Table className="min-w-full border-collapse bg-slate-200">
          <Thead>
            <Tr>
              <Th className="border px-4 py-2">Nome</Th>
              <Th className="border px-4 py-2">Cargo</Th>
              <Th className="border px-4 py-2">Departamento</Th>
              <Th className="border px-4 py-2">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee, index) => (
              <Tr key={index}>
                <Td className="border px-4 py-2">{employee.fullname}</Td>
                <Td className="border px-4 py-2">{employee.jobTitle}</Td>
                <Td className="border px-4 py-2">{employee.department}</Td>
                <Td className="border px-4 py-2">
                  <div className="flex items-center justify-center">
                    <Button colorScheme="blue" size="sm" mr={2}>
                      <Link href={`/update/${employee.id}`}>Editar</Link>
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteClick(employee)}
                    >
                      Excluir
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        employees.map((employee, index) => (
          <Box key={index} className="mb-4 p-4 border rounded-md bg-slate-200">
            <Flex direction="column">
              <Box>
                <strong>Nome:</strong> {employee.fullname}
              </Box>
              <Box>
                <strong>Cargo:</strong> {employee.jobTitle}
              </Box>
              <Box>
                <strong>Departamento:</strong> {employee.department}
              </Box>
              <Box mt={2}>
                <Button colorScheme="blue" size="sm" mr={2}>
                  <Link href={`/update/${employee.id}`}>Editar</Link>
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteClick(employee)}
                >
                  Excluir
                </Button>
              </Box>
            </Flex>
          </Box>
        ))
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay>
          <ModalContent style={{ width: "400px" }}>
            <ModalHeader>Confirmação de Exclusão</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col">
              <span className="line-clamp-1">
                <strong>Nome: </strong>
                {selectedEmployeeId?.fullname}
              </span>
              <span>
                <strong>Cargo: </strong>
                {selectedEmployeeId?.jobTitle}
              </span>
              <span>
                <strong>Departamento: </strong>
                {selectedEmployeeId?.department}
              </span>
              <span>
                <strong>Admissão: </strong>
                {selectedEmployeeId?.hireDate
                  ? `${selectedEmployeeId.hireDate}`
                  : ""}
              </span>
            </ModalBody>
            <ModalFooter className="flex gap-3">
              <Button variant="ghost" onClick={handleConfirmDelete}>
                Confirmar
              </Button>
              <Button
                bg="#f0655b"
                color="white"
                _hover={{ bg: "#fccbc7" }}
                variant="solid"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default CustomTable;
