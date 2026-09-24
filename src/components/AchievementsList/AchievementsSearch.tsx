import { Box, Flex, Input } from '@chakra-ui/react';
import { SearchIcon } from '../Utils';

interface AchievementsSearchProps {
  onSearchChange?: (query: string) => void;
}

export const AchievementsSearch = ({ onSearchChange }: AchievementsSearchProps) => {
  return (
    <Box flex="1" width="100%" maxWidth={{ base: '100%', md: '300px' }}>
      <Flex alignItems="center" gap={2} w="100%">
        <Box color="secondary.text">
          <SearchIcon />
        </Box>
        <Input
          placeholder="Поиск по названию..."
          size="sm"
          flex="1"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </Flex>
    </Box>
  );
};