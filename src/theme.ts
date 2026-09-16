import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#F0F5FF' },
          100: { value: '#E0E7FF' },
          500: { value: '#0055FF' },
          600: { value: '#0044CC' },
          700: { value: '#003399' },
        },
      },
      fonts: {
        heading: { value: 'Inter, system-ui, sans-serif' },
        body: { value: 'Inter, system-ui, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        'primary.text': { value: '#1A1A1A' },
        'primary.hover': { value: '#0055FF' },
        'primary.bg': { value: '#F0F5FF' },
        'secondary.text': { value: '#6B7280' },
        'background': { value: '#FFFFFF' },
        'components.bg': { value: '#F9FAFB' },
        'border': { value: '#E5E7EB' },
        'success.text': { value: '#10B981' },
        'success.bg': { value: '#ECFDF5' },
        'success.border': { value: '#D1FAE5' },
        'warning.text': { value: '#F59E0B' },
        'warning.bg': { value: '#FFFBED' },
        'warning.border': { value: '#FDE68A' },
        'danger.text': { value: '#EF4444' },
        'danger.bg': { value: '#FEF2F2' },
        'danger.border': { value: '#FECACA' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);