import { Field, Input } from '@chakra-ui/react';

interface NameFieldProps {
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export const NameField = ({ value, error, disabled, onChange }: NameFieldProps) => (
  <Field.Root invalid={!!error} required>
    <Field.Label fontWeight="medium">Название</Field.Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Введите название"
      disabled={disabled}
    />
    {error && <Field.ErrorText color="red.500">{error}</Field.ErrorText>}
  </Field.Root>
);