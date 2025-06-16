import { FC } from 'react';

interface DateRangePickerProps {
  dateRange: {
    start: string;
    end: string;
  };
  setDateRange: (range: { start: string; end: string }) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="rounded border bg-gray-700 px-2 py-1 text-sm"
        max={dateRange.end}
      />
      <span>to</span>
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="rounded border bg-gray-700 px-2 py-1 text-sm"
        min={dateRange.start}
      />
    </div>
  );
};

export default DateRangePicker;
