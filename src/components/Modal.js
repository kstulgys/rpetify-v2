import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Stack,
  Icon,
  Grid,
  Button,
  Modal as ChakraModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/core";

export default function Modal({ trigger, children, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <Box {...props} cursor="pointer" onClick={open} textTransform="uppercase">
        {trigger}
      </Box>
      <ChakraModal isOpen={isOpen} onClose={close}>
        {children}
      </ChakraModal>
    </>
  );
}
