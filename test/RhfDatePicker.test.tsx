import {RhfDatePicker} from '../src/date-picker';
import {runGenericDateTimeTest} from './genericDateTimeTest';

describe('RhfDatePicker', () => {
    runGenericDateTimeTest(
        (control, props) => <RhfDatePicker control={control} name="foo" {...props}/>,
        new Date('2020-01-01 12:00'),
        '01/01/2020',
        'MM/dd/yyyy',
    );
});
