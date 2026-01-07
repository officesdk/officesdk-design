import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { Menu } from '../Menu';
import React from 'react';

describe('Menu', () => {
  describe('Rendering', () => {
    it('should render menu items', () => {
      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ]}
        />
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render with icons', () => {
      const TestIcon = () => <div data-testid="test-icon">Icon</div>;

      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1', icon: <TestIcon /> },
          ]}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render with descriptions', () => {
      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1', description: 'Cmd+C' },
          ]}
        />
      );

      expect(screen.getByText('Cmd+C')).toBeInTheDocument();
    });
  });

  describe('Groups and Dividers', () => {
    it('should render groups', () => {
      render(
        <Menu
          items={[
            {
              type: 'group',
              key: 'g1',
              label: 'Group Title',
              children: [
                { key: '1', label: 'Option 1' },
              ],
            },
          ]}
        />
      );

      expect(screen.getByText('Group Title')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should render dividers', () => {
      const { container } = render(
        <Menu
          items={[
            { key: '1', label: 'Option 1' },
            { type: 'divider', key: 'd1' },
            { key: '2', label: 'Option 2' },
          ]}
        />
      );

      const divider = container.querySelector('.od-menu-item-divider');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should handle selected state', () => {
      render(
        <Menu
          selectedKeys={['1']}
          items={[
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' },
          ]}
        />
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should handle disabled state', () => {
      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1', disabled: true },
          ]}
        />
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onSelect when item clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1' },
          ]}
          onSelect={onSelect}
        />
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onSelect).toHaveBeenCalledWith('1');
    });

    it('should not call onSelect when disabled item clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1', disabled: true },
          ]}
          onSelect={onSelect}
        />
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call item onClick handler', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Menu
          items={[
            { key: '1', label: 'Option 1', onClick },
          ]}
        />
      );

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onClick).toHaveBeenCalledWith('1');
    });
  });

  describe('Search', () => {
    it('should render search box when searchable', () => {
      render(
        <Menu
          searchable
          items={[
            { key: '1', label: 'Option 1' },
          ]}
        />
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should filter items based on search', async () => {
      const user = userEvent.setup({ delay: null });
      const onSearch = vi.fn();

      render(
        <Menu
          searchable
          onSearch={onSearch}
          items={[
            { key: '1', label: 'Apple' },
            { key: '2', label: 'Banana' },
            { key: '3', label: 'Cherry' },
          ]}
        />
      );

      const searchInput = screen.getByRole('textbox');
      await user.type(searchInput, 'ban');

      expect(onSearch).toHaveBeenCalled();
    });

    it('should call onSearch handler', async () => {
      const user = userEvent.setup({ delay: null });
      const onSearch = vi.fn();

      render(
        <Menu
          searchable
          items={[{ key: '1', label: 'Option 1' }]}
          onSearch={onSearch}
        />
      );

      const searchInput = screen.getByRole('textbox');
      await user.type(searchInput, 'test');

      expect(onSearch).toHaveBeenCalled();
    });

    it('should search in submenu items', async () => {
      const user = userEvent.setup({ delay: null });
      const onSearch = vi.fn();

      render(
        <Menu
          searchable
          onSearch={onSearch}
          items={[
            {
              key: 'parent',
              label: 'Parent',
              children: [
                { key: 'child1', label: 'Apple' },
                { key: 'child2', label: 'Banana' },
              ],
            },
            { key: 'other', label: 'Other' },
          ]}
        />
      );

      const searchInput = screen.getByRole('textbox');
      await user.type(searchInput, 'banana');

      expect(onSearch).toHaveBeenCalled();
    });

    it('should search in description field', async () => {
      const user = userEvent.setup({ delay: null });
      const onSearch = vi.fn();

      render(
        <Menu
          searchable
          onSearch={onSearch}
          items={[
            { key: '1', label: 'File', description: 'Cmd+N' },
            { key: '2', label: 'Edit', description: 'Cmd+E' },
          ]}
        />
      );

      const searchInput = screen.getByRole('textbox');
      await user.type(searchInput, 'cmd');

      expect(onSearch).toHaveBeenCalled();
    });
  });

  describe('Sizes', () => {
    it('should render medium size', () => {
      const { container } = render(
        <Menu
          size="medium"
          items={[{ key: '1', label: 'Option 1' }]}
        />
      );

      expect(container.querySelector('.od-menu')).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(
        <Menu
          size="large"
          items={[{ key: '1', label: 'Option 1' }]}
        />
      );

      expect(container.querySelector('.od-menu')).toBeInTheDocument();
    });
  });

  describe('SubMenu', () => {
    it('should render submenu', () => {
      render(
        <Menu
          items={[
            {
              key: '1',
              label: 'Parent',
              children: [
                { key: '1-1', label: 'Child 1' },
                { key: '1-2', label: 'Child 2' },
              ],
            },
          ]}
        />
      );

      expect(screen.getByText('Parent')).toBeInTheDocument();
    });
  });
});

