export * from './theme.js';

import themeConfig from './theme.js';

export const PALETTE = themeConfig.PALETTE;
export const THEME_COLORS = themeConfig.THEME_COLORS;
export const THEME_TYPOGRAPHY = themeConfig.THEME_TYPOGRAPHY;
export const THEME_SPACING = themeConfig.THEME_SPACING;
export const THEME_RADIUS = themeConfig.THEME_RADIUS;
export const THEME = themeConfig.THEME;

export type ThemeType = typeof THEME;
export type ThemeColors = typeof THEME_COLORS;
