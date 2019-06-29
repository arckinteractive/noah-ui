---
label: Form
priority: 2
---

## Form

<ComponentMeta name="NForm" />

### Form Bindings

NoahUi is designed for modern single-page applications, hence using DOM form actions is not supported by default. To achieve native form submission, you can send your data using `FormData`.

When using `n-form` you should bind a handler to the `submit` event and return a promise. Before your handler is called, form fields will be validated.

<ComponentDemo name="FormContainer" />

### Form Validation

Validation rules can be passed to a component that implements `Input` mixin via `rules` prop.
Rules are an array of validations that should be run on a field's. You can use either build-in validations or write your own. Custom validators should throw an error to indicate validation failure (you can optionally return `false` or a string with an error, but throwing an error is preferred). Custom validators can return promises.

<ComponentDemo name="FormValidation" />
