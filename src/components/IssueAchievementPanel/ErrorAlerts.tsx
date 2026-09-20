import { AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription } from '@chakra-ui/react';

interface ErrorAlertsProps {
  status: 'idle' | 'loading' | 'error' | 'not-found' | 'already-issued';
  errorMsg: string;
}

export const ErrorAlerts = ({ status, errorMsg }: ErrorAlertsProps) => {
  if (status === 'idle' || status === 'loading') {
    return null;
  }

  return (
    <>
      {/* Сценарий A-3a: Сотрудник не найден */}
      {status === 'not-found' && (
        <AlertRoot status="error" variant="subtle">
          <AlertIndicator />
          <AlertContent>
            <AlertTitle>Сотрудник не найден</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </AlertContent>
        </AlertRoot>
      )}

      {/* Сценарий A-3b: Предупреждение о повторной выдаче */}
      {status === 'already-issued' && (
        <AlertRoot status="warning" variant="subtle">
          <AlertIndicator />
          <AlertContent>
            <AlertTitle>Повторная выдача</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </AlertContent>
        </AlertRoot>
      )}

      {/* Общая ошибка */}
      {status === 'error' && (
        <AlertRoot status="error" variant="subtle">
          <AlertIndicator />
          <AlertContent>
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{errorMsg}</AlertDescription>
          </AlertContent>
        </AlertRoot>
      )}
    </>
  );
};