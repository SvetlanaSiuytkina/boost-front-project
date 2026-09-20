export type AchievementStatus = 'active' | 'draft' | 'archived';

export interface Achievement {
  id: string | number;
  name: string;
  description: string;
  status: AchievementStatus;
  iconColor?: string;
  icon?: string;
}

export interface AchievementAward {
  id: string;
  achievementId: string | number;
  employeeId: string;
  awardedAt: Date;
  comment?: string;
}

export interface ApiResponse<T> {
  details: {
    code: number;
    status: 'ok' | 'error';
    message?: string;
  };
  data?: T;
}

export interface Employee {
  id: string;
  name: string;
  department?: string;
  avatar?: string;
}