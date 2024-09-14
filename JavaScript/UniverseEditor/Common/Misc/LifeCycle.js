"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Disposable =
    exports.DisposableStore =
    exports.combinedDisposable =
    exports.toDisposable =
    exports.disposeIfDisposable =
    exports.isDisposable =
    exports.dispose =
    exports.markAsSingleton =
    exports.markAsDisposed =
    exports.trackDisposable =
    exports.setDisposableTracker =
      void 0);
const Error_1 = require("./Error"),
  Functional_1 = require("./Functional"),
  Log_1 = require("./Log");
let disposableTracker = void 0;
function setDisposableTracker(s) {
  disposableTracker = s;
}
function trackDisposable(s) {
  return disposableTracker?.TrackDisposable(s), s;
}
function markAsDisposed(s) {
  disposableTracker?.MarkAsDisposed(s);
}
function setParentOfDisposable(s, e) {
  disposableTracker?.SetParent(s, e);
}
function setParentOfDisposables(s, e) {
  if (disposableTracker) for (const o of s) disposableTracker.SetParent(o, e);
}
function markAsSingleton(s) {
  return disposableTracker?.MarkAsSingleton(s), s;
}
function dispose(s) {
  if ((0, Functional_1.isIterable)(s)) {
    var e = [];
    for (const o of s)
      if (o)
        try {
          o.Dispose();
        } catch (s) {
          e.push(s);
        }
    if (1 === e.length) throw e[0];
    if (1 < e.length) throw new Error_1.AggregateError(e, "Dispose failed");
    return Array.isArray(s) ? [] : s;
  }
  if (s) return s.Dispose(), s;
}
function isDisposable(s) {
  return "function" == typeof s.Dispose && 0 === s.Dispose.length;
}
function disposeIfDisposable(s) {
  for (const e of s) isDisposable(e) && e.Dispose();
  return [];
}
function toDisposable(s) {
  const e = trackDisposable({
    Dispose: (0, Functional_1.once)(() => {
      markAsDisposed(e), s();
    }),
  });
  return e;
}
function combinedDisposable(...s) {
  var e = toDisposable(() => dispose(s));
  return setParentOfDisposables(s, e), e;
}
(exports.setDisposableTracker = setDisposableTracker),
  (exports.trackDisposable = trackDisposable),
  (exports.markAsDisposed = markAsDisposed),
  (exports.markAsSingleton = markAsSingleton),
  (exports.dispose = dispose),
  (exports.isDisposable = isDisposable),
  (exports.disposeIfDisposable = disposeIfDisposable),
  (exports.toDisposable = toDisposable),
  (exports.combinedDisposable = combinedDisposable);
class DisposableStore {
  constructor() {
    (this.QAa = new Set()), (this.KAa = !1), trackDisposable(this);
  }
  Dispose() {
    this.KAa || (markAsDisposed(this), (this.KAa = !0), this.Clear());
  }
  Clear() {
    if (0 !== this.QAa.size)
      try {
        dispose(this.QAa);
      } finally {
        this.QAa.clear();
      }
  }
  Add(s) {
    if (s) {
      if (s === this)
        throw new Error("Cannot register a disposable on itself!");
      setParentOfDisposable(s, this),
        this.KAa
          ? DisposableStore.DisableDisposedWarning ||
            (0, Log_1.warn)(
              new Error(
                "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!",
              ).stack ?? "",
            )
          : this.QAa.add(s);
    }
    return s;
  }
}
(exports.DisposableStore = DisposableStore).DisableDisposedWarning = !1;
class Disposable {
  constructor() {
    (this.$Aa = new DisposableStore()),
      trackDisposable(this),
      setParentOfDisposable(this.$Aa, this);
  }
  Dispose() {
    markAsDisposed(this), this.$Aa.Dispose();
  }
  Register(s) {
    if (s === this) throw new Error("Cannot register a disposable on itself!");
    return this.$Aa.Add(s);
  }
}
(exports.Disposable = Disposable).None = Object.freeze({ Dispose() {} });
//# sourceMappingURL=LifeCycle.js.map
