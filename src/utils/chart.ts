import dayjs, { Dayjs } from 'dayjs';
import { BIRD_DETECTION_DATA } from 'pages/Statistic/Base/constant';
import { groubBy } from './data';
import { divide, groupBy } from 'lodash';

const RECENT_7_DAYS: [Dayjs, Dayjs] = [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')];
export const ONE_WEEK_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const getRandomInt = (num = 100): number => {
  const resultNum = Number((Math.random() * num).toFixed(0));
  return resultNum <= 1 ? 1 : resultNum;
};

type ChartValue = number | string;

export function getTimeArray(dateTime: string[] = [], divideNum = 10, format = 'MM-DD'): string[] {
  const timeArray = [];
  if (dateTime.length === 0) {
    dateTime.push(...RECENT_7_DAYS.map((item) => item.format(format)));
  }
  for (let i = 0; i < divideNum; i++) {
    const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
    const timeNode: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
    timeArray.push(dayjs(timeNode).format(format));
  }

  return timeArray;
}

export const getChartDataSet = (dateTime: Array<string> = [], divideNum = 10): ChartValue[][] => {
  const timeArray = getTimeArray(dateTime, divideNum);
  const inArray = [];
  const outArray = [];
  for (let index = 0; index < divideNum; index++) {
    inArray.push(getRandomInt().toString());
    outArray.push(getRandomInt().toString());
  }

  return [timeArray, inArray, outArray];
};

// function that reads bird stats data over given datetime and produces chart data
export const getDetectionDataSet = (dateTime: Array<string> = []): ChartValue[][] => {
  
  ///////////////////////////////////////////////////////////////
  // TO DO: ask database for all detections in specified date range
  //
  // const data = getDetectionDataFromDatabase(dateTime: Array<string> = [])
  //
  // using mock data in the meantime
  const data = BIRD_DETECTION_DATA
  ///////////////////////////////////////////////////////////////
  
  // separating out time and prediction arrays
  const time = data.map((item) => item.timeStamp)
  const predicted = data.map((item) => item.prediction)
  const imgPath = data.map((item) => item.imgPath)

  // setting empty arrays for each bird species
  var cardinal = []
  var blueJay = []
  var sparrow = []
  var robin = []
  var finch = []
  var hummingBird = []
  var hawk = []

  // creating detection timeseries array for each bird species
  for(let i = 0; i < predicted.length; i++){
    predicted[i] === 'Cardinal' ? cardinal.push(1) : cardinal.push(0)
    predicted[i] === 'Blue_Jay' ? blueJay.push(1) : blueJay.push(0)
    predicted[i] === 'Sparrow' ? sparrow.push(1) : sparrow.push(0)
    predicted[i] === 'Robin' ? robin.push(1) : robin.push(0)
    predicted[i] === 'Finch' ? finch.push(1) : finch.push(0)
    predicted[i] === 'Humming_Bird' ? hummingBird.push(1) : hummingBird.push(0)
    predicted[i] === 'Hawk' ? hawk.push(1) : hawk.push(0)
  }

  // return datetime array and the bird species detected at each timestamp
  return[time, cardinal, blueJay, sparrow, robin, finch, hummingBird, hawk]
};

export const getPieDetectionDataSet = (dateTime: Array<string> = []) => {
  
  ///////////////////////////////////////////////////////////////
  // TO DO: ask database for all detections in specified date range
  //
  // const data = getDetectionDataFromDatabase()
  //
  // using mock data in the meantime
  const data = BIRD_DETECTION_DATA
  ///////////////////////////////////////////////////////////////

  // separate out data for each group of birds
  const groupedData = groupBy(BIRD_DETECTION_DATA, 'prediction')

  // setting empty arrays for each bird species
  var cardinal = groupedData.Cardinal.length
  var blueJay = groupedData.Blue_Jay.length
  var sparrow = groupedData.Sparrow.length
  var robin = groupedData.Robin.length
  var finch = groupedData.Finch.length
  var hummingBird = groupedData.Humming_Bird.length
  var hawk = groupedData.Hawk.length

  // return datetime array and the bird species detected at each timestamp
  return[cardinal, blueJay, sparrow, robin, finch, hummingBird, hawk]
};

