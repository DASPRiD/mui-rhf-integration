import type { RhfRadioGroupProps } from "@/RhfRadioGroup.tsx";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RhfRadioGroup } from "../src";
import { createInitTest } from "./initTest";

type TestFormValues = {
    foo: string;
};

const initTest = createInitTest<
    Omit<RhfRadioGroupProps<TestFormValues>, "name" | "control" | "label" | "options">,
    TestFormValues
>((control, props) => (
    <RhfRadioGroup
        control={control}
        name="foo"
        label="Test checkbox group"
        options={[
            { value: "foo", label: "Foo" },
            { value: "bar", label: "Bar" },
        ]}
        {...props}
    />
));

describe("RhfRadioGroup", () => {
    it("should treat undefined as empty value", () => {
        initTest();

        expect(screen.getByLabelText("Foo")).not.toBeChecked();
        expect(screen.getByLabelText("Bar")).not.toBeChecked();
    });

    it("should treat null as empty value", () => {
        initTest(undefined, { foo: null });

        expect(screen.getByLabelText("Foo")).not.toBeChecked();
        expect(screen.getByLabelText("Bar")).not.toBeChecked();
    });

    it("should use default value", () => {
        initTest(undefined, { foo: "bar" });

        expect(screen.getByLabelText("Foo")).not.toBeChecked();
        expect(screen.getByLabelText("Bar")).toBeChecked();
    });

    it("should throw error when receiving invalid default value", () => {
        vi.spyOn(console, "error").mockImplementation(() => null);

        expect(() => {
            initTest(undefined, { foo: 1 });
        }).toThrow(new Error("RhfRadioGroup value must be string, null or undefined"));
    });

    it("should set value", async () => {
        const form = initTest();

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Bar"));

        expect(form.getValues().foo).toBe("bar");
    });

    it("should switch value", async () => {
        const form = initTest(undefined, { foo: "bar" });

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Foo"));

        expect(form.getValues().foo).toBe("foo");
    });

    it("should display helper text without error", () => {
        initTest({
            helperText: "Helper text",
        });

        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should display error", async () => {
        initTest({
            helperText: "Helper text",
            rules: {
                validate: {
                    error: () => "Required",
                },
            },
        });

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Required")).toBeInTheDocument();
        });

        expect(screen.getByText("Test checkbox group")).toHaveClass("Mui-error");
    });
});
