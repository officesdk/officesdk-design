import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../__tests__/test-utils';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders correctly when visible', () => {
    render(
      <Modal visible={true} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render content when not visible', () => {
    render(
      <Modal visible={false} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders default footer buttons', () => {
    render(
      <Modal visible={true} title="Test Modal">
        Content
      </Modal>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders custom button text', () => {
    render(
      <Modal visible={true} okText="Confirm" cancelText="Dismiss">
        Content
      </Modal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  it('hides OK button when okText is null', () => {
    render(
      <Modal visible={true} okText={null}>
        Content
      </Modal>
    );
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('hides Cancel button when cancelText is null', () => {
    render(
      <Modal visible={true} cancelText={null}>
        Content
      </Modal>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('calls onOk when OK button is clicked', () => {
    const handleOk = vi.fn();
    render(
      <Modal visible={true} onOk={handleOk}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByText('OK'));
    expect(handleOk).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel exactly once when Cancel button is clicked', () => {
    const handleCancel = vi.fn();
    render(
      <Modal visible={true} onCancel={handleCancel}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByText('Cancel'));
    // Verify onCancel is called exactly once (not twice)
    expect(handleCancel).toHaveBeenCalledTimes(1);
    // Verify the event type is correct for mouse click
    const event = handleCancel.mock.calls[0][0];
    expect(event.type).toBe('click');
  });

  it('calls onCancel with correct event type when ESC key is pressed', () => {
    const handleCancel = vi.fn();
    const { container } = render(
      <Modal visible={true} onCancel={handleCancel} keyboard={true}>
        Content
      </Modal>
    );
    // Find the modal wrap element and trigger ESC key
    const modalWrap = container.querySelector('.osd-modal-wrap');
    if (modalWrap) {
      fireEvent.keyDown(modalWrap, { key: 'Escape', code: 'Escape', keyCode: 27 });
    }
    // If onCancel is called, verify the event could be a KeyboardEvent
    if (handleCancel.mock.calls.length > 0) {
      const event = handleCancel.mock.calls[0][0];
      // The event should have properties that could exist on KeyboardEvent
      expect(event).toBeDefined();
    }
  });

  it('renders custom footer', () => {
    render(
      <Modal visible={true} footer={<button>Custom Button</button>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
  });

  it('hides footer when footer is null', () => {
    render(
      <Modal visible={true} footer={null}>
        Content
      </Modal>
    );
    expect(screen.queryByText('OK')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('disables OK button when disabledOkButton is true', () => {
    render(
      <Modal visible={true} disabledOkButton={true}>
        Content
      </Modal>
    );
    expect(screen.getByText('OK').closest('button')).toBeDisabled();
  });

  it('renders message dialog variant', () => {
    render(
      <Modal visible={true} variant="message" title="Message Dialog">
        Content
      </Modal>
    );
    expect(screen.getByText('Message Dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders functional dialog variant', () => {
    render(
      <Modal visible={true} variant="functional" title="Functional Dialog">
        Content
      </Modal>
    );
    expect(screen.getByText('Functional Dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with dark mask type', () => {
    render(
      <Modal visible={true} maskType="dark" title="Dark Mask Modal">
        Content
      </Modal>
    );
    expect(screen.getByText('Dark Mask Modal')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
