import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgxMonacoEditorConfig, provideMonacoEditor } from 'ngx-monaco-editor-v2';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMonacoEditor(monacoConfig)
  ],
};
