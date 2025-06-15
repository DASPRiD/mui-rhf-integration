import dayjs from "dayjs";
import { describe } from "vitest";
import { RhfTimePicker } from "../src/date-picker";
import { runGenericDateTimeTest } from "./genericDateTimeTest";

describe("RhfTimePicker", () => {
    runGenericDateTimeTest(
        (control, props) => (
            <RhfTimePicker control={control} name="foo" {...props} timezone="UTC" />
        ),
        dayjs.utc("2020-01-01 12:00"),
        "12:00 pm",
        "hh:mm a",
    );
});
