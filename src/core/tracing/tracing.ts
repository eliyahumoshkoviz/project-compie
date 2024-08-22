import { trace } from '@opentelemetry/api';
import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

export function tracing(): void {
  const provider: BasicTracerProvider = new BasicTracerProvider();
  provider.register();
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  trace.setGlobalTracerProvider(provider);
  const name = process.env.SERVICE_NAME || 'nest-example-app';
  const version = '0.0.1';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tracer = trace.getTracer(name, version);
  const SERVICE_NAME = process.env.SERVICE_NAME || 'example';
  const traceExporter = new ConsoleSpanExporter();
  const sdk = new opentelemetry.NodeSDK({
    resource: new Resource({
      ['service.name']: SERVICE_NAME,
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });
  // initialize the SDK and register with the OpenTelemetry API
  // this enables the API to record telemetry
  sdk.start();
  // .then(() => console.log('Tracing initialized'))
  // .catch((error) => console.log('Error initializing tracing', error));

  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });
}
