import type { TextFieldProps } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { format } from "date-fns";
import type { ReactNode } from "react";
import type { Control, RegisterOptions } from "react-hook-form";
import { expect, it } from "vitest";
import { createInitTest } from "./initTest";

type TestFormValues = {
    foo: Date;
};

type RenderProps = {
    label?: string;
    textFieldProps?: TextFieldProps;
    rules?: Omit<
        RegisterOptions<TestFormValues, "foo">,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
};

type RenderComponent = (control: Control<TestFormValues>, props?: RenderProps) => ReactNode;

export const runGenericDateTimeTest = (
    renderComponent: RenderComponent,
    validDefaultValue: Date,
    expectedTextValue: string,
    formatString: string,
): void => {
    const initTest = createInitTest<RenderProps, TestFormValues>((control, props) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {renderComponent(control, { label: "Test field", ...props })}
        </LocalizationProvider>
    ));

    const getTestFieldValue = async (): Promise<string> => {
        const testField = await waitFor(() =>
            screen.getByLabelText<HTMLInputElement>("Test field"),
        );
        return testField.value;
    };

    it("should treat undefined as empty value", async () => {
        initTest();

        expect(await getTestFieldValue()).toEqual("");
    });

    it("should treat null as empty value", async () => {
        initTest(undefined, {
            foo: null,
        });

        expect(await getTestFieldValue()).toEqual("");
    });

    it("should use default value", async () => {
        initTest(undefined, {
            foo: validDefaultValue,
        });

        expect((await getTestFieldValue()).toLowerCase()).toEqual(expectedTextValue);
    });

    it("should change value", async () => {
        const form = initTest();

        const testField = await waitFor(() => screen.getByLabelText("Test field"));
        const user = userEvent.setup();
        await user.click(testField);
        await user.keyboard(expectedTextValue);

        expect(format(form.getValues().foo, formatString)).toBe(expectedTextValue);
    });

    it("should display helper text without error", async () => {
        initTest({
            textFieldProps: {
                helperText: "Helper text",
            },
        });

        await waitFor(() => screen.getByLabelText("Test field"));
        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should display error", async () => {
        initTest({
            textFieldProps: {
                helperText: "Helper text",
            },
            rules: {
                required: "Required",
            },
        });

        const testField = await waitFor(() => screen.getByLabelText("Test field"));
        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Required")).toBeInTheDocument();
        });

        expect(testField).toHaveFocus();
        expect(testField.parentNode).toHaveClass("Mui-error");
    });
};
