import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Employee } from '../../types/achievements';
import { PanelHeader } from './PanelHeader';
import { EmployeeSelect } from './EmployeeSelect';
import { ErrorAlerts } from './ErrorAlerts';

interface IssueAchievementPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employeeId: string) => Promise<void>;
  employees: Employee[];
  achievementName: string;
}

export const IssueAchievementPanel = ({
  open,
  onOpenChange,
  onSubmit,
  employees,
  achievementName,
}: IssueAchievementPanelProps) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'not-found' | 'already-issued'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const resetErrors = () => {
    if (['not-found', 'already-issued', 'error'].includes(status)) {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedEmployeeId) {
      setStatus('error');
      setErrorMsg('Выберите сотрудника из списка');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await new Promise((r) => setTimeout(r, 500));
      
      // Сценарий A-3a: Сотрудник не найден
      const emp = employees.find((e) => e.id === selectedEmployeeId);
      if (!emp) {
        setStatus('not-found');
        setErrorMsg('Сотрудник не найден в системе. Проверьте данные.');
        return;
      }

      // Сценарий A-3b: Предупреждение о повторной выдаче (эмуляция)
      // это должно приходить с бэкенда
      const isAlreadyIssued = false; // Заглушка
      if (isAlreadyIssued) {
        setStatus('already-issued');
        setErrorMsg(`Ачивка «${achievementName}» уже выдана этому сотруднику.`);
        return;
      }

      // Успешная выдача
      await onSubmit(selectedEmployeeId);
      onOpenChange(false);
      setStatus('idle');
      setSelectedEmployeeId('');
    } catch (err) {
      console.error(err);
      // Сценарий A-3e: Ошибка сохранения
      setStatus('error');
      setErrorMsg('Не удалось выдать ачивку. Попробуйте позже.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <PanelHeader achievementName={achievementName} />

          <Box p={6} flex="1" overflowY="auto">
            <Stack gap={6}>
              <ErrorAlerts status={status} errorMsg={errorMsg} />

              <EmployeeSelect
                selectedEmployeeId={selectedEmployeeId}
                employees={employees}
                onChange={(id) => {
                  setSelectedEmployeeId(id);
                  resetErrors();
                }}
                isDisabled={status === 'loading'}
              />

              <Text fontSize="sm" color="secondary.text">
                После выдачи ачивка появится в профиле сотрудника.
              </Text>
            </Stack>
          </Box>
          
          <Box p={6} borderTop="1px" borderColor="border" bg="components.bg">
            <Stack gap={3}>
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={status === 'loading'}
                width="100%"
              >
                Отмена
              </Button>
              <Button
                colorPalette="blue"
                onClick={handleSubmit}
                loading={status === 'loading'}
                disabled={status === 'loading'}
                width="100%"
                size="lg"
              >
                {status === 'loading' ? 'Выдача...' : 'Выдать ачивку'}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};