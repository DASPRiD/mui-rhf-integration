import type { SwitchProps } from "@mui/material";
import { Switch } from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfSwitchProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = FieldValues,
> = Omit<SwitchProps, "checked" | "onChange" | "onBlur" | "value" | "ref"> & {
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: TName;
};

const RhfSwitch = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = FieldValues,
>({
    control,
    name,
    ...rest
}: RhfSwitchProps<TFieldValues, TName, TContext, TTransformedValues>): ReactNode => {
    const { field } = useController({ control, name });
    let value = field.value as unknown;

    if (value === undefined || value === null) {
        value = false;
    } else if (typeof value !== "boolean") {
        throw new Error("RhfSwitch value must be boolean, null or undefined");
    }

    return (
        <Switch
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

export default RhfSwitch;
