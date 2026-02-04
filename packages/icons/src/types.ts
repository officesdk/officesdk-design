import type { FC, SVGProps } from 'react';

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export type IconRegistry = Record<string, IconComponent>;
