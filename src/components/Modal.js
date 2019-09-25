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
      <ChakraModal
        mt="1"
        bg="gray.700"
        top="0"
        style={{ maxHeight: `calc(100vh - 4rem - 56px)` }}
        isOpen={isOpen}
        onClose={close}
      >
        <ModalBody p="2" overflowY="auto">
          {children}
        </ModalBody>
      </ChakraModal>
    </>
  );
}
