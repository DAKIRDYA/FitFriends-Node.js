import 'reflect-metadata';

import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Container } from 'inversify';
import { Component } from './shared/types/component.enum.js';

import { RestSchema } from './shared/libs/config/rest.schema.js';
import { Config, RestConfig } from './shared/libs/config/index.js';

async function bootstrap() {

  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
