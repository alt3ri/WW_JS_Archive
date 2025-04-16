"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TickProcessSystem = void 0);
const Log_1 = require("../Common/Log"),
  TickSystem_1 = require("./TickSystem");
class TickProcess {
  constructor() {
    (this.Id = 0),
      (this.IAa = void 0),
      (this.g$a = 0),
      (this.bnr = 0),
      (this.f$a = 0),
      (this.p$a = 8),
      (this.v$a = void 0),
      (this.Id = ++TickProcess.o6);
  }
  get Group() {
    return this.p$a;
  }
  Init(s, i, t, e = 0, c = void 0) {
    (this.IAa = new WeakRef(s)),
      (this.p$a = i),
      (this.g$a = t),
      (this.bnr = e),
      (this.f$a = 0),
      (this.v$a = c);
  }
  Tick(s) {
    var i = this.IAa?.deref();
    return i
      ? (i(s),
        0 === this.g$a ||
          (1 === this.g$a && ((this.f$a += s), this.f$a >= this.bnr)))
      : (2 === this.g$a &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Tick",
            36,
            "[TickProcessSystem] Callback Invalid. 可能存在ForeverCallback未及时注销的情况",
            ["CreateReason", this.v$a],
          ),
        !0);
  }
}
TickProcess.o6 = 0;
class TickProcessSystem {
  static M$a(i, t) {
    if (!this.S$a.has(i)) {
      let s = void 0;
      switch (i) {
        case 0:
          s = TickSystem_1.TickSystem.Add(
            this.y$a,
            "TickProcess_PrePhysics",
            i,
            t,
          );
          break;
        case 1:
          s = TickSystem_1.TickSystem.Add(
            this.E$a,
            "TickProcess_StartPhysics",
            i,
            t,
          );
          break;
        case 2:
          s = TickSystem_1.TickSystem.Add(
            this.I$a,
            "TickProcess_DuringPhysics",
            i,
            t,
          );
          break;
        case 3:
          s = TickSystem_1.TickSystem.Add(
            this.T$a,
            "TickProcess_EndPhysics",
            i,
            t,
          );
          break;
        case 4:
          s = TickSystem_1.TickSystem.Add(
            this.L$a,
            "TickProcess_PostPhysics",
            i,
            t,
          );
          break;
        case 5:
          s = TickSystem_1.TickSystem.Add(
            this.A$a,
            "TickProcess_PostUpdateWork",
            i,
            t,
          );
          break;
        case 6:
          s = TickSystem_1.TickSystem.Add(
            this.D$a,
            "TickProcess_LastDemotable",
            i,
            t,
          );
          break;
        case 7:
          s = TickSystem_1.TickSystem.Add(
            this.R$a,
            "TickProcess_NewlySpawned",
            i,
            t,
          );
      }
      s && this.S$a.set(i, s);
    }
  }
  static U$a(s) {
    var i;
    this.S$a.has(s) &&
      (i = this.S$a.get(s)) &&
      (this.S$a.delete(s), TickSystem_1.TickSystem.Remove(i?.Id));
  }
  static r6(s, i) {
    if (this.x$a.has(i)) {
      i = this.x$a.get(i);
      if (!(i.size < 1)) {
        for (const t of i) t.Tick(s) && this.P$a.add(t.Id);
        if (0 < this.P$a.size) {
          for (const e of this.P$a) this.UnregisterTickProcess(e);
          this.P$a.clear();
        }
      }
    }
  }
  static Initialize() {
    this.S$a.clear(), this.P$a.clear(), this.x$a.clear(), this.w$a.clear();
  }
  static RegisterTickProcess(s, i, t, e) {
    this.x$a.has(s) || (this.x$a.set(s, new Set()), this.M$a(s, i));
    i = new TickProcess();
    return (
      i.Init(t, s, 2, 0, e),
      this.x$a.get(s)?.add(i),
      this.w$a.set(i.Id, i),
      i.Id
    );
  }
  static RegisterOnceTickProcess(s, i, t) {
    this.x$a.has(s) || (this.x$a.set(s, new Set()), this.M$a(s, i));
    i = new TickProcess();
    return (
      i.Init(t, s, 0), this.x$a.get(s)?.add(i), this.w$a.set(i.Id, i), i.Id
    );
  }
  static RegisterDelayTickProcess(s, i, t, e) {
    this.x$a.has(s) || (this.x$a.set(s, new Set()), this.M$a(s, i));
    i = new TickProcess();
    return (
      i.Init(t, s, 1, e), this.x$a.get(s)?.add(i), this.w$a.set(i.Id, i), i.Id
    );
  }
  static UnregisterTickProcess(s) {
    var i;
    this.w$a.has(s) &&
      (i = this.w$a.get(s)) &&
      (this.w$a.delete(s), (s = i.Group), (s = this.x$a.get(s))) &&
      s.delete(i);
  }
  static Clear() {
    for (const s of this.x$a.keys()) this.U$a(s);
    this.w$a.clear(), this.x$a.clear(), this.P$a.clear();
  }
}
(exports.TickProcessSystem = TickProcessSystem),
  ((_a = TickProcessSystem).y$a = (s) => {
    _a.r6(s, 0);
  }),
  (TickProcessSystem.E$a = (s) => {
    _a.r6(s, 1);
  }),
  (TickProcessSystem.I$a = (s) => {
    _a.r6(s, 2);
  }),
  (TickProcessSystem.T$a = (s) => {
    _a.r6(s, 3);
  }),
  (TickProcessSystem.L$a = (s) => {
    _a.r6(s, 4);
  }),
  (TickProcessSystem.A$a = (s) => {
    _a.r6(s, 5);
  }),
  (TickProcessSystem.D$a = (s) => {
    _a.r6(s, 6);
  }),
  (TickProcessSystem.R$a = (s) => {
    _a.r6(s, 7);
  }),
  (TickProcessSystem.S$a = new Map()),
  (TickProcessSystem.P$a = new Set()),
  (TickProcessSystem.x$a = new Map()),
  (TickProcessSystem.w$a = new Map());
//# sourceMappingURL=TickProcessSystem.js.map
