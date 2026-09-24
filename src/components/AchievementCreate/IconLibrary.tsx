import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import { LIBRARY_ICONS } from '../../mocks/icons';

interface IconLibraryProps {
  selectedIcon: string | null;
  onSelect: (src: string) => void;
  iconColor: string;
  searchQuery?: string;
}

const BASE_URL = import.meta.env.BASE_URL;

export const IconLibrary = ({
  selectedIcon,
  onSelect,
  iconColor,
  searchQuery = '',
}: IconLibraryProps) => {
  const query = searchQuery.trim().toLowerCase();
  const filtered = query
    ? LIBRARY_ICONS.filter((ic) => ic.name.toLowerCase().includes(query))
    : LIBRARY_ICONS;

  if (filtered.length === 0) {
    return (
      <Box p={6} textAlign="center" color="secondary.text" fontSize="sm">
        По запросу «{searchQuery}» ничего не найдено
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={5}
      gap={3}
      width="100%"
    >
      {filtered.map((icon) => {
        const isSelected = selectedIcon === icon.src;
        // Цвет иконки: у выбранной — выбранный, у остальных — серый
        const displayColor = isSelected ? iconColor : '#C9CDD6';

        return (
          <Box
            key={icon.id}
            h="72px"
            borderRadius="lg"
            border="2px solid"
            borderColor={isSelected ? 'blue.400' : 'transparent'}
            bg="gray.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => onSelect(icon.src)}
            _hover={{ borderColor: isSelected ? 'blue.400' : 'gray.200' }}
            transition="all 0.15s"
            color={displayColor}
          >
            <Box w="40px" h="40px">
              <Image
                src={`${BASE_URL}${icon.src}`}
                alt={icon.name}
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};