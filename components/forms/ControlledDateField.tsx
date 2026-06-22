import { DateTimePicker, Host } from '@expo/ui/jetpack-compose';

import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

interface ControlledDateFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: { message?: string } | any;
  required?: boolean;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  rules?: any;
}

const pad = (value: number) => value.toString().padStart(2, '0');

/** Parses a 'YYYY-MM-DD' or 'DD-MM-YYYY' string to a Date object, or returns today. */
const parseToDate = (value?: string): Date => {
  if (value) {
    const parts = value.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        const [year, month, day] = parts.map(Number);
        if (year && month && day) return new Date(year, month - 1, day);
      } else {
        const [day, month, year] = parts.map(Number);
        if (year && month && day) return new Date(year, month - 1, day);
      }
    }
  }
  return new Date();
};

/** Formats a Date to 'YYYY-MM-DD' (Backend format). */
const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Formats a Date to 'DD-MM-YYYY' (Display format). */
const displayFormatDate = (date: Date): string =>
  `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;

export default function ControlledDateField({
  control,
  name,
  label,
  error,
  required = false,
  placeholder = 'Select date',
  minYear = 2020,
  maxYear = new Date().getFullYear() + 5,
  rules,
}: ControlledDateFieldProps) {
  return (
    <View className="mb-5">
      {label ? (
        <Text className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      ) : null}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DateFieldControl
            error={error}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            minYear={minYear}
            maxYear={maxYear}
          />
        )}
      />

      {error ? (
        <Text className="ml-1 mt-1 text-xs text-red-500">{error.message}</Text>
      ) : null}
    </View>
  );
}

export function DateFieldControl({
  value,
  onChange,
  placeholder,
  label,
  error,
  minYear = 2020,
  maxYear = new Date().getFullYear() + 5,
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  error?: { message?: string } | any;
  minYear?: number;
  maxYear?: number;
}) {
  const [open, setOpen] = useState(false);
  // Temp date used while picker is open (so we can confirm/cancel on iOS)
  const [tempDate, setTempDate] = useState<Date>(parseToDate(value));
    const [selectedDate, setSelectedDate] = useState(new Date());

  // Pre-fill with today's date if no value is provided
  useEffect(() => {
    if (!value) {
      onChange(formatDate(new Date()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minDate = new Date(minYear, 0, 1);
  const maxDate = new Date(Date.now());

  const handleOpen = () => {
    setTempDate(parseToDate(value));
    setOpen(true);
  };


  const handleIOSConfirm = () => {
    onChange(formatDate(tempDate));
    setOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setOpen(false);
  };

  return (
    <>
    <Host matchContents={{ vertical: true }} style={{ width: '100%' }}>
      <DateTimePicker
        onDateSelected={date => {
          setSelectedDate(date);
        }}
        displayedComponents="date"
        initialDate={selectedDate.toISOString()}
        variant="picker"
      />
    </Host>
    </>
  );
}
