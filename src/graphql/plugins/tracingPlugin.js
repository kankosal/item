import OpentracingPlugin from 'apollo-opentracing';
import { initTracer } from 'jaeger-client';
import { gql } from 'apollo-server-express';
import ENV from '../../constant/envConstant';

const config = {
  serviceName: 'txn-api',
  sampler: {
    type: 'const',
    param: 1,
  },
  reporter: {
    logSpans: true, // enable jaeger logs, to turn off just assign false
    collectorEndpoint: ENV.JAEGER_HOST,
  },
};
const options = {
  // enable logger
  logger: {
    info() {},
    error(msg) {
      console.log('ERROR', msg);
    },
  },
};

const tracer = initTracer(config, options);

const tracingPlugin = OpentracingPlugin({
  server: tracer,
  local: tracer,
  shouldTraceFieldResolver: () => false,
  onRequestResolve: (span, info) => {
    const query = gql`
      ${info.request.query}
    `;
    // eslint-disable-next-line prefer-destructuring
    const operation = query.definitions[0].operation;
    const operationName =
      query.definitions[0].selectionSet.selections[0].name.value;
    span.setOperationName(`${operation}: ${operationName}`);
    // eslint-disable-next-line no-param-reassign
    info.context.span = span; // attach span to context
    global.span = span;
  },
});

export default tracingPlugin;
