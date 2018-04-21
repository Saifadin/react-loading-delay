# react-loading-delay [![npm version](https://badge.fury.io/js/react-loading-delay.svg)](https://badge.fury.io/js/react-loading-delay)

Sometimes you want to display a Loading Component in your UI longer than 50ms and avoid a flicker in the UI.

With this component you can delay the rendering for as long as you need.

## Example

This library is facilitation a pattern called Render Props (Read more about it [here](https://reactjs.org/docs/render-props.html)) which requires a function as a child:

```javascript
import LoadingDelay from 'react-loading-delay';

const loading = true;

<LoadingDelay check={loading} delay={3000}>
  {({ isLoading, isDelaying }) => {
    if (isLoading) return 'Data still loading';
    if (isDelaying) return 'UI being delayed';
    return 'Loading and delay done';
  }}
</LoadingDelay>
```

So what happens here is that while the `check` prop is passing in `true`, the prop `isLoading` returned to the child is also `true`. 

When `check` is changed to `false`, `isLoading` will change to false after 3000ms.

## API

**Input Props**

| Propname   | Type     | required | Description |
| ---------- | -------- | -------- | ----------- |
| `check`    | boolean  | true     | This props needs to switch from `true` to `false` for the delay to take effect. |
| `delay`    | number   | true     | delay in milliseconds |
| `children` | function | true     | Function that gets the output props |

**Output Props**

| Propname     | Type    | Description |
| ------------ | ------- | ----------- |
| `isLoading`  | boolean | This prop is a mirror of the `check` prop |
| `isDelaying` | boolean | This prop will stay `true` until `isLoading` is false and the delay is triggered. This prop changes to `false` when the delay is over. |
