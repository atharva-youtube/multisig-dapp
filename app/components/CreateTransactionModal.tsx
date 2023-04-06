import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { toWei, useContract, useContractWrite } from "@thirdweb-dev/react";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
};

export default function CreateTransactionModal({
  isOpen,
  onClose,
  contractAddress,
}: Props) {
  const toast = useToast();

  const [destination, setDestination] = useState<string>("");
  const [value, setValue] = useState<string>("0");
  const [data, setData] = useState<string>("0x");

  const { contract } = useContract(contractAddress, "custom");
  const { mutateAsync: submitTransaction, isLoading: isSubmitting } =
    useContractWrite(contract, "submitTransaction");

  const createTxn = async () => {
    try {
      await submitTransaction({
        args: [destination, toWei(value), data],
      });
      toast({
        title: "Success",
        description: "Transaction created successfully",
        status: "success",
      });
      setDestination("");
      setValue("0");
      setData("0x");
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        // @ts-ignore
        description: err.reason,
        status: "error",
      });
      console.error(err);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Enter the following details and click on <b>Create</b> to create a
            transaction in the contract.
          </Text>
          <Flex direction="column" gap={5} mt={5}>
            <FormControl>
              <FormLabel>Destination Address</FormLabel>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Value (in MATIC)</FormLabel>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Transaction Data</FormLabel>
              <Textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button onClick={onClose} isDisabled={isSubmitting}>
            Close
          </Button>
          <Button
            onClick={createTxn}
            colorScheme="twitter"
            isDisabled={isSubmitting}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
