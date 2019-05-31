---
label: Icon
---

## Icons

<ComponentMeta name="NIcon" />


<docs>
    By default, Noah UI does not ship with an icon font. Just load the one you would like to use in your app, and
    reference classes accordingly.

    ## Default Icon

    ```jsx
    <n-icon icon="fas fa-user"></n-icon>
    ```

    ## Button Icon
    ```jsx
    <n-div flex left-center>        <n-button circle>
            <n-icon icon="fas fa-comment"></n-icon>
        </n-button>
        <n-button prefix-icon="fas fa-star">Favorite</n-button>
    </div>
    ```
</docs>
