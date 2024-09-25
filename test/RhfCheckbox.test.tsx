import { FormControlLabel } from "@mui/material";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RhfCheckbox } from "../src";
import type { RhfCheckboxProps } from "../src/RhfCheckbox";
import { createInitTest } from "./initTest";

type TestFormValues = {
    foo: boolean;
};

const initTest = createInitTest<
    Omit<RhfCheckboxProps<TestFormValues>, "name" | "control">,
    TestFormValues
>((control, props) => (
    <FormControlLabel
        control={<RhfCheckbox control={control} name="foo" {...props} />}
        label="Test checkbox"
    />
));

describe("RhfCheckbox", () => {
    it("should treat undefined as false value", () => {
        initTest();

        expect(screen.getByLabelText("Test checkbox")).not.toBeChecked();
    });

    it("should treat null as false value", () => {
        initTest(undefined, { foo: null });

        expect(screen.getByLabelText("Test checkbox")).not.toBeChecked();
    });

    it("should use default value", () => {
        initTest(undefined, { foo: true });

        expect(screen.getByLabelText("Test checkbox")).toBeChecked();
    });

    it("should throw error when receiving invalid default value", () => {
        vi.spyOn(console, "error").mockImplementation(() => null);

        expect(() => {
            initTest(undefined, { foo: 1 });
        }).toThrow(new Error("RhfCheckbox value must be boolean, null or undefined"));
    });

    it("should change value", async () => {
        const form = initTest();

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test checkbox"));

        expect(form.getValues().foo).toBe(true);
    });
});
