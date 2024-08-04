import {
  Box,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { Link as ChakraLink } from "@chakra-ui/react";

import { lazy, Suspense } from "react";

import ThemeToggle from "./ThemeToggle";

import { Routes, Route } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

const AboutEmployee = lazy(() => import("./components/AboutEmployee"));
const CreateEmployee = lazy(() => import("./components/CreateEmployee"));
const ListEmployee = lazy(() => import("./components/ListEmployee"));
const ErrorPage = lazy(() => import("./components/ErrorPage"));

type ListItem = {
  text?: string;
  icon: React.ElementType;
  Link: string;
};

const listItems: ListItem[] = [
  {
    text: "Home",
    icon: AiOutlineHome,
    Link: "/",
  },
  {
    text: "Create Employee",
    icon: AiOutlineSetting,
    Link: "create",
  },
];

export default function Layout() {
  return (
    <>
      {/* Header */}
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="space-between"
        py="2.5"
        pr="2.5"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="md"
      >
        <HStack spacing={2}>
          <IconButton
            _active="none"
            _focus="none"
            _hover="none"
            fontSize="18px"
            variant="ghost"
            icon={<BiMenu />}
            aria-label="open menu"
          />
          <Heading as="h1" size="md">
            {"Logo"}
          </Heading>
        </HStack>
        <HStack spacing="3">
          <ThemeToggle />
        </HStack>
      </Flex>
      <HStack align="start" spacing={0}>
        {/* sidebar */}
        <Box
          as="aside"
          minH="90vh"
          w={72}
          borderRight="2px"
          borderColor={useColorModeValue("gray.200", "gray.900")}
          transition="width 0.25s ease"
          position="fixed"
          top="16"
          bottom="0"
          left="0"
          bg={useColorModeValue("white", "gray.800")}
          zIndex="1"
          hideBelow={"md"}
        >
          <List spacing={0} p="0.5">
            {listItems.map((item, index) => (
              <ListElement
                key={index}
                icon={item.icon}
                text={item.text}
                Link={item.Link}
              />
            ))}
          </List>
        </Box>
        <Flex
          as="main"
          w="full"
          minH="90vh"
          align="center"
          justify="center"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Box minH={"100vh"}>
            <Suspense
              fallback={<CircularProgress isIndeterminate color="green.300" />}
            >
              <Routes>
                <Route index element={<ListEmployee />} />
                <Route path="about/:id" element={<AboutEmployee />} />
                <Route path="create" element={<CreateEmployee />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </Box>
        </Flex>
      </HStack>
    </>
  );
}

const ListElement = ({ icon, text, Link }: ListItem) => {
  return (
    <ListItem
      as={HStack}
      spacing={0}
      h="10"
      pl="2.5"
      cursor="pointer"
      _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
      rounded="md"
      _activeLink={Link}
    >
      <ListIcon boxSize={5} as={icon} />; ;
      <ChakraLink as={ReactRouterLink} to={Link}>
        {text && <Text>{text}</Text>}
      </ChakraLink>
    </ListItem>
  );
};
