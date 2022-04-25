import {RhfTimePicker} from '../src';
import {runGenericDateTimeTest} from './genericDateTimeTest';

describe('RhfTimePicker', () => {
    runGenericDateTimeTest(
        (control, props) => <RhfTimePicker control={control} name="foo" {...props}/>,
        new Date('2020-01-01 12:00'),
        '12:00 pm',
        'hh:mm aaa',
    );
});
