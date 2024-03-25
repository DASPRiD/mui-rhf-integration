import type { AutocompleteProps, AutocompleteValue, TextFieldProps } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import type { ReactNode } from "react";
import type { Control } from "react-hook-form";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

export type RhfAutocompleteProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "error" | "onChange" | "onBlur" | "value" | "renderInput"
> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<TFieldValues, TName>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    textFieldProps?: Omit<TextFieldProps, "error" | "onChange" | "onBlur" | "value" | "inputRef">;
    valueToOption?: (value: unknown) => T | undefined | null;
    optionToValue?: (option: T) => unknown;
};

const RhfAutocomplete = <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    multiple,
    valueToOption,
    optionToValue,
    loading,
    ...rest
}: RhfAutocompleteProps<
    T,
    Multiple,
    DisableClearable,
    FreeSolo,
    TFieldValues,
    TName
>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as unknown;

    if (value === undefined) {
        value = null;
    } else if (value && valueToOption) {
        if (loading) {
            value = [];
        } else if (multiple) {
            /* c8 ignore next */
            if (!Array.isArray(value)) {
                console.warn("Received a non-array value for a multiple Autocomplete");
                value = [];
            }

            value = (value as unknown[])
                .map(valueToOption)
                .filter((value) => value !== undefined && value !== null);
        } else if (!multiple) {
            value = valueToOption(value);
        }
    }

    return (
        <Autocomplete
            onChange={(_event, value) => {
                if (!(optionToValue && (value as unknown))) {
                    field.onChange(value);
                    return;
                }

                if (!multiple) {
                    field.onChange(optionToValue(value as T));
                    return;
                }

                if (Array.isArray(value)) {
                    field.onChange(value.map(optionToValue));
                    return;
                }

                /* c8 ignore next */
                console.warn("Autocomplete is set to multiple but value is an not array");
            }}
            value={value as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>}
            multiple={multiple}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...textFieldProps}
                    {...params}
                    error={Boolean(fieldState.error)}
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
