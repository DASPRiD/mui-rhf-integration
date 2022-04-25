import type {AutocompleteProps, AutocompleteValue, TextFieldProps} from '@mui/material';
import {Autocomplete, TextField} from '@mui/material';
import type {ChipTypeMap} from '@mui/material/Chip';
import type * as React from 'react';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';

export type RhfAutocompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    'error' | 'onChange' | 'onBlur' | 'value' | 'renderInput'
> & {
    control : Control<TFieldValues>;
    name : TName;
    rules ?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    textFieldProps ?: Omit<TextFieldProps, 'error' | 'onChange' | 'onBlur' | 'value' | 'inputRef'>;
};

const RhfAutocomplete = <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...rest
} : RhfAutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent,
    TFieldValues,
    TName
>) : JSX.Element => {
    const {field, fieldState} = useController({control, name, rules});
    let value = field.value as unknown;

    if (value === undefined) {
        value = null;
    }

    return (
        <Autocomplete
            onChange={field.onChange}
            value={value as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>}
            renderInput={params => (
                <TextField
                    {...textFieldProps}
                    {...params}
                    error={fieldState.invalid}
                    onBlur={field.onBlur}
                    helperText={fieldState.error?.message ?? textFieldProps?.helperText}
                    inputRef={field.ref}
                />
            )}
            {...rest}
        />
    );
};

export default RhfAutocomplete;
