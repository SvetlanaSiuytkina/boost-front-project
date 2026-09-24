import { Field, Textarea } from '@chakra-ui/react';

interface DescriptionFieldProps {
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export const DescriptionField = ({
  value,
  error,
  disabled,
  onChange,
}: DescriptionFieldProps) => (
  <Field.Root invalid={!!error} required>
    <Field.Label fontWeight="medium">Описание</Field.Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Опишите, за что выдаётся ачивка"
      disabled={disabled}
      resize="none"
      rows={3}
    />
    {error && <Field.ErrorText color="red.500">{error}</Field.ErrorText>}
  </Field.Root>
);