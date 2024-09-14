"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TickProcessSystem = void 0);
const Log_1 = require("../Common/Log"),
  TickSystem_1 = require("./TickSystem");
class TickProcess {
  constructor() {
    (this.Id = 0),
      (this.zAa = void 0),
      (this.Jja = 0),
      (this.bnr = 0),
      (this.Zja = 0),
      (this.eWa = 8),
      (this.tWa = void 0),
      (this.Id = ++TickProcess.o6);
  }
  get Group() {
    return this.eWa;
  }
  Init(s, i, t, e = 0, c = void 0) {
    (this.zAa = new WeakRef(s)),
      (this.eWa = i),
      (this.Jja = t),
      (this.bnr = e),
      (this.Zja = 0),
      (this.tWa = c);
  }
  Tick(s) {
    var i = this.zAa?.deref();
    return i
      ? (i(s),
        0 === this.Jja ||
          (1 === this.Jja && ((this.Zja += s), this.Zja >= this.bnr)))
      : (2 === this.Jja &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Tick",
            37,
            "[TickProcessSystem] Callback Invalid. 可能存在ForeverCallback未及时注销的情况",
            ["CreateReason", this.tWa],
          ),
        !0);
  }
}
TickProcess.o6 = 0;
class TickProcessSystem {
  static iWa(i) {
    if (!this.rWa.has(i)) {
      let s = void 0;
      switch (i) {
        case 0:
          s = TickSystem_1.TickSystem.Add(
            this.oWa,
            "TickProcess_PrePhysics",
            i,
          );
          break;
        case 1:
          s = TickSystem_1.TickSystem.Add(
            this.nWa,
            "TickProcess_StartPhysics",
            i,
          );
          break;
        case 2:
          s = TickSystem_1.TickSystem.Add(
            this.sWa,
            "TickProcess_DuringPhysics",
            i,
          );
          break;
        case 3:
          s = TickSystem_1.TickSystem.Add(
            this.aWa,
            "TickProcess_EndPhysics",
            i,
          );
          break;
        case 4:
          s = TickSystem_1.TickSystem.Add(
            this.lWa,
            "TickProcess_PostPhysics",
            i,
          );
          break;
        case 5:
          s = TickSystem_1.TickSystem.Add(
            this.hWa,
            "TickProcess_PostUpdateWork",
            i,
          );
          break;
        case 6:
          s = TickSystem_1.TickSystem.Add(
            this._Wa,
            "TickProcess_LastDemotable",
            i,
          );
          break;
        case 7:
          s = TickSystem_1.TickSystem.Add(
            this.uWa,
            "TickProcess_NewlySpawned",
            i,
          );
      }
      s && this.rWa.set(i, s);
    }
  }
  static cWa(s) {
    var i;
    this.rWa.has(s) &&
      (i = this.rWa.get(s)) &&
      (this.rWa.delete(s), TickSystem_1.TickSystem.Remove(i?.Id));
  }
  static r6(s, i) {
    if (this.mWa.has(i)) {
      i = this.mWa.get(i);
      if (!(i.size < 1)) {
        for (const t of i) t.Tick(s) && this.dWa.add(t.Id);
        if (0 < this.dWa.size) {
          for (const e of this.dWa) this.UnregisterTickProcess(e);
          this.dWa.clear();
        }
      }
    }
  }
  static RegisterTickProcess(s, i, t) {
    this.mWa.has(s) || (this.mWa.set(s, new Set()), this.iWa(s));
    var e = new TickProcess();
    return (
      e.Init(i, s, 2, 0, t),
      this.mWa.get(s)?.add(e),
      this.CWa.set(e.Id, e),
      e.Id
    );
  }
  static RegisterOnceTickProcess(s, i) {
    this.mWa.has(s) || (this.mWa.set(s, new Set()), this.iWa(s));
    var t = new TickProcess();
    return (
      t.Init(i, s, 0), this.mWa.get(s)?.add(t), this.CWa.set(t.Id, t), t.Id
    );
  }
  static RegisterDelayTickProcess(s, i, t) {
    this.mWa.has(s) || (this.mWa.set(s, new Set()), this.iWa(s));
    var e = new TickProcess();
    return (
      e.Init(i, s, 1, t), this.mWa.get(s)?.add(e), this.CWa.set(e.Id, e), e.Id
    );
  }
  static UnregisterTickProcess(s) {
    var i;
    this.CWa.has(s) &&
      (i = this.CWa.get(s)) &&
      (this.CWa.delete(s), (s = i.Group), (s = this.mWa.get(s))) &&
      s.delete(i);
  }
  static Clear() {
    for (const s of this.mWa.keys()) this.cWa(s);
    this.CWa.clear(), this.mWa.clear(), this.dWa.clear();
  }
}
(exports.TickProcessSystem = TickProcessSystem),
  ((_a = TickProcessSystem).rWa = new Map()),
  (TickProcessSystem.oWa = (s) => {
    _a.r6(s, 0);
  }),
  (TickProcessSystem.nWa = (s) => {
    _a.r6(s, 1);
  }),
  (TickProcessSystem.sWa = (s) => {
    _a.r6(s, 2);
  }),
  (TickProcessSystem.aWa = (s) => {
    _a.r6(s, 3);
  }),
  (TickProcessSystem.lWa = (s) => {
    _a.r6(s, 4);
  }),
  (TickProcessSystem.hWa = (s) => {
    _a.r6(s, 5);
  }),
  (TickProcessSystem._Wa = (s) => {
    _a.r6(s, 6);
  }),
  (TickProcessSystem.uWa = (s) => {
    _a.r6(s, 7);
  }),
  (TickProcessSystem.dWa = new Set()),
  (TickProcessSystem.mWa = new Map()),
  (TickProcessSystem.CWa = new Map());
//# sourceMappingURL=TickProcessSystem.js.map
