import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GreetingsDateInput = forwardRef(({ value, onClick }, ref) => (
  <div className="position-relative">
    <Form.Control
      size="sm"
      ref={ref}
      onClick={onClick}
      value={value}
      className="ps-4"
      readOnly
    />
    <FontAwesomeIcon
      icon="calendar-alt"
      className="text-primary position-absolute top-50 translate-middle-y ms-2"
    />
  </div>
));

const GreetingsDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [rangeType, setRangeType] = useState('Week');

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleRangeChange = e => {
    const value = e.target.value;
    setRangeType(value);

    const today = new Date();
    if (value === 'Week') {
      setStartDate(today);
      setEndDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7));
    } else if (value === 'Month') {
      setStartDate(today);
      setEndDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30));
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <Form.Select size="sm" value={rangeType} onChange={handleRangeChange} style={{ width: 'auto' }}>
        <option value="Week">Last Week</option>
        <option value="Month">Last Month</option>
        <option value="Custom">Custom Date</option>
      </Form.Select>

      {rangeType === 'Custom' && (
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="MMM dd"
          formatWeekDay={day => day.slice(0, 3)}
          customInput={<GreetingsDateInput />}
        />
      )}
    </div>
  );
};

GreetingsDateInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default GreetingsDate;
