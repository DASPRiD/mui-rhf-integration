import type {TextFieldProps} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import '@testing-library/jest-dom';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {format} from 'date-fns';
import type {Control} from 'react-hook-form';
import type {RegisterOptions} from 'react-hook-form/dist/types/validator';
import {createInitTest} from './initTest';

type TestFormValues = {
    foo : Date;
};

type RenderProps = {
    label ?: string;
    textFieldProps ?: TextFieldProps;
    rules ?: Omit<RegisterOptions<TestFormValues, 'foo'>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

type RenderComponent = (control : Control<TestFormValues>, props ?: RenderProps) => JSX.Element;

export const runGenericDateTimeTest = (
    renderComponent : RenderComponent,
    validDefaultValue : Date,
    expectedTextValue : string,
    formatString : string,
) : void => {
    const initTest = createInitTest<
        RenderProps,
        TestFormValues
    >((control, props) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {renderComponent(control, {label: 'Test field', ...props})}
        </LocalizationProvider>
    ));

    beforeEach(() => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(pointer: fine)',
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }));
    });

    it('should treat undefined as empty value', async () => {
        initTest();

        const testField = await waitFor(() => screen.getByLabelText('Test field'));
        expect(testField).toHaveValue('');
    });

    it('should treat null as empty value', async () => {
        initTest(undefined, {
            foo: null,
        });

        const testField = await waitFor(() => screen.getByLabelText('Test field'));
        expect(testField).toHaveValue('');
    });

    it('should use default value', async () => {
        initTest(undefined, {
            foo: validDefaultValue,
        });

        const testField = await waitFor(() => screen.getByLabelText('Test field'));
        expect(testField).toHaveValue(expectedTextValue);
    });

    it('should change value', async () => {
        const form = initTest();

        const testField = await waitFor(() => screen.getByLabelText('Test field'));
        const user = userEvent.setup();
        await user.click(testField);
        await user.keyboard(expectedTextValue);

        expect(format(form.getValues().foo, formatString)).toBe(expectedTextValue);
    });

    it('should display helper text without error', async () => {
        initTest({
            textFieldProps: {
                helperText: 'Helper text',
            },
        });

        await waitFor(() => screen.getByLabelText('Test field'));
        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should display error', async () => {
        initTest({
            textFieldProps: {
                helperText: 'Helper text',
            },
            rules: {
                required: 'Required',
            },
        });

        const testField = await waitFor(() => screen.getByLabelText('Test field'));
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('Required')).toBeInTheDocument();
        });

        expect(testField).toHaveFocus();
        expect(testField.parentNode).toHaveClass('Mui-error');
    });
};
