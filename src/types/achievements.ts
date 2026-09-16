export type AchievementStatus = 'active' | 'draft' | 'archived';

export interface Achievement {
  id: string | number;
  name: string;
  description: string;
  status: AchievementStatus;
  iconColor: string;
}
//факт выдачи ачивки сотруднику (Achievement Award)
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