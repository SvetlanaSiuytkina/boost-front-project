import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface BoostHeaderProps {
  title: string;
  subtitle: string;
  onCreate?: () => void;
}

export const BoostHeader = ({ title, subtitle, onCreate }: BoostHeaderProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      flexWrap="wrap"
      gap={4}
    >
      <Box flex="1" minWidth="200px">
        <Heading size="4xl" as="h1" color="primary.text" lineHeight="1.1" mb={1}>
          {title}
        </Heading>
        <Text color="secondary.text" fontSize="lg">
          {subtitle}
        </Text>
      </Box>
      
      {onCreate && (
        <Button
          bg="primary.bg"
          color="primary.text"
          _hover={{ bg: 'primary.hover' }}
          size="lg"
          onClick={onCreate}
          whiteSpace="nowrap"
        >
          + Создать ачивку
        </Button>
      )}
    </Box>
  );
};