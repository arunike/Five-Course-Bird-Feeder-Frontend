import React from 'react';
import { DateRangePicker, DateRangeValue } from 'tdesign-react';
import dayjs from 'dayjs';

const RECENT_7_DAYS: DateRangeValue = [
  dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
];

const LastWeekDatePicker = (onChange: (value: DateRangeValue) => void) => (
  <DateRangePicker
    mode='date'
    placeholder={['Start Time', 'Start Time']}
    value={RECENT_7_DAYS}
    format='YYYY-MM-DD'
    onChange={(value) => onChange(value)}
  />
);

export default LastWeekDatePicker;
