---
title: Noah UI
meta: 
    - name: description
    - content: Vue Framework for Web Artisans
label: Overview
priority: 1
icon: fas fa-home
---

We have built Noah UI, because we needed a versatile design system and a set of components that can be easily integrated into any existing or new project. We work with a variety of web sites, that have been built with
Bootstrap, Foundation, Bulma, Material, so it is important for us to not be stuck with dogmas that each framework ships with. Noah UI foremost is a functional system, not a visual Bible. 

## Agnostic Approach

Noah UI attempts to provide maximum flexibility. At the heart of the framework is a configuration object, which among other things allows you to rename components or replace them with your custom implementation. You can redefine CSS selector names, replace used icons and much more.

## Non-intrusive CSS

We have tried to keep things simple and kept the CSS to minimum. Each real-life project has its own needs and it is nearly impossible to create a framework that fits all of them without modifications.

Scoped CSS is great in theory and has the potential of saving the world from code duplication, alas the world is more complicated and all of projects' needs can not be encapsulated in a single component. We have therefore decided to keep CSS files separate from components: it allows developers to use our components without having to go through the hassle of restyling scoped selectors. Scoped CSS is great for lower project level components, but not so suitable for a versatile foundational framework.

It is also likely that you will want to reuse your CSS in templates and documents rendered server-side and third-party services - having CSS separate from components, in our opinion, provides more flexibility on all levels.

## Mobile-First & Responsive

NoahUI aims to be performant across a variety devices. Noah uses a dual approach, providing ways to target specific viewports both through JavaScript and CSS. 

## Flexible Forms

One of the stumbling blocks of many frameworks is forms. One of the top priorities for Noah UI is to make it easy to add custom input types and form elements while maintaining uniform layout, validation and feedback logic. We have used several techniques to make it easy for projects to build their own form fields on top of our components.

## Accessible Components

NoahUI strives to be an accessible framework. Default color palette complies with WCAG contract ratio recommendations. Components are properly marked up and labelled in accordance with ARIA specifications. And above all, in the age of mobile, many have forgotten about keyboard accessbility - when building NoahUI, we wanted to allow keyboard-only navigation by providing consistent tab indexes, marking up forms in a way that does not hinder accessibility, reacting to specific keydown events etc.

## SSR-Friendly

We wanted NoahUI to be suitable for server-side rendering with frameworks such as VuePress and Nuxt.

## Optimized for PageSpeed

NoahUI does its best to reduce amount of work needed to improve PageSpeed score. Among other things, NoahUI uses intersection observers to lazy-load images, cloaks embeds to reduce amount of data loaded at runtime.  
 




