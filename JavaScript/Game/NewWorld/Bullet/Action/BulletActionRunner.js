"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionRunner = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletActionCenter_1 = require("./BulletActionCenter");
class BulletActionRunner {
  constructor() {
    (this.w5o = new BulletActionCenter_1.BulletActionCenter()),
      (this.ac = 0),
      (this.B5o = []),
      (this.b5o = []),
      (this.q5o = void 0);
  }
  Init() {
    this.w5o.Init();
  }
  Clear() {
    this.w5o.Clear();
  }
  GetActionCenter() {
    return this.w5o;
  }
  Pause() {
    0 !== this.ac
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Temp", 18, "当前不是空闲状态，不允许暂停")
      : (this.ac = 1);
  }
  Resume() {
    1 !== this.ac
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Temp", 18, "当前不是暂停状态")
      : (this.ac = 0);
  }
  Run(t = 0, e = !1) {
    if (0 !== this.ac)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 18, "当前不是空闲状态，不允许切换到运行状态");
    else {
      this.ac = 2;
      var r = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
      if (0 < t) {
        (this.B5o.length = 0), (this.b5o.length = 0);
        for (const s of r.values()) {
          var o = s.GetBulletInfo();
          this.B5o.push(o);
        }
      }
      for (this.N5o(t, e), this.B5o.length = 0; 0 < this.b5o.length; ) {
        var i = this.B5o;
        (this.B5o = this.b5o),
          (this.b5o = i),
          this.N5o(0),
          (this.B5o.length = 0);
      }
      (this.ac = 3),
        ModelManager_1.ModelManager.BulletModel.ClearDestroyedBullets(),
        (this.ac = 0);
    }
  }
  N5o(t = 0, e = !1) {
    let r = 0;
    var o = this.w5o;
    for (const l of this.B5o) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (r = cpp_1.KuroTime.GetMilliseconds64());
      try {
        if (((this.q5o = l), 0 < t)) {
          var i = l.PersistentActionList;
          if (e) for (const a of i) a.AfterTick(t);
          else for (const u of i) u.Tick(t);
          for (let t = i.length - 1; 0 <= t; t--) {
            var s = i[t];
            s.IsFinish && (i.splice(t, 1), o.RecycleBulletAction(s));
          }
        }
        for (
          ;
          0 < l.ActionInfoList.length || 0 < l.NextActionInfoList.length;

        ) {
          for (const h of l.ActionInfoList) {
            var n = o.CreateBulletAction(h.Type);
            BulletConstant_1.BulletConstant.OpenActionStat,
              n.Execute(l, h),
              n.IsInPool || n.IsFinish
                ? o.RecycleBulletAction(n)
                : l.PersistentActionList.push(n);
          }
          l.SwapActionInfoList();
        }
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Bullet",
              18,
              "Run BulletAction Error",
              t,
              ["BulletEntityId", l.BulletEntityId],
              ["BulletRowName", l.BulletRowName],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "Run BulletAction Error",
              ["BulletEntityId", l.BulletEntityId],
              ["BulletRowName", l.BulletRowName],
              ["error", t],
            );
      }
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
          "Bullet",
          !1,
          cpp_1.KuroTime.GetMilliseconds64() - r,
          1,
          l.BornFrameCount,
        );
    }
    this.q5o = void 0;
  }
  AddAction(t, e) {
    switch (this.ac) {
      case 0:
        t.ActionInfoList.push(e), this.B5o.push(t), this.Run();
        break;
      case 1:
        t.ActionInfoList.push(e);
        break;
      case 2:
        t.NextActionInfoList.push(e), t !== this.q5o && this.b5o.push(t);
        break;
      case 3:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "清理子弹数据期间不允许有新的行为进来，请检查代码逻辑",
          );
        break;
      default:
        Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 18, "当前状态异常");
    }
  }
  IsRunning() {
    return 2 === this.ac;
  }
  static InitStat() {
    if (
      BulletConstant_1.BulletConstant.OpenActionStat &&
      !(0 < this.O5o.length)
    )
      for (let t = 0; t < 17; t++)
        6 === t ||
          (3 !== t &&
            7 !== t &&
            13 !== t &&
            11 !== t &&
            BulletConstant_1.BulletConstant.OpenAllActionStat),
          this.O5o.push(void 0);
  }
}
((exports.BulletActionRunner = BulletActionRunner).G5o = void 0),
  (BulletActionRunner.O5o = new Array());
//# sourceMappingURL=BulletActionRunner.js.map
