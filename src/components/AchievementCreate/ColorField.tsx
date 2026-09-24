import { Field, HStack, Box, Text } from '@chakra-ui/react';
import { COLOR_PALETTE } from '../../mocks/icons';

interface ColorFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorField = ({ value, onChange }: ColorFieldProps) => {
  const currentLabel =
    COLOR_PALETTE.find((c) => c.value === value)?.label || 'Синий';

  return (
    <Field.Root>
      <Field.Label fontWeight="medium">
        Цвет ачивки{' '}
        <Text as="span" color="secondary.text" fontWeight="normal">
          · {currentLabel}
        </Text>
      </Field.Label>
      <HStack gap={2} flexWrap="wrap">
        {COLOR_PALETTE.map((color) => {
          const isSelected = value === color.value;
          return (
            <Box
              key={color.id}
              w="28px"
              h="28px"
              borderRadius="full"
              bg={color.value}
              cursor="pointer"
              border={isSelected ? '3px solid' : '2px solid transparent'}
              borderColor={isSelected ? 'primary.text' : 'transparent'}
              onClick={() => onChange(color.value)}
              transition="all 0.15s"
              _hover={{ transform: 'scale(1.1)' }}
            />
          );
        })}
      </HStack>
      <Text fontSize="xs" color="secondary.text" mt={1}>
        Форма и цвет задаются отдельно — десять форм на любой из восьми цветов
      </Text>
    </Field.Root>
  );
};