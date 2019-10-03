import React from "react";
import { addWorkout, removeWorkout } from "features/workouts/slice";
import { useSelector, useDispatch } from "react-redux";
import Modal from "components/Modal";
import { Flex, Icon } from "@chakra-ui/core";
import SettingsContent from "components/settings-content";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <Flex
      align="center"
      justify="space-evenly"
      position="sticky"
      bottom="0"
      h="16"
      bg="gray.900"
    >
      <Modal trigger={<IconContainer type="settings" />}>
        <SettingsContent />
      </Modal>
      <IconContainer type="add" onClick={() => dispatch(addWorkout())} />
    </Flex>
  );
}

function IconContainer({ type, onClick }) {
  return (
    <Icon
      name={type}
      color="yellow.500"
      size="10"
      onClick={onClick}
      cursor="pointer"
    />
  );
}
