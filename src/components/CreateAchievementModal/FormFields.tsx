import { Box, Field, Input, Textarea } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';

interface FormFieldsProps {
  formData: Omit<Achievement, 'id'>;
  onFormChange: (field: 'name' | 'description', value: string) => void;
  isDisabled: boolean;
}

export const FormFields = ({ formData, onFormChange, isDisabled }: FormFieldsProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange('name', e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormChange('description', e.target.value);
  };

  return (
    <Box>
      <Field.Root required>
        <Field.Label>Название</Field.Label>
        <Input
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Мастер кода"
          disabled={isDisabled}
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Описание</Field.Label>
        <Textarea
          value={formData.description}
          onChange={handleDescChange}
          placeholder="Что нужно сделать..."
          disabled={isDisabled}
          resize="none"
        />
      </Field.Root>
    </Box>
  );
};