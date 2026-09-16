import type { AchievementAward } from '../types/achievements';

/**
 * функция выдачи ачивки
 * возвращает объект AchievementAward, чтобы фронтенд мог сразу обновить локальную историю
 */
export const issueAchievement = async (
  achievementId: string | number, 
  employeeId: string
): Promise<AchievementAward> => {
  // --- МОК (для разработки) ---
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const mockResult: AchievementAward = {
    id: `award-\${Date.now()}`,
    achievementId,
    employeeId,
    awardedAt: new Date(),
    comment: 'Выдано вручную администратором',
  };

  console.log('🤖 [MOCK] Выдача ачивки:', mockResult);
  return mockResult;
  // --------------------------

  // --- РЕАЛЬНЫЙ API (раскомментировать при интеграции) ---
  /*
  const response = await fetch(`/api/achievements/\${achievementId}/issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employeeId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Не удалось выдать ачивку');
  }

  const data = await response.json();
  
  // приводим ответ бэкенда к типу AchievementAward
  return {
    id: data.id,
    achievementId: data.achievementId,
    employeeId: data.employeeId,
    awardedAt: new Date(data.awardedAt),
    comment: data.comment || '',
  };
  */
};