import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Control, DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

type RenderComponent<TProps extends Record<string, unknown>, TFieldValues extends FieldValues> = (
    control: Control<TFieldValues>,
    props?: TProps,
) => ReactNode;

type InitTest<TProps extends Record<string, unknown>, TFieldValues extends FieldValues> = (
    props?: TProps,
    defaultValues?: DefaultValues<FieldValues>,
) => UseFormReturn<TFieldValues>;

export const createInitTest =
    <TProps extends Record<string, unknown>, TFieldValues extends FieldValues>(
        renderComponent: RenderComponent<TProps, TFieldValues>,
    ): InitTest<TProps, TFieldValues> =>
    (
        props?: TProps,
        // We allow any field values here in order to test passing invalid values.
        defaultValues?: DefaultValues<FieldValues>,
    ) => {
        let form: UseFormReturn<TFieldValues>;

        const TestComponent = () => {
            form = useForm<TFieldValues>({
                defaultValues: defaultValues as DefaultValues<TFieldValues>,
            });

            return (
                <form
                    onSubmit={form.handleSubmit(() => {
                        // No-op
                    })}
                >
                    {renderComponent(form.control, props)}
                    <button type="submit">Submit</button>
                </form>
            );
        };

        render(<TestComponent />);

        // @ts-expect-error form is populated during render
        return form;
    };
