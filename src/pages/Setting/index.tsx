import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouterProps } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const date = new Date().toLocaleDateString();
const future_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_2 = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_3 = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_4 = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_5 = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_6 = new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString();
const future_date_7 = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

const birdTypes = [
  'Blue Jay',
  'Finch',
  'Robin',
  'Sparrow',
  'Humming Bird',
  'Cardinal',
  'Hawk',
];

const foodTypes = [
  'Sunflower Seeds',
  'Suet',
  'Peanuts',
  'Millet',
  'Safflower Seeds',
  'Thistle',
  'Mealworms',
];

const timeStart = [
  date + ' ' + '12:00 AM',
  date + ' ' + '12:30 AM',
  date + ' ' + '1:00 AM',
  date + ' ' + '1:30 AM',
  date + ' ' + '2:00 AM',
  date + ' ' + '2:30 AM',
  date + ' ' + '3:00 AM',
  date + ' ' + '3:30 AM',
  date + ' ' + '4:00 AM',
  date + ' ' + '4:30 AM',
  date + ' ' + '5:00 AM',
  date + ' ' + '5:30 AM',
  date + ' ' + '6:00 AM',
  date + ' ' + '6:30 AM',
  date + ' ' + '7:00 AM',
  date + ' ' + '7:30 AM',
  date + ' ' + '8:00 AM',
  date + ' ' + '8:30 AM',
  date + ' ' + '9:00 AM',
  date + ' ' + '9:30 AM',
  date + ' ' + '10:00 AM',
  date + ' ' + '10:30 AM',
  date + ' ' + '11:00 AM',
  date + ' ' + '11:30 AM',
  date + ' ' + '12:00 PM',
  date + ' ' + '12:30 PM',
  date + ' ' + '1:00 PM',
  date + ' ' + '1:30 PM',
  date + ' ' + '2:00 PM',
  date + ' ' + '2:30 PM',
  date + ' ' + '3:00 PM',
  date + ' ' + '3:30 PM',
  date + ' ' + '4:00 PM',
  date + ' ' + '4:30 PM',
  date + ' ' + '5:00 PM',
  date + ' ' + '5:30 PM',
  date + ' ' + '6:00 PM',
  date + ' ' + '6:30 PM',
  date + ' ' + '7:00 PM',
  date + ' ' + '7:30 PM',
  date + ' ' + '8:00 PM',
  date + ' ' + '8:30 PM',
  date + ' ' + '9:00 PM',
  date + ' ' + '9:30 PM',
  date + ' ' + '10:00 PM',
  date + ' ' + '10:30 PM',
  date + ' ' + '11:00 PM',
  date + ' ' + '11:30 PM',
];

const timeEnd = [
  future_date + ' ' + '12:00 AM',
  future_date + ' ' + '12:30 AM',
  future_date + ' ' + '1:00 AM',
  future_date + ' ' + '1:30 AM',
  future_date + ' ' + '2:00 AM',
  future_date + ' ' + '2:30 AM',
  future_date + ' ' + '3:00 AM',
  future_date + ' ' + '3:30 AM',
  future_date + ' ' + '4:00 AM',
  future_date + ' ' + '4:30 AM',
  future_date + ' ' + '5:00 AM',
  future_date + ' ' + '5:30 AM',
  future_date + ' ' + '6:00 AM',
  future_date + ' ' + '6:30 AM',
  future_date + ' ' + '7:00 AM',
  future_date + ' ' + '7:30 AM',
  future_date + ' ' + '8:00 AM',
  future_date + ' ' + '8:30 AM',
  future_date + ' ' + '9:00 AM',
  future_date + ' ' + '9:30 AM',
  future_date + ' ' + '10:00 AM',
  future_date + ' ' + '10:30 AM',
  future_date + ' ' + '11:00 AM',
  future_date + ' ' + '11:30 AM',
  future_date + ' ' + '12:00 PM',
  future_date + ' ' + '12:30 PM',
  future_date + ' ' + '1:00 PM',
  future_date + ' ' + '1:30 PM',
  future_date + ' ' + '2:00 PM',
  future_date + ' ' + '2:30 PM',
  future_date + ' ' + '3:00 PM',
  future_date + ' ' + '3:30 PM',
  future_date + ' ' + '4:00 PM',
  future_date + ' ' + '4:30 PM',
  future_date + ' ' + '5:00 PM',
  future_date + ' ' + '5:30 PM',
  future_date + ' ' + '6:00 PM',
  future_date + ' ' + '6:30 PM',
  future_date + ' ' + '7:00 PM',
  future_date + ' ' + '7:30 PM',
  future_date + ' ' + '8:00 PM',
  future_date + ' ' + '8:30 PM',
  future_date + ' ' + '9:00 PM',
  future_date + ' ' + '9:30 PM',
  future_date + ' ' + '10:00 PM',
  future_date + ' ' + '10:30 PM',
  future_date + ' ' + '11:00 PM',
  future_date + ' ' + '11:30 PM',
  future_date_2 + ' ' + '12:00 AM',
  future_date_2 + ' ' + '12:30 AM',
  future_date_2 + ' ' + '1:00 AM',
  future_date_2 + ' ' + '1:30 AM',
  future_date_2 + ' ' + '2:00 AM',
  future_date_2 + ' ' + '2:30 AM',
  future_date_2 + ' ' + '3:00 AM',
  future_date_2 + ' ' + '3:30 AM',
  future_date_2 + ' ' + '4:00 AM',
  future_date_2 + ' ' + '4:30 AM',
  future_date_2 + ' ' + '5:00 AM',
  future_date_2 + ' ' + '5:30 AM',
  future_date_2 + ' ' + '6:00 AM',
  future_date_2 + ' ' + '6:30 AM',
  future_date_2 + ' ' + '7:00 AM',
  future_date_2 + ' ' + '7:30 AM',
  future_date_2 + ' ' + '8:00 AM',
  future_date_2 + ' ' + '8:30 AM',
  future_date_2 + ' ' + '9:00 AM',
  future_date_2 + ' ' + '9:30 AM',
  future_date_2 + ' ' + '10:00 AM',
  future_date_2 + ' ' + '10:30 AM',
  future_date_2 + ' ' + '11:00 AM',
  future_date_2 + ' ' + '11:30 AM',
  future_date_2 + ' ' + '12:00 PM',
  future_date_2 + ' ' + '12:30 PM',
  future_date_2 + ' ' + '1:00 PM',
  future_date_2 + ' ' + '1:30 PM',
  future_date_2 + ' ' + '2:00 PM',
  future_date_2 + ' ' + '2:30 PM',
  future_date_2 + ' ' + '3:00 PM',
  future_date_2 + ' ' + '3:30 PM',
  future_date_2 + ' ' + '4:00 PM',
  future_date_2 + ' ' + '4:30 PM',
  future_date_2 + ' ' + '5:00 PM',
  future_date_2 + ' ' + '5:30 PM',
  future_date_2 + ' ' + '6:00 PM',
  future_date_2 + ' ' + '6:30 PM',
  future_date_2 + ' ' + '7:00 PM',
  future_date_2 + ' ' + '7:30 PM',
  future_date_2 + ' ' + '8:00 PM',
  future_date_2 + ' ' + '8:30 PM',
  future_date_2 + ' ' + '9:00 PM',
  future_date_2 + ' ' + '9:30 PM',
  future_date_2 + ' ' + '10:00 PM',
  future_date_2 + ' ' + '10:30 PM',
  future_date_2 + ' ' + '11:00 PM',
  future_date_2 + ' ' + '11:30 PM',
  future_date_3 + ' ' + '12:00 AM',
  future_date_3 + ' ' + '12:30 AM',
  future_date_3 + ' ' + '1:00 AM',
  future_date_3 + ' ' + '1:30 AM',
  future_date_3 + ' ' + '2:00 AM',
  future_date_3 + ' ' + '2:30 AM',
  future_date_3 + ' ' + '3:00 AM',
  future_date_3 + ' ' + '3:30 AM',
  future_date_3 + ' ' + '4:00 AM',
  future_date_3 + ' ' + '4:30 AM',
  future_date_3 + ' ' + '5:00 AM',
  future_date_3 + ' ' + '5:30 AM',
  future_date_3 + ' ' + '6:00 AM',
  future_date_3 + ' ' + '6:30 AM',
  future_date_3 + ' ' + '7:00 AM',
  future_date_3 + ' ' + '7:30 AM',
  future_date_3 + ' ' + '8:00 AM',
  future_date_3 + ' ' + '8:30 AM',
  future_date_3 + ' ' + '9:00 AM',
  future_date_3 + ' ' + '9:30 AM',
  future_date_3 + ' ' + '10:00 AM',
  future_date_3 + ' ' + '10:30 AM',
  future_date_3 + ' ' + '11:00 AM',
  future_date_3 + ' ' + '11:30 AM',
  future_date_3 + ' ' + '12:00 PM',
  future_date_3 + ' ' + '12:30 PM',
  future_date_3 + ' ' + '1:00 PM',
  future_date_3 + ' ' + '1:30 PM',
  future_date_3 + ' ' + '2:00 PM',
  future_date_3 + ' ' + '2:30 PM',
  future_date_3 + ' ' + '3:00 PM',
  future_date_3 + ' ' + '3:30 PM',
  future_date_3 + ' ' + '4:00 PM',
  future_date_3 + ' ' + '4:30 PM',
  future_date_3 + ' ' + '5:00 PM',
  future_date_3 + ' ' + '5:30 PM',
  future_date_3 + ' ' + '6:00 PM',
  future_date_3 + ' ' + '6:30 PM',
  future_date_3 + ' ' + '7:00 PM',
  future_date_3 + ' ' + '7:30 PM',
  future_date_3 + ' ' + '8:00 PM',
  future_date_3 + ' ' + '8:30 PM',
  future_date_3 + ' ' + '9:00 PM',
  future_date_3 + ' ' + '9:30 PM',
  future_date_3 + ' ' + '10:00 PM',
  future_date_3 + ' ' + '10:30 PM',
  future_date_3 + ' ' + '11:00 PM',
  future_date_3 + ' ' + '11:30 PM',
  future_date_4 + ' ' + '12:00 AM',
  future_date_4 + ' ' + '12:30 AM',
  future_date_4 + ' ' + '1:00 AM',
  future_date_4 + ' ' + '1:30 AM',
  future_date_4 + ' ' + '2:00 AM',
  future_date_4 + ' ' + '2:30 AM',
  future_date_4 + ' ' + '3:00 AM',
  future_date_4 + ' ' + '3:30 AM',
  future_date_4 + ' ' + '4:00 AM',
  future_date_4 + ' ' + '4:30 AM',
  future_date_4 + ' ' + '5:00 AM',
  future_date_4 + ' ' + '5:30 AM',
  future_date_4 + ' ' + '6:00 AM',
  future_date_4 + ' ' + '6:30 AM',
  future_date_4 + ' ' + '7:00 AM',
  future_date_4 + ' ' + '7:30 AM',
  future_date_4 + ' ' + '8:00 AM',
  future_date_4 + ' ' + '8:30 AM',
  future_date_4 + ' ' + '9:00 AM',
  future_date_4 + ' ' + '9:30 AM',
  future_date_4 + ' ' + '10:00 AM',
  future_date_4 + ' ' + '10:30 AM',
  future_date_4 + ' ' + '11:00 AM',
  future_date_4 + ' ' + '11:30 AM',
  future_date_4 + ' ' + '12:00 PM',
  future_date_4 + ' ' + '12:30 PM',
  future_date_4 + ' ' + '1:00 PM',
  future_date_4 + ' ' + '1:30 PM',
  future_date_4 + ' ' + '2:00 PM',
  future_date_4 + ' ' + '2:30 PM',
  future_date_4 + ' ' + '3:00 PM',
  future_date_4 + ' ' + '3:30 PM',
  future_date_4 + ' ' + '4:00 PM',
  future_date_4 + ' ' + '4:30 PM',
  future_date_4 + ' ' + '5:00 PM',
  future_date_4 + ' ' + '5:30 PM',
  future_date_4 + ' ' + '6:00 PM',
  future_date_4 + ' ' + '6:30 PM',
  future_date_4 + ' ' + '7:00 PM',
  future_date_4 + ' ' + '7:30 PM',
  future_date_4 + ' ' + '8:00 PM',
  future_date_4 + ' ' + '8:30 PM',
  future_date_4 + ' ' + '9:00 PM',
  future_date_4 + ' ' + '9:30 PM',
  future_date_4 + ' ' + '10:00 PM',
  future_date_4 + ' ' + '10:30 PM',
  future_date_4 + ' ' + '11:00 PM',
  future_date_4 + ' ' + '11:30 PM',
  future_date_5 + ' ' + '12:00 AM',
  future_date_5 + ' ' + '12:30 AM',
  future_date_5 + ' ' + '1:00 AM',
  future_date_5 + ' ' + '1:30 AM',
  future_date_5 + ' ' + '2:00 AM',
  future_date_5 + ' ' + '2:30 AM',
  future_date_5 + ' ' + '3:00 AM',
  future_date_5 + ' ' + '3:30 AM',
  future_date_5 + ' ' + '4:00 AM',
  future_date_5 + ' ' + '4:30 AM',
  future_date_5 + ' ' + '5:00 AM',
  future_date_5 + ' ' + '5:30 AM',
  future_date_5 + ' ' + '6:00 AM',
  future_date_5 + ' ' + '6:30 AM',
  future_date_5 + ' ' + '7:00 AM',
  future_date_5 + ' ' + '7:30 AM',
  future_date_5 + ' ' + '8:00 AM',
  future_date_5 + ' ' + '8:30 AM',
  future_date_5 + ' ' + '9:00 AM',
  future_date_5 + ' ' + '9:30 AM',
  future_date_5 + ' ' + '10:00 AM',
  future_date_5 + ' ' + '10:30 AM',
  future_date_5 + ' ' + '11:00 AM',
  future_date_5 + ' ' + '11:30 AM',
  future_date_5 + ' ' + '12:00 PM',
  future_date_5 + ' ' + '12:30 PM',
  future_date_5 + ' ' + '1:00 PM',
  future_date_5 + ' ' + '1:30 PM',
  future_date_5 + ' ' + '2:00 PM',
  future_date_5 + ' ' + '2:30 PM',
  future_date_5 + ' ' + '3:00 PM',
  future_date_5 + ' ' + '3:30 PM',
  future_date_5 + ' ' + '4:00 PM',
  future_date_5 + ' ' + '4:30 PM',
  future_date_5 + ' ' + '5:00 PM',
  future_date_5 + ' ' + '5:30 PM',
  future_date_5 + ' ' + '6:00 PM',
  future_date_5 + ' ' + '6:30 PM',
  future_date_5 + ' ' + '7:00 PM',
  future_date_5 + ' ' + '7:30 PM',
  future_date_5 + ' ' + '8:00 PM',
  future_date_5 + ' ' + '8:30 PM',
  future_date_5 + ' ' + '9:00 PM',
  future_date_5 + ' ' + '9:30 PM',
  future_date_5 + ' ' + '10:00 PM',
  future_date_5 + ' ' + '10:30 PM',
  future_date_5 + ' ' + '11:00 PM',
  future_date_5 + ' ' + '11:30 PM',
  future_date_6 + ' ' + '12:00 AM',
  future_date_6 + ' ' + '12:30 AM',
  future_date_6 + ' ' + '1:00 AM',
  future_date_6 + ' ' + '1:30 AM',
  future_date_6 + ' ' + '2:00 AM',
  future_date_6 + ' ' + '2:30 AM',
  future_date_6 + ' ' + '3:00 AM',
  future_date_6 + ' ' + '3:30 AM',
  future_date_6 + ' ' + '4:00 AM',
  future_date_6 + ' ' + '4:30 AM',
  future_date_6 + ' ' + '5:00 AM',
  future_date_6 + ' ' + '5:30 AM',
  future_date_6 + ' ' + '6:00 AM',
  future_date_6 + ' ' + '6:30 AM',
  future_date_6 + ' ' + '7:00 AM',
  future_date_6 + ' ' + '7:30 AM',
  future_date_6 + ' ' + '8:00 AM',
  future_date_6 + ' ' + '8:30 AM',
  future_date_6 + ' ' + '9:00 AM',
  future_date_6 + ' ' + '9:30 AM',
  future_date_6 + ' ' + '10:00 AM',
  future_date_6 + ' ' + '10:30 AM',
  future_date_6 + ' ' + '11:00 AM',
  future_date_6 + ' ' + '11:30 AM',
  future_date_6 + ' ' + '12:00 PM',
  future_date_6 + ' ' + '12:30 PM',
  future_date_6 + ' ' + '1:00 PM',
  future_date_6 + ' ' + '1:30 PM',
  future_date_6 + ' ' + '2:00 PM',
  future_date_6 + ' ' + '2:30 PM',
  future_date_6 + ' ' + '3:00 PM',
  future_date_6 + ' ' + '3:30 PM',
  future_date_6 + ' ' + '4:00 PM',
  future_date_6 + ' ' + '4:30 PM',
  future_date_6 + ' ' + '5:00 PM',
  future_date_6 + ' ' + '5:30 PM',
  future_date_6 + ' ' + '6:00 PM',
  future_date_6 + ' ' + '6:30 PM',
  future_date_6 + ' ' + '7:00 PM',
  future_date_6 + ' ' + '7:30 PM',
  future_date_6 + ' ' + '8:00 PM',
  future_date_6 + ' ' + '8:30 PM',
  future_date_6 + ' ' + '9:00 PM',
  future_date_6 + ' ' + '9:30 PM',
  future_date_6 + ' ' + '10:00 PM',
  future_date_6 + ' ' + '10:30 PM',
  future_date_6 + ' ' + '11:00 PM',
  future_date_6 + ' ' + '11:30 PM',
  future_date_7 + ' ' + '12:00 AM',
  future_date_7 + ' ' + '12:30 AM',
  future_date_7 + ' ' + '1:00 AM',
  future_date_7 + ' ' + '1:30 AM',
  future_date_7 + ' ' + '2:00 AM',
  future_date_7 + ' ' + '2:30 AM',
  future_date_7 + ' ' + '3:00 AM',
  future_date_7 + ' ' + '3:30 AM',
  future_date_7 + ' ' + '4:00 AM',
  future_date_7 + ' ' + '4:30 AM',
  future_date_7 + ' ' + '5:00 AM',
  future_date_7 + ' ' + '5:30 AM',
  future_date_7 + ' ' + '6:00 AM',
  future_date_7 + ' ' + '6:30 AM',
  future_date_7 + ' ' + '7:00 AM',
  future_date_7 + ' ' + '7:30 AM',
  future_date_7 + ' ' + '8:00 AM',
  future_date_7 + ' ' + '8:30 AM',
  future_date_7 + ' ' + '9:00 AM',
  future_date_7 + ' ' + '9:30 AM',
  future_date_7 + ' ' + '10:00 AM',
  future_date_7 + ' ' + '10:30 AM',
  future_date_7 + ' ' + '11:00 AM',
  future_date_7 + ' ' + '11:30 AM',
  future_date_7 + ' ' + '12:00 PM',
  future_date_7 + ' ' + '12:30 PM',
  future_date_7 + ' ' + '1:00 PM',
  future_date_7 + ' ' + '1:30 PM',
  future_date_7 + ' ' + '2:00 PM',
  future_date_7 + ' ' + '2:30 PM',
  future_date_7 + ' ' + '3:00 PM',
  future_date_7 + ' ' + '3:30 PM',
  future_date_7 + ' ' + '4:00 PM',
  future_date_7 + ' ' + '4:30 PM',
  future_date_7 + ' ' + '5:00 PM',
  future_date_7 + ' ' + '5:30 PM',
  future_date_7 + ' ' + '6:00 PM',
  future_date_7 + ' ' + '6:30 PM',
  future_date_7 + ' ' + '7:00 PM',
  future_date_7 + ' ' + '7:30 PM',
  future_date_7 + ' ' + '8:00 PM',
  future_date_7 + ' ' + '8:30 PM',
  future_date_7 + ' ' + '9:00 PM',
  future_date_7 + ' ' + '9:30 PM',
  future_date_7 + ' ' + '10:00 PM',
  future_date_7 + ' ' + '10:30 PM',
  future_date_7 + ' ' + '11:00 PM',
  future_date_7 + ' ' + '11:30 PM',
];

const seasonName = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Home: React.FC<BrowserRouterProps> = () => {
  const theme = useTheme();
  const [birdName, setBirdName] = React.useState<string[]>([]);
  const [foodName, setFoodName] = React.useState<string[]>([]);
  const [timeStartTime, setTimeStartTime] = React.useState<string[]>([]);
  const [timeEndTime, setTimeEndTime] = React.useState<string[]>([]);
  const [season, setSeason] = React.useState<string[]>([]);

  const handleChange_birdName = (event: SelectChangeEvent<typeof birdName>) => {
    const {
      target: { value },
    } = event;
    setBirdName(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChange_FoodName = (event: SelectChangeEvent<typeof foodName>) => {
    const {
      target: { value },
    } = event;
    setFoodName(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChange_timeStart = (event: SelectChangeEvent<typeof timeStartTime>) => {
    const {
      target: { value },
    } = event;
    setTimeStartTime(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChange_timeEnd = (event: SelectChangeEvent<typeof timeEndTime>) => {
    const {
      target: { value },
    } = event;
    setTimeEndTime(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChange_season = (event: SelectChangeEvent<typeof season>) => {
    const {
      target: { value },
    } = event;
    setSeason(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  return (
    <div style={{background: "white", border: '.5px solid black'}}>
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={12} xl={3}>
          <div>
            <h2>Bird Type</h2>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Bird Type</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={birdName}
                onChange={handleChange_birdName}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
              {birdTypes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, birdName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <h2>Food Type</h2>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Food Type</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={foodName}
                onChange={handleChange_FoodName}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
              {foodTypes.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, foodName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <h2>Time Start (Current Date)</h2>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Time Start</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={timeStartTime}
                onChange={handleChange_timeStart}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
              {timeStart.map((time) => (
                <MenuItem
                  key={time}
                  value={time}
                  style={getStyles(time, timeStartTime, theme)}
                >
                  {time}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <h2>Time End (Next 7 Days)</h2>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Time End</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={timeEndTime}
                onChange={handleChange_timeEnd}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
              {timeEnd.map((time) => (
                <MenuItem
                  key={time}
                  value={time}
                  style={getStyles(time, timeEndTime, theme)}
                >
                  {time}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <h2>Season</h2>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Season</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={season}
                onChange={handleChange_season}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
              {seasonName.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, seasonName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
              </Select>
              <br /> <br /> <br /> <br />
            </FormControl> 
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Home);