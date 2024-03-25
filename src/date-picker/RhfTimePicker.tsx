import type { TextFieldProps } from "@mui/material";
import type { PickerValidDate, TimePickerProps } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfTimePickerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<TimePickerProps<PickerValidDate>, "error" | "onChange" | "value" | "renderInput"> & {
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

const RhfTimePicker = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    textFieldProps,
    ...datePickerProps
}: RhfTimePickerProps<TFieldValues, TName>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as PickerValidDate | null | undefined;

    if (value === undefined) {
        value = null;
    }

    return (
        <TimePicker
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

export default RhfTimePicker;
