import { useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import type { Achievement } from '../../types/achievements';
import { FormFields } from './FormFields';

interface AchievementFormProps {
  onSubmit: (data: Omit<Achievement, 'id'>) => Promise<void>;
  onClose: () => void;
}

export const AchievementForm = ({ onSubmit, onClose }: AchievementFormProps) => {
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    name: '',
    description: '',
    iconColor: '#4A88F0',
    status: 'draft',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFieldChange = (field: 'name' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Название обязательно');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        iconColor: '#4A88F0',
        status: 'draft',
      });
      setStatus('idle');
      onClose();
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Ошибка создания');
    }
  };

  return (
    <form onSubmit={handleSubmit} id="create-achievement-form">
      {status === 'error' && (
        <Box mb={4} p={3} bg="red.50" color="red.600" borderRadius="md" fontSize="sm">
          {errorMsg}
        </Box>
      )}

      <Stack gap={4}>
        <FormFields
          formData={formData}
          onFormChange={handleFieldChange}
          isDisabled={status === 'loading'}
        />
      </Stack>

      <Box mt={6} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="ghost" onClick={onClose} disabled={status === 'loading'}>
          Отмена
        </Button>
        <Button
          type="submit"
          form="create-achievement-form"
          colorPalette="blue"
          loading={status === 'loading'}
        >
          Сохранить
        </Button>
      </Box>
    </form>
  );
};