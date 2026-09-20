import { Box } from '@chakra-ui/react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Box
    mb={4}
    p={3}
    bg="red.50"
    color="red.600"
    borderRadius="md"
    fontSize="sm"
  >
    {message}
  </Box>
);