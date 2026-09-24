import type { Achievement } from '../../types/achievements';

export type AchievementDraftInput = Omit<
  Achievement,
  'id' | 'createdAt' | 'author' | 'awardedCount'
>;

export interface AchievementFormState {
  name: string;
  description: string;
  criterion: string;
  icon: string | null;
  iconColor: string;
}

export interface AchievementFormProps {
  onSubmit: (data: AchievementDraftInput, iconFile?: File) => Promise<void>;
  onClose: () => void;
  searchQuery?: string;
  renderPreview: (state: AchievementFormState) => React.ReactNode;
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
export const BASE_URL = import.meta.env.BASE_URL;