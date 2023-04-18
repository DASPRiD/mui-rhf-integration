import type {TextFieldProps} from '@mui/material';
import type {DateTimePickerProps} from '@mui/x-date-pickers';
import {DateTimePicker} from '@mui/x-date-pickers';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type RhfDateTimePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateTimePickerProps<unknown>, 'error' | 'onChange' | 'value' | 'renderInput'> & {
    control : Control<TFieldValues>;
    name : TName;
    rules ?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    textFieldProps ?: Omit<TextFieldProps, 'label' | 'error' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
};

const RhfDateTimePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...datePickerProps
} : RhfDateTimePickerProps<TFieldValues, TName>) : JSX.Element => {
    const {field, fieldState} = useController({control, name, rules});
    let value = field.value as unknown;

    if (value === undefined) {
        value = null;
    }

    return (
        <DateTimePicker
            {...datePickerProps}
            onChange={field.onChange}
            value={value}
            inputRef={field.ref}
            slotProps={{
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

export default RhfDateTimePicker;
