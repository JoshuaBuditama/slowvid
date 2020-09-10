# slowvid front-end 

Install the project with

```
npm install
```

Run the dev server with:

```
npm start
```

You can always trash the install and start fresh with:

```
rm -rf node_modules
rm package-lock.json
npm install
```

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Conventions

### 1. Use [react hooks](https://reactjs.org/docs/hooks-intro.html) 

Where possible, prefer react hooks and functional components rather than class-based components. 
They are more modern and likely easier to learn. 

> We intend for Hooks to cover all existing use cases for classes, but we will keep supporting class components for the foreseeable future. At Facebook, we have tens of thousands of components written as classes, and we have absolutely no plans to rewrite them. Instead, we are starting to use Hooks in the new code side by side with classes.


### 2. camelCase

Prefer camelCase to kebab-case, snake_case or any other naming convention. 


### 3. prefer npm over yarn

Yarn is another common javascript package manager. 
We'll run into less issues if everyone uses npm.
