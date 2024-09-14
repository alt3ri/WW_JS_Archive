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
    (this.AVo = new BulletActionCenter_1.BulletActionCenter()),
      (this.ac = 0),
      (this.PVo = []),
      (this.xVo = []),
      (this.wVo = void 0);
  }
  Init() {
    this.AVo.Init();
  }
  Clear() {
    this.AVo.Clear();
  }
  GetActionCenter() {
    return this.AVo;
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
      BulletActionRunner.BVo.Start(), (this.ac = 2);
      var o = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
      if (0 < t) {
        (this.PVo.length = 0), (this.xVo.length = 0);
        for (const i of o.values()) {
          var r = i.GetBulletInfo();
          this.PVo.push(r);
        }
      }
      for (this.bVo(t, e), this.PVo.length = 0; 0 < this.xVo.length; ) {
        var l = this.PVo;
        (this.PVo = this.xVo),
          (this.xVo = l),
          this.bVo(0),
          (this.PVo.length = 0);
      }
      BulletActionRunner.BVo.Stop(),
        (this.ac = 3),
        ModelManager_1.ModelManager.BulletModel.ClearDestroyedBullets(),
        (this.ac = 0);
    }
  }
  bVo(t = 0, e = !1) {
    let o = 0;
    var r = this.AVo;
    for (const s of this.PVo) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (o = cpp_1.KuroTime.GetMilliseconds64());
      try {
        if (((this.wVo = s), 0 < t)) {
          var l = s.PersistentActionList;
          if (e) for (const u of l) u.AfterTick(t);
          else for (const a of l) a.Tick(t);
          for (let t = l.length - 1; 0 <= t; t--) {
            var i = l[t];
            i.IsFinish && (l.splice(t, 1), r.RecycleBulletAction(i));
          }
        }
        for (
          ;
          0 < s.ActionInfoList.length || 0 < s.NextActionInfoList.length;

        ) {
          for (const c of s.ActionInfoList) {
            var n = r.CreateBulletAction(c.Type);
            BulletConstant_1.BulletConstant.OpenActionStat
              ? (BulletActionRunner.qVo[c.Type]?.Start(),
                n.Execute(s, c),
                BulletActionRunner.qVo[c.Type]?.Stop())
              : n.Execute(s, c),
              n.IsInPool || n.IsFinish
                ? r.RecycleBulletAction(n)
                : s.PersistentActionList.push(n);
          }
          s.SwapActionInfoList();
        }
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Bullet",
              18,
              "Run BulletAction Error",
              t,
              ["BulletEntityId", s.BulletEntityId],
              ["BulletRowName", s.BulletRowName],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "Run BulletAction Error",
              ["BulletEntityId", s.BulletEntityId],
              ["BulletRowName", s.BulletRowName],
              ["error", t],
            );
      }
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
          "Bullet",
          !1,
          cpp_1.KuroTime.GetMilliseconds64() - o,
          1,
          s.BornFrameCount,
        );
    }
    this.wVo = void 0;
  }
  AddAction(t, e) {
    switch (this.ac) {
      case 0:
        t.ActionInfoList.push(e), this.PVo.push(t), this.Run();
        break;
      case 1:
        t.ActionInfoList.push(e);
        break;
      case 2:
        t.NextActionInfoList.push(e), t !== this.wVo && this.xVo.push(t);
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
      !(0 < this.qVo.length)
    )
      for (let t = 0; t < 18; t++)
        6 === t
          ? this.qVo.push(Stats_1.Stat.Create("BulletActionInitCollision"))
          : 3 === t
            ? this.qVo.push(Stats_1.Stat.Create("BulletActionInitMove"))
            : 7 === t
              ? this.qVo.push(Stats_1.Stat.Create("BulletActionUpdateEffect"))
              : 13 === t
                ? this.qVo.push(
                    Stats_1.Stat.Create("BulletActionDestroyBullet"),
                  )
                : 11 === t
                  ? this.qVo.push(
                      Stats_1.Stat.Create("BulletActionSummonBullet"),
                    )
                  : BulletConstant_1.BulletConstant.OpenAllActionStat
                    ? this.qVo.push(Stats_1.Stat.Create("BulletAction" + t))
                    : this.qVo.push(void 0);
  }
}
((exports.BulletActionRunner = BulletActionRunner).BVo =
  Stats_1.Stat.Create("BulletActionRunner")),
  (BulletActionRunner.qVo = new Array());
//# sourceMappingURL=BulletActionRunner.js.map
