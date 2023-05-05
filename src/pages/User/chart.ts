export const visitData = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['cup', 'tea', 'honey', 'flour'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'cup',
      type: 'line',
      data: [21, 99, 56, 66, 55, 7, 83],
    },
    {
      name: 'tea',
      type: 'line',
      data: [84, 30, 70, 14, 19, 75, 73],
    },
    {
      name: 'honey',
      type: 'line',
      data: [57, 3, 25, 13, 49, 80, 11],
    },
    {
      name: 'flour',
      type: 'line',
      data: [8, 85, 2, 77, 10, 65, 90],
    },
  ],
};
