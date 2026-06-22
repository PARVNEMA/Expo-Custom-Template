import React, { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { DateFieldControl } from './ControlledDateField';

interface DatePickerInputProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
}

export default function DatePickerInput({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  minYear = 2020,
  maxYear = new Date().getFullYear() + 5,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  const yearOptions = useMemo(() => {
    const years: number[] = [];
    for (let year = maxYear; year >= minYear; year -= 1) {
      years.push(year);
    }
    return years;
  }, [maxYear, minYear]);

  return (
    <View className="mb-4">
      {label ? (
        <Text className="mb-2 text-[11px] font-bold uppercase  text-text-secondary">
          {label}
        </Text>
      ) : null}
      <DateFieldControl
        value={value}
        onChange={onChange}
        open={open}
        setOpen={setOpen}
        placeholder={placeholder}
        label={label}
        yearOptions={yearOptions}
      />
    </View>
  );
}
