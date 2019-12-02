# CaseFu CLI module

Write functional specification in Markdown enhanced with specific keywords
and generate a nice FSD in HTML format.

## Installation

1. Create a new `node` module:

		npm init

	and confirm (or answer) all the questions.

2. Install the CaseFu CLI module:

		npm i casefu-cli --save-dev

3. Add npm scripts. Add the following 2 rows into the `scripts` section of the `package.json` file:

		"scripts": {
			"build": "casefu build",
			"serve": "casefu serve"
		}

4. Create file at `fsd/Overview.md` and put the following into it:

		# My new system

## Building FSD

To build output FSD run:

	npm run build

The FSD is then available at `build/index.html`.

## Writing FSD

1. Open a terminal at the project directory and execute

		npm run serve

2. Open a browser window and navigate to the URL given at the terminal.

3. As you write into the files in the `fsd/` directory
	and save a file, the FSD output in the browser gets automatically refreshed.

There is also a `watch` command that only re-builds the output FSD file
on any change of the source files, but does not push the changes to the browser
(the browser page needs to be refreshed manually in this case).

## Parameters

The `build`, `serve` and `watch` commands have the following parameters:

- `-s, --sources <sources>` -
	Glob pattern to match source files to process. Default: `fsd/**/*.md`
- `-t, --target <target>` -
	Filename of generated HTML file. Default: `build/index.html`
- `-p, --port <port>` (only for `serve` command) -
	Port to bind to. Default: `8080`

## Sample FSD

A sample FSD demonstrating the use of CaseFu generator is
[**available here**](https://htmlpreview.github.io/?https://github.com/ivos/functional-specification-sample/blob/master/build/index.html#__home).

It has been generated from [the following source files](https://github.com/ivos/functional-specification-sample).

## Documentation

The complete documentation is available at [CaseFu.com](https://casefu.com/).
