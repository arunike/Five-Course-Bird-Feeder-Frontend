import type { EChartOption } from 'echarts';
import { getChartDataSet, getDetectionDataSet, getPieDetectionDataSet, ONE_WEEK_LIST } from 'utils/chart';

export const getLineChartOptions = (dateTime: Array<string> = []): EChartOption => {
  //const [timeArray, inArray, outArray] = getChartDataSet(dateTime);
  const [time, cardinal, blueJay, sparrow, robin, finch, hummingBird, hawk] = getDetectionDataSet(dateTime)
  return {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['Cardinal', 'Humming_Bird', 'Blue_Jay', 'Sparrow', 'Robin', 'Finch', 'Hawk'],
      textStyle: {
        fontSize: 12,
      },
    },
    xAxis: {
      type: 'category',
      data: time,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Cardinal',
        data: cardinal,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Humming_Bird',
        data: hummingBird,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Blue_Jay',
        data: blueJay,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Sparrow',
        data: sparrow,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Robin',
        data: robin,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Finch',
        data: finch,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
      {
        name: 'Hawk',
        data: hawk,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderWidth: 1,
        },
      },
    ],
  };
};

export const getPieChartOptions = (dateTime: Array<string> = [], radius = 42): EChartOption => {
  const [cardinal, blueJay, sparrow, robin, finch, hummingBird, hawk] = getPieDetectionDataSet(dateTime)
  return {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '0',
      right: '0',
    },
    legend: {
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        fontSize: 12,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
    },
    series: [
      {
        name: 'Detected Species',
        type: 'pie',
        radius: ['48%', '60%'],
        avoidLabelOverlap: false,
        silent: true,
        itemStyle: {
          borderWidth: 1,
        },
        // label: {
        //   show: true,
        //   position: 'center',
        //   formatter: ['{value|{d}%}', '{name|{b}Channel Share}'].join('\n'),
        //   rich: {
        //     value: {
        //       fontSize: 28,
        //       fontWeight: 'normal',
        //       lineHeight: 46,
        //     },
        //     name: {
        //       color: '#909399',
        //       fontSize: 12,
        //       lineHeight: 14,
        //     },
        //   },
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: cardinal, name: 'Cardinal' },
          { value: blueJay, name: 'Blue_Jay' },
          { value: sparrow, name: 'Sparrow' },
          { value: robin, name: 'Robin' },
          { value: finch, name: 'Finch' },
          { value: hummingBird, name: 'Humming_Bird' },
          { value: hawk, name: 'Hawk' },
        ],
      },
    ],
  }
}
export const getBarChartOptions = (dateTime: Array<string> = []): EChartOption => {
  const [timeArray, inArray, outArray] = getChartDataSet(dateTime);
  const [time, cardinal, blueJay, sparrow, robin, finch, hummingBird, hawk] = getDetectionDataSet(dateTime)
  return {
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: time,
      axisLine: {
        lineStyle: {
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      top: '5%',
      left: '25px',
      right: 0,
      bottom: '60px',
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 5,
      textStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['Cardinal', 'Humming Bird', 'Blue Jay', 'Sparrow', 'Robin', 'Finch', 'Hawk'],
    },
    series: [
      {
        name: 'Cardinal',
        data: cardinal,
        type: 'bar',
      },
      {
        name: 'Humming Bird',
        data: hummingBird,
        type: 'bar',
      },
      {
        name: 'Blue Jay',
        data: blueJay,
        type: 'bar',
      },
      {
        name: 'Sparrow',
        data: sparrow,
        type: 'bar',
      },
      {
        name: 'Robin',
        data: robin,
        type: 'bar',
      },
      {
        name: 'Finch',
        data: finch,
        type: 'bar',
      },
      {
        name: 'Hawk',
        data: hawk,
        type: 'bar',
      },
    ],
  };
};

// PieChartIcon Data
export const MICRO_CHART_OPTIONS_LINE: EChartOption = {
  xAxis: {
    type: 'category',
    show: false,
    data: ONE_WEEK_LIST,
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    tooltip: {
      show: false,
    },
  },
  color: ['#fff'],
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      showSymbol: false,
    },
  ],
};

// BarChartIcon Data
export const MICRO_CHART_OPTIONS_BAR: EChartOption = {
  xAxis: {
    type: 'category',
    show: false,
    data: ONE_WEEK_LIST,
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    tooltip: {
      show: false,
    },
  },
  series: [
    {
      data: [
        100,
        130,
        184,
        218,
        {
          value: 135,
          itemStyle: {
            opacity: 0.2,
          },
        },
        {
          value: 118,
          itemStyle: {
            opacity: 0.2,
          },
        },
        {
          value: 60,
          itemStyle: {
            opacity: 0.2,
          },
        },
      ],
      type: 'bar',
      barWidth: 9,
    },
  ],
};
