import { Dialog } from '@chakra-ui/react';
import { AchievementForm } from './AchievementForm';

import type { Achievement } from '../../types/achievements';

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
  const handleClose = () => {
    onOpenChange(false);
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
            <AchievementForm onSubmit={onSubmit} onClose={handleClose} />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};