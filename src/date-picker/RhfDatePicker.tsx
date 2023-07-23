import type {TextFieldProps} from '@mui/material';
import type {DatePickerProps} from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type RhfDatePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps<unknown>, 'error' | 'onChange' | 'value' | 'renderInput'> & {
    control : Control<TFieldValues>;
    name : TName;
    rules ?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    textFieldProps ?: Omit<TextFieldProps, 'label' | 'error' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
};

const RhfDatePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...datePickerProps
} : RhfDatePickerProps<TFieldValues, TName>) : JSX.Element => {
    const {field, fieldState} = useController({control, name, rules});
    let value = field.value as unknown;

    if (value === undefined) {
        value = null;
    }

    return (
        <DatePicker
            {...datePickerProps}
            onChange={field.onChange}
            value={value}
            inputRef={field.ref}
            slotProps={{
                ...datePickerProps.slotProps,
                textField: {
                    ...textFieldProps,
                    error: Boolean(fieldState.error),
                    onBlur: field.onBlur,
                    helperText: fieldState.error?.message ?? textFieldProps?.helperText,
                },
            }}
        />
    );
};

export default RhfDatePicker;
