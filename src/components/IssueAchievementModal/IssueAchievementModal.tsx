import { Dialog, Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { Employee } from '../../types/achievements';

import { EmployeeSelect } from './EmployeeSelect';
import { ErrorMessage } from './ErrorMessage';

interface IssueAchievementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employeeId: string) => Promise<void>;
  employees: Employee[];
  achievementName: string;
}

export const IssueAchievementModal = ({
  open,
  onOpenChange,
  onSubmit,
  employees,
  achievementName,
}: IssueAchievementModalProps) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!selectedEmployeeId) {
      setErrorMsg('Выберите сотрудника из списка');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await onSubmit(selectedEmployeeId);
      onOpenChange(false);
      setStatus('idle');
      setSelectedEmployeeId('');
    } catch (e) {
      console.error(e);
      setStatus('error');
      setErrorMsg('Не удалось выдать ачивку. Попробуйте позже.');
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
            <Dialog.Title>Выдать ачивку «{achievementName}»</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            {status === 'error' && <ErrorMessage message={errorMsg} />}

            <EmployeeSelect
              selectedEmployeeId={selectedEmployeeId}
              employees={employees}
              onChange={setSelectedEmployeeId}
              isDisabled={status === 'loading'}
            />
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
              onClick={handleSubmit}
              colorPalette="indigo"
              loading={status === 'loading'}
              disabled={status === 'loading' || !selectedEmployeeId}
            >
              {status === 'loading' ? 'Выдача...' : 'Выдать'}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};