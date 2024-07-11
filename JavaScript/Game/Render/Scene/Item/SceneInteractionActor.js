"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const AttachToActorController_1 = require("../../../World/Controller/AttachToActorController");
const ItemMaterialManager_1 = require("./MaterialController/ItemMaterialManager");
class SceneInteractionActor extends UE.KuroSceneInteractionActor {
  constructor() {
    super(...arguments),
      (this.LevelName = ""),
      (this.HandleId = 0),
      (this.States = void 0),
      (this.Effects = void 0),
      (this.EndEffects = void 0),
      (this.ReferenceActors = void 0),
      (this.TagsAndCorrespondingEffects = void 0),
      (this.CollisionActors = void 0),
      (this.PartCollisionActorsAndCorrespondingTags = void 0),
      (this.InteractionEffectHookActors = void 0),
      (this.CharacterForOrgan = void 0),
      (this.ActorsForProjection = void 0),
      (this.MaterialForProjection = void 0),
      (this.ReceivingDecalsActors = void 0),
      (this.ActiveStateSequence = void 0),
      (this.ActiveSequenceDirectorMap = void 0),
      (this.DirectorConfigMap = void 0),
      (this.PlayingEffectIdSet = void 0),
      (this.PlayingState = void 0),
      (this.CurrentState = void 0),
      (this.NextState = void 0),
      (this.NextStateKey = void 0),
      (this.InTransition = !1),
      (this.IsPlayBack = !1),
      (this.KuroSceneInteractionActorSystem = void 0),
      (this.ProjectionRootActor = void 0),
      (this.IsProjecting = !1),
      (this.CharRenderingComponent = void 0),
      (this.CharRenderingKey = 0),
      (this.HitLocation = void 0),
      (this.HitDirection = new UE.Vector(0, 0, 1)),
      (this.SkeletalMeshActors = void 0),
      (this.CharRenderingComponents = void 0),
      (this.CrossStateEffectActors = void 0),
      (this.InteractionMaterialController = void 0),
      (this.ActorsOriginalRelTransform = void 0),
      (this.BasePlatformInternal = void 0),
      (this.OnEffectFinishCallback = void 0);
  }
  get BasePlatform() {
    if (!this.BasePlatformInternal) {
      let i = this.GetAttachParentActor();
      if (!i) return;
      (this.BasePlatformInternal = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePlatform_C.StaticClass(),
        this.GetTransform(),
        i,
      )),
        AttachToActorController_1.AttachToActorController.AttachToActor(
          this.BasePlatformInternal,
          i,
          1,
          "SceneInteractionActor.BasePlatform",
          void 0,
          2,
          2,
          2,
          !1,
          !0,
        );
      let t = void 0;
      t =
        (t =
          this.CollisionActors && this.CollisionActors.Num() > 0
            ? this.CollisionActors?.Get(0)
            : t) || i;
      (i = (0, puerts_1.$ref)(void 0)),
        (i = (t.GetActorBounds(!0, void 0, i, !0), (0, puerts_1.$unref)(i))),
        (i = Math.max(i.X, i.Y, i.Z));
      (this.BasePlatformInternal.LeaveSphereRadius = i += 50),
        (this.BasePlatformInternal.LeaveSphereCenter = new UE.Vector(0, 0, 0));
    }
    return this.BasePlatformInternal;
  }
  ReceiveEndPlay() {
    this.BasePlatformInternal &&
      ActorSystem_1.ActorSystem.Put(this.BasePlatformInternal);
  }
  AddNewState() {
    this.States.Add(this.States.Num(), void 0);
  }
  AddNewEffect() {
    this.Effects.Add(this.Effects.Num(), void 0);
  }
  AddNewEndEffect() {
    this.EndEffects.Add(this.EndEffects.Num(), void 0);
  }
  ChangeDirection(t) {
    ((t && !this.IsPlayBack) || (!t && this.IsPlayBack)) &&
      (this.ActiveStateSequence &&
        this.GetDirectorBySequence(
          this.ActiveStateSequence,
        )?.SequencePlayer?.ChangePlaybackDirection(),
      this.CurrentState.AnimMontage.Montage &&
        this.CurrentState.AnimMontage.SkeletalMesh &&
        this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
          -this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.GetPlayRate(),
        ),
      (this.IsPlayBack = !this.IsPlayBack));
  }
  PlayIndependentEffect(t) {
    const i = this.Effects.Get(t);
    if (
      i &&
      (i.Effect &&
        this.PlayEffect(
          i.Effect,
          "[SceneInteractionActor.PlayIndependentEffect]",
        ),
      i.Material)
    )
      for (let t = 0; t < i.Material.Actors.Num(); t++)
        i.Material.Actors.Get(t) &&
          i.Material.Data &&
          (i.Material.TailIndex =
            ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
              i.Material.Actors.Get(t),
              i.Material.Data,
            ));
  }
  EndIndependentEffect(t) {
    const i = this.Effects.Get(t);
    if (
      i &&
      (i.Effect &&
        this.StopEffect(
          i.Effect,
          "[SceneInteractionActor.EndIndependentEffect]",
          !1,
        ),
      ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)
    )
      for (let t = 0; t < i.Material.Actors.Num(); t++) {
        const e = i.Material.TailIndex - t;
        ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
      }
  }
  PlayIndependentEndEffect(t) {
    t = this.EndEffects.Get(t);
    t && this.PlayEffect(t, "[SceneInteractionActor.PlayIndependentEndEffect]");
  }
  Update() {
    !this.InTransition ||
      this.CheckPlaying(this.CurrentState) ||
      (this.NextState &&
        (this.StopState(this.CurrentState, this.NextState),
        (this.PlayingState = this.NextStateKey),
        this.PlayState(
          this.NextState,
          this.CurrentState,
          !1,
          this.PlayingState,
        ),
        (this.InTransition = !1),
        (this.NextState = void 0),
        (this.NextStateKey = void 0)));
  }
  SetTimeDilation(t) {
    this.CustomTimeDilation !== t &&
      ((this.CustomTimeDilation = t), this.UpdateTimeDilation());
  }
  UpdateTimeDilation() {
    if (this.CurrentState) {
      const t = this.CustomTimeDilation;
      if (
        (this.CurrentState.AnimMontage?.SkeletalMesh &&
          this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
            this.CurrentState.AnimMontage.PlayRate * t,
          ),
        this.ActiveSequenceDirectorMap && this.DirectorConfigMap)
      )
        for (var [, i] of this.ActiveSequenceDirectorMap) {
          const e = i.SequencePlayer;
          var i = this.DirectorConfigMap.get(i);
          e?.IsValid() && i && e.SetPlayRate(i.PlayRate * t);
        }
      if (this.PlayingEffectIdSet)
        for (const s of this.PlayingEffectIdSet)
          EffectSystem_1.EffectSystem.IsValid(s) &&
            EffectSystem_1.EffectSystem.SetTimeScale(s, t);
    }
  }
  Init(t, i) {
    if (
      ((this.HandleId = t),
      (this.LevelName = i),
      (this.PlayingState = 21),
      (this.NextState = void 0),
      (this.CurrentState = void 0),
      (this.InTransition = !1),
      (this.IsPlayBack = !1),
      this.CharacterForOrgan?.IsValid() &&
        ((this.CharRenderingComponent =
          this.CharacterForOrgan.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            this.GetTransform(),
            !1,
          )),
        this.CharRenderingComponent.Init(this.CharacterForOrgan.RenderType),
        (this.CharRenderingKey = 0)),
      (this.CharRenderingComponents = new Map()),
      this.SkeletalMeshActors)
    )
      for (let t = 0; t < this.SkeletalMeshActors.Num(); t++) {
        const e = this.SkeletalMeshActors.Get(t);
        const s = e.AddComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        );
        this.CharRenderingComponents.set(s, t),
          s.Init(2),
          e.SkeletalMeshComponent &&
            s.AddComponentByCase(0, e.SkeletalMeshComponent);
      }
    if (
      ((this.OnEffectFinishCallback = (t) => {
        this.PlayingEffectIdSet?.delete(t);
      }),
      this.States)
    )
      for (let t = 0; t < this.States.Num(); t++)
        if (this.States.IsValidIndex(t)) {
          const r = this.States.GetKey(t);
          const h = this.States.Get(r);
          if (h && h.CrossStateEffects)
            for (let t = 0; t < h.CrossStateEffects.Num(); t++) {
              const a = h.CrossStateEffects.Get(t);
              a &&
                a.Effect &&
                (this.CrossStateEffectActors ||
                  (this.CrossStateEffectActors = new Set()),
                this.CrossStateEffectActors.add(a.Effect));
            }
        }
    if (this.ReferenceActors?.Num()) {
      this.ActorsOriginalRelTransform = new Map();
      for (let t = 0; t < this.ReferenceActors.Num(); ++t) {
        var o;
        var n = this.ReferenceActors.GetKey(t);
        var n = this.ReferenceActors.Get(n);
        n &&
          ((o = n.GetTransform().GetRelativeTransform(this.GetTransform())),
          this.ActorsOriginalRelTransform.set(n, o));
      }
    }
  }
  Clear() {
    if (void 0 !== this.ActiveSequenceDirectorMap)
      for (const [t] of this.ActiveSequenceDirectorMap) this.StopSequence(t);
  }
  GetActorByKey(t) {
    if (this.ReferenceActors) return this.ReferenceActors.Get(t);
  }
  GetRefActorsByTag(t) {
    if (this.TagsAndCorrespondingEffects)
      return this.TagsAndCorrespondingEffects.Get(t)?.Actors;
  }
  GetAllActor() {
    if (this.ReferenceActors) return this.ReferenceActors;
  }
  GetActorOriginalRelTransform(t) {
    if (this.ActorsOriginalRelTransform && t?.IsValid())
      return this.ActorsOriginalRelTransform.get(t);
  }
  GetCurrentState() {
    return this.PlayingState;
  }
  PlayEffect(t, i) {
    t?.IsValid() &&
      (t.Play(i),
      (i = (0, puerts_1.$ref)(void 0)),
      t.GetHandle(i),
      (t = (0, puerts_1.$unref)(i)),
      EffectSystem_1.EffectSystem.IsValid(t)) &&
      (void 0 === this.PlayingEffectIdSet &&
        (this.PlayingEffectIdSet = new Set()),
      this.PlayingEffectIdSet.add(t),
      EffectSystem_1.EffectSystem.AddFinishCallback(
        t,
        this.OnEffectFinishCallback,
      ));
  }
  StopEffect(t, i, e) {
    t?.IsValid() && t.Stop(i, e);
  }
  PlaySequence(i, t, e, s) {
    void 0 === this.DirectorConfigMap && (this.DirectorConfigMap = new Map()),
      this.DirectorConfigMap.set(i, t),
      i.SetActorTickEnabled(!0);
    let r = i?.GetComponentByClass(UE.AkComponent.StaticClass());
    r?.IsValid() && r.SetComponentTickEnabled(!0),
      this.GetKuroSceneInteractionActorSystem().SetSequenceWithTargetLevelActor(
        i,
        t.Sequence,
        this,
      );
    for (let t = 0; t < e.Num(); t++) {
      const h = e.Get(t);
      h &&
        this.GetKuroSceneInteractionActorSystem().BindActorToLevelSequenceActor(
          h,
          i,
          UE.KismetSystemLibrary.GetDisplayName(h),
        );
    }
    i.SequencePlayer &&
      ((this.IsPlayBack = !1),
      t.IsLoop
        ? t.Reverse
          ? i.SequencePlayer.PlayReverseLooping()
          : i.SequencePlayer.PlayLooping()
        : t.Reverse
          ? i.SequencePlayer.PlayReverse()
          : i.SequencePlayer.Play(),
      s &&
        ((r = (
          t.Reverse
            ? i.SequencePlayer.GetStartTime()
            : i.SequencePlayer.GetEndTime()
        ).Time),
        (s = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0)),
        i.SequencePlayer.SetPlaybackPosition(s)),
      i.SequencePlayer.SetPlayRate(t.PlayRate * this.CustomTimeDilation));
  }
  StopSequence(t) {
    var t = this.GetDirectorBySequence(t);
    t &&
      (t.SequencePlayer.Stop(),
      t.SetActorTickEnabled(!1),
      (t = t?.GetComponentByClass(UE.AkComponent.StaticClass()))?.IsValid()) &&
      t.SetComponentTickEnabled(!1);
  }
  PlayDestruction(t, i) {
    t instanceof UE.BP_KuroDestructibleActor_C &&
      (i
        ? (t.SetActorHiddenInGame(!0), t.SetActorEnableCollision(!1))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneGameplay",
              7,
              "[SceneInteractionActor]PlayDestruction",
              ["DestructActor:", t.GetName()],
              ["Location:", t.K2_GetActorLocation()],
            ),
          this.HitLocation
            ? t.ApplyDamage(this.HitLocation, this.HitDirection)
            : t.ApplyDamage(t.K2_GetActorLocation(), this.HitDirection)));
  }
  GetActiveSequencePlaybackProgress(i) {
    var i = this.GetDirectorBySequence(i);
    let e = i?.SequencePlayer;
    if (i && e?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var s = e.GetDuration().Time;
        var s = s.FrameNumber.Value + s.SubFrame;
        if (!(s < 1)) {
          var r = e.GetStartTime().Time;
          var h = e.GetEndTime().Time;
          var r = r.FrameNumber.Value + r.SubFrame;
          var h = h.FrameNumber.Value + h.SubFrame;
          if (!(h < r)) {
            (e = e.GetCurrentTime().Time),
              (e = e.FrameNumber.Value + e.SubFrame);
            let t = 0;
            return (
              (t = i.Reverse ? h - e : e - r),
              (t = MathUtils_1.MathUtils.Clamp(t, r, h)),
              MathUtils_1.MathUtils.Clamp(t / s, 0, 1)
            );
          }
        }
      }
    }
  }
  SetActiveSequencePlaybackProgress(i, e) {
    var i = this.GetDirectorBySequence(i);
    const s = i?.SequencePlayer;
    if (i && s?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var r = s.GetDuration().Time;
        var r = r.FrameNumber.Value + r.SubFrame;
        var e = r * MathUtils_1.MathUtils.Clamp(e, 0, 1);
        if (!(r < 1 || r < e)) {
          var r = s.GetStartTime().Time;
          var h = s.GetEndTime().Time;
          var r = r.FrameNumber.Value + r.SubFrame;
          var h = h.FrameNumber.Value + h.SubFrame;
          if (!(h < r)) {
            let t = 0;
            (t = i.Reverse ? h - e : r + e),
              (t = MathUtils_1.MathUtils.Clamp(t, r, h));
            (i = Math.floor(t)),
              (e = t - i),
              (r = new UE.FrameTime(new UE.FrameNumber(i), e)),
              (h = s.GetCurrentTime().Time),
              (i = h.FrameNumber.Value + h.SubFrame);
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneItem",
                40,
                "SetActiveSequencePlaybackProgress",
                ["current", i],
                ["new", t],
              ),
              MathUtils_1.MathUtils.IsNearlyEqual(
                i,
                t,
                MathUtils_1.MathUtils.KindaSmallNumber,
              ) ||
                ((e = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0)),
                s.SetPlaybackPosition(e));
          }
        }
      }
    }
  }
  GetActiveTagSequencePlaybackProgress(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) return this.GetActiveSequencePlaybackProgress(t);
  }
  SetActiveTagSequencePlaybackProgress(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.SetActiveSequencePlaybackProgress(t, i);
  }
  GetActiveSequenceDurationTime(t) {
    var t = this.GetDirectorBySequence(t);
    let i = t?.SequencePlayer;
    if (t && i?.IsValid() && this.DirectorConfigMap?.get(t)) {
      (t = i.GetDuration()), (i = t.Time.FrameNumber.Value + t.Time.SubFrame);
      if (!(i < 1)) return i * (t.Rate.Denominator / t.Rate.Numerator);
    }
  }
  GetActiveTagSequenceDurationTime(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) return this.GetActiveSequenceDurationTime(t);
  }
  SetActiveSequenceDurationTime(t, i) {
    let e;
    var t = this.GetDirectorBySequence(t);
    const s = t?.SequencePlayer;
    t &&
      s?.IsValid() &&
      (!this.DirectorConfigMap?.get(t) ||
        (e = (t = s.GetDuration()).Time.FrameNumber.Value + t.Time.SubFrame) <
          1 ||
        ((e = (e * (t.Rate.Denominator / t.Rate.Numerator)) / i) &&
          isFinite(e) &&
          !isNaN(e) &&
          !MathUtils_1.MathUtils.IsNearlyZero(e) &&
          s.SetPlayRate(e * this.CustomTimeDilation)));
  }
  SetActiveTagSequenceDurationTime(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.SetActiveSequenceDurationTime(t, i);
  }
  PauseActiveSequence(t) {
    var t = this.GetDirectorBySequence(t);
    const i = t?.SequencePlayer;
    t && i?.IsValid() && (i.IsPaused() || i.Pause());
  }
  PauseActiveTagSequence(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.PauseActiveSequence(t);
  }
  ResumeActiveSequence(t, i = !1) {
    var t = this.GetDirectorBySequence(t);
    const e = t?.SequencePlayer;
    t &&
      e?.IsValid() &&
      (t = this.DirectorConfigMap?.get(t)) &&
      (e.IsPlaying() && e.Pause(),
      (t.Reverse && !i) || (!t.Reverse && i)
        ? t.IsLoop
          ? e.PlayReverseLooping()
          : e.PlayReverse()
        : t.IsLoop
          ? e.PlayLooping()
          : e.Play());
  }
  ResumeActiveTagSequence(t, i = !1) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.ResumeActiveSequence(t, i);
  }
  PlayState(t, i, e, s) {
    t &&
      (this.PlayStateSequence(t, e),
      this.PlayStateMontage(t, i),
      this.PlayStateEffect(t),
      this.PlayStateMaterialController(t, e),
      this.PlayStateCharMaterialController(t),
      this.PlayStateCharMaterialControllerNew(t),
      this.PlayStateCrossStateEffects(t),
      this.PostStateAkEvent(t, e),
      this.SetStateActorShow(t),
      this.SetStateActorHide(t),
      this.PlayStateBasedEffect(t, s),
      this.PlayStateDestruction(t, e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderScene",
          14,
          "场景交互物切换状态",
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
          ["已切换状态到:", this.PlayingState + 1],
        ),
      (this.CurrentState = t));
  }
  PlayStateSequence(t, i) {
    let e;
    t.Sequence.Sequence &&
      (this.ActiveStateSequence &&
        this.ActiveStateSequence !== t.Sequence.Sequence &&
        this.StopSequence(this.ActiveStateSequence),
      (e = this.CreateDirectorBySequence(t.Sequence.Sequence))) &&
      ((this.ActiveStateSequence = t.Sequence.Sequence),
      this.PlaySequence(e, t.Sequence, t.Actors, i));
  }
  PlayStateMontage(t, i) {
    t.AnimMontage.SkeletalMesh &&
      t.AnimMontage.Montage &&
      ((i?.AnimMontage.Montage &&
        i.AnimMontage.Montage === t.AnimMontage.Montage) ||
        (t.AnimMontage.SkeletalMesh.SkeletalMeshComponent.PlayAnimation(
          t.AnimMontage.Montage,
          t.AnimMontage.Loop,
        ),
        t.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
          t.AnimMontage.PlayRate * this.CustomTimeDilation,
        )));
  }
  PlayStateEffect(i) {
    if (i.Effects)
      for (let t = 0; t < i.Effects.Num(); t++)
        this.PlayEffect(
          i.Effects.Get(t),
          "[SceneInteractionActor.PlayStateEffect]",
        );
  }
  PlayStateMaterialController(t, e) {
    let s;
    const r = t.MaterialControllers;
    if (r)
      for (let i = 0; i < r.Num(); i++) {
        if (r.Get(i).Materials) {
          const h = r.Get(i).Materials;
          const a = r.Get(i).Actors;
          for (let t = 0; t < a.Num(); t++) {
            const o = a
              .Get(t)
              .K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
            for (let t = 0; t < o.Num(); t++) {
              const n = o.Get(t);
              const f = n.GetNumMaterials();
              for (let t = 0; t < f; t++) n.SetMaterial(t, h);
            }
          }
        }
        for (let t = 0; t < r.Get(i).Actors.Num(); t++)
          r.Get(i).Actors.Get(t) &&
            r.Get(i).Data &&
            ((s =
              ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.get(
                (r.Get(i).TailIndex =
                  ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
                    r.Get(i).Actors.Get(t),
                    r.Get(i).Data,
                  )),
              )?.GetLifeTimeController()),
            e) &&
            s?.JumpToEnd();
      }
  }
  PlayStateCharMaterialController(t) {
    this.CharRenderingKey++,
      t.CharacterDataGroupForOrgan?.IsValid() &&
        this.CharacterForOrgan?.IsValid() &&
        this.CharRenderingComponent.AddMaterialControllerDataGroup(
          t.CharacterDataGroupForOrgan,
        );
  }
  PlayStateCharMaterialControllerNew(i) {
    if (
      i.CharacterDataGroupForOrgan?.IsValid() &&
      this.CharRenderingComponents
    ) {
      const t = this.CharRenderingComponents.keys();
      const e = Array.from(t);
      const s = e.length;
      for (let t = 0; t < s; t++) {
        const r = e[t].AddMaterialControllerDataGroup(
          i.CharacterDataGroupForOrgan,
        );
        this.CharRenderingComponents.set(e[t], r);
      }
    }
  }
  PlayStateCrossStateEffects(i) {
    if (i.CrossStateEffects) {
      const a = new Set();
      for (let t = 0; t < i.CrossStateEffects.Num(); t++) {
        var e;
        var s;
        var r;
        const h = i.CrossStateEffects.Get(t);
        h &&
          h.Effect?.IsValid() &&
          ((r = h.Effect),
          a.add(r),
          (e = (0, puerts_1.$ref)(void 0)),
          r.GetHandle(e),
          (s = (0, puerts_1.$unref)(e)),
          EffectSystem_1.EffectSystem.IsValid(s) ||
            this.PlayEffect(
              r,
              "[SceneInteractionActor.PlayStateCrossStateEffects]",
            ),
          (e = (0, puerts_1.$ref)(void 0)),
          r.GetHandle(e),
          (s = (0, puerts_1.$unref)(e)),
          EffectSystem_1.EffectSystem.IsValid(s)) &&
          ((r = h.EffectExtraState),
          EffectSystem_1.EffectSystem.SetEffectExtraState(s, r));
      }
      this.CrossStateEffectActors?.forEach((t) => {
        a.has(t) ||
          this.StopEffect(
            t,
            "[SceneInteractionActor.PlayStateCrossStateEffects]",
            !1,
          );
      });
    }
  }
  PlayStateDestruction(e, s) {
    if (e.DestructibleActors)
      for (let t = 0, i = e.DestructibleActors.Num(); t < i; t++) {
        const r = e.DestructibleActors.Get(t);
        this.PlayDestruction(r, s);
      }
  }
  PlayTagDestruction(t, e) {
    if (this.TagsAndCorrespondingEffects) {
      const s = this.TagsAndCorrespondingEffects.Get(t)?.DestructibleActors;
      if (s)
        for (let t = 0, i = s.Num(); t < i; t++) {
          const r = s.Get(t);
          this.PlayDestruction(r, e);
        }
    }
  }
  PlayTagSequence(t, i) {
    let e, s;
    this.TagsAndCorrespondingEffects &&
      (t = this.TagsAndCorrespondingEffects.Get(t)) &&
      (e = t.Sequence) &&
      (s = e.Sequence) &&
      (s = this.CreateDirectorBySequence(s)) &&
      this.PlaySequence(s, e, t.Actors, i);
  }
  StopTagSequence(t) {
    this.TagsAndCorrespondingEffects &&
      (t = this.TagsAndCorrespondingEffects.Get(t)?.Sequence?.Sequence) &&
      this.StopSequence(t);
  }
  PlayTagEffect(t) {
    if (this.TagsAndCorrespondingEffects) {
      const i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i)
        for (let t = 0; t < i.Num(); t++)
          this.PlayEffect(i.Get(t), "[SceneInteractionActor.PlayTagEffect]");
    }
  }
  StopTagEffect(t) {
    if (this.TagsAndCorrespondingEffects) {
      const i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i)
        for (let t = 0; t < i.Num(); t++)
          this.StopEffect(
            i.Get(t),
            "[SceneInteractionActor.StopTagEffect]",
            !1,
          );
      const e = this.TagsAndCorrespondingEffects.Get(t)?.EndEffects;
      if (e)
        for (let t = 0; t < e.Num(); t++)
          this.PlayEffect(
            e.Get(t),
            "[SceneInteractionActor.StopTagEffect:PlayingEndEffects]",
          );
    }
  }
  PlayTagMaterialController(t) {
    if (this.TagsAndCorrespondingEffects) {
      const e = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (e)
        for (let i = 0; i < e.Num(); i++) {
          if (e.Get(i).Materials) {
            const s = e.Get(i).Materials;
            const r = e.Get(i).Actors;
            for (let t = 0; t < r.Num(); t++) {
              const h = (0, puerts_1.$ref)(void 0);
              const a =
                (r.Get(t).GetAttachedActors(h), (0, puerts_1.$unref)(h));
              for (let t = 0; t < a.Num(); t++) {
                const o = a
                  .Get(t)
                  .K2_GetComponentsByClass(
                    UE.StaticMeshComponent.StaticClass(),
                  );
                for (let t = 0; t < o.Num(); t++) {
                  const n = o.Get(t);
                  const f = n.GetNumMaterials();
                  for (let t = 0; t < f; t++) n.SetMaterial(t, s);
                }
              }
              const c = r
                .Get(t)
                .K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < c.Num(); t++) {
                const l = c.Get(t);
                const v = l.GetNumMaterials();
                for (let t = 0; t < v; t++) l.SetMaterial(t, s);
              }
            }
          }
          for (let t = 0; t < e.Get(i).Actors.Num(); t++)
            e.Get(i).Actors.Get(t) &&
              e.Get(i).Data &&
              (e.Get(i).TailIndex =
                ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
                  e.Get(i).Actors.Get(t),
                  e.Get(i).Data,
                ));
        }
    }
  }
  StopTagMaterialController(t) {
    if (this.TagsAndCorrespondingEffects) {
      const i = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (i)
        for (let t = 0; t < i.Num(); t++) {
          const e = i.Get(t);
          if (e.Actors)
            for (let t = 0; t < e.Actors.Num(); t++) {
              const s = e.TailIndex - t;
              ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
                s,
              ) &&
                ItemMaterialManager_1.ItemMaterialManager.DisableActorData(s);
            }
        }
    }
  }
  PostTagAkEvent(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.AkEvent;
    !t?.AkEvent ||
      (!t.AkEvent.IsInfinite && i) ||
      (t.IsFollow
        ? AudioSystem_1.AudioSystem.PostEvent(t.AkEvent.GetName(), this)
        : AudioSystem_1.AudioSystem.PostEvent(
            t.AkEvent.GetName(),
            this.GetTransform(),
          ));
  }
  PlayStateBasedEffect(i, e) {
    if (i.StateBasedEffect)
      for (let t = 0; t < i.StateBasedEffect.Num(); t++) {
        const s = i.StateBasedEffect.Get(t).StateBasedEffect;
        s?.IsValid() &&
          (e === 0
            ? s.SetState(0)
            : e === 1
              ? s.SetState(1)
              : e === 2
                ? s.SetState(2)
                : e === 3
                  ? s.SetState(3)
                  : e === 4 && s.SetState(4));
      }
  }
  PostStateAkEvent(t, i) {
    t = t.AkEvent;
    !t.AkEvent ||
      (!t.AkEvent.IsInfinite && i) ||
      (t.IsFollow
        ? AudioSystem_1.AudioSystem.PostEvent(t.AkEvent.GetName(), this)
        : AudioSystem_1.AudioSystem.PostEvent(
            t.AkEvent.GetName(),
            this.GetTransform(),
          ));
  }
  SetStateActorHide(t) {
    const e = t.HideActors;
    if (e)
      for (let t = 0, i = e.Num(); t < i; t++) {
        const s = e.Get(t);
        s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1));
      }
  }
  SetStateActorShow(t) {
    const e = t.Actors;
    if (e)
      for (let t = 0, i = e.Num(); t < i; t++) {
        const s = e.Get(t);
        s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
      }
  }
  MakeActorProjection(t, i) {
    if (this.IsProjecting)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          32,
          "当前已经在投影中，重复调用投影接口",
        );
    else {
      const e = this.ActorsForProjection;
      if (
        (this.ProjectionRootActor?.IsValid() ||
          ((this.ProjectionRootActor = UE.KuroActorManager.SpawnActor(
            this.GetWorld(),
            UE.StaticMeshActor.StaticClass(),
            this.GetTransform(),
          )),
          this.ProjectionRootActor.RootComponent.SetMobility(2)),
        e && e?.Num() && t)
      ) {
        this.IsProjecting = !0;
        for (let t = 0; t < e.Num(); t++) {
          const s = UE.KuroStaticLibrary.SpawnActorFromAnother(e.Get(t));
          if (s?.IsValid) {
            if (
              (s.K2_AttachToActor(
                this.ProjectionRootActor,
                void 0,
                1,
                1,
                1,
                !0,
              ),
              this.MaterialForProjection)
            ) {
              const r = (0, puerts_1.$ref)(void 0);
              const h = (s.GetAttachedActors(r), (0, puerts_1.$unref)(r));
              for (let t = 0; t < h.Num(); t++) {
                const a = h
                  .Get(t)
                  .K2_GetComponentsByClass(
                    UE.StaticMeshComponent.StaticClass(),
                  );
                for (let t = 0; t < a.Num(); t++) {
                  const o = a.Get(t);
                  const n = o.GetNumMaterials();
                  for (let t = 0; t < n; t++)
                    o.SetMaterial(t, this.MaterialForProjection);
                }
              }
              const f = s.K2_GetComponentsByClass(
                UE.StaticMeshComponent.StaticClass(),
              );
              for (let t = 0; t < f.Num(); t++) {
                const c = f.Get(t);
                const l = c.GetNumMaterials();
                for (let t = 0; t < l; t++)
                  c.SetMaterial(t, this.MaterialForProjection);
              }
            }
            i && this.AddMatrialDataForChildrenActor(s, i);
          }
        }
        this.ProjectionRootActor.K2_SetActorTransform(t, !1, void 0, !1);
      }
    }
  }
  AddMatrialDataForChildrenActor(t, i) {
    if (t.IsValid()) {
      const e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
      const s = (t.GetAttachedActors(e), (0, puerts_1.$unref)(e));
      for (let t = 0; t < s.Num(); t++) {
        const r = s.Get(t);
        r.IsValid() &&
          ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(r, i);
      }
      ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(t, i);
    }
  }
  RemoveActorProjection() {
    this.IsProjecting
      ? this.ProjectionRootActor?.IsValid()
        ? ((this.IsProjecting = !1),
          this.DestroyActor(this.ProjectionRootActor))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 32, "找不到投影的Root Actor")
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("RenderEffect", 32, "当前不在投影中，无法移除投影");
  }
  DestroyActor(t) {
    const i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
    const e = (t.GetAttachedActors(i), (0, puerts_1.$unref)(i));
    for (let t = 0; t < e.Num(); t++) this.DestroyActor(e.Get(t));
    t instanceof UE.BP_EffectActor_C && (t.StopEffect(), t.RemoveHandle()),
      t.K2_DestroyActor();
  }
  DestroySelf() {
    this.DestroyActor(this);
  }
  SetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      const e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          const s = e.Get(t);
          s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1));
        }
    }
  }
  ResetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      const e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          const s = e.Get(t);
          s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
        }
    }
  }
  SetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      const e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          const s = e.Get(t);
          s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
        }
    }
  }
  ResetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      const e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          const s = e.Get(t);
          s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1));
        }
    }
  }
  SetState(t, i, e) {
    this.States ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderScene",
          40,
          "状态为Undefined",
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
        ));
    const s = this.States.Get(t);
    if (s)
      if (this.InTransition && !s.IsForceSetState)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderScene",
            14,
            "正在过渡状态, 不可设置其他状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else if (this.NextState && !s.IsForceSetState)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderScene",
            14,
            "正在过渡状态, 不可设置其他状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else if (t === this.PlayingState)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderScene",
            14,
            "不可转换到目标状态,因为目标状态即为当前状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else {
        if (i && this.CurrentState) {
          i = this.CurrentState.TransitionMap.Get(t);
          if (void 0 !== i) {
            const r = this.States.Get(i);
            if (r)
              return (
                (this.InTransition = !0),
                this.StopState(this.CurrentState, r),
                (this.PlayingState = i),
                this.PlayState(r, this.CurrentState, e, this.PlayingState),
                (this.NextState = s),
                void (this.NextStateKey = t)
              );
          }
        }
        (this.InTransition = !1),
          this.CurrentState && this.StopState(this.CurrentState, s),
          (this.PlayingState = t),
          this.PlayState(s, this.CurrentState, e, this.PlayingState),
          (this.NextState = void 0),
          (this.NextStateKey = void 0);
      }
    else
      t !== 20 &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderScene",
          14,
          "状态未配置",
          ["未配置状态", t + 1],
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
        );
  }
  StopState(e, t) {
    if (e) {
      this.ActiveStateSequence &&
        this.ActiveStateSequence === e.Sequence.Sequence &&
        e.Sequence.Sequence !== t.Sequence.Sequence &&
        this.StopSequence(this.ActiveStateSequence);
      for (let t = 0; t < e.HideActors.Num(); t++) {
        const i = e.HideActors.Get(t);
        i && (i.SetActorHiddenInGame(!1), i.SetActorEnableCollision(!0));
      }
      for (let t = 0; t < e.Effects.Num(); t++)
        e.Effects.Get(t)?.Stop("[SceneInteractionActor.StopState]", !1);
      if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)
        for (let i = 0; i < e.MaterialControllers.Num(); i++)
          for (let t = 0; t < e.MaterialControllers.Get(i).Actors.Num(); t++) {
            const s = e.MaterialControllers.Get(i).TailIndex - t;
            ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
              s,
            ) && ItemMaterialManager_1.ItemMaterialManager.DisableActorData(s);
          }
      if (this.CharRenderingComponents) {
        let r;
        var t = this.CharRenderingComponents.keys();
        const h = Array.from(t);
        const a = h.length;
        for (let t = 0; t < a; t++)
          this.CharRenderingComponents.get(h[t]) &&
            (r = this.CharRenderingComponents.get(h[t])) &&
            h[t].RemoveMaterialControllerDataGroupWithEnding(r);
      }
    }
  }
  CheckPlaying(t) {
    let i = !1;
    let e;
    this.ActiveStateSequence &&
      (e = this.GetDirectorBySequence(
        this.ActiveStateSequence,
      )?.SequencePlayer) &&
      (i = e.IsPlaying());
    let s = !1;
    return (
      t.AnimMontage.SkeletalMesh &&
        (s = t.AnimMontage.SkeletalMesh.SkeletalMeshComponent.IsPlaying()),
      i || s
    );
  }
  GetKuroSceneInteractionActorSystem() {
    return (
      this.KuroSceneInteractionActorSystem ||
        (this.KuroSceneInteractionActorSystem =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.KuroSceneInteractionActorSystem.StaticClass(),
          )),
      this.KuroSceneInteractionActorSystem
    );
  }
  GetDirectorBySequence(t) {
    return this.ActiveSequenceDirectorMap?.get(t);
  }
  CreateDirectorBySequence(e) {
    void 0 === this.ActiveSequenceDirectorMap &&
      (this.ActiveSequenceDirectorMap = new Map()),
      this.GetDirectorBySequence(e) && this.StopSequence(e);
    const s = ActorSystem_1.ActorSystem.Get(
      UE.LevelSequenceActor.StaticClass(),
      this.GetTransform(),
      void 0,
      !1,
    );
    const t = s.SequencePlayer;
    if (t) {
      (s.bOverrideInstanceData = !0),
        (s.DefaultInstanceData.TransformOriginActor =
          this).ActiveSequenceDirectorMap.set(e, s);
      const r = () => {
        const t = s;
        let i;
        t &&
          ((i = t.SequencePlayer) &&
            (i.OnStop.Remove(r), i.OnFinished.Remove(r)),
          this.ActiveSequenceDirectorMap &&
            this.ActiveSequenceDirectorMap.get(e) === t &&
            this.ActiveSequenceDirectorMap.delete(e),
          this.DirectorConfigMap?.delete(t),
          this.ActiveStateSequence === e && (this.ActiveStateSequence = void 0),
          t.IsValid()) &&
          TimerSystem_1.TimerSystem.Next(() => {
            ActorSystem_1.ActorSystem.Put(t);
          });
      };
      return t.OnStop.Add(r), t.OnFinished.Add(r), s;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RenderScene",
        40,
        "LevelSequenceActor.SequencePlayer invalid",
        ["Actor", this.LevelName],
        ["HandleID", this.HandleId],
      );
  }
  PlayExtraEffectOnTagsChange(t, i = !1) {
    this.PlayTagEffect(t),
      this.PlayTagMaterialController(t),
      this.PostTagAkEvent(t, i),
      this.SetTagActorShow(t),
      this.SetTagActorHide(t),
      this.PlayTagSequence(t, i),
      this.PlayTagDestruction(t, i);
  }
  StopExtraEffectOnTagsChange(t) {
    this.StopTagEffect(t),
      this.StopTagMaterialController(t),
      this.ResetTagActorShow(t),
      this.ResetTagActorHide(t),
      this.StopTagSequence(t);
  }
  UpdateHitInfo(t, i) {
    (this.HitLocation = t), (this.HitDirection = i);
  }
}
exports.default = SceneInteractionActor;
// # sourceMappingURL=SceneInteractionActor.js.map
