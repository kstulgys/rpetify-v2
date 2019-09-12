import React from "react";
import { Box } from "@chakra-ui/core";

export default function Select({ onChange, items, ...restProps }) {
  return (
    <Box
      {...restProps}
      rounded="lg"
      as="select"
      h="12"
      bg="gray.300"
      w="full"
      fontWeight="inherit"
      style={{ textAlignLast: "center" }}
    >
      {items.map((item, i) => {
        return (
          <Box onChange={onChange} as="option" w="full">
            {item}
          </Box>
        );
      })}
    </Box>
  );
}
