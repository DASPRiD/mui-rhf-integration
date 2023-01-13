import type {TextFieldProps} from '@mui/material';
import {TextField} from '@mui/material';
import type {DatePickerProps} from '@mui/x-date-pickers';
import {lazy, Suspense} from 'react';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type RhfDatePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DatePickerProps<unknown, unknown>, 'error' | 'onChange' | 'value' | 'renderInput'> & {
    control : Control<TFieldValues>;
    name : TName;
    rules ?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    textFieldProps ?: Omit<TextFieldProps, 'label' | 'error' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
};

const LazyDatePicker = lazy(
    async () => import('@mui/x-date-pickers/DatePicker')
        .then(module => ({default: module.DatePicker}))
        .catch(() => {
            /* istanbul ignore next */
            console.error('You must install @mui/x-date-pickers in order to use RhfDatePicker');
            /* istanbul ignore next */
            throw new Error('Failed to load @mui/x-date-pickers');
        })
);

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
        <Suspense fallback={<TextField {...textFieldProps} disabled/>}>
            <LazyDatePicker
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
                        inputRef={ref => {
                            if (params.inputRef instanceof Function) {
                                params.inputRef(ref as HTMLInputElement);
                            }

                            field.ref(ref);
                        }}
                    />
                )}
            />
        </Suspense>
    );
};

export default RhfDatePicker;
