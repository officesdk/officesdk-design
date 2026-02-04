import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

/**
 * Mock icon components for testing
 * 
 * Why we need manual mocks:
 * 1. Icon components are generated from SVG files via SVGR plugin
 * 2. In test environment, SVGR doesn't process SVG imports correctly
 * 3. We can't use importActual() because the SVG→React transformation fails
 * 
 * Alternative approaches that don't work:
 * - vi.mock('*.svg') - glob patterns don't work in Vitest
 * - importActual() - fails because SVG files can't be imported in test env
 * - Relying on SVGR plugin - doesn't run consistently in Vitest
 * 
 * This manual approach ensures:
 * - All icon components are valid React components
 * - Tests focus on component logic, not icon rendering details
 * - Fast test execution without SVG processing overhead
 */

const createMockIconComponent = (name: string) => {
  const MockIconComponent = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) =>
      React.createElement('svg', { ...props, ref, 'data-testid': `mock-icon-${name}` })
  );
  MockIconComponent.displayName = `MockIcon(${name})`;
  return MockIconComponent;
};

vi.mock('@officesdk/design/icons', () => ({
  // Icon components
  AlignCenterIcon: createMockIconComponent('align-center'),
  AlignJustifyIcon: createMockIconComponent('align-justify'),
  AlignLeftIcon: createMockIconComponent('align-left'),
  AlignRightIcon: createMockIconComponent('align-right'),
  ArrowDownIcon: createMockIconComponent('arrow-down'),
  ArrowLeftIcon: createMockIconComponent('arrow-left'),
  ArrowRightIcon: createMockIconComponent('arrow-right'),
  ArrowUpIcon: createMockIconComponent('arrow-up'),
  BackIcon: createMockIconComponent('back'),
  BoldIcon: createMockIconComponent('bold'),
  CheckIcon: createMockIconComponent('check'),
  ChevronDownIcon: createMockIconComponent('chevron-down'),
  ChevronUpIcon: createMockIconComponent('chevron-up'),
  ClearFormatIcon: createMockIconComponent('clear-format'),
  CloseIcon: createMockIconComponent('close'),
  CopyIcon: createMockIconComponent('copy'),
  CutIcon: createMockIconComponent('cut'),
  DeleteIcon: createMockIconComponent('delete'),
  DownloadIcon: createMockIconComponent('download'),
  EditIcon: createMockIconComponent('edit'),
  ErrorIcon: createMockIconComponent('error'),
  ExitFullscreenIcon: createMockIconComponent('exit-fullscreen'),
  FilterIcon: createMockIconComponent('filter'),
  FlipHorizontalIcon: createMockIconComponent('flip-horizontal'),
  FlipVerticalIcon: createMockIconComponent('flip-vertical'),
  FormatBrushIcon: createMockIconComponent('format-brush'),
  FreezeIcon: createMockIconComponent('freeze'),
  FullscreenIcon: createMockIconComponent('fullscreen'),
  GridIcon: createMockIconComponent('grid'),
  HideIcon: createMockIconComponent('hide'),
  ImageIcon: createMockIconComponent('image'),
  IndentDecreaseIcon: createMockIconComponent('indent-decrease'),
  IndentIncreaseIcon: createMockIconComponent('indent-increase'),
  InfoIcon: createMockIconComponent('info'),
  ItalicIcon: createMockIconComponent('italic'),
  LinkIcon: createMockIconComponent('link'),
  ListIcon: createMockIconComponent('list'),
  ListBulletIcon: createMockIconComponent('list-bullet'),
  ListNumberIcon: createMockIconComponent('list-number'),
  LoadingIcon: createMockIconComponent('loading'),
  MenuIcon: createMockIconComponent('menu'),
  MergeCellsIcon: createMockIconComponent('merge-cells'),
  MinusIcon: createMockIconComponent('minus'),
  MoreIcon: createMockIconComponent('more'),
  PasteIcon: createMockIconComponent('paste'),
  PlusIcon: createMockIconComponent('plus'),
  PrintIcon: createMockIconComponent('print'),
  QuestionIcon: createMockIconComponent('question'),
  RedoIcon: createMockIconComponent('redo'),
  RefreshIcon: createMockIconComponent('refresh'),
  RotateLeftIcon: createMockIconComponent('rotate-left'),
  RotateRightIcon: createMockIconComponent('rotate-right'),
  SaveIcon: createMockIconComponent('save'),
  SearchIcon: createMockIconComponent('search'),
  SelectAllIcon: createMockIconComponent('select-all'),
  SettingsIcon: createMockIconComponent('settings'),
  ShareIcon: createMockIconComponent('share'),
  SortIcon: createMockIconComponent('sort'),
  SplitCellsIcon: createMockIconComponent('split-cells'),
  StrikethroughIcon: createMockIconComponent('strikethrough'),
  SuccessIcon: createMockIconComponent('success'),
  TableIcon: createMockIconComponent('table'),
  UnderlineIcon: createMockIconComponent('underline'),
  UndoIcon: createMockIconComponent('undo'),
  UploadIcon: createMockIconComponent('upload'),
  WarningIcon: createMockIconComponent('warning'),
  WorkbenchIcon: createMockIconComponent('workbench'),

  // Registry exports
  iconRegistry: {},
  allIconRegistry: {},
  getIcon: vi.fn(),
  ICON_NAMES: [],
  createIconRegistry: vi.fn(),

  // Category arrays
  ARROWS_ICONS: [],
  GENERAL_ICONS: [],
  IMAGE_ICONS: [],
  MAIN_SITE_ICONS: [],
  STATUS_ICONS: [],
  TABLE_ICONS: [],
  TEXT_ICONS: [],
  UTILITY_ICONS: [],
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

const originalGetComputedStyle = window.getComputedStyle.bind(window);
Object.defineProperty(window, 'getComputedStyle', {
  configurable: true,
  value: (element: Element, pseudoElement?: string) =>
    pseudoElement ? originalGetComputedStyle(element) : originalGetComputedStyle(element),
});
