import '@testing-library/jest-dom';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RhfAutocomplete} from '../src';
import type {RhfAutocompleteProps} from '../src/RhfAutocomplete';
import {createInitTest} from './initTest';

type TestFormValues = {
    foo : string;
};

const initTest = createInitTest<
    Omit<RhfAutocompleteProps<string, false, false, false>, 'name' | 'control' | 'options'>,
    TestFormValues
>((control, props) => (
    <RhfAutocomplete control={control} name="foo" options={[
        'foo',
        'bar',
    ]} {...props}/>
));

describe('RhfAutocomplete', () => {
    it('should treat undefined as empty value', () => {
        initTest({
            textFieldProps: {
                label: 'Test field',
            },
        });

        expect(screen.getByLabelText('Test field')).toHaveValue('');
    });

    it('should treat null as empty value', () => {
        initTest({
            textFieldProps: {
                label: 'Test field',
            },
        }, {
            foo: null,
        });

        expect(screen.getByLabelText('Test field')).toHaveValue('');
    });

    it('should use default value', () => {
        initTest({
            textFieldProps: {
                label: 'Test field',
            },
        }, {
            foo: 'foo',
        });

        expect(screen.getByLabelText('Test field')).toHaveValue('foo');
    });

    it('should change value', async () => {
        const form = initTest({
            textFieldProps: {
                label: 'Test field',
            },
        });

        const user = userEvent.setup();
        await user.click(screen.getByLabelText('Test field'));
        await user.keyboard('bar');
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');

        expect(form.getValues().foo).toBe('bar');
    });

    it('should display helper text without error', () => {
        initTest({
            textFieldProps: {
                helperText: 'Helper text',
            },
        });

        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should display error', async () => {
        initTest({
            textFieldProps: {
                label: 'Test field',
                helperText: 'Helper text',
            },
            rules: {
                required: 'Required',
            },
        });

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('Required')).toBeInTheDocument();
        });

        expect(screen.getByLabelText('Test field')).toHaveFocus();
        expect(screen.getByLabelText('Test field').parentNode).toHaveClass('Mui-error');
    });
});
