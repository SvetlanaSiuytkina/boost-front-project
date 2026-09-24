import { Field, Tabs } from '@chakra-ui/react';
import type { RefObject } from 'react';
import { IconLibrary } from './IconLibrary';
import { FileUploadTab } from './FileUploadTab';

interface ImageFieldProps {
  iconSource: 'library' | 'file';
  selectedLibraryIcon: string | null;
  iconFile: File | null;
  iconPreview: string | null;
  iconColor: string;
  error?: string;
  searchQuery: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onIconSourceChange: (value: 'library' | 'file') => void;
  onSelectLibraryIcon: (src: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onTriggerFileDialog: () => void;
}

export const ImageField = ({
  iconSource,
  selectedLibraryIcon,
  iconFile,
  iconPreview,
  iconColor,
  error,
  searchQuery,
  fileInputRef,
  onIconSourceChange,
  onSelectLibraryIcon,
  onFileChange,
  onRemoveFile,
  onTriggerFileDialog,
}: ImageFieldProps) => {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label fontWeight="medium">Изображение</Field.Label>

      <Tabs.Root
        value={iconSource}
        onValueChange={(e) => onIconSourceChange(e.value as 'library' | 'file')}
        variant="enclosed"
        width="100%"
      >
        <Tabs.List>
          <Tabs.Trigger value="library">Готовая библиотека</Tabs.Trigger>
          <Tabs.Trigger value="file">Загрузить файл</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="library" pt={4}>
          <IconLibrary
            selectedIcon={selectedLibraryIcon}
            onSelect={onSelectLibraryIcon}
            iconColor={iconColor}
            searchQuery={searchQuery}
          />
        </Tabs.Content>

        <Tabs.Content value="file" p={0}>
          <FileUploadTab
            iconFile={iconFile}
            iconPreview={iconPreview}
            error={error}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
            onRemoveFile={onRemoveFile}
            onTriggerFileDialog={onTriggerFileDialog}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Field.Root>
  );
};