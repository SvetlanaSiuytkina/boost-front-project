import { AlertRoot, AlertIndicator, AlertContent, AlertTitle } from '@chakra-ui/react';

interface BoostNotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const BoostNotification = ({ type, message }: BoostNotificationProps) => {
  return (
    <AlertRoot status={type} variant="solid" borderRadius="md" p={4} mb={6}>
      <AlertIndicator />
      <AlertContent>
        <AlertTitle fontWeight="medium">{message}</AlertTitle>
      </AlertContent>
    </AlertRoot>
  );
};