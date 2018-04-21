# react-loading-delay [![npm version](https://badge.fury.io/js/react-loading-delay.svg)](https://badge.fury.io/js/react-loading-delay)

⛔️ Warning: This library will be unnecessary when Async React is released, as this is a feature that will be implemented in it. Most likely in a different way, but it will not be difficult to switch over to that hopefully. If you want more information, just go and watch the latest talk from Dan Abramov from jsconf.

---

Sometimes you want to display a Loading Component in your UI longer than a flicker.

With this component you can delay the rendering for as long as you need.

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

## Example

This library is fascilitating a pattern called Render Props (Read more about it [here](https://reactjs.org/docs/render-props.html)) which requires a function as a prop:

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

So what happens here is that while the `check` prop is `true`, the delay won't be starting. The passed down prop named `isLoading` will mirror the check passed into the component, meanwhile `isDelaying` will return `true`.

When `check` changes from `true` to `false` the delay will be initiated and `isDelaying` will change to `false` as soon as the delay is over. The moment this prop is `false` you should render your UI with the successfully fetched data.

This package does not take care of fetching data, it is just facilitating a small delay for the UI to prevent pesky flickers in the UI.

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
          if (isLoading) return 'GraphQL still querying';
          if (isDelaying) return 'UI being delayed';
          return 'Loading and delay done';
        }}
      </LoadingDelay>
    );
  }}
</Query>
```

## TODO

- [ ] Check recurring changes to the `check` prop after the first delay
- [ ] Add a max wait if the data fetching takes longer then the delay
