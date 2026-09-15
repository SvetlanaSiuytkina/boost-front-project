import { Dialog, Box, Button, Field, Input, Textarea, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import type { Achievement } from '../types/achievements';

interface CreateAchievementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Achievement, 'id'>) => Promise<void>;
}

export const CreateAchievementModal = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateAchievementModalProps) => {
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    isStandard: false,
    status: 'draft'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg('Название обязательно');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        isStandard: false,
        status: 'draft'
      });
      setStatus('idle');
      onOpenChange(false);
    } catch {
      setStatus('error');
      setErrorMsg('Ошибка создания');
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      size="md"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Новая ачивка</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {status === 'error' && (
              <Box mb={4} p={3} bg="red.50" color="red.600" borderRadius="md" fontSize="sm">
                {errorMsg}
              </Box>
            )}
            <form onSubmit={handleSubmit} id="create-achievement-form">
              <Stack gap={4}>
                <Field.Root required>
                  <Field.Label>Название</Field.Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Мастер кода"
                    disabled={status === 'loading'}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Описание</Field.Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Что нужно сделать..."
                    disabled={status === 'loading'}
                    resize="none"
                  />
                </Field.Root>
              </Stack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={status === 'loading'}
            >
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
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};