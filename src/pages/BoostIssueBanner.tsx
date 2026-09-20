import { Box, Text } from '@chakra-ui/react';

interface BoostIssueBannerProps {
  name: string;
}

export const BoostIssueBanner = ({ name }: BoostIssueBannerProps) => {
  return (
    <Box
      bg="components.bg"
      border="1px"
      borderColor="border"
      p={4}
      borderRadius="md"
      display="flex"
      alignItems="center"
      gap={3}
      mb={6}
    >
      <Box w="4px" h="24px" bg="primary.text" borderRadius="full" />
      <Text fontSize="md" fontWeight="medium" color="primary.text">
        Выдача ачивки: «{name}»
      </Text>
    </Box>
  );
};