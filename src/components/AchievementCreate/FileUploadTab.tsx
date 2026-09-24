import { Box, Button, Text, HStack, Image } from '@chakra-ui/react';
import type { RefObject } from 'react';
import { BASE_URL } from './AchievementForm.types';

interface FileUploadTabProps {
  iconFile: File | null;
  iconPreview: string | null;
  error?: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onTriggerFileDialog: () => void;
}

export const FileUploadTab = ({
  iconFile,
  iconPreview,
  error,
  fileInputRef,
  onFileChange,
  onRemoveFile,
  onTriggerFileDialog,
}: FileUploadTabProps) => {
  return (
    <Box pt={4}>
      <input
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />

      {!iconPreview ? (
        <Box
          border="2px dashed"
          borderColor="border"
          borderRadius="md"
          p={10}
          textAlign="center"
          cursor="pointer"
          onClick={onTriggerFileDialog}
          _hover={{ borderColor: 'primary.hover' }}
        >
          <Box w="52px" h="52px" mx="auto" mb={2} opacity={0.7}>
            <Image
              src={`${BASE_URL}icons/library/foto.svg`}
              alt="Загрузить фото"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
          <Text fontSize="sm" color="secondary.text">
            Нажмите, чтобы загрузить файл
          </Text>
          <Text fontSize="xs" color="secondary.text" mt={1}>
            PNG, JPG или SVG. Максимум 2 МБ.
          </Text>
        </Box>
      ) : (
        // Превью файла (показывается даже при ошибке)
        <Box
          border="2px dashed"
          borderColor={error ? 'red.300' : 'primary.hover'}
          borderRadius="md"
          p={6}
          textAlign="center"
          bg="white"
        >
          <Box w="52px" h="52px" mx="auto" mb={2} opacity={0.7}>
            <Image
              src={`${BASE_URL}icons/library/foto.svg`}
              alt="Файл"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>

          <Text fontSize="sm" color="primary.text" mb={3}>
            {iconFile?.name} ·{' '}
            {iconFile ? `${Math.round(iconFile.size / 1024)} КБ` : ''}
          </Text>

          <HStack justify="center" gap={3}>
            <Button
              type="button"
              variant="plain"
              size="sm"
              color="blue.500"
              fontWeight="medium"
              p={0}
              h="auto"
              minW="auto"
              _hover={{ textDecoration: 'underline', color: 'blue.600' }}
              onClick={onTriggerFileDialog}
            >
              Заменить файл
            </Button>
            <Button
              type="button"
              variant="plain"
              size="sm"
              color="blue.500"
              fontWeight="medium"
              p={0}
              h="auto"
              minW="auto"
              _hover={{ textDecoration: 'underline', color: 'blue.600' }}
              onClick={onRemoveFile}
            >
              Удалить
            </Button>
          </HStack>
        </Box>
      )}

      <Text fontSize="xs" color="secondary.text" mt={2}>
        Своё изображение используется как есть — цвет к нему не применяется
      </Text>

      {error && (
        <Text fontSize="xs" color="red.500" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};