import {RhfDateTimePicker} from '../src/date-picker';
import {runGenericDateTimeTest} from './genericDateTimeTest';

describe('RhfDateTimePicker', () => {
    runGenericDateTimeTest(
        (control, props) => <RhfDateTimePicker control={control} name="foo" {...props}/>,
        new Date('2020-01-01 12:00'),
        '01/01/2020 12:00 pm',
        'MM/dd/yyyy hh:mm aaa',
    );
});
