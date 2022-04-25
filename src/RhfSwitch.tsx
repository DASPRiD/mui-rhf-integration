import type {CheckboxProps} from '@mui/material';
import {Switch} from '@mui/material';
import type {Control} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {FieldPath, FieldValues} from 'react-hook-form/dist/types';

export type RhfSwitchProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<CheckboxProps, 'checked' | 'onChange' | 'onBlur' | 'value' | 'ref'> & {
    control : Control<TFieldValues>;
    name : TName;
};

const RhfSwitch = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({control, name, ...rest} : RhfSwitchProps<TFieldValues, TName>) : JSX.Element => {
    const {field} = useController({control, name});
    let value = field.value as unknown;

    if (value === undefined || value === null) {
        value = false;
    } else if (typeof value !== 'boolean') {
        throw new Error('RhfSwitch value must be boolean, null or undefined');
    }

    return (
        <Switch
            checked={value as boolean}
            onChange={(event, checked) => {
                field.onChange(checked);
            }}
            onBlur={field.onBlur}
            ref={field.ref}
            {...rest}
        />
    );
};

export default RhfSwitch;
