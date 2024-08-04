import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  AbsoluteCenter,
  Container,
  useToast,
  Skeleton,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import { employeeObject } from "../constant";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function ListEmployee() {
  const toast = useToast();
  const [employees, setEmployees] = useState<employeeObject[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNoEmployeesMessage, setShowNoEmployeesMessage] =
    useState<boolean>(false);

  const fetchEmployees = useCallback(
    async function () {
      try {
        setLoading(true);
        const response = await fetch(
          "https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=10&offset=0",
          {
            method: "GET",
            headers: {
              projectId: "66ae4d52d09e8cc8a8afd410",
              environmentId: "66ae4d52d09e8cc8a8afd411",
            },
          }
        );
        const data = await response.json();
        if (data.data <= 0) {
          throw new Error("There seems no employee");
          return;
        }
        setEmployees(data.data);
      } catch (error) {
        console.log("fetch emp error", error);
        toast({
          title: `${error}`,
          variant: "solid",
          status: "info",
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
        {
          method: "DELETE",
          headers: {
            projectId: "66ae4d52d09e8cc8a8afd410",
            environmentId: "66ae4d52d09e8cc8a8afd411",
          },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (data.message) {
        toast({
          title: `Employee delete`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
      }
      console.log("delete employee handler", data);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.log("delete employee handle", error);
      toast({
        title: `${error}`,
        variant: "solid",
        status: "info",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && employees.length === 0) {
        setShowNoEmployeesMessage(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading, employees]);

  if (loading) {
    return (
      <Container
        mt="5rem"
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        marginLeft={{ base: "5rem", xs: "10" }}
      >
        <Table
          size={"lg"}
          colorScheme="black"
          minWidth={"40px"}
          width={"800px"}
        >
          <Thead>
            <Tr>
              <Th>Employee Id</Th>
              <Th>Employee Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            <tr>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
            </tr>
            <tr>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
              <td>
                <Box paddingBlock={"20px"} paddingLeft={"35px"}>
                  <Skeleton>
                    <div>contents wrapped</div>
                  </Skeleton>
                </Box>
              </td>
            </tr>
          </Tbody>
        </Table>
      </Container>
    );
  }

  if (showNoEmployeesMessage) {
    return (
      <Box flex={1} placeItems={"center"}>
        <AbsoluteCenter p="4" color="white" axis="both">
          <Heading as="h4" size="xl" noOfLines={2} color={"teal.400"}>
            There are no Employee Currently 🤔
          </Heading>
        </AbsoluteCenter>
      </Box>
    );
  }

  return (
    <Container
      size={"md"}
      mt="5rem"
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Table size={"lg"} colorScheme="black" minWidth={"40px"} width={"800px"}>
        <Thead>
          <Tr>
            <Th>Employee Id</Th>
            <Th>Employee Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees?.length > 0 &&
            employees.map((emp, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <ChakraLink as={ReactRouterLink} to={`about/${emp._id}`}>
                      {emp._id}
                    </ChakraLink>
                  </Td>
                  <Td>{emp.name}</Td>
                  <Td>
                    {" "}
                    <IconButton
                      isRound={true}
                      size="lg"
                      aria-label="dropdown"
                      icon={<MdOutlineDeleteForever size={20} />}
                      variant="ghost"
                      onClick={() => handleDelete(emp._id)}
                    />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Container>
  );
}
