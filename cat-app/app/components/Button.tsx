'use client';
import styled from 'styled-components';

interface ButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const StyledButton = styled.button<{ $enabled: boolean }>`
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: ${props => props.$enabled ? '#4CAF50' : '#cccccc'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.$enabled ? 'pointer' : 'not-allowed'};
  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.65;
  }
`;

export default function Button({ enabled, onClick }: ButtonProps) {
  return (
    <StyledButton
      $enabled={enabled}
      onClick={onClick}
      disabled={!enabled}
    >
      Get a new cat
    </StyledButton>
  );
}