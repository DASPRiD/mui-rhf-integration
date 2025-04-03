import type { RhfTextFieldProps } from "../src";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RhfTextField } from "../src";
import { createInitTest } from "./initTest";

type TestFormValues = {
    foo: string;
};

const initTest = createInitTest<
    Omit<RhfTextFieldProps<TestFormValues>, "name" | "control">,
    TestFormValues
>((control, props) => <RhfTextField control={control} name="foo" {...props} />);

describe("RhfTextField", () => {
    it("should treat undefined as empty value", () => {
        initTest({
            label: "Test field",
        });

        expect(screen.getByLabelText("Test field")).toHaveValue("");
    });

    it("should treat null as empty value", () => {
        initTest(
            {
                label: "Test field",
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
                label: "Test field",
            },
            {
                foo: "foo",
            },
        );

        expect(screen.getByLabelText("Test field")).toHaveValue("foo");
    });

    it("should throw error when receiving invalid default value", () => {
        vi.spyOn(console, "error").mockImplementation(() => null);

        expect(() => {
            initTest(undefined, { foo: 1 });
        }).toThrow(new Error("RhfTextField value must be string, null or undefined"));
    });

    it("should change value", async () => {
        const form = initTest({
            label: "Test field",
        });

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test field"));
        await user.keyboard("bar");

        expect(form.getValues().foo).toBe("bar");
    });

    it("should display helper text without error", () => {
        initTest({
            helperText: "Helper text",
        });

        expect(screen.getByText("Helper text")).toBeInTheDocument();
    });

    it("should display error", async () => {
        initTest({
            label: "Test field",
            helperText: "Helper text",
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

    it("should display character count", () => {
        initTest({
            helperText: "Helper text",
            maxCharacters: 5,
        });

        expect(screen.getByText("0/5")).toBeInTheDocument();
    });
});
