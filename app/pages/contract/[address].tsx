import CreateTransactionModal from "@/components/CreateTransactionModal";
import Navbar from "@/components/Navbar";
import TransactionTableRow from "@/components/TransactionTableRow";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useBalance,
  useContract,
  useContractEvents,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function ContractPage() {
  const router = useRouter();
  const { address } = router.query;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    contract,
    isLoading: isContractLoading,
    error: contractError,
  } = useContract(address as string, "custom");
  const {
    data: owners,
    isLoading: isOwnersLoading,
    error: ownersError,
  } = useContractRead(contract, "getOwners");
  const {
    data: requiredSignatures,
    isLoading: isSignaturesLoading,
    error: signaturesError,
  } = useContractRead(contract, "getRequiredSignatures");
  const { data: transactions, isLoading: isTransactionsLoading } =
    useContractEvents(contract, "TransactionCreated", {
      queryFilter: {
        order: "desc",
      },
      subscribe: true,
    });

  return (
    <>
      <Head>
        <title>Contract - multi-sig dApp</title>
      </Head>

      <CreateTransactionModal
        contractAddress={address as string}
        onClose={onClose}
        isOpen={isOpen}
      />

      <Navbar />

      <Box mt={10} maxW="6xl" w="full" mx="auto">
        <Stat border="1px" rounded="xl" p="7" borderColor="gray.400">
          <StatLabel>Contract Address</StatLabel>
          <StatNumber>{address}</StatNumber>
        </Stat>
      </Box>

      <Flex mt={5} gap={5} maxW="6xl" w="full" mx="auto">
        <Stat border="1px" rounded="xl" p="7" borderColor="gray.400">
          <StatLabel>Number of owners</StatLabel>
          <StatNumber>
            {isOwnersLoading ? <Skeleton>10</Skeleton> : owners?.length}
          </StatNumber>
        </Stat>
        <Stat border="1px" rounded="xl" p="7" borderColor="gray.400">
          <StatLabel>Signatures required</StatLabel>
          <StatNumber>
            {isSignaturesLoading ? (
              <Skeleton>10</Skeleton>
            ) : (
              requiredSignatures?.toString()
            )}
          </StatNumber>
        </Stat>
      </Flex>

      <Flex
        mt="7"
        maxW="6xl"
        mx="auto"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize="3xl">
          Transactions
        </Text>
        <Button onClick={onOpen} colorScheme="twitter">
          Create Transaction
        </Button>
      </Flex>

      <Table mt="7" maxW="6xl" mx="auto" w="full">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Destination</Th>
            <Th>Value</Th>
            <Th>Data</Th>
            <Th>Signatures</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions?.map((transaction) => (
            <TransactionTableRow
              contractAddress={address as string}
              id={transaction.data.transactionId}
              key={transaction.data.transactionId}
            />
          ))}
        </Tbody>
      </Table>
    </>
  );
}
