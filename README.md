# Kedro-Viz

[![CircleCI](https://circleci.com/gh/quantumblacklabs/kedro-viz/tree/main.svg?style=shield)](https://circleci.com/gh/quantumblacklabs/kedro-viz/tree/main)
[![npm version](https://img.shields.io/npm/v/@quantumblack/kedro-viz.svg?color=cc3534)](https://badge.fury.io/js/%40quantumblack%2Fkedro-viz)
[![Python Version](https://img.shields.io/badge/python-3.6%20%7C%203.7%20%7C%203.8-orange.svg)](https://pypi.org/project/kedro-viz/)
[![PyPI version](https://img.shields.io/pypi/v/kedro-viz.svg?color=yellow)](https://pypi.org/project/kedro-viz/)
[![License](https://img.shields.io/badge/license-Apache%202.0-3da639.svg)](https://opensource.org/licenses/Apache-2.0)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.4355948.svg)](https://doi.org/10.5281/zenodo.4355948)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Kedro-Viz shows you how your [Kedro](https://github.com/quantumblacklabs/kedro) data pipelines are structured.

With Kedro-Viz you can:

- See how your datasets and Python functions (nodes) are resolved in [Kedro](https://github.com/quantumblacklabs/kedro) so that you can understand how your data pipeline is built
- Get a clear picture when you have lots of datasets and nodes by using tags to visualise sub-pipelines
- Search for nodes and datasets

![Kedro-Viz Pipeline Visualisation](https://github.com/quantumblacklabs/kedro-viz/blob/main/.github/img/pipeline_visualisation.png?raw=true)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), for which more complete documentation is available on the [project website](https://facebook.github.io/create-react-app/).

## How do I install and use Kedro-Viz?

> For in-depth development and usage notes, see the [Contribution Guidelines](https://github.com/quantumblacklabs/kedro-viz/blob/main/CONTRIBUTING.md).

> It's likely that Kedro-Viz>=3.8.0 will not work with projects created with older versions of Kedro<=0.16.6. Please migrate your project to Kedro>=0.17.0 before installation of the latest version of Kedro-Viz.

### As a Kedro Python plugin

Kedro-Viz is available as a Python plugin named `kedro-viz`.

The following conditions must be true in order to visualise your pipeline:

- Your project directory must be available to the Kedro-Viz plugin.
- You must be using a Kedro project structure with a complete Data Catalog, nodes and pipeline structure.

To install it:

```bash
pip install kedro-viz
```

This will install `kedro` as a dependency, and add `kedro viz` as an additional CLI command.

![Kedro CLI command](https://github.com/quantumblacklabs/kedro-viz/blob/main/.github/img/kedro_cli_example.png?raw=true)

To visualise your pipeline, go to your project root directory and install the project-specific dependencies by running:

```bash
kedro install
```

This will install the dependencies specified in `requirements.txt` in your Kedro environment (see [the Kedro documentation](https://kedro.readthedocs.io/en/latest/02_getting_started/01_prerequisites.html#python-virtual-environments) for how to set up your Python virtual environment).

Finally, run the following command from the project directory to visualise your pipeline:

```bash
kedro viz
```

This command will run kedro_viz.server on `http://127.0.0.1:4141/` which cannot be accessed from another machine.

Kedro-Viz has a number of options to customise running the visualisation:
| CLI command | Description |
| ----------- | ----------- |
| `--host` | Host that viz will listen to. Defaults to 127.0.0.1. |
| `--port` | TCP port that viz will listen to. Defaults to 4141. |
| `--browser/--no-browser` | Whether to open viz interface in the default browser or not. |
| `--load-file` | Path to load the pipeline JSON file |
| `--save-file` | Path to save the pipeline JSON file |
| `--pipeline` | Name of the [modular pipeline](https://kedro.readthedocs.io/en/latest/04_user_guide/06_pipelines.html#modular-pipelines) to visualise. If not set, the default pipeline is visualised. |
| `--env`, `-e` | Kedro configuration environment. If not specified, catalog config in `local` will be used. |


### As a JavaScript React component

Kedro-Viz is also available as an npm package named [@quantumblack/kedro-viz](https://www.npmjs.com/package/@quantumblack/kedro-viz). To install it:

```bash
npm install @quantumblack/kedro-viz
```

Then include it in your React application:

```javascript
import KedroViz from '@quantumblack/kedro-viz';

const MyApp = () => <KedroViz data={json} />;
```

As a JavaScript React component, the project is designed to be used in two different ways:

1. **Standalone application**

   Run `npm run build` to generate a production build as a full-page app. The built app will be placed in the `/build` directory. Data for the chart should be placed in `/public/api/main` because this directory is marked `gitignore`.

2. **React component**

   Kedro-Viz can be used as a React component that can be imported into other applications. Publishing the package will run `npm run lib`, which compiles the source code in `/src`, and places it in the `/lib` directory.

   The React component exposes props that can be used to supply data and customise its behaviour. For information about the props, their expected prop-types and default values, see [/src/components/app/index.js](https://github.com/quantumblacklabs/kedro-viz/blob/main/src/components/app/index.js). For examples of the expected data input format, see the mock data examples in [/src/utils/data](https://github.com/quantumblacklabs/kedro-viz/tree/main/src/utils/data), and compare the [resulting demo](https://quantumblacklabs.github.io/kedro-viz/).

## Flags

The following flags are available to toggle experimental features:

- `oldgraph` - From release v3.8.0. Display old version of graph (dagre algorithm) without improved graphing algorithm. (default `false`)
- `newparams` - From release v3.12.0. Disable parameters on page load and highlight parameter connections.
- `sizewarning` - From release v3.9.1. Show a warning before rendering very large graphs. (default `true`)
- `modularpipeline` - From release v3.11.0. Enables filtering of nodes by modular pipelines. Note that selecting both modular pipeline and tag filters will only return nodes that belongs to both categories. (default `false`). 

Note that newgraph has been removed from v3.8.0 onwards and is now the default functionality. Should there be issues with your project, see the oldgraph flag above.

### Setting flags

To enable or disable a flagged feature, add the flag as a parameter with the value `true` or `false` to the end of the URL in your browser when running Kedro-Viz, e.g.

`http://localhost:4141/?data=demo&oldgraph=true`

The setting you provide persists for all sessions on your machine, until you change it.

### Viewing flags

Kedro-Viz will log a message in your browser's [developer console](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools#The_JavaScript_console) regarding the available flags and their values as currently set on your machine.

## What licence do you use?

Kedro-Viz is licensed under the [Apache 2.0](https://github.com/quantumblacklabs/kedro-viz/blob/main/LICENSE.md) License.

## How can I cite Kedro-Viz?

If you're an academic, Kedro-Viz can also help you, for example, as a tool to visualise how your publication's pipeline is structured. Find our citation reference on [Zenodo](https://doi.org/10.5281/zenodo.4277218).

<p align="center">↑↑↓↓←→←→BA</p>
