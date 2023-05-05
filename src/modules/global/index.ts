import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETheme } from 'types/index.d';
import { CHART_COLORS, defaultColor, colorMap } from 'configs/color';
import { RootState } from '../store';
import { version } from '../../../package.json';

const namespace = 'global';

export enum ELayout {
  side = 1,
  top,
  mix,
  fullPage,
}

export interface IGlobalState {
  loading: boolean;
  collapsed: boolean;
  setting: boolean;
  version: string;
  color: string;
  theme: ETheme;
  systemTheme: boolean;
  layout: ELayout;
  isFullPage: boolean;
  showHeader: boolean;
  showBreadcrumbs: boolean;
  showFooter: boolean;
  chartColors: Record<string, string>;
}

const defaultTheme = ETheme.light;

const initialState: IGlobalState = {
  loading: true,
  collapsed: window.innerWidth < 1000,
  setting: false,
  version,
  theme: defaultTheme,
  systemTheme: false,
  layout: ELayout.side,
  isFullPage: false,
  color: defaultColor?.[0],
  showHeader: true,
  showBreadcrumbs: true,
  showFooter: true,
  chartColors: CHART_COLORS[defaultTheme],
};

const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      if (action.payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!action.payload;
      }
    },
    toggleSetting: (state) => {
      state.setting = !state.setting;
    },
    toggleShowHeader: (state) => {
      state.showHeader = !state.showHeader;
    },
    toggleShowBreadcrumbs: (state) => {
      state.showBreadcrumbs = !state.showBreadcrumbs;
    },
    toggleShowFooter: (state) => {
      state.showFooter = !state.showFooter;
    },
    switchTheme: (state, action: PayloadAction<ETheme>) => {
      const finalTheme = action?.payload;
      state.chartColors = CHART_COLORS[finalTheme];
      state.theme = finalTheme;
      state.systemTheme = false;
      document.documentElement.setAttribute('theme-mode', finalTheme);
    },
    openSystemTheme: (state) => {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        const finalTheme = media.matches ? ETheme.dark : ETheme.light;
        state.chartColors = CHART_COLORS[finalTheme];
        state.theme = finalTheme;
        state.systemTheme = true;
        document.documentElement.setAttribute('theme-mode', finalTheme);
      }
    },
    switchColor: (state, action) => {
      if (action?.payload) {
        state.color = action?.payload;
        const colorType = colorMap?.[action?.payload];
        document.documentElement.setAttribute('theme-color', colorType || '');
      }
    },
    switchLayout: (state, action) => {
      if (action?.payload) {
        state.layout = action?.payload;
      }
    },
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
  },
  extraReducers: () => {},
});

export const selectGlobal = (state: RootState) => state.global;

export const {
  toggleMenu,
  toggleSetting,
  toggleShowHeader,
  toggleShowBreadcrumbs,
  toggleShowFooter,
  switchTheme,
  switchColor,
  switchLayout,
  switchFullPage,
  openSystemTheme,
} = globalSlice.actions;

export default globalSlice.reducer;
