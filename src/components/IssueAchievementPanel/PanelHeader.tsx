import { Box, Stack, Text } from '@chakra-ui/react';

interface PanelHeaderProps {
  achievementName: string;
}

export const PanelHeader = ({ achievementName }: PanelHeaderProps) => (
  <Box p={6} borderBottom="1px" borderColor="border">
    <Stack gap={2}>
      <Text fontWeight="bold" fontSize="xl" color="primary.text">
        Выдача ачивки
      </Text>
      <Text fontSize="sm" color="secondary.text">
        Ачивка: «{achievementName}»
      </Text>
    </Stack>
  </Box>
);