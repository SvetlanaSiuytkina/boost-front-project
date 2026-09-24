import { Box, Heading, Text, Image, VStack } from '@chakra-ui/react';

interface AchievementPreviewProps {
  name: string;
  description: string;
  iconSrc?: string | null;
  iconColor?: string;
}

const BASE_URL = import.meta.env.BASE_URL;

const resolveIconSrc = (src: string): string => {
  if (src.startsWith('blob:') || src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  const clean = src.startsWith('/') ? src.slice(1) : src;
  return `${BASE_URL}${clean}`;
};

export const AchievementPreview = ({
  name,
  description,
  iconSrc,
  iconColor = '#3B82F6',
}: AchievementPreviewProps) => {
  // Если пользователь загрузил свой файл цвет НЕ применяется
  const isUserUpload = !!iconSrc && (iconSrc.startsWith('blob:') || iconSrc.startsWith('data:') || iconSrc.startsWith('http'));
  const effectiveColor = isUserUpload ? 'inherit' : iconColor;

  return (
    <Box
      bg="components.bg"
      border="1px"
      borderColor="border"
      borderRadius="lg"
      p={5}
      top="20px"
    >
      <Text fontWeight="bold" fontSize="md" color="primary.text" mb={4}>
        Так ачивку увидит сотрудник
      </Text>

      <Box
        bg="white"
        border="1px"
        borderColor="border"
        borderRadius="md"
        p={6}
        textAlign="center"
      >
        <VStack gap={3}>
          <Box
            w="80px"
            h="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={effectiveColor}
          >
            {iconSrc ? (
              <Image
                src={resolveIconSrc(iconSrc)}
                alt="Иконка ачивки"
                w="64px"
                h="64px"
                objectFit="contain"
              />
            ) : (
              <Box w="48px" h="48px" borderRadius="full" bg={iconColor} opacity={0.4} />
            )}
          </Box>

          <Heading size="sm" color="primary.text" textAlign="center">
            {name || 'Название ачивки'}
          </Heading>

          <Text fontSize="sm" color="secondary.text" textAlign="center">
            {description || 'Описание появится здесь'}
          </Text>

          <Box
            px={3}
            py={1}
            borderRadius="full"
            bg="components.bg"
            border="1px"
            borderColor="border"
          >
            <Text fontSize="xs" color="secondary.text">
              Предпросмотр
            </Text>
          </Box>
        </VStack>
      </Box>

      <Text fontSize="xs" color="secondary.text" mt={3} textAlign="center">
        Предпросмотр обновляется до сохранения
      </Text>
    </Box>
  );
};