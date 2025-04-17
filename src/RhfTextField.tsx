import type { TextFieldProps } from "@mui/material";
import { Box, TextField } from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { useController } from "react-hook-form";

export type RhfTextFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = FieldValues,
> = Omit<TextFieldProps, "error" | "onChange" | "onBlur" | "value" | "inputRef"> & {
    control: Control<TFieldValues, TContext, TTransformedValues>;
    name: TName;
    rules?: Omit<
        RegisterOptions<NoInfer<TFieldValues>, NoInfer<TName>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    maxCharacters?: number;
};

const RhfTextField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    // biome-ignore lint/suspicious/noExplicitAny: defined by RHF
    TContext = any,
    TTransformedValues = FieldValues,
>({
    control,
    name,
    rules,
    maxCharacters,
    ...rest
}: RhfTextFieldProps<TFieldValues, TName, TContext, TTransformedValues>): ReactNode => {
    const { field, fieldState } = useController({ control, name, rules });
    let value = field.value as unknown;

    if (value === undefined || value === null) {
        value = "";
    } else if (typeof value !== "string") {
        throw new Error("RhfTextField value must be string, null or undefined");
    }

    let helperText = fieldState.error?.message ?? rest.helperText;

    if (maxCharacters !== undefined) {
        helperText = (
            <Box component="span" sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>{helperText}</span>
                <span>
                    {(value as string).length}/{maxCharacters}
                </span>
            </Box>
        );
    }

    return (
        <TextField
            {...rest}
            name={name}
            error={Boolean(fieldState.error)}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={value}
            inputRef={field.ref}
            helperText={helperText}
        />
    );
};

export default RhfTextField;
