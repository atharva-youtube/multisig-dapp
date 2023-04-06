import ContractTableRow from "@/components/ContractTableRow";
import DeployModal from "@/components/DeployModal";
import Navbar from "@/components/Navbar";
import { FACTORY_ADDRESS } from "@/const/contracts";
import {
  Button,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Head from "next/head";
import React from "react";

export default function Dashboard() {
  const address = useAddress();
  const { contract } = useContract(FACTORY_ADDRESS, "custom");
  const { data: deployedContracts, isLoading: isDeployedContractsLoading } =
    useContractRead(contract, "getDeployed", [address]);
  const { data: countDeployed } = useContractRead(contract, "countDeployed", [
    address,
  ]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Head>
        <title>Dashboard - multi-sig dApp</title>
      </Head>

      <Navbar />

      <DeployModal isOpen={isOpen} onClose={onClose} />

      <Flex
        mt="7"
        maxW="6xl"
        mx="auto"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize="3xl">
          Deployed contracts
        </Text>
        <Button colorScheme="twitter" onClick={onOpen}>
          Deploy
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha" maxW="6xl" w="full" mx="auto" mt={10}>
        <Thead>
          <Tr>
            <Th>Contract Address</Th>
            <Th>Manage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isDeployedContractsLoading && (
            <Tr>
              <Td>
                <Skeleton>0x12345678901234567890</Skeleton>
              </Td>
              <Td>
                <Skeleton>Manage</Skeleton>
              </Td>
            </Tr>
          )}
          {countDeployed == 0 && (
            <Tr>
              <Td colSpan={2}>No contracts deployed.</Td>
            </Tr>
          )}
          {deployedContracts?.map((contractAddress: string) => (
            <ContractTableRow
              contractAddress={contractAddress}
              key={contractAddress}
            />
          ))}
        </Tbody>
      </Table>
    </>
  );
}
