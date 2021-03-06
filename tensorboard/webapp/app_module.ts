/* Copyright 2019 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {StoreModule, META_REDUCERS} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AppContainer} from './app_container';
import {CoreModule} from './core/core_module';
import {HashStorageModule} from './core/views/hash_storage_module';
import {PluginsModule} from './plugins/plugins_module';
import {SettingsModule} from './settings/settings_module';

import {ROOT_REDUCERS, loggerMetaReducerFactory} from './reducer_config';

import {HeaderModule} from './header/header_module';
import {ReloaderModule} from './reloader/reloader_module';
import {MatIconModule} from './mat_icon_module';

@NgModule({
  declarations: [AppContainer],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HashStorageModule,
    HeaderModule,
    MatIconModule,
    PluginsModule,
    ReloaderModule,
    SettingsModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: META_REDUCERS,
      useFactory: loggerMetaReducerFactory,
      multi: true,
    },
  ],
  bootstrap: [AppContainer],
})
export class AppModule {}
