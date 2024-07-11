"use strict";
async function delay(t) {
  return new Promise(function (e) {
    setTimeout(e, t * exports.MS_PER_SEC);
  });
}
async function delayMs(t) {
  return new Promise(function (e) {
    setTimeout(e, t);
  });
}
function createCancellableDelay(t, n) {
  let o = void 0;
  let s = !1;
  return {
    Promise: new Promise((e) => {
      o = setTimeout(() => {
        (s = !0), e(n);
      }, t * exports.MS_PER_SEC);
    }),
    IsFinished: () => s,
    Cancel: () => {
      s || clearTimeout(o);
    },
  };
}
function createSignal() {
  let t = void 0;
  let n = !1;
  let o = void 0;
  return {
    Promise: new Promise((e) => {
      t = e;
    }),
    Emit: (e) => {
      (n = !0), (o = e), t(e);
    },
    IsEmit: () => n,
    Result: () => o,
  };
}
function isAsyncFunction(e) {
  return typeof e === "function" && e.constructor.name === "AsyncFunction";
}
async function asyncRetryUntil(e, t = 10, n = 2e3) {
  let o = 0;
  do {
    if ((++o, await e())) return;
  } while ((n > 0 && (await delayMs(n)), o < t));
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.asyncRetryUntil =
    exports.isAsyncFunction =
    exports.createSignal =
    exports.createCancellableDelay =
    exports.delayMs =
    exports.delay =
    exports.MS_PER_SEC =
      void 0),
  (exports.MS_PER_SEC = 1e3),
  (exports.delay = delay),
  (exports.delayMs = delayMs),
  (exports.createCancellableDelay = createCancellableDelay),
  (exports.createSignal = createSignal),
  (exports.isAsyncFunction = isAsyncFunction),
  (exports.asyncRetryUntil = asyncRetryUntil);
// # sourceMappingURL=Async.js.map
