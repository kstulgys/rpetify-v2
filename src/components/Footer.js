import React, { useState, useEffect } from "react";
import { useApp } from "context";
import { percentageLookup } from "utils";
import WarmupModal from "WarmupModal";
import WarksetModal from "WorksetModal";
import { getOneRM } from "utils";
import Select from "./Select";
import Modal from "./Modal";
import { Box, Text, Flex, Stack, Icon, Grid } from "@chakra-ui/core";

export default function Footer() {
  const { handleAddLift } = useApp();
  return (
    <Flex
      align="center"
      justify="space-evenly"
      position="sticky"
      bottom="0"
      h="16"
      bg="gray.900"
    >
      <IconContainer type="settings" />
      <IconContainer type="add" onClick={handleAddLift} />
    </Flex>
  );
}

function IconContainer({ type, onClick }) {
  return (
    <Icon
      name={type}
      color="gray.300"
      size="10"
      onClick={onClick}
      cursor="pointer"
    />
  );
}
