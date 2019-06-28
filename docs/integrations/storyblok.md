---
label: Storyblok
priority: 1
---

## Storyblok Integration

NoahUi exposes some components for integration with [Storyblok](https://storyblok.com).

### Installation

First of all, add your Storyblok Management API token and spaceId to to `package.json`  

```json
{
    "storyblok": {
      "token": "<YOUR TOKEN>",
      "spaceId": "<YOUR SPACE ID>"
    }
}
```

Install `yarn add @arckinteractive/noah-storyblok`.

Afterwards, run `yarn storyblok-sync` to create the necessary field types and components.

```
yarn storyblok:sync
```

You can now use NoahUi components in Storyblok. See Storyblok documentation to figure out how to wire things at the page/router level.


