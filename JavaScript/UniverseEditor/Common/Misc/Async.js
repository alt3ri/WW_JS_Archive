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
    (this.SRa = !1),
      (this.ERa = new Promise((t, s) => {
        (this.yRa = t), (this.IRa = s);
      }));
  }
  get Promise() {
    return this.ERa;
  }
  get IsFinished() {
    return this.SRa;
  }
  Resolve(t) {
    if (this.SRa) throw new Error("Already finished");
    (this.SRa = !0), this.yRa(t);
  }
  Reject(t) {
    if (this.SRa) throw new Error("Already finished");
    (this.SRa = !0), this.IRa(t);
  }
}
exports.ResolvablePromise = ResolvablePromise;
class IdleValue {
  constructor(t, s = (0, Task_1.getIdleCallbackService)()) {
    (this.TRa = s),
      (this.bAa = !1),
      (this.qAa = () => {
        try {
          this.GAa = t();
        } catch (t) {
          this.OAa = t;
        } finally {
          this.bAa = !0;
        }
      }),
      (this.vJ = s.Call(() => {
        this.qAa();
      }));
  }
  Dispose() {
    this.TRa.Cancel(this.vJ);
  }
  get Value() {
    if ((this.bAa || (this.TRa.Cancel(this.vJ), this.qAa()), this.OAa))
      throw this.OAa;
    return this.GAa;
  }
  get IsInitialized() {
    return this.bAa;
  }
}
exports.IdleValue = IdleValue;
class IdleArray {
  constructor(t, s, i, e = (0, Task_1.getIdleCallbackService)()) {
    (this.he = t),
      (this.OPt = s),
      (this.qAa = i),
      (this.TRa = e),
      (this.LRa = 0),
      (this.DRa = []),
      (this.hba = !1),
      (this.ARa = new ResolvablePromise()),
      (this.RRa = new Array(s.length));
    const h = () =>
      e.Call(() => {
        var t;
        this.URa(this.LRa),
          this.LRa++,
          this.LRa < this.Size
            ? (this.vJ = h())
            : ((this.vJ = void 0),
              (this.hba = !0),
              1 === this.DRa.length
                ? ((t = this.DRa[0]), this.ARa.Reject(t))
                : 1 < this.DRa.length
                  ? this.ARa.Reject(
                      new Error_1.AggregateError(
                        this.DRa,
                        `IdleArray ${this.he} failed`,
                      ),
                    )
                  : this.ARa.Resolve());
      });
    0 < this.Size ? (this.vJ = h()) : ((this.hba = !0), this.ARa.Resolve());
  }
  get Ready() {
    return this.ARa;
  }
  get Size() {
    return this.OPt.length;
  }
  ToString() {
    return `${this.he}(${this.LRa}/${this.Size})`;
  }
  get IsInitialized() {
    return this.hba;
  }
  get ReadyCount() {
    return this.LRa;
  }
  URa(t) {
    try {
      this.RRa[t] = this.qAa(this.OPt[t]);
    } catch (t) {
      this.DRa.push(t);
    }
  }
  Dispose() {
    void 0 !== this.vJ && this.TRa.Cancel(this.vJ);
  }
  get Value() {
    if (!this.IsInitialized) {
      void 0 !== this.vJ && (this.TRa.Cancel(this.vJ), (this.vJ = void 0));
      for (let t = this.LRa; t < this.OPt.length; t++) this.URa(t);
      if (
        ((this.LRa = this.OPt.length), (this.hba = !0), 1 === this.DRa.length)
      )
        throw this.DRa[0];
      if (1 < this.DRa.length)
        throw new Error_1.AggregateError(
          this.DRa,
          `IdleArray ${this.he} failed`,
        );
      this.ARa.Resolve();
    }
    return this.RRa;
  }
}
exports.IdleArray = IdleArray;
class AsyncIdleValue {
  constructor(t, s = (0, Task_1.getIdleCallbackService)()) {
    (this.qAa = t),
      (this.TRa = s),
      (this.xRa = !1),
      (this.IYt = Date.now()),
      (this.PRa = 0),
      (this.wRa = this.m8()),
      this.wRa
        .then((t) => {
          this.GAa = t;
        })
        .catch((t) => {
          this.OAa = t;
        });
  }
  get Value() {
    if (void 0 !== this.OAa) throw this.OAa;
    return this.wRa;
  }
  get TickCount() {
    return this.PRa;
  }
  get IsInitialized() {
    return void 0 !== this.GAa || void 0 !== this.OAa;
  }
  get IsInstant() {
    return this.xRa;
  }
  set IsInstant(t) {
    (this.xRa = t), this.BRa?.Resolve();
  }
  async m8() {
    return this.qAa(async () => {
      var t;
      this.xRa ||
        (t = Date.now()) - this.IYt < 10 ||
        (this.PRa++,
        (this.IYt = t),
        (this.BRa = new ResolvablePromise()),
        (this.bRa = this.TRa.Call(() => {
          this.BRa.Resolve(), (this.bRa = void 0);
        })),
        await this.BRa.Promise);
    });
  }
  Dispose() {
    void 0 !== this.bRa && this.TRa.Cancel(this.bRa);
  }
}
exports.AsyncIdleValue = AsyncIdleValue;
class GeneratorIdleValue {
  constructor(t) {
    (this.lba = t),
      (this.hba = !1),
      (this._ba = 0),
      (this.uba = !1),
      (this.cba = this.lba()),
      (this.ARa = new ResolvablePromise()),
      (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
        this.mba(!0);
      }));
  }
  get IsPaused() {
    return this.uba;
  }
  set IsPaused(t) {
    this.uba !== t &&
      (this.IsInitialized ||
        (this.uba
          ? (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
              this.mba(!0);
            }))
          : ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
            (this.vJ = void 0))),
      (this.uba = t));
  }
  mba(t) {
    try {
      var s = this.cba.next();
      this._ba++,
        s.done && ((this.GAa = s.value), (this.hba = !0), this.ARa.Resolve());
    } catch (t) {
      (this.hba = !0), (this.OAa = t), this.ARa.Reject(t);
    }
    this.hba
      ? ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
        (this.vJ = void 0))
      : t &&
        (this.vJ = (0, Task_1.getIdleCallbackService)().Call(() => {
          this.mba(t);
        }));
  }
  get StepCount() {
    return this._ba;
  }
  get IsInitialized() {
    return this.hba;
  }
  get Value() {
    for (
      this.uba && (this.uba = !1),
        void 0 !== this.vJ &&
          ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
          (this.vJ = void 0));
      !this.hba;

    )
      this.mba(!1);
    if (void 0 !== this.OAa) throw this.OAa;
    return this.GAa;
  }
  get Ready() {
    return this.ARa;
  }
  Dispose() {
    void 0 !== this.vJ &&
      ((0, Task_1.getIdleCallbackService)().Cancel(this.vJ),
      (this.vJ = void 0));
  }
}
exports.GeneratorIdleValue = GeneratorIdleValue;
//# sourceMappingURL=Async.js.map
