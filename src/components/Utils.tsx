import { Box } from '@chakra-ui/react';
import type { Achievement } from '../types/achievements';

// --- Компонент Бейджа Статуса ---
export const StatusBadge = ({ status }: { status: Achievement['status'] }) => {
  let bgToken, textToken, label;
  
  switch (status) {
    case 'active':
      bgToken = 'success.bg';
      textToken = 'success.text';
      label = 'Активна';
      break;
    case 'draft':
      bgToken = 'warning.bg';
      textToken = 'warning.text';
      label = 'Черновик';
      break;
    case 'archived':
    default:
      bgToken = 'components.bg';
      textToken = 'secondary.text';
      label = 'Архив';
  }

  return (
    <Box 
      px={3} py={1} 
      rounded="full" 
      fontSize="xs" 
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wide"
      bg={bgToken}
      color={textToken}
      border="1px"
      borderColor={textToken}
      lineHeight="1" 
    >
      {label}
    </Box>
  );
};

// --- Иконка поиска ---
export const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// --- Иконка меню (три точки) ---
export const MoreGorlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <circle cx="5" cy="12" r="1.5"></circle>
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="19" cy="12" r="1.5"></circle>
  </svg>
);