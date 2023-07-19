# kOSs UI Project

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Start the app

To start the development server run `nx serve tfa-sample-app-ui` or `npm run serve`. Open your browser and navigate to http://localhost:4200/. Happy coding!

## Build the app

To run a build of the entire application including the UI and models run `npm run build`. This will create an optimized bundle in the `dist` folder at the root of the application.

## Project Structure

The kOS UI project has been configured as an integrated NX mono-repo that incorporates projects for both UI applications and the corresponding kOS models required to integrate with a dispenser running kOS.

- apps
  - tfa-sample-app-ui - The UI application that is served to the browser
    - src
      - app
        - components - The UI components that make up the application
        - hooks - React hooks that are used by the application
        - contexts - React contexts that are used by the application
        - app.tsx - The main application component
- libs
  - models
    - tfa-sample-app-model - The model project that contains kOS models used by the application
      - src
        - lib
          - dispenser - The dispenser model that acts as the root model for the application
            - services - The services that interact with the dispenser backend
            - types - The types that are used by the dispenser model

## Generating models

To generate a new kOS model into the model project use the `kos nx plugin`. Run the following command from the root of the project to generate a new model:

```bash
npx nx generate @kosdev-code/kos-nx-plugin:kos-model --name=sample-entity --components=false --dataServices=false --singleton=true --unitTests=false
```

The command accepts a number of options:

- `--name` - The name of the model
- `--singleton` - Whether the model the model should only have one instance (default: false)
- `--dataServices` - Whether the model generate data services i.e. if the model will need to interact with the backend (default: true)
- `--unitTests` - Whether the model should generate unit tests (default: true)
- `--components` - Whether the model should generate model-specific hooks, higher order components (HoC) and contexts. (default: false)

Alternatively, use the NX Console in VS Code to create a model using the provided UI.

- Navigate to the NX Console View
- Select `Generate`
- Select `@kosdev-code/kos-nx-plugin - kos-model` from the list
- Fill in the information in the provided form.

## Generating components

To generate a new component that is designed to work with kOS models use the `kos nx plugin` tool. Run the following command to generate a new component:

```bash
npx nx generate @kosdev-code/kos-nx-plugin:kos-component --name=sample-component --type=components --useEmotionCss=false
```

The command accepts a number of options:

- `--name` - The name of the component
- `--type` - The type of the component (feature/component). Determines the folder in the project where the component will be created
- `--useEmotionCss` - Whether the component should use the CSS-In-JS Emotion css library. (default: true)

Alternatively, use the NX Console in VS Code to create a model using the provided UI.

- Navigate to the NX Console View
- Select `Generate`
- Select `@kosdev-code/kos-nx-plugin - kos-component` from the list
- Fill in the information in the provided form.

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
