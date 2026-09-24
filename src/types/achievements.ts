export type AchievementStatus = 'active' | 'draft' | 'archived';

export interface Achievement {
  id: string | number;
  name: string;
  description: string;
  criterion?: string;
  status: AchievementStatus;
  iconColor?: string;
  icon?: string;
  createdAt?: string;
  author?: string;
  awardedCount?: number;
}

export interface AchievementDraft {
  name: string;
  description: string;
  criterion: string;
  icon?: File | string;
  status: AchievementStatus;
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
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

export interface AccessRights {
  canView: boolean;
  canCreate: boolean;
  canIssue: boolean;
}

export interface AchievementAward {
  id: string;
  achievementId: string | number;
  employeeId: string;
  awardedAt: Date;
  comment?: string;
}