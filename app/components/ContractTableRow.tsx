import { Button, Td, Tr } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  contractAddress: string;
};

export default function ContractTableRow({ contractAddress }: Props) {
  const router = useRouter();

  return (
    <Tr>
      <Td>{contractAddress}</Td>
      <Td>
        <Button
          colorScheme="twitter"
          onClick={() => router.push(`/contract/${contractAddress}`)}
        >
          Manage
        </Button>
      </Td>
    </Tr>
  );
}
