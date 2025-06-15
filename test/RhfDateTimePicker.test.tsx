import dayjs from "dayjs";
import { describe } from "vitest";
import { RhfDateTimePicker } from "../src/date-picker";
import { runGenericDateTimeTest } from "./genericDateTimeTest";

describe("RhfDateTimePicker", () => {
    runGenericDateTimeTest(
        (control, props) => <RhfDateTimePicker control={control} name="foo" {...props} />,
        dayjs.utc("2020-01-01 21:00"),
        "01/01/2020 09:00 pm",
        "MM/DD/YYYY hh:mm a",
    );
});
