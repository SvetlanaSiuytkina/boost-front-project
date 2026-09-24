import { Box, Button, VStack, Text, HStack } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import type { ValidationError } from '../../types/achievements';
import { FormHeaderAlert } from './FormHeaderAlert';
import { NameField } from './NameField';
import { DescriptionField } from './DescriptionField';
import { ImageField } from './ImageField';
import { ColorField } from './ColorField';
import {
  MAX_FILE_SIZE,
  ALLOWED_TYPES,
  type AchievementFormProps,
  type AchievementFormState,
} from './AchievementForm.types';

export const AchievementForm = ({
  onSubmit,
  onClose,
  searchQuery = '',
  renderPreview,
}: AchievementFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criterion: '',
  });
  const [iconSource, setIconSource] = useState<'library' | 'file'>('library');
  const [selectedLibraryIcon, setSelectedLibraryIcon] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconColor, setIconColor] = useState<string>('#3B82F6');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((e) => e.field !== field));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidSize = file.size <= MAX_FILE_SIZE;
    const isValidType = ALLOWED_TYPES.includes(file.type);

    setIconFile(file);
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    setIconPreview(URL.createObjectURL(file));

    if (!isValidSize || !isValidType) {
      setErrors((prev) => [
        ...prev.filter((err) => err.field !== 'icon'),
        {
          field: 'icon',
          code: 'invalid-file',
          message: 'Файл должен быть не больше 2 МБ и в формате PNG, JPG или SVG',
        },
      ]);
    } else {
      setErrors((prev) => prev.filter((err) => err.field !== 'icon'));
    }
  };

  const handleRemoveFile = () => {
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    setIconFile(null);
    setIconPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((prev) => prev.filter((err) => err.field !== 'icon'));
  };

  const triggerFileDialog = () => fileInputRef.current?.click();

  const effectiveIcon = iconSource === 'library' ? selectedLibraryIcon : iconPreview;

  const previewState: AchievementFormState = {
    name: formData.name,
    description: formData.description,
    criterion: formData.criterion,
    icon: effectiveIcon,
    iconColor,
  };

  const hasRequiredErrors =
    errors.some((e) => e.field === 'name') ||
    errors.some((e) => e.field === 'description');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const clientErrors: ValidationError[] = [];
    if (!formData.name.trim()) {
      clientErrors.push({
        field: 'name',
        code: 'required',
        message: 'Укажите название ачивки',
      });
    }
    if (!formData.description.trim()) {
      clientErrors.push({
        field: 'description',
        code: 'required',
        message: 'Добавьте описание, его увидит сотрудник',
      });
    }

    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(
        {
          name: formData.name,
          description: formData.description,
          criterion: formData.criterion,
          icon: effectiveIcon || '',
          iconColor,
          status: 'active',
        },
        iconFile || undefined
      );
      onClose();
    } catch (err: unknown) {
      const validationErr = err as { validationErrors?: ValidationError[] };
      if (validationErr?.validationErrors && Array.isArray(validationErr.validationErrors)) {
        setErrors(validationErr.validationErrors);
      } else {
        setErrors([
          { field: 'general', code: 'error', message: 'Произошла ошибка при сохранении' },
        ]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: '1fr 340px' }}
      gap={{ base: 4, lg: 8 }}
    >
      {/* ЛЕВАЯ КОЛОНКА */}
      <form onSubmit={handleSubmit}>
        <VStack gap={6} align="stretch">
          <FormHeaderAlert show={hasRequiredErrors} />

          {getError('general') && (
            <Text color="red.500" fontSize="sm">
              {getError('general')}
            </Text>
          )}

          <NameField
            value={formData.name}
            error={getError('name')}
            disabled={isSubmitting}
            onChange={(v) => handleChange('name', v)}
          />

          <DescriptionField
            value={formData.description}
            error={getError('description')}
            disabled={isSubmitting}
            onChange={(v) => handleChange('description', v)}
          />

          <ImageField
            iconSource={iconSource}
            selectedLibraryIcon={selectedLibraryIcon}
            iconFile={iconFile}
            iconPreview={iconPreview}
            iconColor={iconColor}
            error={getError('icon')}
            searchQuery={searchQuery}
            fileInputRef={fileInputRef}
            onIconSourceChange={setIconSource}
            onSelectLibraryIcon={setSelectedLibraryIcon}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onTriggerFileDialog={triggerFileDialog}
          />

          <ColorField value={iconColor} onChange={setIconColor} />

          <HStack justify="flex-start" gap={3} pt={2}>
            <Button type="submit" colorPalette="blue" loading={isSubmitting} minW="120px">
              Сохранить
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Отмена
            </Button>
          </HStack>
        </VStack>
      </form>

      {/* ПРАВАЯ КОЛОНКА */}
      <Box display={{ base: 'block', lg: 'block' }}>
        {renderPreview(previewState)}
      </Box>
    </Box>
  );
};