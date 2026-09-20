import { Stack, Button, Text, Box, Image } from '@chakra-ui/react';
import { footerItems } from './navData';

export const FooterMenu = () => (
  <Stack p={4} gap={1} mt="auto">
    {footerItems.map((item) => (
      <Button
        key={item.label}
        variant="ghost"
        color="secondary.text"
        _hover={{
          bg: 'components.bg',
          color: 'primary.text',
        }}
        justifyContent="start"
        size="md"
        borderRadius="lg"
        display="flex"
        alignItems="center"
        gap={3}
        w="full"
        textAlign="left"
      >
        <Box w="20px" h="20px" display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
          <Image 
            src={item.icon} 
            alt={item.label} 
            objectFit="contain" 
            w="full" 
            h="full" 
          />
        </Box>
        <Text whiteSpace="nowrap">{item.label}</Text>
      </Button>
    ))}
  </Stack>
);