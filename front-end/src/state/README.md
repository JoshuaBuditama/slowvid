# Reading and writing state

If we have a React component that needs to read/write state, then we must import the `useSession` custom hook.

```
import { useSession } from "./state";
```

Then we can do this:

```
const { myName, setMyName } = useSession()
```


## Explanation

We need a way of storing state in the app. 
There are solutions like redux, which require installing additional dependencies and are complicated to learn.
But there is a simpler pattern for managing state using plain old React:

1. Use [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for persisting data between page refreshes.
2. Use [useState](https://reactjs.org/docs/hooks-reference.html#usestate) to store, use and update in-memory state. 
3. Use [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) to to make this state available inside any component.

Why do we need to useContext? 
We don't. 
React components accept *props* which we could use to pass this data down into every component.
But using this pattern would mean that we need to pass the data and a setter function down through the tree for any component that needs to access it.
The useContext hook allows us to bypass this, and define a getter and a setter that can be imported and used in any component.
