"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  WuYinQuBattleConfig_1 = require("../WuYinQuBattleConfig"),
  WuYinQuBattleNameDefines_1 = require("../WuYinQuBattleNameDefines"),
  WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateFightingToFighting extends WuYinQuBattleStateBase_1.default {
  constructor() {
    super(...arguments),
      (this.Timer = 0),
      (this.LastUseFlowmapSky = !1),
      (this.CurrentUseFlowmapSky = !1),
      (this.Jar = void 0),
      (this.zar = ResourceSystem_1.ResourceSystem.InvalidId);
  }
  OnEnter(e) {
    const t = this.Owner.GetKuroLevelSequenceActor();
    t &&
    UE.KismetSystemLibrary.IsValid(t) &&
    UE.KismetSystemLibrary.IsValid(t.SequencePlayer)
      ? ((this.Jar = t?.GetSequence()),
        UE.KismetSystemLibrary.IsValid(this.Jar)
          ? (t.SetSequence(this.Jar), this.Zar())
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "RenderBattle",
                39,
                "进入战斗过渡状态时没有Sequence资源，开始资源加载。",
              ),
            (this.zar = ResourceSystem_1.ResourceSystem.LoadAsync(
              t.LevelSequence.AssetPathName.toString(),
              UE.LevelSequence,
              (e) => {
                (this.zar = ResourceSystem_1.ResourceSystem.InvalidId),
                  UE.KismetSystemLibrary.IsValid(e)
                    ? ((this.Jar = e), t.SetSequence(this.Jar), this.Zar())
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "RenderBattle",
                        39,
                        "进入战斗过渡状态时没有Sequence资源，资源加载失败。",
                        ["WuYinQuBattleActor", this.Owner?.GetName()],
                      );
              },
            ))))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderBattle",
          39,
          "进入战斗过渡状态时没有SequencePlayer",
          ["WuYinQuBattleActor", this.Owner?.GetName()],
        );
  }
  Zar() {
    this.Timer = 0;
    var e = this.Owner.GetLastBattleState(),
      t = this.Owner.GetCurrentBattleState();
    let i = "未知状态";
    1 === e
      ? (i = "战斗阶段1")
      : 2 === e
        ? (i = "战斗阶段2")
        : 3 === e && (i = "战斗阶段3");
    e = this.Owner.GetKuroLevelSequenceActor();
    let s = "未知状态";
    1 === t
      ? ((s = "战斗阶段1"),
        e &&
          UE.KismetSystemLibrary.IsValid(e) &&
          UE.KismetSystemLibrary.IsValid(e.GetSequence()) &&
          UE.KismetSystemLibrary.IsValid(e.SequencePlayer) &&
          (e.SequencePlayer.JumpToMarkedFrame(
            WuYinQuBattleConfig_1.default.MarkFightingStart1,
          ),
          e.SequencePlayer.Play()))
      : 2 === t
        ? ((s = "战斗阶段2"),
          e &&
            UE.KismetSystemLibrary.IsValid(e) &&
            UE.KismetSystemLibrary.IsValid(e.GetSequence()) &&
            UE.KismetSystemLibrary.IsValid(e.SequencePlayer) &&
            (e.SequencePlayer.JumpToMarkedFrame(
              WuYinQuBattleConfig_1.default.MarkFightingStart2,
            ),
            e.SequencePlayer.Play()))
        : 3 === t &&
          ((s = "战斗阶段3"), e) &&
          UE.KismetSystemLibrary.IsValid(e) &&
          UE.KismetSystemLibrary.IsValid(e.GetSequence()) &&
          UE.KismetSystemLibrary.IsValid(e.SequencePlayer) &&
          (e.SequencePlayer.JumpToMarkedFrame(
            WuYinQuBattleConfig_1.default.MarkFightingStart3,
          ),
          e.SequencePlayer.Play());
    var u,
      t = this.Owner.WuYinQuFightingData.GlobalMPC,
      e = this.Owner.WuYinQuFightingData;
    t &&
      ((u = this.Owner.K2_GetActorLocation()),
      UE.KismetMaterialLibrary.SetVectorParameterValue(
        this.Owner.GetWorld(),
        t,
        WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
          .GlobalLandscapeCenterAndIntensity,
        new UE.LinearColor(u.X, u.Y, u.Z, 1),
      ),
      UE.KismetMaterialLibrary.SetVectorParameterValue(
        this.Owner.GetWorld(),
        t,
        WuYinQuBattleNameDefines_1.WuYinQuBattleNameDefines
          .GlobalLandscapeRadiusAndHardness,
        new UE.LinearColor(
          e.LandscapeShowingRadiusCurve.GetFloatValue(1),
          WuYinQuBattleConfig_1.default.LandscapeHardness,
          0,
          0,
        ),
      )),
      (this.Owner.当前状态 = "从:" + i + "到:" + s),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderBattle", 12, "进入战斗过度阶段");
  }
  OnUpdate(e) {
    var t = this.Owner.GetCurrentBattleState();
    if (this.Timer > this.Owner.WuYinQuFightingData.FightingTransitionTime) {
      if (2 === t) return void this.StateMachine.Switch(2);
      if (3 === t) return void this.StateMachine.Switch(3);
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderBattle", 12, "战斗过度状态错误!!!!");
    }
    this.Timer += e / 1e3;
  }
  OnExit(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderBattle", 12, "退出战斗过度阶段"),
      (this.Jar = void 0),
      this.zar !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.zar),
        (this.zar = ResourceSystem_1.ResourceSystem.InvalidId),
        Log_1.Log.CheckError()) &&
        Log_1.Log.Error(
          "RenderBattle",
          39,
          "退出战斗过渡状态时还在加载资源，取消资源加载",
        );
  }
}
exports.default = WuYinQuBattleStateFightingToFighting;
//# sourceMappingURL=WuYinQuBattleStateFightingToFighting.js.map
