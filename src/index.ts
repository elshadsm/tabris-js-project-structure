import { Module } from 'tabris';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paths = (Module.readJSON('./tsconfig.json') as any).compilerOptions.paths;
Module.addPath({ baseUrl: '/dist', paths });

import { create } from 'tabris-decorators';
import { App } from './services/App';

create(App).start();
