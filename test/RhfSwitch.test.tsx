import { FormControlLabel } from "@mui/material";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RhfSwitch, type RhfSwitchProps } from "../src";
import { createInitTest } from "./initTest";

type TestFormValues = {
    foo: boolean;
};

const initTest = createInitTest<Omit<RhfSwitchProps, "name" | "control">, TestFormValues>(
    (control, props) => (
        <FormControlLabel
            control={<RhfSwitch<TestFormValues> control={control} name="foo" {...props} />}
            label="Test switch"
        />
    ),
);

describe("RhfCheckbox", () => {
    it("should treat undefined as false value", () => {
        initTest({ role: "checkbox" });

        expect(screen.getByLabelText("Test switch")).not.toBeChecked();
    });

    it("should treat null as false value", () => {
        initTest({ role: "checkbox" }, { foo: null });

        expect(screen.getByLabelText("Test switch")).not.toBeChecked();
    });

    it("should use default value", () => {
        initTest({ role: "checkbox" }, { foo: true });

        expect(screen.getByLabelText("Test switch")).toBeChecked();
    });

    it("should throw error when receiving invalid default value", () => {
        vi.spyOn(console, "error").mockImplementation(() => null);

        expect(() => {
            initTest(undefined, { foo: 1 });
        }).toThrow(new Error("RhfSwitch value must be boolean, null or undefined"));
    });

    it("should change value", async () => {
        const form = initTest({ role: "checkbox" });

        const user = userEvent.setup();
        await user.click(screen.getByLabelText("Test switch"));

        expect(form.getValues().foo).toBe(true);
    });
});
