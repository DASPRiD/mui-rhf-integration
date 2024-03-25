import type { TextFieldProps } from "@mui/material";
import type { DateTimePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfDateTimePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DateTimePickerProps<PickerValidDate>, "error" | "onChange" | "value" | "renderInput"> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<TFieldValues, TName>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    textFieldProps?: Omit<
        TextFieldProps,
        "label" | "error" | "onChange" | "onBlur" | "value" | "inputRef"
    >;
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
}: RhfDateTimePickerProps<TFieldValues, TName>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as PickerValidDate | null | undefined;

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

export default RhfDateTimePicker;
