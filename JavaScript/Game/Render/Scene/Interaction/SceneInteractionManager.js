"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneInteractionManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig"),
  SceneInteractionLevel_1 = require("../Item/SceneInteractionLevel");
class SceneInteractionManager {
  constructor() {
    (this.IsOnMobile = !1),
      (this.UniqueLevelInstanceId = 0),
      (this.AllSceneInteractionInfos = void 0),
      (this.TempCacheIds = new Array()),
      (this.ActorMap = void 0),
      (this.MainPlayerConfig = void 0),
      (this.WaterObjects = void 0),
      (this.TempVector = void 0),
      (this.xie = () => {
        this.Ikn();
      });
  }
  static Get() {
    return this.Instanced;
  }
  static Initialize() {
    this.Instanced ||
      ((this.Instanced = new SceneInteractionManager()), this.Instanced.Init());
  }
  static Tick(e) {
    this.Instanced && this.Instanced.Tick(e / 1e3);
  }
  Init() {
    (this.IsOnMobile =
      0 ===
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
        GlobalData_1.GlobalData.World,
      )),
      (this.UniqueLevelInstanceId = 1),
      (this.AllSceneInteractionInfos = new Map()),
      (this.TempCacheIds.length = 0),
      (this.ActorMap = new Map()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.WaterObjects = new Array()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.xie,
      ),
      this.LoadAssets();
  }
  Ikn() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = t.EntityHandle?.Entity?.GetComponent(3)?.Owner;
      e &&
        (t.IsControl()
          ? e.CharRenderingComponent?.AddInteraction(
              this.MainPlayerConfig,
              t.IsMyRole() ? 1 : 2,
            )
          : e.CharRenderingComponent?.RemoveInteraction());
    }
  }
  LoadAssets() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Render/Data/Interaction/DA_InteractionMainPlayerConfig.DA_InteractionMainPlayerConfig",
      UE.PDA_InteractionPlayerConfig_C,
      (e) => {
        (this.MainPlayerConfig = e), this.xie();
      },
    );
  }
  CreateSceneInteractionLevel(e, t, i, r, n, s = !0, o = !1) {
    var a = GlobalData_1.GlobalData.World;
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderScene", 12, "错误，获取不到World"),
        -1
      );
    let c = e;
    e.includes(".") && (c = e.split(".")[0]);
    var e = this.UniqueLevelInstanceId,
      h = (0, puerts_1.$ref)(!1),
      u = "KuroSceneInteraction_" + e,
      a = UE.LevelStreamingDynamic.LoadLevelInstance(a, c, i, r, h, u);
    return (0, puerts_1.$unref)(h) && a
      ? ((u = new SceneInteractionLevel_1.SceneInteractionLevel()).Init(
          a,
          c,
          i,
          r,
          e,
          t,
          n,
          s,
          o,
        ),
        this.UniqueLevelInstanceId++,
        this.AllSceneInteractionInfos.set(e, u),
        e)
      : -1;
  }
  DestroySceneInteraction(e) {
    var t = this.AllSceneInteractionInfos.get(e);
    if (t) {
      t.Destroy(), this.AllSceneInteractionInfos.delete(e);
      var i = t.GetAllActor();
      if (i)
        for (let e = 0; e < i.Num(); e++) {
          var r = i.Get(i.GetKey(e));
          this.ActorMap.has(r) && this.ActorMap.delete(r);
        }
      return !0;
    }
    return !1;
  }
  SwitchSceneInteractionToState(e, t, i, r, n = !1) {
    e = this.AllSceneInteractionInfos.get(e);
    return !!e && e.SwitchToState(t, i, r, n);
  }
  GetSceneInteractionCurrentState(e) {
    e = this.AllSceneInteractionInfos.get(e);
    return e ? e.GetCurrentState() : 21;
  }
  PlaySceneInteractionEffect(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.PlaySceneEffect(t);
  }
  EndSceneInteractionEffect(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.EndSceneEffect(t);
  }
  PlaySceneInteractionEndEffect(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.PlaySceneEndEffect(t);
  }
  ChangeSceneInteractionPlayDirection(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.ChangePlayDirection(t);
  }
  IsSceneInteractionStreamingComplete(e) {
    e = this.AllSceneInteractionInfos.get(e);
    return !!e && e.IsStreamingComplete();
  }
  ToggleSceneInteractionVisible(e, t, i = !1, r = void 0) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.ToggleLevelVisible(t, i, r);
  }
  GetSceneInteractionLevelName(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.LevelName;
  }
  GetSceneInteractionMainActor(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.MainActor;
  }
  GetSceneInteractionActorByKey(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetActorByKey(t);
  }
  GetSceneInteractionAllKeyRefActors(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetAllActor();
  }
  GetRefSceneInteractionActorsByTag(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetRefActorsByTag(t);
  }
  GetSceneInteractionAllActorsInLevel(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetAllActorsInLevel();
  }
  GetActorOriginalRelTransform(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetActorOriginalRelTransform(t);
  }
  AttachToActor(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.AttachToActor(t);
  }
  SetCollisionActorsOwner(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.SetCollisionActorsOwner(t);
  }
  AttachChildActor(t) {
    var e = this.AllSceneInteractionInfos.get(t);
    if (e) {
      var i = e.GetAllActor();
      for (let e = 0; e < i.Num(); e++) {
        var r = i.Get(i.GetKey(e));
        this.ActorMap.set(r, t);
      }
    }
  }
  EmitActor(e, t, i) {
    e &&
      ((e = this.ActorMap.get(e)),
      (e = this.AllSceneInteractionInfos.get(e))) &&
      (e = e.GetAttachActor()) &&
      (e = ActorUtils_1.ActorUtils.GetEntityByActor(e)) &&
      EventSystem_1.EventSystem.EmitWithTarget(
        e,
        EventDefine_1.EEventName.SceneItemInteractionEvent,
        t,
        i,
      );
  }
  GetMainCollisionActor(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetMainCollisionActor();
  }
  GetPartCollisionActorTag(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetPartCollisionActorTag(t);
  }
  GetPartCollisionActorsNum(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetPartCollisionActorsNum();
  }
  GetInteractionEffectHookActors(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetInteractionEffectHookActors();
  }
  GetActiveTagSequencePlaybackProgress(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetActiveTagSequencePlaybackProgress(t);
  }
  SetActiveTagSequencePlaybackProgress(e, t, i) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.SetActiveTagSequencePlaybackProgress(t, i);
  }
  GetActiveTagSequenceDurationTime(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetActiveTagSequenceDurationTime(t);
  }
  SetActiveTagSequenceDurationTime(e, t, i) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.SetActiveTagSequenceDurationTime(t, i);
  }
  PauseActiveTagSequence(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.PauseActiveTagSequence(t);
  }
  ResumeActiveTagSequence(e, t, i = !1) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.ResumeActiveTagSequence(t, i);
  }
  RegisterWaterEffectObject(e) {
    this.WaterObjects.push(e), e.AfterRegistered();
  }
  UnregisterWaterEffectObject(t) {
    var e = this.WaterObjects.findIndex((e) => e === t);
    -1 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            26,
            "要移除的SceneObjectWaterEffect不存在队列中",
          ),
        t && t.BeforeUnregistered())
      : (t.BeforeUnregistered(),
        (this.WaterObjects[e] =
          this.WaterObjects[this.WaterObjects.length - 1]),
        this.WaterObjects.pop());
  }
  PlayExtraEffectByTag(e, t, i) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.PlayExtraEffect(t, i);
  }
  StopExtraEffectByTag(e, t) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.StopExtraEffect(t);
  }
  UpdateHitInfo(e, t, i) {
    e = this.AllSceneInteractionInfos.get(e);
    e && e.UpdateHitInfo(t, i);
  }
  GetReceivingDecalsActors(e) {
    e = this.AllSceneInteractionInfos.get(e);
    if (e) return e.GetReceivingDecalsActors();
  }
  Tick(i) {
    for (let e = 0, t = this.WaterObjects.length; e < t; e++)
      this.WaterObjects[e].Update(i);
    this.TempCacheIds.length = 0;
    for (const t of this.AllSceneInteractionInfos.keys())
      this.TempCacheIds.push(t);
    for (const r of this.TempCacheIds) {
      var e = this.AllSceneInteractionInfos.get(r);
      e && !e.IsInfoDestroyed() && e.Update();
    }
  }
}
(exports.SceneInteractionManager = SceneInteractionManager).Instanced = void 0;
//# sourceMappingURL=SceneInteractionManager.js.map
