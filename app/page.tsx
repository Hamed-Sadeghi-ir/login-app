import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column" m="5">
      <Text size="6" className="font-bold text-green-700"> Welcome To Login App </Text>

      <Box mt="5">
        <Flex gap={"3"}>
          <Button>
            <Link href={"/login"}>
              Login
            </Link>
          </Button>
          <Button color="red">
            <Link href={"/singup"}>
                Sign Up
            </Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
