import { Field } from '@chakra-ui/react';
import type { Employee } from '../../types/achievements';

interface EmployeeSelectProps {
  selectedEmployeeId: string;
  employees: Employee[];
  onChange: (id: string) => void;
  isDisabled: boolean;
}

export const EmployeeSelect = ({
  selectedEmployeeId,
  employees,
  onChange,
  isDisabled,
}: EmployeeSelectProps) => {
  return (
    <Field.Root required>
      <Field.Label>Сотрудник</Field.Label>
      <select
        value={selectedEmployeeId}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          fontSize: '14px',
          backgroundColor: 'white',
          outline: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        <option value="" disabled>
          Выберите сотрудника
        </option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
            {emp.department ? ` (отдел: ${emp.department})` : ''}
          </option>
        ))}
      </select>
    </Field.Root>
  );
};