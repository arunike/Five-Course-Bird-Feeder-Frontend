import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const RECENT_7_DAYS: [moment.Moment, moment.Moment] = [
  moment().subtract(7, 'days'),
  moment().subtract(1, 'days'),
];

const LastWeekDatePicker = (onChange: (dates: any, dateStrings: [string, string]) => void) => (
  <RangePicker
    value={RECENT_7_DAYS}
    format='YYYY-MM-DD'
    onChange={onChange}
    allowClear={false}
  />
);

export default LastWeekDatePicker;
