"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneInteractionLevel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SceneInteractionLevel {
  constructor() {
    (this.LevelStreamingDynamic = void 0),
      (this.LevelName = ""),
      (this.Location = void 0),
      (this.Rotation = void 0),
      (this.HandleId = 0),
      (this.CurrentState = void 0),
      (this.LoadingLevelComplete = !1),
      (this.InteractionActor = void 0),
      (this.HasTempState = !1),
      (this.TempTargetState = void 0),
      (this.TempNeedTransition = !1),
      (this.IsDestroyed = !1),
      (this.TempForce = !1),
      (this.OnLevelStreamingCompleteCallback = void 0),
      (this.r1r = !1);
  }
  Init(t, i, e, s, h, r, o, n, c = !1) {
    (this.LevelStreamingDynamic = t),
      (this.LevelName = i),
      (this.Location = e),
      (this.Rotation = s),
      (this.HandleId = h),
      (this.CurrentState = r),
      (this.HasTempState = !1),
      (this.r1r = c),
      (this.LevelStreamingDynamic.bInitiallyLoaded = !0),
      (this.LevelStreamingDynamic.bInitiallyVisible = !0),
      this.LevelStreamingDynamic.SetShouldBeLoaded(!0),
      this.LevelStreamingDynamic.SetShouldBeVisible(n),
      (this.LoadingLevelComplete = !1),
      (this.IsDestroyed = !1),
      (this.OnLevelStreamingCompleteCallback = o),
      this.LevelStreamingDynamic.OnLevelShown.Add(() => {
        this.n1r();
      });
  }
  ToggleLevelVisible(t, i = void 0) {
    this.LevelStreamingDynamic?.IsValid() &&
      (this.LevelStreamingDynamic.SetShouldBeVisible(t), t) &&
      ((this.OnLevelStreamingCompleteCallback = i),
      this.LevelStreamingDynamic.OnLevelShown.Clear(),
      this.LevelStreamingDynamic.OnLevelShown.Add(() => {
        this.n1r();
      }));
  }
  get MainActor() {
    return this.InteractionActor;
  }
  GetAllActorsInLevel() {
    var t;
    if (this.LevelStreamingDynamic)
      return (t = this.LevelStreamingDynamic.GetLoadedLevel())
        ? UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelActors(t)
        : void 0;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RenderScene", 12, "错误，流送关卡为空!!!!!!!!!!!!!");
  }
  IsStreamingComplete() {
    return this.LoadingLevelComplete;
  }
  IsInfoDestroyed() {
    return this.IsDestroyed;
  }
  Destroy() {
    (this.IsDestroyed = !0),
      this.SetCollisionActorsOwner(void 0),
      this.InteractionActor && this.InteractionActor.Clear(),
      this.LevelStreamingDynamic &&
        (this.LevelStreamingDynamic.OnLevelShown.Clear(),
        this.LevelStreamingDynamic.SetShouldBeLoaded(!1)),
      (this.LevelStreamingDynamic = void 0),
      (this.InteractionActor = void 0),
      (this.OnLevelStreamingCompleteCallback = void 0);
  }
  Update() {
    this.IsDestroyed ||
      (this.LoadingLevelComplete &&
        this.InteractionActor?.IsValid() &&
        this.InteractionActor.Update());
  }
  SwitchToState(t, i, e, s) {
    return this.InteractionActor
      ? this.s1r(t, i, e, s)
      : ((this.HasTempState = !0),
        (this.TempTargetState = t),
        (this.TempNeedTransition = i),
        (this.TempForce = e),
        !0);
  }
  GetAllActor() {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
      return this.InteractionActor.GetAllActor();
  }
  GetActorByKey(t) {
    var i;
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
      return (
        (i = void 0),
        (i = this.InteractionActor.GetActorByKey(t)) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderScene",
              12,
              "获取actor失败 level:" +
                this.LevelName +
                " 不存在key=" +
                t +
                " 的Actor",
            )),
        i
      );
  }
  GetActorOriginalRelTransform(t) {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
      return this.InteractionActor.GetActorOriginalRelTransform(t);
  }
  GetRefActorsByTag(t) {
    if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
      return this.InteractionActor.GetRefActorsByTag(t);
  }
  s1r(t, i, e, s) {
    return (
      !!this.InteractionActor?.IsValid() &&
      (e || this.CurrentState !== t
        ? ((this.CurrentState = t), this.InteractionActor.SetState(t, i, s), !0)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderScene",
              14,
              "切换状态失败，无法切换到当前状态",
              ["LevelName", this.LevelName],
            ),
          !1))
    );
  }
  GetCurrentState() {
    return this.InteractionActor ? this.InteractionActor.GetCurrentState() : 21;
  }
  ChangePlayDirection(t) {
    this.InteractionActor && this.InteractionActor.ChangeDirection(t);
  }
  PlaySceneEffect(t) {
    this.InteractionActor && this.InteractionActor.PlayIndependentEffect(t);
  }
  EndSceneEffect(t) {
    this.InteractionActor && this.InteractionActor.EndIndependentEffect(t);
  }
  PlaySceneEndEffect(t) {
    this.InteractionActor && this.InteractionActor.PlayIndependentEndEffect(t);
  }
  n1r() {
    var t;
    this.LevelStreamingDynamic
      ? ((this.LoadingLevelComplete = !0),
        (t = this.LevelStreamingDynamic.GetLoadedLevel()),
        (t =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneInteractionLevelActor(
            t,
          )),
        (this.InteractionActor = t),
        this.InteractionActor?.IsValid()
          ? (this.InteractionActor.Init(this.HandleId, this.LevelName),
            this.s1r(this.CurrentState, !1, !0, !this.r1r),
            this.OnLevelStreamingCompleteCallback &&
              this.OnLevelStreamingCompleteCallback(),
            (this.OnLevelStreamingCompleteCallback = void 0),
            this.HasTempState &&
              (this.s1r(
                this.TempTargetState,
                this.TempNeedTransition,
                this.TempForce,
                !this.r1r,
              ),
              (this.HasTempState = !1)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderScene",
              12,
              "找不到关卡蓝图,查看prefab是否按照规范进行制作",
            ),
        this.LevelStreamingDynamic.OnLevelShown.Clear())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderScene", 12, "错误，流送关卡为空!!!!!!!!!!!!!", [
          "this.LevelName",
          this.LevelName,
        ]);
  }
  GetAttachActor() {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.GetAttachParentActor();
  }
  AttachToActor(t) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.RootComponent?.IsValid() &&
      (0 === this.InteractionActor.RootComponent.Mobility &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderScene",
            40,
            "Prefab根场景组件的移动性为Static, 将被强行设置为Movable, 后续请检查Prefab并修改",
            ["LevelName", this.LevelName],
          ),
        this.InteractionActor.RootComponent.SetMobility(2)),
      ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
        this.InteractionActor,
        t,
        2,
        "SceneInteractionLevel.AttachToActor",
        void 0,
        1,
        1,
        1,
        !0,
      ),
      this.InteractionActor.K2_SetActorRelativeLocation(
        Vector_1.Vector.ZeroVector,
        !1,
        void 0,
        !1,
      ),
      this.InteractionActor.K2_SetActorRelativeRotation(
        Rotator_1.Rotator.ZeroRotator,
        !1,
        void 0,
        !1,
      ));
  }
  SetCollisionActorsOwner(i) {
    if (this.InteractionActor?.IsValid()) {
      if (this.InteractionActor.CollisionActors) {
        var e = this.InteractionActor.CollisionActors.Num();
        for (let t = 0; t < e; t++) {
          var s = this.InteractionActor.CollisionActors.Get(t);
          ObjectUtils_1.ObjectUtils.IsValid(s) && s.SetOwner(i);
        }
      }
      if (this.InteractionActor.PartCollisionActorsAndCorrespondingTags) {
        var h =
          this.InteractionActor.PartCollisionActorsAndCorrespondingTags.Num();
        for (let t = 0; t < h; t++) {
          var r =
            this.InteractionActor.PartCollisionActorsAndCorrespondingTags.GetKey(
              t,
            );
          ObjectUtils_1.ObjectUtils.IsValid(r) && r.SetOwner(i);
        }
      }
    }
  }
  GetMainCollisionActor() {
    return this.InteractionActor?.IsValid() &&
      this.InteractionActor.CollisionActors &&
      0 < this.InteractionActor.CollisionActors?.Num()
      ? this.InteractionActor.CollisionActors.Get(0)
      : void 0;
  }
  GetPartCollisionActorTag(t) {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Get(
        t,
      );
  }
  GetPartCollisionActorsNum() {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Num();
  }
  GetInteractionEffectHookActors() {
    if (this.InteractionActor.InteractionEffectHookActors)
      return this.InteractionActor.InteractionEffectHookActors;
  }
  PlayExtraEffect(t, i) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.PlayExtraEffectOnTagsChange(t, i);
  }
  StopExtraEffect(t) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.StopExtraEffectOnTagsChange(t);
  }
  UpdateHitInfo(t, i) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.UpdateHitInfo(t.ToUeVector(), i);
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.GetActiveTagSequencePlaybackProgress(t);
  }
  SetActiveTagSequencePlaybackProgress(t, i) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.SetActiveTagSequencePlaybackProgress(t, i);
  }
  GetActiveTagSequenceDurationTime(t) {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.GetActiveTagSequenceDurationTime(t);
  }
  SetActiveTagSequenceDurationTime(t, i) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.SetActiveTagSequenceDurationTime(t, i);
  }
  PauseActiveTagSequence(t) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.PauseActiveTagSequence(t);
  }
  ResumeActiveTagSequence(t, i = !1) {
    this.InteractionActor?.IsValid() &&
      this.InteractionActor.ResumeActiveTagSequence(t, i);
  }
  GetReceivingDecalsActors() {
    if (this.InteractionActor?.IsValid())
      return this.InteractionActor.ReceivingDecalsActors;
  }
}
exports.SceneInteractionLevel = SceneInteractionLevel;
//# sourceMappingURL=SceneInteractionLevel.js.map
