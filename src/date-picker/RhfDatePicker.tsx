import type { TextFieldProps } from "@mui/material";
import type { DatePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfDatePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = TFieldValues,
> = Omit<DatePickerProps<boolean>, "error" | "onChange" | "value" | "renderInput"> & {
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<NoInfer<TFieldValues>, NoInfer<TName>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    textFieldProps?: Omit<
        TextFieldProps,
        "label" | "error" | "onChange" | "onBlur" | "value" | "inputRef"
    >;
};

const RhfDatePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = TFieldValues,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...datePickerProps
}: RhfDatePickerProps<TFieldValues, TName, TContext, TTransformedValues>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as PickerValidDate | null | undefined;

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
