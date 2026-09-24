// src/pages/BoostHeader.tsx
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
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ base: 'flex-start', sm: 'flex-end' }}
      flexWrap="wrap"
      gap={4}
    >
      <Box flex="1" minWidth="200px">
        <Heading
          as="h1"
          color="primary.text"
          lineHeight="1.1"
          mb={1}
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        >
          {title}
        </Heading>
        <Text color="secondary.text" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
          {subtitle}
        </Text>
      </Box>

      {onCreate && (
        <Button
          bg="primary.bg"
          color="primary.text"
          _hover={{ bg: 'primary.hover' }}
          size={{ base: 'md', lg: 'lg' }}
          onClick={onCreate}
          whiteSpace="nowrap"
          width={{ base: '100%', sm: 'auto' }}
        >
          + Создать ачивку
        </Button>
      )}
    </Box>
  );
};