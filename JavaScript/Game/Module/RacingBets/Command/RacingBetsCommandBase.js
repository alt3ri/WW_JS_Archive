"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsCommandBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem");
class RacingBetsCommandBase {
  constructor() {
    (this.CommandIndex = 0),
      (this.ActionIndex = 0),
      (this.IsAborted = !1),
      (this.CommandType = 0),
      (this.BulletScreenTimes = []),
      (this.CommandIndex = ++RacingBetsCommandBase.f_r);
  }
  async Execute() {
    this.Ys1(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RacingBetsDungeon",
          58,
          "Command Start",
          ["CommandInfo", this.LogInfo()],
          ["CommandIndex", this.CommandIndex],
          ["CommandType", this.CommandType],
        ),
      this.OnActive(),
      await this.OnExecute(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RacingBetsDungeon",
          58,
          "Command Finish",
          ["CommandInfo", this.LogInfo()],
          ["CommandIndex", this.CommandIndex],
          ["CommandType", this.CommandType],
        ),
      this.OnDeActive();
  }
  OnActive() {}
  OnDeActive() {}
  async OnExecute() {}
  LogInfo() {
    return "RacingBetsCommandBase";
  }
  PushBulletScreenTimes(e) {
    this.BulletScreenTimes = e;
  }
  GetRandomBulletScreen(t) {
    var n = t.reduce((e, t) => e + t.D8n, 0);
    if (0 !== n) {
      let e = Math.floor(Math.random() * n);
      for (const s of t) {
        if (e < s.D8n) return s.D8n--, s.kJ_;
        e -= s.D8n;
      }
    }
    return 0;
  }
  Ys1() {
    for (
      var e, t = [];
      0 !== (e = this.GetRandomBulletScreen(this.BulletScreenTimes));

    )
      t.push(e);
    t.length <= 0 ||
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsPushBulletScreen,
        t,
        !1,
      );
  }
}
(exports.RacingBetsCommandBase = RacingBetsCommandBase).f_r = 0;
//# sourceMappingURL=RacingBetsCommandBase.js.map
