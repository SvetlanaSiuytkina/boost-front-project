import {
  AlertRoot,
  AlertIndicator,
  AlertContent,
  AlertDescription,
} from '@chakra-ui/react';

interface FormHeaderAlertProps {
  show: boolean;
}

export const FormHeaderAlert = ({ show }: FormHeaderAlertProps) => {
  if (!show) return null;

  return (
    <AlertRoot
      status="error"
      variant="subtle"
      borderRadius="md"
      bg="red.50"
      border="1px"
      borderColor="red.100"
    >
      <AlertIndicator />
      <AlertContent>
        <AlertDescription fontWeight="medium" color="red.600">
          Проверьте обязательные поля. Введённые данные сохранены
        </AlertDescription>
      </AlertContent>
    </AlertRoot>
  );
};