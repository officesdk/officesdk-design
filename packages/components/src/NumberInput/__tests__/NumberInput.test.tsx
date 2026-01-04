import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  describe('Rendering', () => {
    it('should render number input', () => {
      render(<NumberInput defaultValue={0} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with small size', () => {
      render(<NumberInput defaultValue={0} size="small" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with large size', () => {
      render(<NumberInput defaultValue={0} size="large" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should display default value', () => {
      render(<NumberInput defaultValue={50} />);
      expect(screen.getByRole('textbox')).toHaveValue('50');
    });
  });

  describe('Interactions', () => {
    it('should increment value when up button is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} step={1} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const upButton = buttons[0];

      await user.click(upButton);

      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('should decrement value when down button is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} step={1} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const downButton = buttons[1];

      await user.click(downButton);

      expect(handleChange).toHaveBeenCalledWith(-1);
    });

    it('should handle keyboard arrow up', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} step={1} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{ArrowUp}');

      expect(handleChange).toHaveBeenCalledWith(1);
    });

    it('should handle keyboard arrow down', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} step={1} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{ArrowDown}');

      expect(handleChange).toHaveBeenCalledWith(-1);
    });

    it('should parse and update value on blur', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '42');
      await user.tab();

      expect(handleChange).toHaveBeenCalledWith(42);
    });
  });

  describe('Min/Max', () => {
    it('should respect min value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} min={0} max={100} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const downButton = buttons[1];

      await user.click(downButton);

      expect(handleChange).toHaveBeenCalledWith(0);
    });

    it('should respect max value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={100} min={0} max={100} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const upButton = buttons[0];

      await user.click(upButton);

      expect(handleChange).toHaveBeenCalledWith(100);
    });
  });

  describe('Disabled', () => {
    it('should not respond to interactions when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<NumberInput defaultValue={0} disabled onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const upButton = buttons[0];

      await user.click(upButton);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Precision', () => {
    it('should format value with precision', () => {
      render(<NumberInput defaultValue={3.14159} precision={2} />);
      expect(screen.getByRole('textbox')).toHaveValue('3.14');
    });
  });

  describe('Custom Formatter/Parser', () => {
    it('should use custom formatter', () => {
      const formatter = (val: number) => `${val}%`;
      render(<NumberInput defaultValue={50} formatter={formatter} />);
      expect(screen.getByRole('textbox')).toHaveValue('50%');
    });

    it('should use custom parser', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const parser = (displayVal: string) => parseFloat(displayVal.replace('%', ''));

      render(<NumberInput defaultValue={50} parser={parser} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '75');
      await user.tab();

      expect(handleChange).toHaveBeenCalledWith(75);
    });
  });

  describe('Alert State', () => {
    it('should render alert state', () => {
      render(<NumberInput defaultValue={150} max={100} alert />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});

