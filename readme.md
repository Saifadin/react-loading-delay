# react-loading-delay [![npm version](https://badge.fury.io/js/react-loading-delay.svg)](https://badge.fury.io/js/react-loading-delay)

⛔️ Warning: This library will be unnecessary when Async React is released, as this is a feature that will be implemented in it. Most likely in a different way, but it will not be difficult to switch over to that hopefully. If you want more information, just go and watch the latest talk from Dan Abramov from jsconf.

---

Sometimes you want to display a Loading Component in your UI longer than a flicker.

With this component you can delay the rendering for as long as you need.

## API

**Input Props**

| Propname   | Type     | required | Description |
| ---------- | -------- | -------- | ----------- |
| `check`    | boolean  | true     | When this prop is `true` the delay will be started. |
| `delay`    | number   | true     | delay in milliseconds |
| `children` | function | true     | Function that gets the output props |

**Output Props**

| Propname     | Type    | Description |
| ------------ | ------- | ----------- |
| `isLoading`  | boolean | This prop is a mirror of the `check` prop |
| `isDelaying` | boolean | This prop will be `true` until the delay is over. |

## Example

This library is fascilitating a pattern called Render Props (Read more about it [here](https://reactjs.org/docs/render-props.html)) which requires a function as a prop:

```javascript
import LoadingDelay from 'react-loading-delay';

const loading = true;

<LoadingDelay check={loading} delay={3000}>
  {({ isLoading, isDelaying }) => {
    if (isDelaying) return 'UI being delayed';
    if (isLoading) return 'Data still loading after delay';
    return 'Loading and delay done';
  }}
</LoadingDelay>
```

So what happens here is when the value passed in the `check` prop is `true`, the delay will be initiated. The passed down prop named `isLoading` will mirror this value passed into the component, meanwhile `isDelaying` will return `true`.

When the delay is over, `isDelaying` will be returned as `false` and the content of the child function will be re-rendered. 

This package does not take care of fetching data, it is just facilitating a small delay for the UI to prevent pesky flickers.

## Example with [Apollo Client](https://www.apollographql.com/docs/react/)

Here is a simple example with the Apollo Client GraphQL [`Query` Component](https://www.apollographql.com/docs/react/essentials/queries.html) and how this would interact with each other. It can be integrated nicely into the all around workflow with `react-apollo`.

```javascript
import { Query } from 'react-apollo';
import LoadingDelay from 'react-loading-delay';

<Query query={GET_TODOS}>
  {({ loading, data }) => {
    return (
      <LoadingDelay check={loading} delay={1000}>
        {({ isLoading, isDelaying }) => {
          if (isDelaying || isLoading) return 'UI being delayed for 1s or GraphQL still querying after delay';
          return 'Loading and delay done';
        }}
      </LoadingDelay>
    );
  }}
</Query>
```
