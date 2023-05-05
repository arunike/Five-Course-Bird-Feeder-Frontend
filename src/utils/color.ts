import { Color } from 'tvision-color';
import { defaultColor, darkColor, CHART_COLORS } from 'configs/color';
import { ETheme } from 'types/index.d';

function getColorFromThemeColor(theme: string, themeColor: string): Array<string> {
  let themeColorList = [];
  const isDarkMode = theme === ETheme.dark;
  const colorLowerCase = themeColor.toLocaleLowerCase();

  if (defaultColor.includes(colorLowerCase)) {
    const colorIdx = defaultColor.indexOf(colorLowerCase);
    const defaultGradients = !isDarkMode ? defaultColor : darkColor;
    const spliceThemeList = defaultGradients.slice(0, colorIdx);
    themeColorList = defaultGradients.slice(colorIdx, defaultGradients.length).concat(spliceThemeList);
  } else {
    themeColorList = Color.getRandomPalette({
      color: themeColor,
      colorGamut: 'bright',
      number: 8,
    });
  }

  return themeColorList;
}

export function getChartColor(theme: ETheme, themeColor: string) {
  const colorList = getColorFromThemeColor(theme, themeColor);
  const chartColors = CHART_COLORS[theme];
  return { ...chartColors, colorList };
}
