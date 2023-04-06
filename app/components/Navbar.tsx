import { Box, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import { Link } from "@chakra-ui/next-js";

export default function Navbar() {
  return (
    <Box w="full" borderBottomWidth={1}>
      <Flex
        w="full"
        maxW="6xl"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        py="3"
      >
        <Flex gap="7" alignItems="center">
          <Text fontWeight="bold" fontSize="2xl">
            Multisig
          </Text>
          <Flex gap="5" alignItems="center">
            <Link href="/" fontWeight="medium" fontSize="lg">
              Home
            </Link>
            <Link href="/dashboard" fontWeight="medium" fontSize="lg">
              Dashboard
            </Link>
          </Flex>
        </Flex>
        <ConnectWallet theme="light" />
      </Flex>
    </Box>
  );
}
