# MUI RHF Integration

[![npm version](https://badge.fury.io/js/mui-rhf-integration.svg)](https://badge.fury.io/js/mui-rhf-integration)
[![Release](https://github.com/dasprid/mui-rhf-integration/actions/workflows/release.yml/badge.svg)](https://github.com/dasprid/mui-rhf-integration/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/DASPRiD/mui-rhf-integration/branch/main/graph/badge.svg?token=eS8Jz0gfPX)](https://codecov.io/gh/DASPRiD/mui-rhf-integration)

This is a lightweight integration library for [MUI](https://mui.com/) and
[React Hook Form](https://react-hook-form.com/) with the two goals of being strictly typed with proper generic
definitions as well as being as unopinionated about the usage as possible.

## Quick start

### Installation

```shell
npm i mui-rhf-integration
```

You'll need to have the following peer dependencies installed:

- `react@^17`
- `@mui/material@^5.5.0`
- `react-hook-form@^7.29.0`

Note that in order to use the `RhfDatePicker`, `RhfDateTimePicker` and `RhfTimePicker` components you need to also
install the `@mui/x-date-pickers` package.

> **Note:** As having the date and time pickers exported together with all other input types breaks some bundlers like
> Vite when the optional dependency is not installed, these pickers have to be imported from
> `mui-rhf-integration/dist/date-pickers` specifically. 

### Form setup

```typescript jsx
import {useForm} from 'react-hook-form';
import {RhfTextField} from 'mui-rhf-integration';
import {Button} from '@mui/material';

type FieldValues = {
    title : string;
};

const MyForm = () : JSX.Element => {
    const form = useForm<FieldValues>();

    return (
        <form
            onSubmit={form.handleSubmit(() => {
                // No-op
            })}
        >
            <RhfTextField control={form.control} name="title"/>
            <Button type="submit">Submit</Button>
        </form>
    );
};
```

> In contrast to some other integration libraries, you'll notice that you have to pass in the form control to the input
> element. This is preferred over utilizing a form context, as it allows Typescript to immediately verify the name
> passed in to match up with the properties in the `FieldValues` type.

## Input elements

All input elements exported by this library take a `control` and `name` property to link up with the form. They
additionally accept various properties which are passed through to the wrapped components.

Where applicable, the wrapper components take care of error handling and displaying error messages as helper text
components below the input elements.

### `RhfTextField`

Wrapper around the `TextField` component. Passes all known `TextFieldProps` properties down. Allowed value types are
`string`, `null` and `undefined`.

```typescript jsx
<RhfTextField 
    control={form.control} 
    name="title"
    label="Title"
    helperText="Title of the thing"
/>
```

### `RhfCheckbox`

Wrapper around the `Checkbox` component. Passes all known `CheckboxProps` properties down. Allowed value types are
`bool`, `null` and `undefined`.

```typescript jsx
<RhfCheckbox 
    control={form.control} 
    name="enabled"
/>
```

In order to display the checkbox with a label, you can utilize the MUI `FormControlLabel` component:

```typescript jsx
<FormControlLabel
    control={<RhfCheckbox control={form.control} name="enabled"/>}
    label="Enabled"
/>
```

### `RhfSwitch`

Wrapper around the `Switch` component. Passes all known `SwitchProps` properties down. Allowed value types are
`bool`, `null` and `undefined`.

```typescript jsx
<RhfSwitch 
    control={form.control} 
    name="enabled"
/>
```

In order to display the switch with a label, you can utilize the MUI `FormControlLabel` component:

```typescript jsx
<FormControlLabel
    control={<RhfSwitch control={form.control} name="enabled"/>}
    label="Enabled"
/>
```

### `RhfCheckboxGroup`

Element which handles multiple checkboxes according to the MUI documentation. The resulting value in the form values is
represented as an array of strings.

Options are defined as an array of objects with a `value` and `label` property.

```typescript jsx
<RhfCheckboxGroup
    control={form.control} 
    name="colors"
    label="Colors"
    options={[
        {value: 'red', label: 'Red'},
        {value: 'green', label: 'Green'},
        {value: 'blue', label: 'Blue'},
    ]}
/>
```

You can influence the generated sub components via the root properties as well as the `formLabelProps` and
`formGroupProps` properties.

### `RhfRadioGroup`

Element which handles multiple radios according to the MUI documentation. The resulting value in the form values is
represented as a string.

Options are defined as an array of objects with a `value` and `label` property.

```typescript jsx
<RhfRadioGroup
    control={form.control} 
    name="color"
    label="Color"
    options={[
        {value: 'red', label: 'Red'},
        {value: 'green', label: 'Green'},
        {value: 'blue', label: 'Blue'},
    ]}
/>
```

You can influence the generated sub components via the root properties as well as the `formLabelProps` and
`formGroupProps` properties.

### `RhfAutocomplete`

Wrapper around the `Autocomplete` component. Passes all known `AutocompleteProps` properties down. Allowed value types
are `null`, `undefined` and the value type defined by the autocomplete options.

```typescript jsx
<RhfAutocomplete
    control={form.control} 
    name="city"
    textFieldProps={{
        label: 'City',
    }}
    options={[
        {value: 'berlin', label: 'Berlin'},
        {value: 'new_york', label: 'New York'},
        {value: 'syndey', label: 'Sydney'},
    ]}
/>
```

Additionally, it accepts the two properties `valueToOption` and `optionToValue`, which are used when you need to map
e.g. objects to IDs and vice versa for your form values.

### `RhfDatePicker`

Wrapper around the `DatePicker` component. Passes all known `DatePickerProps` properties down.

```typescript jsx
<RhfDatePicker
    control={form.control} 
    name="date"
    label="Date"
/>
```

### `RhfDateTimePicker`

Wrapper around the `DateTimePicker` component. Passes all known `DateTimePickerProps` properties down.

```typescript jsx
<RhfDateTimePicker
    control={form.control} 
    name="dateTime"
    label="Date time"
/>
```

### `RhfTimePicker`

Wrapper around the `TimePicker` component. Passes all known `TimePickerProps` properties down.

```typescript jsx
<RhfDateTimePicker
    control={form.control} 
    name="time"
    label="Time"
/>
```
