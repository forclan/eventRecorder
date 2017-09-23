/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const puppeteer = require('puppeteer');
import * as path from 'path';

const cssPath = path.join(__dirname, '../bin/cssPath.js');
console.log(cssPath);

const eventRecorder = path.join(__dirname, '../bin/eventListener.js');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();


  // Define a window.onCustomEvent function on the page.
  await page.exposeFunction('onCustomEvent', (input: object)=> {
    console.log(`onCustomEvent fired: input is ${JSON.stringify(input)}`);
  });
  page.on('console', val => console.log(`console.log: ${val}`));

  await page.goto('https://www.baidu.com/', {
    waitUntil: 'networkidle'
  });

  await page.injectFile(cssPath);
  await page.injectFile(eventRecorder);

})();
