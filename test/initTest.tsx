import {render} from '@testing-library/react';
import type {Control, UseFormReturn} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import type {FieldValues} from 'react-hook-form/dist/types';
import type {DefaultValues} from 'react-hook-form/dist/types/form';

type RenderComponent<
    TProps extends Record<string, unknown>,
    TFieldValues extends FieldValues,
> = (control : Control<TFieldValues>, props ?: TProps) => JSX.Element;

type InitTest<
    TProps extends Record<string, unknown>,
    TFieldValues extends FieldValues,
> = (
    props ?: TProps,
    defaultValues ?: DefaultValues<FieldValues>,
) => UseFormReturn<TFieldValues>;

export const createInitTest = <
    TProps extends Record<string, unknown>,
    TFieldValues extends FieldValues,
>(renderComponent : RenderComponent<TProps, TFieldValues>) : InitTest<TProps, TFieldValues> => (
    props ?: TProps,
    // We allow any field values here in order to test passing invalid values.
    defaultValues ?: DefaultValues<FieldValues>,
) => {
    let form;

    const TestComponent = () => {
        form = useForm<TFieldValues>({defaultValues: defaultValues as DefaultValues<TFieldValues>});

        return (
            <form onSubmit={form.handleSubmit(() => {
                // No-op
            })}>
                {renderComponent(form.control, props)}
                <button type="submit">Submit</button>
            </form>
        );
    };

    render(<TestComponent/>);
    return form as unknown as UseFormReturn<TFieldValues>;
};
