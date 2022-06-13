import type {TextFieldProps} from '@mui/material';
import {TextField} from '@mui/material';
import type {TimePickerProps} from '@mui/x-date-pickers';
import {lazy, Suspense} from 'react';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type RhfTimePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TimePickerProps, 'error' | 'onChange' | 'value' | 'renderInput'> & {
    control : Control<TFieldValues>;
    name : TName;
    rules ?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    textFieldProps ?: Omit<TextFieldProps, 'label' | 'error' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
};

const LazyTimePicker = lazy(
    async () => import('@mui/x-date-pickers/TimePicker').then(module => ({default: module.TimePicker}))
);

const RhfTimePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...datePickerProps
} : RhfTimePickerProps<TFieldValues, TName>) : JSX.Element => {
    const {field, fieldState} = useController({control, name, rules});
    let value = field.value as unknown;

    if (value === undefined) {
        value = null;
    }

    return (
        <Suspense fallback={<TextField {...textFieldProps} disabled/>}>
            <LazyTimePicker
                {...datePickerProps}
                onChange={field.onChange}
                value={value}
                renderInput={params => (
                    <TextField
                        {...textFieldProps}
                        {...params}
                        error={Boolean(fieldState.error)}
                        onBlur={field.onBlur}
                        helperText={fieldState.error?.message ?? textFieldProps?.helperText}
                        inputRef={field.ref}
                    />
                )}
            />
        </Suspense>
    );
};

export default RhfTimePicker;
