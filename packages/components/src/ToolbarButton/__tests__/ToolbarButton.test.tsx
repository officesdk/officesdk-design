import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { ToolbarButton } from '../ToolbarButton';

const TestIcon = () => <svg data-testid="test-icon" />;

describe('ToolbarButton', () => {
  describe('Rendering', () => {
    it('should render icon only button', () => {
      render(<ToolbarButton icon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<ToolbarButton icon={<TestIcon />} label="Format" />);
      expect(screen.getByText('Format')).toBeInTheDocument();
    });

    it('should render with dropdown arrow', () => {
      render(<ToolbarButton icon={<TestIcon />} hasDropdown />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ToolbarButton icon={<TestIcon />} onClick={handleClick} />);

      const button = screen.getAllByRole('button')[0];
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ToolbarButton icon={<TestIcon />} onClick={handleClick} disabled />);

      const button = screen.getAllByRole('button')[0];
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onDropdownClick for split dropdown', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleDropdownClick = vi.fn();

      render(
        <ToolbarButton
          icon={<TestIcon />}
          label="Format"
          hasDropdown
          splitDropdown
          onClick={handleClick}
          onDropdownClick={handleDropdownClick}
        />
      );

      const buttons = screen.getAllByRole('button');
      await user.click(buttons[1]);

      expect(handleDropdownClick).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onClick for single click area dropdown', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <ToolbarButton
          icon={<TestIcon />}
          label="Format"
          hasDropdown
          splitDropdown={false}
          onClick={handleClick}
        />
      );

      const button = screen.getAllByRole('button')[0];
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('States', () => {
    it('should render active state', () => {
      render(<ToolbarButton icon={<TestIcon />} active />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render disabled state', () => {
      render(<ToolbarButton icon={<TestIcon />} disabled />);
      const button = screen.getAllByRole('button')[0];
      expect(button).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('should render single click area with dropdown', () => {
      render(<ToolbarButton icon={<TestIcon />} hasDropdown />);
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('should render split dropdown with two buttons', () => {
      render(<ToolbarButton icon={<TestIcon />} hasDropdown splitDropdown />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render with icon and label', () => {
      render(<ToolbarButton icon={<TestIcon />} label="Format" />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Format')).toBeInTheDocument();
    });

    it('should render icon only with split dropdown', () => {
      render(<ToolbarButton icon={<TestIcon />} hasDropdown splitDropdown />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('should support custom className', () => {
      const { container } = render(<ToolbarButton icon={<TestIcon />} className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should support custom style', () => {
      const { container } = render(<ToolbarButton icon={<TestIcon />} style={{ margin: '10px' }} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ margin: '10px' });
    });
  });
});

