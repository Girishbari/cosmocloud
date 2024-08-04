import { Box, AbsoluteCenter, Heading } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Box flex={1} placeItems={"center"}>
      <AbsoluteCenter p="4" color="white" axis="both">
        <Heading as="h4" size="xl" noOfLines={2} color={"teal.500"}>
          Nothing here 👀 404
        </Heading>
      </AbsoluteCenter>
    </Box>
  );
}
