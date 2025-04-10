'use client';
import styled from 'styled-components';

interface CatDisplayProps {
  enabled: boolean;
  catImage: string | null;
  error: string | null;
}

const DisplayContainer = styled.div`
  width: 500px;
  height: 500px;
  max-width: 100%;
  max-height: 60vh;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-style: italic;
  padding: 20px;
  text-align: center;
  font-weight: bold;
`;

const CatImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusMessage = styled.p`
  color: #666;
  font-style: italic;
  padding: 20px;
  text-align: center;
`;

export default function CatDisplay({ enabled, catImage, error }: CatDisplayProps) {
    return (
      <DisplayContainer>
        {!enabled ? (
          <StatusMessage>
            Please enable the app to see a cat
          </StatusMessage>
        ) : error ? (
          <ErrorMessage>
            😿 Error: {error}
          </ErrorMessage>
        ) : catImage ? (
          <CatImage
            src={catImage}
            alt="Random cat"
          />
        ) : (
          <StatusMessage>
            Loading cat...
          </StatusMessage>
        )}
      </DisplayContainer>
    );
  }