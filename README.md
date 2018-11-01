# iris
Global help desk and analysis tool.

## Running integration tests locally

### Setup

- RUN yarn
- RUN yarn global add puppeteer
- CD $(yarn global dir)/node_modules/puppeteer
- RUN yarn link
- CD path/to/iris
- RUN yarn link puppeteer

### Run integration tests

- RUN yarn integration
