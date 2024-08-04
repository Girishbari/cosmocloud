import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import { newEmployeeObject } from "../constant";

export default function CreateEmployee() {
  const toast = useToast();
  const [formData, setformData] = useState<newEmployeeObject>({
    name: "",
    contacts: {
      email: "",
      phone_no: "",
    },
    address: {
      line: "",
      country: "",
      city: "",
      zipcode: "",
    },
  });

  const [isErrorformData, setIsErrorformData] = useState({
    isError_name: false,
    isError_email: false,
    isError_phone_no: false,
    isError_line: false,
    isError_country: false,
    isError_city: false,
    isError_zipcode: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      if (!formData.name || typeof formData.name !== "string") {
        throw new Error("Name is required and must be a string.");
      }
      if (
        !formData.contacts.email ||
        typeof formData.contacts.email !== "string"
      ) {
        throw new Error("Email is required and must be a string.");
      }
      if (
        !formData.contacts.phone_no ||
        !/^\d+$/.test(formData.contacts.phone_no)
      ) {
        throw new Error("Phone number is required and must be numeric.");
      }
      if (!formData.address.line || typeof formData.address.line !== "string") {
        throw new Error("Address line is required and must be a string.");
      }
      if (
        !formData.address.country ||
        typeof formData.address.country !== "string"
      ) {
        throw new Error("Country is required and must be a string.");
      }
      if (!formData.address.city || typeof formData.address.city !== "string") {
        throw new Error("City is required and must be a string.");
      }
      if (
        !formData.address.zipcode ||
        !/^\d+$/.test(formData.address.zipcode)
      ) {
        throw new Error("Zipcode is required and must be numeric.");
      }
      const response = await fetch(
        "https://free-ap-south-1.cosmocloud.io/development/api/employee",
        {
          method: "POST",
          headers: {
            projectId: "66ae4d52d09e8cc8a8afd410",
            environmentId: "66ae4d52d09e8cc8a8afd411",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("submit formData handler", data);
      if (data.id) {
        toast({
          title: `Employee added`,
          variant: "solid",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("fetch emp error", error);
      toast({
        title: `${error}`,
        variant: "solid",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      paddingBottom={{ base: "480px", md: "8rem" }}
      marginTop={"100px"}
      minW="50%"
    >
      <CardHeader>
        <Heading size="md">Add new Employee</Heading>
      </CardHeader>

      <CardBody>
        <Grid
          h="200px"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={2}
        >
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl isInvalid={isErrorformData.isError_name}>
              <FormLabel>
                Name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    name: e.currentTarget.value,
                  });

                  setIsErrorformData({
                    ...isErrorformData,
                    isError_name: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_name && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl isInvalid={isErrorformData.isError_email}>
              <FormLabel>
                Email <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.contacts.email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    contacts: {
                      ...formData.contacts,
                      email: e.currentTarget.value,
                    },
                  });
                  setIsErrorformData({
                    ...isErrorformData,
                    isError_email: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_email && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl isInvalid={isErrorformData.isError_phone_no}>
              <FormLabel>
                Phone number <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="phone_no"
                value={formData.contacts.phone_no}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    contacts: {
                      ...formData.contacts,
                      phone_no: e.currentTarget.value,
                    },
                  });
                  setIsErrorformData({
                    ...isErrorformData,
                    isError_phone_no: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_phone_no && (
                <FormErrorMessage>Phone number is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 3 }}>
            <FormControl isInvalid={isErrorformData.isError_line}>
              <FormLabel>
                Address line <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Textarea
                value={formData.address.line}
                name="line"
                rows={2}
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  setformData({
                    ...formData,
                    address: {
                      ...formData.address,
                      line: e.currentTarget.value,
                    },
                  });
                  setIsErrorformData({
                    ...isErrorformData,
                    isError_line: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_line && (
                <FormErrorMessage>Address is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>

          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl isInvalid={isErrorformData.isError_city}>
              <FormLabel>
                City <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    address: {
                      ...formData.address,
                      city: e.currentTarget.value,
                    },
                  });
                  setIsErrorformData({
                    ...isErrorformData,
                    isError_city: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_city && (
                <FormErrorMessage>City is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl isInvalid={isErrorformData.isError_zipcode}>
              <FormLabel>
                Zipcode <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="zipcode"
                value={formData.address.zipcode}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    address: {
                      ...formData.address,
                      zipcode: e.currentTarget.value,
                    },
                  });
                  setIsErrorformData({
                    ...isErrorformData,
                    isError_zipcode: e.currentTarget.value === "",
                  });
                }}
              />
              {isErrorformData.isError_zipcode && (
                <FormErrorMessage>Zipcode is required.</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.address.country}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setformData({
                    ...formData,
                    address: {
                      ...formData.address,
                      country: e.currentTarget.value,
                    },
                  });
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1} colEnd={4} mt={2}>
            <ButtonGroup variant="outline" spacing="6" flex={1}>
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isLoading={loading}
                loadingText="Loading"
                variant="solid"
                spinnerPlacement="start"
              >
                Save
              </Button>
              <Button>Cancel</Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
