import { Dialog, Box, Button, Field } from '@chakra-ui/react';
import { useState } from 'react';
import type { Employee } from '../mocks/employees';

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
    <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)} size="md">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Выдать ачивку «{achievementName}»</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {status === 'error' && (
              <Box
                mb={4}
                p={3}
                bg="red.50"
                color="red.600"
                borderRadius="md"
                fontSize="sm"
              >
                {errorMsg}
              </Box>
            )}
            <Field.Root required>
              <Field.Label>Сотрудник</Field.Label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="" disabled>Выберите сотрудника</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}{emp.department ? ` (отдел: ${emp.department})` : ''}
                  </option>
                ))}
              </select>
            </Field.Root>
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