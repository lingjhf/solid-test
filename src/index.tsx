import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, HashRouter, Route } from "@solidjs/router";

import App from './App';
import 'virtual:uno.css'

const Datetime = lazy(() => import('./pages/datetime'))
const WasmPage = lazy(() => import("./pages/wasm"));
const GeolocationPage = lazy(() => import("./pages/geolocation"));
const openLayer = lazy(() => import("./pages/open-layer"))

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <HashRouter>
    <Route path="/datetime" component={Datetime}></Route>
    <Route path="/wasm" component={WasmPage} />
    <Route path="/geolocation" component={GeolocationPage} />
    <Route path="/open-layer" component={openLayer}></Route>
  </HashRouter>
), root!);