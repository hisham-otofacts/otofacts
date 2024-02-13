import type { HTMLAttributes, HTMLTag } from 'astro/types';

export interface MetaData {
  title?: string;
  canonical?: string;
  description?: string;
}

export interface CallToAction extends HTMLAttributes<HTMLTag> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}
