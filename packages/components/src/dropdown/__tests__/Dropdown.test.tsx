import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../__tests__/test-utils';
import { Dropdown } from '../Dropdown';
import { DropdownButton } from '../DropdownButton';
import { Menu } from '../Menu';
import React from 'react';

describe('Dropdown', () => {
  const menuItems = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('should render dropdown with trigger', () => {
      render(
        <Dropdown overlay={<Menu items={menuItems} />}>
          <DropdownButton value="Select" />
        </Dropdown>
      );

      expect(screen.getByText('Select')).toBeInTheDocument();
    });

    it('should not show overlay by default', () => {
      render(
        <Dropdown overlay={<div data-testid="overlay">Overlay</div>}>
          <DropdownButton value="Trigger" />
        </Dropdown>
      );

      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    });
  });

  describe('Visibility control', () => {
    it('should show overlay when clicked (click trigger)', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown 
          overlay={<Menu items={menuItems} />}
          trigger={['click']}
        >
          <DropdownButton value="Click me" />
        </Dropdown>
      );

      const button = screen.getByText('Click me');
      await user.click(button);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should work as controlled component', () => {
      const { rerender } = render(
        <Dropdown 
          visible={false}
          overlay={<div data-testid="overlay">Overlay</div>}
        >
          <DropdownButton value="Trigger" />
        </Dropdown>
      );

      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();

      rerender(
        <Dropdown 
          visible={true}
          overlay={<div data-testid="overlay">Overlay</div>}
        >
          <DropdownButton value="Trigger" />
        </Dropdown>
      );

      expect(screen.getByTestId('overlay')).toBeInTheDocument();
    });

    it('should call onVisibleChange when visibility changes', async () => {
      const user = userEvent.setup();
      const onVisibleChange = vi.fn();

      render(
        <Dropdown 
          overlay={<Menu items={menuItems} />}
          trigger={['click']}
          onVisibleChange={onVisibleChange}
        >
          <DropdownButton value="Click me" />
        </Dropdown>
      );

      const button = screen.getByText('Click me');
      await user.click(button);

      expect(onVisibleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Triggers', () => {
    it('should support click trigger', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown 
          overlay={<Menu items={menuItems} />}
          trigger={['click']}
        >
          <DropdownButton value="Click trigger" />
        </Dropdown>
      );

      const button = screen.getByText('Click trigger');
      await user.click(button);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should support hover trigger', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown 
          overlay={<Menu items={menuItems} />}
          trigger={['hover']}
        >
          <DropdownButton value="Hover trigger" />
        </Dropdown>
      );

      const button = screen.getByText('Hover trigger');
      await user.hover(button);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Integration with DropdownButton', () => {
    it('should sync open state with DropdownButton', async () => {
      const user = userEvent.setup();

      const ControlledExample = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <Dropdown
            visible={open}
            onVisibleChange={setOpen}
            overlay={<Menu items={menuItems} />}
            trigger={['click']}
          >
            <DropdownButton value="Select" open={open} />
          </Dropdown>
        );
      };

      render(<ControlledExample />);

      const button = screen.getByText('Select');
      await user.click(button);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Integration with Menu', () => {
    it('should handle menu item selection', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Dropdown 
          overlay={
            <Menu 
              items={menuItems}
              onSelect={onSelect}
            />
          }
          trigger={['click']}
        >
          <DropdownButton value="Select" />
        </Dropdown>
      );

      const button = screen.getByText('Select');
      await user.click(button);

      const option = screen.getByText('Option 1');
      await user.click(option);

      expect(onSelect).toHaveBeenCalledWith('1');
    });
  });

  describe('Placements', () => {
    it('should support different placements', () => {
      const placements: Array<'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'> = [
        'topLeft',
        'bottomLeft',
        'topRight',
        'bottomRight',
      ];

      placements.forEach(placement => {
        const { unmount } = render(
          <Dropdown 
            overlay={<Menu items={menuItems} />}
            placement={placement}
          >
            <DropdownButton value={`${placement}`} />
          </Dropdown>
        );

        expect(screen.getByText(placement)).toBeInTheDocument();
        unmount();
      });
    });
  });
});

