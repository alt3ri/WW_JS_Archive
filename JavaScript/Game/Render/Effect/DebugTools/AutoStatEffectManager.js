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
      (this.rvi = 0),
      (this.e1r = -0),
      (this.ac = 0),
      (this.t1r = void 0),
      (this.i1r = -0),
      (this.o1r = void 0),
      (this.r1r = !1),
      (this.r6 = (t) => {
        this.Usi(t);
      }),
      (this.TickId = TickSystem_1.TickSystem.InvalidId);
  }
  static Get() {
    return (
      this.Instance ||
        ((this.Instance = new AutoStatEffectDataMgr()),
        (this.Dpe = void 0),
        (this.n1r = void 0)),
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
      EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.rvi,
          "[AutoStatEffectDataMgr.Reset]",
          !1,
        ),
        (this.rvi = 0)),
      (this.t1r = new Array()),
      (this.e1r = 0),
      (this.ac = 1),
      (this.i1r = 0),
      (this.r1r = !1),
      (this.o1r = void 0),
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
                  ["最大播放时长(ms)", AutoStatEffectDataMgr.s1r],
                  ["播放间歇时长(ms)", AutoStatEffectDataMgr.a1r],
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
        (this.r1r = !0),
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
            ["最大播放时长(ms)", AutoStatEffectDataMgr.s1r],
            ["播放间歇时长(ms)", AutoStatEffectDataMgr.a1r],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 41, "shipping 包或test 包");
  }
  Usi(t) {
    switch (((this.e1r += t), this.ac)) {
      case 0:
        !EffectSystem_1.EffectSystem.IsValid(this.rvi) ||
        this.e1r >= AutoStatEffectDataMgr.s1r
          ? (this.h1r(), this.yri(1))
          : this.l1r(t);
        break;
      case 1:
        this.e1r >= AutoStatEffectDataMgr.a1r &&
          (this._1r(), this.yri(0), this.l1r(t));
    }
  }
  yri(t) {
    (this.ac = t), (this.e1r = 0);
  }
  l1r(t) {
    var e;
    EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
      ((e =
        PerformanceController_1.PerformanceController.ConsumeTickTime(
          "NiagaraDebugTick",
        )),
      this.t1r[this.t1r.length - 1].UpdateTimeArray.push(1e3 * e));
  }
  h1r() {
    EffectSystem_1.EffectSystem.IsValid(this.rvi) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.rvi,
        "[AutoStatEffectDataMgr.StopCurrent]",
        !0,
      ),
      (this.rvi = 0)),
      this.t1r[this.t1r.length - 1].OnStop(this.e1r);
  }
  _1r() {
    if (0 === this.BasePaths.length) {
      this.TickId !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.TickId),
        (this.TickId = TickSystem_1.TickSystem.InvalidId));
      var t = new Array();
      for (const i of this.t1r.values()) t.push(i.ToCsv());
      var e = `${UE.KismetSystemLibrary.GetProjectSavedDirectory()}Profiling/${Date.now()}_EffectStats.csv`,
        e =
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("RenderEffect", 41, "", ["保存统计信息", e]),
          UE.KuroStaticLibrary.SaveStringToFile(
            EffectStatData.CsvHeader + t.join("\n"),
            e,
          )),
        e =
          ((this.t1r.length = 0),
          this.r1r &&
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
        ? (this.i1r++,
          (!this.o1r || this.i1r > AutoStatEffectDataMgr.u1r) &&
            ((this.o1r = this.BasePaths.pop()), (this.i1r = 1)),
          (s = AutoStatEffectDataMgr.GetMicrosecond()),
          (this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            e.GetTransform(),
            this.o1r,
            "[AutoStatEffectDataMgr.PlayNext]",
            void 0,
            3,
            (t) => {
              EffectSystem_1.EffectSystem.DebugUpdate(t, !0);
            },
          )),
          EffectSystem_1.EffectSystem.IsValid(this.rvi)
            ? ((e = AutoStatEffectDataMgr.GetMicrosecond()),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("RenderEffect", 41, "", ["测试特效", this.o1r]),
              this.t1r.push(new EffectStatData(this.o1r, e - s)))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("RenderEffect", 41, "", [
                "播放特效失败",
                this.o1r,
              ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 41, "未找到主角位置");
    }
  }
}
((exports.AutoStatEffectDataMgr = AutoStatEffectDataMgr).u1r = 1),
  (AutoStatEffectDataMgr.s1r = 5e3),
  (AutoStatEffectDataMgr.a1r = 1e3);
//# sourceMappingURL=AutoStatEffectManager.js.map
