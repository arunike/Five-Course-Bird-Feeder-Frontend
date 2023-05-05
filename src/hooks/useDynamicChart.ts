import { useMemo } from 'react';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';
import { getChartColor } from 'utils/color';
import { CHART_COLORS } from 'configs/color';
import lodashSet from 'lodash/set';
import lodashMap from 'lodash/map';
import { ETheme } from '../types';

export type TChartColorKey = keyof typeof CHART_COLORS[ETheme.light];

export default function useDynamicChart(
  options: Record<string, any>,
  configs?: Partial<Record<TChartColorKey, Array<string>>>,
) {
  const { theme, color } = useAppSelector(selectGlobal);
  return useMemo(() => {
    const dynamicColor = getChartColor(theme, color);
    const newOptions = {
      ...options,
    };
    
    lodashSet(newOptions, 'color', dynamicColor.colorList);
    if (configs) {
      lodashMap(configs, (config, configKey: TChartColorKey) => {
        config?.map((val) => lodashSet(newOptions, val, dynamicColor[configKey]));
      });
    }
    return newOptions;
  }, [theme, color, options]);
}
