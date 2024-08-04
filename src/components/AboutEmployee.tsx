import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  useToast,
  HStack,
  ListIcon,
  ListItem,
  List,
  Skeleton,
} from "@chakra-ui/react";

import { useCallback, useEffect, useState } from "react";

import { IoIosContact } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import { newEmployeeObject } from "../constant";

export default function AboutEmployee() {
  const id = useParams();
  const toast = useToast();

  const [employeeData, setEmployeeData] = useState<newEmployeeObject>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEmployeeDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id.id}`,
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
        throw new Error("Cant fetch details at a moment");
        return;
      }
      console.log("fetch employee detail handler", data);
      setEmployeeData(data);
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
  }, [id, toast]);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [fetchEmployeeDetails]);

  return (
    <Card
      marginTop={"100px"}
      minW="50%"
      width="fit-content"
      variant="outline"
      padding={2}
      marginInline={{ base: "1rem", lg: "5rem" }}
      flex={1}
      flexDirection={{ base: "column", lg: "row" }}
      placeContent={"center"}
      alignItems={"center"}
      boxShadow="50px"
      border="1px solid gray.50"
    >
      <CardHeader>
        <Image
          objectFit={"cover"}
          borderRadius="10px"
          maxW={{ base: "100%", md: "400px", lg: "200px" }}
          maxH={{ base: "100%", sm: "180px" }}
          src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?b=1&s=612x612&w=0&k=20&c=A87DXDjXjoyJWkWIlLfhJYsjqKtTyuvhOg14QY4SeMQ="
          alt="Caffe Latte"
        />
      </CardHeader>
      {loading ? (
        <CardBody paddingInline="0.5rem">
          <Skeleton width="fit-content" h={6}>
            <div>Lorem, ipsum dolor sit amet</div>
          </Skeleton>
          <Skeleton mt={3} width="fit-content" h={4}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit </div>
          </Skeleton>
          <Skeleton mt={3} width="fit-content" h={4}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit </div>
          </Skeleton>{" "}
          <Skeleton mt={3} width="fit-content" h={4}>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit </div>
          </Skeleton>
        </CardBody>
      ) : (
        employeeData && (
          <CardBody paddingInline="2rem">
            <Heading size={{ base: "2xl", md: "lg" }}>
              {employeeData?.name}
            </Heading>
            <Text fontSize={"medium"} noOfLines={4}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </Text>
            <List spacing={3} mt={2}>
              <ListItem
                as={HStack}
                spacing={0}
                h="4"
                cursor="pointer"
                rounded="md"
              >
                <ListIcon boxSize={5} as={IoIosContact} />
                <Text fontSize="sm" fontWeight={"light"} letterSpacing={1}>
                  {employeeData?.contacts.phone_no}
                </Text>
                <ListItem
                  as={HStack}
                  spacing={0}
                  h="4"
                  cursor="pointer"
                  rounded="md"
                  ml={5}
                >
                  <ListIcon boxSize={5} as={MdOutlineAlternateEmail} />
                  <Text fontSize="sm" fontWeight={"light"} letterSpacing={1}>
                    {employeeData?.contacts.email}
                  </Text>
                </ListItem>
              </ListItem>
              <ListItem
                as={HStack}
                spacing={0}
                h="4"
                cursor="pointer"
                rounded="md"
              >
                <ListIcon boxSize={5} as={IoLocationSharp} />
                <Text fontSize="sm" fontWeight={"light"} letterSpacing={1}>
                  {employeeData?.address.line} {", "}{" "}
                  {employeeData?.address.city}
                  {", "}
                  {employeeData?.address.zipcode}
                </Text>
              </ListItem>
            </List>
          </CardBody>
        )
      )}
    </Card>
  );
}
