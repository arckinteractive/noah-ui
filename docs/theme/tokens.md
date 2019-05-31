---
title: Tokens
label: Tokens
priority: 1
---

## Tokens

### Colors

Unlike many framework that define 50 shades of grey, NoahUi uses simple palettes with 4 shades and 2 inverts.
This allows you to get down to business without having to figure out which of the 10 shades of a color you should be using.

- `--color-<palette>` - Main color, used as a solid background, e.g. for buttons
- `--color-<palette>-lighten` - Used for transitions from main color
- `--color-<palette>-darken` - Used for transitions from main color
- `--color-<palette>-fade` - Used as a background color, e.g. for a colored box or an alert

- `--color-<palette>-invert` - Used as the text color on solid background
- `--color-<palette>-fade-invert` - Used as the text color on faded background

Colors are first defined as HSL `--hsl-<palette>-<variation>`. This allows you to add alpha values, if needed: `hsla(var(--hsl-primary), 0.5)`

The ratio between inverts and shades meets the WCAG accessibility requirement.

<ComponentDemo name="TokensColors" />

### Sizing

Unlike other frameworks, NoahUI does not use a progressive scale, instead it tries to stick to the 8pt grid and iterate sizes in a way that best fits into the 8pt grid.
 
#### Sizes

Sizes define the expected height of an element, e.g. buttons.

- `--size-none`
- `--size-xs`
- `--size-s`
- `--size-m`
- `--size-l`
- `--size-xl`
- `--size-xxl`

#### Spaces 

Space values are used for padding and margins. They are defined in absolute values to allow you scale sizes irrespective of text/rems.

- `--space-none`
- `--space-xs`
- `--space-s`
- `--space-m`
- `--space-l`
- `--space-xl`
- `--space-xxl`

#### Text

- `--text-none`
- `--text-xs`
- `--text-s`
- `--text-m`
- `--text-l`
- `--text-xl`
- `--text-xxl`
- `--h6`
- `--h5`
- `--h4`
- `--h3`
- `--h2`
- `--h1`
