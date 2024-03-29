import type { CheckboxProps } from "@mui/material";
import { Checkbox } from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfCheckboxProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<CheckboxProps, "checked" | "onChange" | "onBlur" | "value" | "ref"> & {
    control: Control<TFieldValues>;
    name: TName;
};

const RhfCheckbox = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    control,
    name,
    ...rest
}: RhfCheckboxProps<TFieldValues, TName>): ReactNode => {
    const { field } = useController({ control, name });
    let value = field.value as unknown;

    if (value === undefined || value === null) {
        value = false;
    } else if (typeof value !== "boolean") {
        throw new Error("RhfCheckbox value must be boolean, null or undefined");
    }

    return (
        <Checkbox
            checked={value as boolean}
            onChange={(_event, checked) => {
                field.onChange(checked);
            }}
            onBlur={field.onBlur}
            ref={field.ref}
            {...rest}
        />
    );
};

export default RhfCheckbox;
