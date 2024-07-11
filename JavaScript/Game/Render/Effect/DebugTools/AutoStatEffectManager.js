"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoStatEffectDataMgr = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  EffectGlobal_1 = require("../EffectGlobal"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  EFFECT_PATHS_DA_PATH =
    "/Game/Aki/Render/RuntimeBP/Effect/Debug/DA_EffectPaths.DA_EffectPaths";
class EffectStatData {
  constructor(t, e) {
    (this.MaxUpdateTime = -0),
      (this.AvgUpdateTime = -0),
      (this.LoopTime = -0),
      (this.UpdateTimeArray = Array()),
      (this.Path = t),
      (this.SpawnTime = e);
  }
  ToCsv() {
    var t = new Array();
    return (
      t.push(this.Path),
      t.push(this.SpawnTime.toFixed()),
      t.push(this.AvgUpdateTime.toFixed()),
      t.push(this.MaxUpdateTime.toFixed()),
      t.push(this.LoopTime.toFixed()),
      t.join(",")
    );
  }
  OnStop(t) {
    if (
      ((this.LoopTime = t),
      (this.MaxUpdateTime = 0),
      (this.AvgUpdateTime = 0) < this.UpdateTimeArray.length)
    ) {
      let e = 0;
      for (let t = 0; t < this.UpdateTimeArray.length; t++)
        (e += this.UpdateTimeArray[t]),
          this.MaxUpdateTime < this.UpdateTimeArray[t] &&
            (this.MaxUpdateTime = this.UpdateTimeArray[t]);
      this.AvgUpdateTime = e / this.UpdateTimeArray.length;
    }
  }
}
EffectStatData.CsvHeader =
  "Path,SpawnCost(us),AvgUpdateCost(us),MaxUpdateCost(us),LoopTime(ms)\n";
class AutoStatEffectDataMgr {
  constructor() {
    (this.BasePaths = void 0),
      (this.opi = 0),
      (this.olr = -0),
      (this.ac = 0),
      (this.rlr = void 0),
      (this.nlr = -0),
      (this.slr = void 0),
      (this.alr = !1),
      (this.r6 = (t) => {
        this.Rni(t);
      }),
      (this.TickId = TickSystem_1.TickSystem.InvalidId);
  }
  static Get() {
    return (
      this.Instance ||
        ((this.Instance = new AutoStatEffectDataMgr()),
        (this.Dpe = void 0),
        (this.hlr = void 0)),
      this.Instance
    );
  }
  static GetMicrosecond() {
    return "Windows" === UE.GameplayStatics.GetPlatformName()
      ? 0.1 * cpp_1.KuroTime.GetCycles64()
      : cpp_1.KuroTime.GetCycles64();
  }
  av() {
    this.TickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.TickId),
      (this.TickId = TickSystem_1.TickSystem.InvalidId)),
      EffectSystem_1.EffectSystem.IsValid(this.opi) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.opi,
          "[AutoStatEffectDataMgr.Reset]",
          !1,
        ),
        (this.opi = 0)),
      (this.rlr = new Array()),
      (this.olr = 0),
      (this.ac = 1),
      (this.nlr = 0),
      (this.alr = !1),
      (this.slr = void 0),
      (EffectGlobal_1.EffectGlobal.AllowEffectInPool = !1),
      (EffectGlobal_1.EffectGlobal.AllowEffectOutPool = !1);
  }
  Play(a = 0, r = -1) {
    Info_1.Info.IsBuildDevelopmentOrDebug
      ? (this.av(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 41, "加载特效路径"),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          EFFECT_PATHS_DA_PATH,
          UE.PDA_EffectPaths_C,
          (t) => {
            var e = t.BasePaths;
            let s = 0,
              i = (0 < a && a < e.Num() - 1 && (s = a), e.Num() - 1);
            -1 !== r && r < e.Num() && (i = r), (this.BasePaths = new Array());
            for (let t = s; t <= i; t++) this.BasePaths.push(e.Get(t));
            (this.TickId = TickSystem_1.TickSystem.Add(
              this.r6,
              "PlayEffectOneByOne",
            ).Id),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "RenderEffect",
                  41,
                  "加载特效路径完成",
                  ["特效数量", this.BasePaths.length],
                  ["开始索引", s],
                  ["结束索引", i],
                  ["最大播放时长(ms)", AutoStatEffectDataMgr.llr],
                  ["播放间歇时长(ms)", AutoStatEffectDataMgr._lr],
                );
          },
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 41, "shipping 包或test 包");
  }
  PlayWithTrace() {
    Info_1.Info.IsBuildDevelopmentOrDebug
      ? (this.av(),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Stat NamedEvents",
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Trace.Start",
        ),
        (this.alr = !0),
        (this.BasePaths = []),
        (this.TickId = TickSystem_1.TickSystem.Add(
          this.r6,
          "PlayEffectOneByOne",
        ).Id),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            41,
            "",
            ["特效数量", this.BasePaths.length],
            ["最大播放时长(ms)", AutoStatEffectDataMgr.llr],
            ["播放间歇时长(ms)", AutoStatEffectDataMgr._lr],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 41, "shipping 包或test 包");
  }
  Rni(t) {
    switch (((this.olr += t), this.ac)) {
      case 0:
        !EffectSystem_1.EffectSystem.IsValid(this.opi) ||
        this.olr >= AutoStatEffectDataMgr.llr
          ? (this.ulr(), this.Soi(1))
          : this.clr(t);
        break;
      case 1:
        this.olr >= AutoStatEffectDataMgr._lr &&
          (this.mlr(), this.Soi(0), this.clr(t));
    }
  }
  Soi(t) {
    (this.ac = t), (this.olr = 0);
  }
  clr(t) {
    var e;
    EffectSystem_1.EffectSystem.IsValid(this.opi) &&
      ((e =
        PerformanceController_1.PerformanceController.ConsumeTickTime(
          "NiagaraDebugTick",
        )),
      this.rlr[this.rlr.length - 1].UpdateTimeArray.push(1e3 * e));
  }
  ulr() {
    EffectSystem_1.EffectSystem.IsValid(this.opi) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.opi,
        "[AutoStatEffectDataMgr.StopCurrent]",
        !0,
      ),
      (this.opi = 0)),
      this.rlr[this.rlr.length - 1].OnStop(this.olr);
  }
  mlr() {
    if (0 === this.BasePaths.length) {
      this.TickId !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.TickId),
        (this.TickId = TickSystem_1.TickSystem.InvalidId));
      var t = new Array();
      for (const i of this.rlr.values()) t.push(i.ToCsv());
      var e = `${UE.KismetSystemLibrary.GetProjectSavedDirectory()}Profiling/${Date.now()}_EffectStats.csv`,
        e =
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("RenderEffect", 41, "", ["保存统计信息", e]),
          UE.KuroStaticLibrary.SaveStringToFile(
            EffectStatData.CsvHeader + t.join("\n"),
            e,
          )),
        e =
          ((this.rlr.length = 0),
          this.alr &&
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "Trace.Stop",
            ),
          `[保存特效统计信息:${e}]`),
        s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
      s.SetTextArgs(e),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          s,
        );
    } else {
      e = Global_1.Global.BaseCharacter;
      e
        ? (this.nlr++,
          (!this.slr || this.nlr > AutoStatEffectDataMgr.dlr) &&
            ((this.slr = this.BasePaths.pop()), (this.nlr = 1)),
          (s = AutoStatEffectDataMgr.GetMicrosecond()),
          (this.opi = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            e.GetTransform(),
            this.slr,
            "[AutoStatEffectDataMgr.PlayNext]",
            void 0,
            3,
            (t) => {
              EffectSystem_1.EffectSystem.DebugUpdate(t, !0);
            },
          )),
          EffectSystem_1.EffectSystem.IsValid(this.opi)
            ? ((e = AutoStatEffectDataMgr.GetMicrosecond()),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("RenderEffect", 41, "", ["测试特效", this.slr]),
              this.rlr.push(new EffectStatData(this.slr, e - s)))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("RenderEffect", 41, "", [
                "播放特效失败",
                this.slr,
              ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 41, "未找到主角位置");
    }
  }
}
((exports.AutoStatEffectDataMgr = AutoStatEffectDataMgr).dlr = 1),
  (AutoStatEffectDataMgr.llr = 5e3),
  (AutoStatEffectDataMgr._lr = 1e3);
//# sourceMappingURL=AutoStatEffectManager.js.map
