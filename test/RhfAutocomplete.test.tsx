import type { RhfAutocompleteProps } from "../src";
import { RhfAutocomplete } from "../src";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { createInitTest } from "./initTest";
import type { ChipTypeMap } from "@mui/material";

type TestFormValues = {
    foo: string;
};

const initTest = createInitTest<
    Omit<
        RhfAutocompleteProps<string, false, false, false, ChipTypeMap['defaultComponent'], TestFormValues>,
        "name" | "control" | "options"
    >,
    TestFormValues
>((control, props) => (
    <RhfAutocomplete control={control} name="foo" options={["foo", "bar"]} {...props} />
));

type Entity = {
    id: string;
    label: string;
};

const entityOptions = [
    { id: "1", label: "foo" },
    { id: "2", label: "bar" },
];

const initEntitySingleTest = createInitTest<
    Omit<
        RhfAutocompleteProps<Entity, false, false, false, ChipTypeMap['defaultComponent'], TestFormValues>,
        "name" | "control" | "options"
    >,
    TestFormValues
>((control, props) => (
    <RhfAutocomplete control={control} name="foo" options={entityOptions} {...props} />
));

const initEntityMultipleTest = createInitTest<
    Omit<
        RhfAutocompleteProps<Entity, true, false, false, ChipTypeMap['defaultComponent'], TestFormValues>,
        "name" | "control" | "options"
    >,
    TestFormValues
>((control, props) => (
    <RhfAutocomplete control={control} name="foo" options={entityOptions} {...props} />
));

describe("RhfAutocomplete", () => {
    it("should treat undefined as empty value", () => {
        initTest({
            textFieldProps: {
                label: "Test field",
            },
        });

        expect(screen.getByLabelText("Test field")).toHaveValue("");
    });

    it("should treat null as empty value", () => {
        initTest(
            {
                textFieldProps: {
                    label: "Test field",
                },
            },
            {
                foo: null,
            },
        );

        expect(screen.getByLabelText("Test field")).toHaveValue("");
    });

    it("should use default value", () => {
        initTest(
            {
                textFieldProps: {
                    label: "Test field",
                },
            },
            {
                foo: "foo",
            },
        );

        expect(screen.getByLabelText("Test field")).toHaveValue("foo");
    });

    it("should change value", async () => {
        const form = initTest({
            textFieldProps: {
                label: "Test field",
            },
        });

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test field"));
        await user.keyboard("bar");
        await user.keyboard("{ArrowDown}");
        await user.keyboard("{Enter}");

        expect(form.getValues().foo).toBe("bar");
    });

    it("should handle single value transformation", async () => {
        const form = initEntitySingleTest(
            {
                textFieldProps: {
                    label: "Test field",
                },
                optionToValue: (option) => option.id,
                valueToOption: (value) => entityOptions.find((option) => option.id === value),
            },
            {
                foo: "1",
            },
        );

        expect(screen.getByLabelText("Test field")).toHaveValue("foo");

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test field"));
        await user.keyboard("bar");
        await user.keyboard("{ArrowDown}");
        await user.keyboard("{Enter}");

        expect(form.getValues().foo).toBe("2");
    });

    it("should handle multiple value transformation", async () => {
        const form = initEntityMultipleTest(
            {
                textFieldProps: {
                    label: "Test field",
                },
                optionToValue: (option) => option.id,
                valueToOption: (value) => entityOptions.find((option) => option.id === value),
                multiple: true,
            },
            {
                foo: ["1"],
            },
        );

        expect(screen.getByLabelText("Test field").parentNode).toHaveTextContent("foo");

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test field"));
        await user.keyboard("bar");
        await user.keyboard("{ArrowDown}");
        await user.keyboard("{Enter}");

        expect(form.getValues().foo).toEqual(["1", "2"]);
    });

    it("should display helper text without error", () => {
        initTest({
            textFieldProps: {
                helperText: "Helper text",
            },
        });

        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should display error", async () => {
        initTest({
            textFieldProps: {
                label: "Test field",
                helperText: "Helper text",
            },
            rules: {
                required: "Required",
            },
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Required")).toBeInTheDocument();
        });

        expect(screen.getByLabelText("Test field")).toHaveFocus();
        expect(screen.getByLabelText("Test field").parentNode).toHaveClass("Mui-error");
    });
});
