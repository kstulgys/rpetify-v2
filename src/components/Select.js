import React from "react";
import { Box } from "@chakra-ui/core";

export default function Select({ items, ...restProps }) {
  return (
    <Box
      {...restProps}
      color="gray.800"
      rounded="md"
      as="select"
      h="10"
      bg="gray.200"
      w="full"
      fontWeight="inherit"
      style={{ textAlignLast: "center" }}
    >
      {items.map((item, i) => {
        return (
          <Box key={i} value={item} as="option" w="full">
            {item}
          </Box>
        );
      })}
    </Box>
  );
}
