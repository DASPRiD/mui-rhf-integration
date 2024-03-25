import type { FormControlProps, FormLabelProps, RadioGroupProps } from "@mui/material";
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type RadioOption = {
    value: string;
    label: ReactNode;
};

export type RhfRadioGroupProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormControlProps, "error" | "ref"> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<TFieldValues, TName>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    label: string;
    options: RadioOption[];
    helperText?: string;
    formLabelProps?: FormLabelProps;
    radioGroupProps?: Omit<RadioGroupProps, "name" | "onChange" | "onBlur" | "value">;
};

const RhfRadioGroup = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    rules,
    label,
    options,
    helperText,
    formLabelProps,
    radioGroupProps,
    ...formControlProps
}: RhfRadioGroupProps<TFieldValues, TName>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as unknown;

    if (value === undefined || value === null) {
        value = null;
    } else if (typeof value !== "string") {
        throw new Error("RhfRadioGroup value must be string, null or undefined");
    }

    return (
        <FormControl
            error={Boolean(fieldState.error)}
            variant="standard"
            ref={field.ref}
            {...formControlProps}
        >
            <FormLabel {...formLabelProps}>{label}</FormLabel>
            <RadioGroup
                {...radioGroupProps}
                name={name}
                onChange={(_event, value) => {
                    field.onChange(value);
                }}
                onBlur={field.onBlur}
                value={value}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {(helperText || fieldState.error) && (
                <FormHelperText>{fieldState.error?.message ?? helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default RhfRadioGroup;
