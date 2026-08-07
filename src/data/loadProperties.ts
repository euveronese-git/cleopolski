import type { Property } from '../types';

const modules = import.meta.glob('../../content/properties/*.json', {
  eager: true,
}) as Record<string, { default: Property }>;

export const INITIAL_PROPERTIES: Property[] = Object.values(modules)
  .map((mod) => mod.default)
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
