import { Stack, Button, Text, Box, Image } from '@chakra-ui/react';
import { navItems } from './navData';

interface NavMenuProps {
  onItemClick?: (label: string) => void;
}

export const NavMenu = ({ onItemClick }: NavMenuProps = {}) => (
  <Stack p={4} gap={1}>
    {navItems.map((item) => {
      const isActive = item.active ?? false;
      return (
        <Button
          key={item.label}
          variant={isActive ? 'solid' : 'ghost'}
          bg={isActive ? 'primary.bg' : undefined}
          color={isActive ? 'primary.text' : 'secondary.text'}
          _hover={{
            bg: isActive ? 'primary.hover' : 'components.bg',
            color: isActive ? 'primary.text' : 'primary.text',
          }}
          justifyContent="start"
          size="md"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          gap={3}
          w="full"
          textAlign="left"
          onClick={() => onItemClick?.(item.label)}
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
      );
    })}
  </Stack>
);