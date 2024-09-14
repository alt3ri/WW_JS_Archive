"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Emitter = void 0);
const LifeCycle_1 = require("./LifeCycle"),
  Log_1 = require("./Log");
class Stacktrace {
  constructor(t) {
    this.Value = t;
  }
  static Create() {
    return new Stacktrace(new Error().stack);
  }
  Print() {
    (0, Log_1.warn)(this.Value.split("\n").slice(2).join("\n"));
  }
}
let id = 0;
class UniqueContainer {
  constructor(t) {
    (this.Value = t), (this.Id = id++);
  }
}
class Emitter {
  constructor() {
    this.Size = 0;
  }
  Dispose() {
    this.VAa ||
      ((this.VAa = !0),
      this.Listeners && ((this.Listeners = void 0), (this.Size = 0)));
  }
  get Event() {
    return (
      (this.HAa ??= (t, i, e) => {
        if (this.VAa) return LifeCycle_1.Disposable.None;
        i = i ? t.bind(i) : t;
        const s = new UniqueContainer(i);
        this.Listeners
          ? this.Listeners instanceof UniqueContainer
            ? (this.Listeners = [this.Listeners, s])
            : this.Listeners.push(s)
          : (this.Listeners = s),
          this.Size++;
        t = (0, LifeCycle_1.toDisposable)(() => {
          this.jAa(s);
        });
        return (
          e instanceof LifeCycle_1.DisposableStore
            ? e.Add(t)
            : Array.isArray(e) && e.push(t),
          t
        );
      }),
      this.HAa
    );
  }
  jAa(t) {
    if (this.Listeners)
      if (1 === this.Size) (this.Listeners = void 0), (this.Size = 0);
      else {
        var i = this.Listeners,
          t = i.indexOf(t);
        if (-1 === t)
          throw new Error(
            "Attempted to remove listener which is not registered",
          );
        i.splice(t, 1);
      }
  }
  WAa(t, i) {
    t && t.Value(i);
  }
  Fire(t) {
    if (this.Listeners)
      if (this.Listeners instanceof UniqueContainer)
        this.WAa(this.Listeners, t);
      else for (const i of this.Listeners) this.WAa(i, t);
  }
}
exports.Emitter = Emitter;
//# sourceMappingURL=Event.js.map
