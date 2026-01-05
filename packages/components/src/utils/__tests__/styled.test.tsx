import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { styled } from '../styled';
import { registerGlobalContext, getGlobalTheme } from '../context';

const mockTheme = {
  colors: {
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
    },
  },
};

describe('styled utility', () => {
  beforeEach(() => {
    registerGlobalContext({ theme: mockTheme });
  });

  it('should create styled component with automatic theme injection', () => {
    const StyledDiv = styled.div`
      color: ${(props) => props.theme.colors.text.primary};
      background: ${(props) => props.theme.colors.background.primary};
    `;

    // No ThemeProvider needed - theme is injected via defaultProps
    const { container } = render(<StyledDiv>Test</StyledDiv>);
    const element = container.firstChild as HTMLElement;

    expect(element).toBeDefined();
    expect(element.tagName).toBe('DIV');
  });

  it('should work with styled components without ThemeProvider', () => {
    const StyledButton = styled.button`
      color: ${(props) => props.theme.colors.text.secondary};
      padding: 8px 16px;
    `;

    // Works without ThemeProvider
    const { getByText } = render(<StyledButton>Click me</StyledButton>);
    const button = getByText('Click me');

    expect(button).toBeDefined();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should inject global theme automatically via ThemeProvider', () => {
    const theme = getGlobalTheme();
    expect(theme).toBeDefined();
    expect(theme.colors.text.primary).toBe('#333333');
  });

  it('should work with multiple styled components without ThemeProvider', () => {
    const StyledContainer = styled.div`
      background: ${(props) => props.theme.colors.background.secondary};
    `;

    const StyledText = styled.span`
      color: ${(props) => props.theme.colors.text.primary};
    `;

    // All components get theme via defaultProps
    const { getByText, container } = render(
      <StyledContainer>
        <StyledText>Nested Text</StyledText>
      </StyledContainer>
    );

    expect(container.firstChild).toBeDefined();
    expect(getByText('Nested Text')).toBeDefined();
  });

  it('should access theme via defaultProps getter', () => {
    const StyledDiv = styled.div`
      color: ${(props) => props.theme.colors.text.primary};
    `;

    const { container } = render(<StyledDiv>Theme via getter</StyledDiv>);
    
    expect(container.firstChild).toBeDefined();
  });
});

