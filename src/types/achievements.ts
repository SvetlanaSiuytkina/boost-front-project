export type AchievementStatus = 'active' | 'draft';

export interface Achievement {
  id: string | number;
  title: string;
  description: string;
  isStandard: boolean;
  status: AchievementStatus;
}