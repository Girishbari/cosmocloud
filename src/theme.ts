import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/noto-sans";

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans Variable', sans-serif`,
    body: `'Noto Sans Variable', sans-serif`,
  },
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1140px",
  },
});

export default theme;
