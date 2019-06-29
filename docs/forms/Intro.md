---
label: Intro
priority: 1
---

## Forms

Forms, fields and buttons are at the heart of every UI project. When building NoahUi, we were guided with the principle that it should be easy to build, present, extend and validate accessible forms. We have therefore used a mixed approach: wrapper components with slots to ensure continuity and consistency in presentation and mixins to provide a uniform API for dealing with input events and validation.

### `Input` mixin

Input mixin provides a range of accessibility controls and a set of uniform methods to encapsulate a form field. `inputValue` data parameter is wired up to be reactive - any changes to `inputValue` will trigger a sequence of events, including propagating the value up the hierarchy, as well as triggering validation.

Here is an example of a new input type for price input. In this example the displayed value contains cents, whereas the actual `inputValue` of the model is a value in cents.

<ComponentDemo name="CustomInput" />

### `NField` component

Field component provides a uniform layout for input fields.

<ComponentDemo name="CustomField" />
