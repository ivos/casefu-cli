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

## Writing FSD

1. Open a terminal at the project directory and execute

		npm run serve

2. Open a browser window and navigate to the URL given at the terminal.

3. Create a `.md` file within an `fsd/` directory in the project.

4. As you write into the files in the `fsd/` directory
	and save a file, the FSD output in the browser gets automatically refreshed.

## Building FSD

To build output FSD run:

	npm run build

The FSD is then available at `build/index.html`.

## Sample FSD

A sample FSD demonstrating the use of CaseFu generator is
[**available here**](http://htmlpreview.github.io/?https://github.com/ivos/functional-specification-sample/blob/master/build/index.html#__home).

It has been generated from [the following source files](https://github.com/ivos/functional-specification-sample).
