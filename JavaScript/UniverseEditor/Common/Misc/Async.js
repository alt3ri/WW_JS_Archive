"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneratorIdleValue =
    exports.AsyncIdleValue =
    exports.IdleArray =
    exports.IdleValue =
    exports.ResolvablePromise =
    exports.asyncRetryUntil =
    exports.isAsyncFunction =
    exports.createSignal =
    exports.createCancellableDelay =
    exports.waitCondition =
    exports.delayMs =
    exports.delay =
    exports.MS_PER_SEC =
      void 0);
const Error_1 = require("./Error"),
  Task_1 = require("./Task");
async function delay(s) {
  return new Promise(function (t) {
    setTimeout(t, s * exports.MS_PER_SEC);
  });
}
async function delayMs(s) {
  return new Promise(function (t) {
    setTimeout(t, s);
  });
}
async function waitCondition(t, s = 1e3) {
  for (var i = Date.now(); !t(); ) {
    if (Date.now() - i > s) return !1;
    await delayMs(10);
  }
  return !0;
}
function createCancellableDelay(s, i) {
  let e = void 0,
    h = !1;
  return {
    Promise: new Promise((t) => {
      e = setTimeout(() => {
        (h = !0), t(i);
      }, s * exports.MS_PER_SEC);
    }),
    IsFinished: () => h,
    Cancel: () => {
      h || clearTimeout(e);
    },
  };
}
function createSignal() {
  let s = void 0,
    i = !1,
    e = void 0;
  return {
    Promise: new Promise((t) => {
      s = t;
    }),
    Emit: (t) => {
      (i = !0), (e = t), s(t);
    },
    IsEmit: () => i,
    Result: () => e,
  };
}
function isAsyncFunction(t) {
  return "function" == typeof t && "AsyncFunction" === t.constructor.name;
}
async function asyncRetryUntil(t, s = 10, i = 2e3) {
  let e = 0;
  do {
    if ((++e, await t())) return;
  } while ((0 < i && (await delayMs(i)), e < s));
}
(exports.MS_PER_SEC = 1e3),
  (exports.delay = delay),
  (exports.delayMs = delayMs),
  (exports.waitCondition = waitCondition),
  (exports.createCancellableDelay = createCancellableDelay),
  (exports.createSignal = createSignal),
  (exports.isAsyncFunction = isAsyncFunction),
  (exports.asyncRetryUntil = asyncRetryUntil);
class ResolvablePromise {
  constructor() {
    (this.TRa = !1),
      (this.LRa = new Promise((t, s) => {
        (this.DRa = t), (this.ARa = s);
      }));
  }
  get Promise() {
    return this.LRa;
  }
  get IsFinished() {
    return this.TRa;
  }
  Resolve(t) {
    if (this.TRa) throw new Error("Already finished");
    (this.TRa = !0), this.DRa(t);
  }
  Reject(t) {
    if (this.TRa) throw new Error("Already finished");
    (this.TRa = !0), this.ARa(t);
  }
}
exports.ResolvablePromise = ResolvablePromise;
class IdleValue {
  constructor(t, s = (0, Task_1.getIdleCallbackService)()) {
    (this.RRa = s),
      (this.aAa = !1),
      (this.hAa = () => {
        try {
          this.lAa = t();
        } catch (t) {
          this._Aa = t;
        } finally {
          this.aAa = !0;
        }
      }),
      (this.vJ = s.Call(() => {
        this.hAa();
      }));
  }
  Dispose() {
    this.RRa.Cancel(this.vJ);
  }
  get Value() {
    if ((this.aAa || (this.RRa.Cancel(this.vJ), this.hAa()), this._Aa))
      throw this._Aa;
    return this.lAa;
  }
  get IsInitialized() {
    return this.aAa;
  }
}
exports.IdleValue = IdleValue;
class IdleArray {
  constructor(t, s, i, e = (0, Task_1.getIdleCallbackService)()) {
    (this.he = t),
      (this.OPt = s),
      (this.hAa = i),
      (this.RRa = e),
      (this.URa = 0),
      (this.xRa = []),
      (this.Iba = !1),
      (this.PRa = new ResolvablePromise()),
      (this.wRa = new Array(s.length));
    const h = () =>
      e.Call(() => {
        var t;
        this.BRa(this.URa),
          this.URa++,
          this.URa < this.Size
            ? (this.vJ = h())
            : ((this.vJ = void 0),
              (this.Iba = !0),
              1 === this.xRa.length
                ? ((t = this.xRa[0]), this.PRa.Reject(t))
                : 1 < this.xRa.length
                  ? this.PRa.Reject(
                      new Error_1.AggregateError(
                        this.xRa,
                        `IdleArray ${this.he} failed`,
                      ),
                    )
                  : this.PRa.Resolve());
      });
    0 < this.Size ? (this.vJ = h()) : ((this.Iba = !0), this.PRa.Resolve());
  }
  get Ready() {
    return this.PRa;
  }
  get Size() {
    return this.OPt.length;
  }
  ToString() {
    return `${this.he}(${this.URa}/${this.Size})`;
  }
  get IsInitialized() {
    return this.Iba;
  }
  get ReadyCount() {
    return this.URa;
  }
  BRa(t) {
    try {
      this.wRa[t] = this.hAa(this.OPt[t]);
    } catch (t) {
      this.xRa.push(t);
    }
  }
  Dispose() {
    void 0 !== this.vJ && this.RRa.Cancel(this.vJ);
  }
  get Value() {
    if (!this.IsInitialized) {
      void 0 !== this.vJ && (this.RRa.Cancel(this.vJ), (this.vJ = void 0));
      for (let t = this.URa; t < this.OPt.length; t++) this.BRa(t);
      if (
        ((this.URa = this.OPt.length), (this.Iba = !0), 1 === this.xRa.length)
      )
        throw this.xRa[0];
      if (1 < this.xRa.length)
        throw new Error_1.AggregateError(
          this.xRa,
          `IdleArray ${this.he} failed`,
        );
      this.PRa.Resolve();
    }
    return this.wRa;
  }
  Load(t) {
    this.wRa.length = 0;
    for (const s of t) this.wRa.push(s);
    (this.URa = t.length), (this.Iba = !0);
  }
}
exports.IdleArray = IdleArray;
class AsyncIdleValue {
  constructor(t, s = (0, Task_1.getIdleCallbackService)()) {
    (this.hAa = t),
      (this.RRa = s),
      (this.bRa = !1),
      (this.IYt = Date.now()),
      (this.qRa = 0),
      (this.GRa = this.m8()),
      this.GRa.then((t) => {
        this.lAa = t;
      }).catch((t) => {
        this._Aa = t;
      });
  }
  get Value() {
    if (void 0 !== this._Aa) throw this._Aa;
    return this.GRa;
  }
  get TickCount() {
    return this.qRa;
  }
  get IsInitialized() {
    return void 0 !== this.lAa || void 0 !== this._Aa;
  }
  get IsInstant() {
    return this.bRa;
  }
  set IsInstant(t) {
    (this.bRa = t), this.ORa?.Resolve();
  }
  async m8() {
    return this.hAa(async () => {
      var t;
      this.bRa ||
        (t = Date.now()) - this.IYt < 10 ||
        (this.qRa++,
        (this.IYt = t),
        (this.ORa = new ResolvablePromise()),
        (this.kRa = this.RRa.Call(() => {
          this.ORa.Resolve(), (this.kRa = void 0);
        })),
        await this.ORa.Promise);
    });
  }
  Dispose() {
    void 0 !== this.kRa && this.RRa.Cancel(this.kRa);
  }
}
exports.AsyncIdleValue = AsyncIdleValue;
class GeneratorIdleValue {
  constructor(t) {
    (this.Tba = t),
      (this.Iba = !1),
      (this.Lba = 0),
      (this.Dba = !1),
      (this.Aba = this.Tba()),
      (this.PRa = new ResolvablePromise()),
      (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
        this.Rba(!0);
      }));
  }
  get IsPaused() {
    return this.Dba;
  }
  set IsPaused(t) {
    this.Dba !== t &&
      (this.IsInitialized ||
        (this.Dba
          ? (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
              this.Rba(!0);
            }))
          : ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
            (this.vJ = void 0))),
      (this.Dba = t));
  }
  Rba(t) {
    try {
      var s = this.Aba.next();
      this.Lba++,
        s.done && ((this.lAa = s.value), (this.Iba = !0), this.PRa.Resolve());
    } catch (t) {
      (this.Iba = !0), (this._Aa = t), this.PRa.Reject(t);
    }
    this.Iba
      ? ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
        (this.vJ = void 0))
      : t &&
        (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
          this.Rba(t);
        }));
  }
  get StepCount() {
    return this.Lba;
  }
  get IsInitialized() {
    return this.Iba;
  }
  get Value() {
    for (
      this.Dba && (this.Dba = !1),
        void 0 !== this.vJ &&
          ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
          (this.vJ = void 0));
      !this.Iba;

    )
      this.Rba(!1);
    if (void 0 !== this._Aa) throw this._Aa;
    return this.lAa;
  }
  get Ready() {
    return this.PRa;
  }
  Dispose() {
    void 0 !== this.vJ &&
      ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
      (this.vJ = void 0));
  }
}
exports.GeneratorIdleValue = GeneratorIdleValue;
//# sourceMappingURL=Async.js.map
