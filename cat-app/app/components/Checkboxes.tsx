'use client';
import styled from 'styled-components';

interface CheckboxesProps {
  enabled: boolean;
  autoRefresh: boolean;
  setEnabled: (value: boolean) => void;
  setAutoRefresh: (value: boolean) => void;
}

const CheckboxContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledCheckbox = styled.input`
  margin-right: 8px;
`;

export default function Checkboxes({
  enabled,
  autoRefresh,
  setEnabled,
  setAutoRefresh,
}: CheckboxesProps) {
  return (
    <CheckboxContainer>
      <StyledLabel>
        <StyledCheckbox
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Enabled
      </StyledLabel>
      
      <StyledLabel>
        <StyledCheckbox
          type="checkbox"
          checked={autoRefresh}
          onChange={(e) => setAutoRefresh(e.target.checked)}
          disabled={!enabled}
        />
        Auto-refresh every 5 seconds
      </StyledLabel>
    </CheckboxContainer>
  );
}