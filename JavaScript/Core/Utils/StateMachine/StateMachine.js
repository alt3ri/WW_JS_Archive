"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StateMachine = void 0);
const Log_1 = require("../../Common/Log"),
  Stats_1 = require("../../Common/Stats");
class StateMachine {
  constructor(t, e = void 0) {
    (this.kh = new Map()), (this.Owner = t), (this.Pz = e);
  }
  get CurrentState() {
    return this.xz?.State;
  }
  Start(t) {
    return void 0 !== this.xz
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("StateMachine", 12, "状态机重复启动", ["state", t]),
        !1)
      : ((this.xz = this.GetState(t)),
        !!this.xz && (this.xz.Start(), this.Pz && this.Pz(t, t), !0));
  }
  Destroy() {
    for (const t of this.kh.values()) t.Destroy();
  }
  Switch(t) {
    if (void 0 === this.xz)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("StateMachine", 12, "状态机没有开始", ["state", t]),
        !1
      );
    StateMachine.wz.Start();
    var e,
      a = this.GetState(t);
    return (
      StateMachine.wz.Stop(),
      !(
        !a ||
        (t === this.xz.State
          ? !this.xz.CanReEnter() || (this.xz.ReEnter(), 0)
          : ((e = this.xz.State),
            !a.CanChangeFrom(e) ||
              (StateMachine.Bz.Start(),
              this.xz.Exit(t),
              (this.xz = a),
              this.xz.Enter(e),
              StateMachine.Bz.Stop(),
              this.Pz &&
                (StateMachine.bz.Start(),
                this.Pz(e, t),
                StateMachine.bz.Stop()),
              0)))
      )
    );
  }
  Update(t) {
    this.xz && this.xz.Update(t);
  }
  AddState(t, e, a) {
    this.kh.has(t)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("StateMachine", 12, "状态重复添加", ["state", t])
      : ((e = new e(this.Owner, t, this)),
        this.kh.set(t, e),
        StateMachine.qz.Start(),
        e.Create(a),
        StateMachine.qz.Stop());
  }
  GetState(t) {
    var e = this.kh.get(t);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("StateMachine", 12, "状态不存在", ["state", t])),
      e
    );
  }
}
((exports.StateMachine = StateMachine).qz =
  Stats_1.Stat.Create("StateMachine.Stat0")),
  (StateMachine.wz = Stats_1.Stat.Create("StateMachine.Stat1")),
  (StateMachine.Bz = Stats_1.Stat.Create("StateMachine.Stat2")),
  (StateMachine.bz = Stats_1.Stat.Create("StateMachine.Stat3"));
//# sourceMappingURL=StateMachine.js.map
