import type { FormControlProps, FormGroupProps, FormLabelProps } from "@mui/material";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type CheckboxOption = {
    value: string;
    label: ReactNode;
};

export type RhfCheckboxGroupProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormControlProps<"fieldset">, "error" | "component" | "ref"> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<TFieldValues, TName>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    label: string;
    options: CheckboxOption[];
    helperText?: string;
    formLabelProps?: Omit<FormLabelProps<"legend">, "component">;
    formGroupProps?: FormGroupProps;
};

const RhfCheckboxGroup = <
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
    formGroupProps,
    ...formControlProps
}: RhfCheckboxGroupProps<TFieldValues, TName>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let selectedValues = field.value as unknown;

    if (selectedValues === undefined || selectedValues === null) {
        selectedValues = [];
    } else if (!Array.isArray(selectedValues)) {
        throw new Error("RhfCheckboxGroup value must be array, null or undefined");
    }

    const handleChange = (value: string, checked: boolean) => {
        if (!checked) {
            field.onChange(
                (selectedValues as string[]).filter((selectedValue) => selectedValue !== value),
            );
            return;
        }

        field.onChange([...(selectedValues as string[]), value]);
    };

    return (
        <FormControl
            error={fieldState.invalid}
            component="fieldset"
            variant="standard"
            ref={field.ref}
            {...formControlProps}
        >
            <FormLabel component="legend" {...formLabelProps}>
                {label}
            </FormLabel>
            <FormGroup {...formGroupProps}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        name={option.value}
                        checked={(selectedValues as string[]).includes(option.value)}
                        onChange={(_event, checked) => {
                            handleChange(option.value, checked);
                        }}
                        control={<Checkbox />}
                        label={option.label}
                    />
                ))}
            </FormGroup>
            {(helperText || fieldState.error) && (
                <FormHelperText>{fieldState.error?.message ?? helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

export default RhfCheckboxGroup;
