import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import SchoolAdvertShare from "../SchoolAdvertShare/SchoolAdvertShare";

const AdvertShareModal = ({updateModalOpened, setUpdateModalOpened, data}) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={updateModalOpened}
      onClose={() => setUpdateModalOpened(false)}
    >
      <SchoolAdvertShare location={"update"} setUpdateModalOpened={setUpdateModalOpened} data={data}/>
    </Modal>
  );
};

export default AdvertShareModal;
