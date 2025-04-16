"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  AttachToActorController_1 = require("../../../World/Controller/AttachToActorController"),
  ItemMaterialManager_1 = require("./MaterialController/ItemMaterialManager"),
  MAX_PHYSICS_SIMULATION_TIME = 5e3;
class SequenceDirectorConfig {
  constructor(t, i = t.IsLoop, e = t.PlayRate, s = t.Reverse) {
    (this.UeConfig = t),
      (this.IsLoopOverride = i),
      (this.PlayRateOverride = e),
      (this.ReverseOverride = s);
  }
  get IsLoop() {
    return this.IsLoopOverride;
  }
  get PlayRate() {
    return this.PlayRateOverride;
  }
  get Reverse() {
    return this.ReverseOverride;
  }
  get Sequence() {
    return this.UeConfig.Sequence;
  }
}
class SkeletalMontageConfig {
  constructor(t, i = 0, e = !1, s = 3) {
    (this.UeConfig = t),
      (this.PendingFrameCount = i),
      (this.PendingCompHiddenInGame = e),
      (this.PendingCompVisibilityBasedAnimTickOption = s);
  }
  IsPendingApplyProps() {
    return 0 < this.PendingFrameCount;
  }
}
class SceneInteractionActor extends UE.KuroSceneInteractionActor {
  constructor() {
    super(...arguments),
      (this.LevelName = ""),
      (this.HandleId = 0),
      (this.OnInitCallback = void 0),
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
      (this.StaticMeshList = void 0),
      (this.Active = !0),
      (this.IsClear = !1),
      (this.ActiveStateSequence = void 0),
      (this.ActiveSequenceDirectorMap = void 0),
      (this.DirectorConfigMap = void 0),
      (this.PlayingEffectIdSet = void 0),
      (this.PlayingState = void 0),
      (this.CurrentState = void 0),
      (this.NextState = void 0),
      (this.NextStateKey = void 0),
      (this.InTransition = !1),
      (this.TransitionElapsedTime = 0),
      (this.CurTransitionTime = 0),
      (this.IsPlayBack = !1),
      (this.KuroSceneInteractionActorSystem = void 0),
      (this.ProjectionRootActor = void 0),
      (this.IsProjecting = !1),
      (this.CharRenderingComponent = void 0),
      (this.CharRenderingKey = 0),
      (this.HitLocation = void 0),
      (this.HitDirection = new UE.Vector(0, 0, 1)),
      (this.SkeletalMeshActors = void 0),
      (this.AllSkeletalMeshActors = void 0),
      (this.CharRenderingComponents = void 0),
      (this.CrossStateEffectActors = void 0),
      (this.InteractionMaterialController = void 0),
      (this.ActorsOriginalRelTransform = void 0),
      (this.BasePlatformInternal = void 0),
      (this.RevertMaterialComponentsMaps = void 0),
      (this.CurrentStateAkEventHandle = void 0),
      (this.PlayingTagAkEventHandle = void 0),
      (this.GlobalGi = void 0),
      (this.SkeletalMontageConfigMap = void 0),
      (this.SkeletalMeshDestructibleActorsInternal = void 0),
      (this.SkeletalMeshDestructibleActorsList = void 0),
      (this.SkeletalMeshDestructibleCellListMap = void 0),
      (this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.InvalidId),
      (this.SkeletalDestructibleTickIdList = void 0),
      (this.DebugTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingStateEffects = []),
      (this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingTagEffects = new Map()),
      (this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingCrossStateEffects = new Map()),
      (this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.IsAnimtionMotagePlayed = !1),
      (this.OverrideEffectActor = void 0),
      (this.OverrideEffectParmaFunc = void 0),
      (this.OnEffectFinishCallback = void 0),
      (this.需要过渡状态 = !1),
      (this.跳过表现过程 = !1),
      (this.模拟状态 = 0),
      (this.模拟Tag = void 0);
  }
  Constructor() {
    (this.OnInitCallback = void 0),
      (this.Active = !0),
      (this.IsClear = !1),
      (this.ActiveStateSequence = void 0),
      (this.ActiveSequenceDirectorMap = void 0),
      (this.DirectorConfigMap = void 0),
      (this.PlayingEffectIdSet = void 0),
      (this.PlayingState = void 0),
      (this.CurrentState = void 0),
      (this.NextState = void 0),
      (this.NextStateKey = void 0),
      (this.InTransition = !1),
      (this.TransitionElapsedTime = 0),
      (this.CurTransitionTime = 0),
      (this.IsPlayBack = !1),
      (this.KuroSceneInteractionActorSystem = void 0),
      (this.ProjectionRootActor = void 0),
      (this.IsProjecting = !1),
      (this.CharRenderingComponent = void 0),
      (this.CharRenderingKey = 0),
      (this.HitLocation = void 0),
      (this.HitDirection = new UE.Vector(0, 0, 1)),
      (this.CharRenderingComponents = void 0),
      (this.CrossStateEffectActors = void 0),
      (this.ActorsOriginalRelTransform = void 0),
      (this.GlobalGi = void 0),
      (this.SkeletalMontageConfigMap = void 0),
      (this.SkeletalMeshDestructibleActorsInternal = void 0),
      (this.SkeletalMeshDestructibleActorsList = void 0),
      (this.SkeletalMeshDestructibleCellListMap = void 0),
      (this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.InvalidId),
      (this.SkeletalDestructibleTickIdList = void 0),
      (this.DebugTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingStateEffects = []),
      (this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingTagEffects = new Map()),
      (this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.PendingCrossStateEffects = new Map()),
      (this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId),
      (this.OnEffectFinishCallback = void 0);
  }
  get SkeletalMeshDestructibleActors() {
    return (
      this.SkeletalMeshDestructibleActorsInternal ||
        (this.SkeletalMeshDestructibleActorsInternal = new Set()),
      this.SkeletalMeshDestructibleActorsInternal
    );
  }
  get BasePlatform() {
    if (!this.BasePlatformInternal) {
      var i = this.GetAttachParentActor();
      if (!i) return;
      (this.BasePlatformInternal = ActorSystem_1.ActorSystem.Get(
        UE.BP_BasePlatform_C.StaticClass(),
        this.D_GetTransform(),
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
          this.CollisionActors && 0 < this.CollisionActors.Num()
            ? this.CollisionActors?.Get(0)
            : t) || i;
      (i = (0, puerts_1.$ref)(void 0)),
        (i = (t.D_GetActorBounds(!0, void 0, i, !0), (0, puerts_1.$unref)(i))),
        (i = Math.max(i.X, i.Y, i.Z));
      (this.BasePlatformInternal.LeaveSphereRadius = i += 50),
        (this.BasePlatformInternal.LeaveSphereCenter = new UE.Vector(0, 0, 0));
    }
    return this.BasePlatformInternal;
  }
  ReceiveBeginPlay() {
    var t;
    (this.PlayingTagAkEventHandle = new Map()),
      Info_1.Info.IsPlayInEditor &&
        ((t = this.GetLevel()?.OwningWorld),
        UE.KismetSystemLibrary.GetPathName(t?.CurrentLevel).includes(
          "/Game/Aki/Scene/InteractionLevel/Prefab",
        )) &&
        ((this.GlobalGi = ActorSystem_1.ActorSystem.Get(
          UE.BP_GlobalGI_C.StaticClass(),
          this.D_GetTransform(),
        )),
        this.GlobalGi.夜晚(),
        Info_1.Info.SetInCg(!0),
        this.Init(-1, this.GetName(), void 0),
        (this.DebugTickId = TickSystem_1.TickSystem.Add(
          (t) => {
            this.Update(t / 1e3);
          },
          "Game",
          0,
          !0,
        ).Id));
  }
  ReceiveEndPlay() {
    if (
      (this.BasePlatformInternal &&
        ActorSystem_1.ActorSystem.Put(
          "SceneInteractionActor.ReceiveEndPlay1",
          this.BasePlatformInternal,
        ),
      this.GlobalGi &&
        ActorSystem_1.ActorSystem.Put(
          "SceneInteractionActor.ReceiveEndPlay2",
          this.GlobalGi,
        ),
      this.CurrentStateAkEventHandle &&
        AudioSystem_1.AudioSystem.ExecuteAction(
          this.CurrentStateAkEventHandle,
          0,
        ),
      void 0 !== this.PlayingTagAkEventHandle &&
        0 < this.PlayingTagAkEventHandle.size)
    ) {
      for (var [, t] of this.PlayingTagAkEventHandle)
        AudioSystem_1.AudioSystem.ExecuteAction(t, 0);
      this.PlayingTagAkEventHandle.clear();
    }
    this.RemoveDebugTicker();
  }
  RemoveDebugTicker() {
    this.DebugTickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.DebugTickId),
      (this.DebugTickId = TickSystem_1.TickSystem.InvalidId));
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
  PlayState_BP_MaterialRuntimeParUpdate(t) {
    void 0 !== t.BP_MaterialRuntimeParUpdate &&
      ((t.BP_MaterialRuntimeParUpdate.IsPlay = !0),
      t.BP_MaterialRuntimeParUpdate.Set_Initialize());
  }
  PlayIndependentEffect(t) {
    var i = this.Effects.Get(t);
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
    var i = this.Effects.Get(t);
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
        var e = i.Material.TailIndex - t;
        ItemMaterialManager_1.ItemMaterialManager.DisableActorData(e);
      }
  }
  PlayIndependentEndEffect(t) {
    t = this.EndEffects.Get(t);
    t && this.PlayEffect(t, "[SceneInteractionActor.PlayIndependentEndEffect]");
  }
  Update(t) {
    if (0 < t && this.SkeletalMontageConfigMap)
      for (var [i, e] of this.SkeletalMontageConfigMap)
        e.IsPendingApplyProps() &&
          (--e.PendingFrameCount,
          0 < e.PendingFrameCount ||
            (i.SkeletalMeshComponent &&
              (i.SkeletalMeshComponent.SetHiddenInGame(
                e.PendingCompHiddenInGame,
              ),
              (i.SkeletalMeshComponent.VisibilityBasedAnimTickOption =
                e.PendingCompVisibilityBasedAnimTickOption))));
    this.InTransition &&
      !this.CheckPlaying(t, this.CurrentState) &&
      this.NextState &&
      (this.StopState(this.CurrentState, this.NextState),
      (this.PlayingState = this.NextStateKey),
      this.PlayState(this.NextState, this.CurrentState, !1, this.PlayingState),
      (this.InTransition = !1),
      (this.NextState = void 0),
      (this.NextStateKey = void 0),
      (this.TransitionElapsedTime = 0));
  }
  SetTimeDilation(t) {
    this.CustomTimeDilation !== t &&
      ((this.CustomTimeDilation = t), this.UpdateTimeDilation());
  }
  UpdateTimeDilation() {
    if (this.CurrentState) {
      var t = this.CustomTimeDilation;
      if (
        (this.CurrentState.AnimMontage?.SkeletalMesh &&
          this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
            this.CurrentState.AnimMontage.PlayRate * t,
          ),
        this.ActiveSequenceDirectorMap && this.DirectorConfigMap)
      )
        for (var [, i] of this.ActiveSequenceDirectorMap) {
          var e = i.SequencePlayer,
            i = this.DirectorConfigMap.get(i);
          e?.IsValid() && i && e.SetPlayRate(i.PlayRate * t);
        }
    }
  }
  Init(t, i, e) {
    if (
      ((this.HandleId = t),
      (this.LevelName = i),
      (this.OnInitCallback = e),
      (this.PlayingState = 21),
      (this.NextState = void 0),
      (this.CurrentState = void 0),
      (this.InTransition = !1),
      (this.IsPlayBack = !1),
      (this.Active = !0),
      (this.IsClear = !1),
      this.CharacterForOrgan?.IsValid() &&
        ((this.CharRenderingComponent =
          this.CharacterForOrgan.D_AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            this.D_GetTransform(),
            !1,
          )),
        this.CharRenderingComponent.Init(this.CharacterForOrgan.RenderType),
        (this.CharRenderingKey = 0)),
      (this.CharRenderingComponents = new Map()),
      this.SkeletalMeshActors)
    )
      for (let t = 0; t < this.SkeletalMeshActors.Num(); t++) {
        var s = this.SkeletalMeshActors.Get(t),
          h = s.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          );
        this.CharRenderingComponents.set(h, t),
          h.Init(2),
          s.SkeletalMeshComponent &&
            h.AddComponentByCase(0, s.SkeletalMeshComponent);
      }
    if (
      ((this.OnEffectFinishCallback = (t) => {
        this.PlayingEffectIdSet?.delete(t);
      }),
      this.States)
    )
      for (let t = 0; t < this.States.Num(); t++)
        if (this.States.IsValidIndex(t)) {
          var r = this.States.GetKey(t),
            o = this.States.Get(r);
          if (o && o.CrossStateEffects)
            for (let t = 0; t < o.CrossStateEffects.Num(); t++) {
              var a = o.CrossStateEffects.Get(t);
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
        var n,
          c = this.ReferenceActors.GetKey(t),
          c = this.ReferenceActors.Get(c);
        c &&
          ((n = c.D_GetTransform().GetRelativeTransform(this.D_GetTransform())),
          this.ActorsOriginalRelTransform.set(c, n));
      }
    }
    if (((this.RevertMaterialComponentsMaps = new Map()), this.States))
      for (let t = 0, i = this.States.Num(); t < i; ++t) {
        var f = this.States.GetKey(t),
          f = this.States.Get(f),
          l = new Array();
        l.push(f.SkeletalMeshDestructible.PlayDestructionAllImmediately),
          l.push(f.SkeletalMeshDestructible.CanPlayDestructionWhenHit);
        for (const u of l)
          for (let t = 0, i = u.Num(); t < i; ++t) {
            var v = u.Get(t);
            v && this.SkeletalMeshDestructibleActors.add(v);
          }
      }
    if (this.TagsAndCorrespondingEffects)
      for (let t = 0, i = this.TagsAndCorrespondingEffects.Num(); t < i; ++t) {
        var S = this.TagsAndCorrespondingEffects.GetKey(t),
          d = this.TagsAndCorrespondingEffects.Get(S);
        for (
          let t = 0, i = d.SkeletalMeshDestructibleActors.Num();
          t < i;
          ++t
        ) {
          var _ = d.SkeletalMeshDestructibleActors.Get(t);
          _ && this.SkeletalMeshDestructibleActors.add(_);
        }
      }
    if (
      this.SkeletalMeshDestructibleActors &&
      0 < this.SkeletalMeshDestructibleActors.size
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Interaction",
          57,
          "开始异步显示SceneInteractionActor",
          ["LevelName", this.LevelName],
        );
      for (const y of this.SkeletalMeshDestructibleActors) {
        for (let t = 0, i = y.StaticMeshChunkList.Num(); t < i; ++t) {
          var g = y.StaticMeshChunkList.Get(t);
          g?.IsValid() && g.K2_DestroyComponent(g);
        }
        y.StaticMeshChunkList.Empty();
      }
      (this.SkeletalMeshDestructibleActorsList = []),
        (this.SkeletalMeshDestructibleCellListMap = new Map()),
        this.RemoveStaticMeshDestructibleTicker(),
        (this.SkeletalMeshDestructibleTickId = TickSystem_1.TickSystem.Add(
          (t) => {
            this.SkeletalMeshDestructibleTick(t);
          },
          "SkeletalMeshDestructibleTick",
          0,
          !0,
        ).Id);
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Interaction", 57, "正常显示SceneInteractionActor", [
          "LevelName",
          this.LevelName,
        ]),
        this.OnInitCallback?.();
    this.ApplyAnimOptimizationParams();
  }
  SkeletalMeshDestructibleTick(t) {
    SceneInteractionActor.DestructibleInitStat.Start();
    for (const s of this.SkeletalMeshDestructibleActors.values()) {
      var i = s.KuroDestructibleAsset?.PieceInfos;
      if (i) {
        let t = 0;
        if (
          !(
            (t = this.SkeletalMeshDestructibleCellListMap.has(s)
              ? this.SkeletalMeshDestructibleCellListMap.get(s)
              : t) >= i.Num()
          )
        ) {
          var i = i.Get(t),
            e =
              (SceneInteractionActor.TempTransform.SetIdentity(),
              SceneInteractionActor.TempTransform.SetTranslation(
                i.InitialTransform.GetTranslation(),
              ),
              s.AddComponentByClass(
                UE.StaticMeshComponent.StaticClass(),
                !1,
                SceneInteractionActor.TempTransform,
                !1,
              ));
          e.SetVisibility(!1),
            e.SetCollisionProfileName(s.CollisionProfileName.Name),
            e.SetCollisionEnabled(2),
            e.SetStaticMesh(i.StaticMesh),
            s.StaticMeshChunkList.Add(e),
            (s.PoseableMeshComponent = s.PoseableMesh),
            this.SkeletalMeshDestructibleCellListMap.set(s, ++t);
          break;
        }
        this.SkeletalMeshDestructibleActorsList.includes(s) ||
          (s.OnDestructibleInit(),
          this.SkeletalMeshDestructibleActorsList.push(s));
      } else
        s.OnDestructibleInit(), this.SkeletalMeshDestructibleActorsList.push(s);
    }
    this.SkeletalMeshDestructibleActorsList.length >=
      this.SkeletalMeshDestructibleActors.size &&
      (this.RemoveStaticMeshDestructibleTicker(),
      TimerSystem_1.TimerSystem.Next(() => {
        this.IsValid() && this.Active && !this.IsClear
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Interaction",
                57,
                "正常结束异步显示SceneInteractionActor",
                ["LevelName", this.LevelName],
              ),
            this.OnInitCallback?.())
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Interaction",
              57,
              "中断结束异步显示SceneInteractionActor",
              ["LevelName", this.LevelName],
              ["this.IsValid()", this.IsValid()],
              ["this.Active", this.Active],
              ["this.IsClear", this.IsClear],
            );
      })),
      SceneInteractionActor.DestructibleInitStat.Stop();
  }
  Clear() {
    if (
      ((this.IsClear = !0),
      (this.SkeletalMeshDestructibleActorsInternal = void 0),
      (this.SkeletalMeshDestructibleActorsList = void 0),
      (this.SkeletalMeshDestructibleCellListMap = void 0),
      this.RemoveStaticMeshDestructibleTicker(),
      this.RemoveSkeletalDestructibleTicker(),
      void 0 !== this.ActiveSequenceDirectorMap)
    )
      for (var [t] of this.ActiveSequenceDirectorMap) this.StopSequence(t);
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
      (i = (0, puerts_1.$unref)(i)),
      EffectSystem_1.EffectSystem.IsValid(i)) &&
      (void 0 === this.PlayingEffectIdSet &&
        (this.PlayingEffectIdSet = new Set()),
      this.PlayingEffectIdSet.add(i),
      EffectSystem_1.EffectSystem.AddFinishCallback(
        i,
        this.OnEffectFinishCallback,
      ),
      this.OverrideEffectParmaFunc) &&
      t === this.OverrideEffectActor &&
      this.OverrideEffectParmaFunc();
  }
  StopEffect(t, i, e) {
    t?.IsValid() && t.Stop(i, e);
  }
  PlaySequence(i, t, e, s) {
    if (this.Active) {
      void 0 === this.DirectorConfigMap && (this.DirectorConfigMap = new Map()),
        this.DirectorConfigMap.set(i, new SequenceDirectorConfig(t)),
        i.SetActorTickEnabled(!0);
      var h = i?.GetComponentByClass(UE.AkComponent.StaticClass());
      h?.IsValid() && h.SetComponentTickEnabled(!0),
        this.GetKuroSceneInteractionActorSystem().SetSequenceWithTargetLevelActor(
          i,
          t.Sequence,
          this,
        );
      for (let t = 0; t < e.Num(); t++) {
        var r = e.Get(t);
        r &&
          this.GetKuroSceneInteractionActorSystem().BindActorToLevelSequenceActor(
            r,
            i,
            UE.KismetSystemLibrary.GetDisplayName(r),
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
          ((h = (
            t.Reverse
              ? i.SequencePlayer.GetStartTime()
              : i.SequencePlayer.GetEndTime()
          ).Time),
          (s = new UE.MovieSceneSequencePlaybackParams(h, 0, "", 0, 0)),
          i.SequencePlayer.SetPlaybackPosition(s)),
        i.SequencePlayer.SetPlayRate(t.PlayRate * this.CustomTimeDilation));
    }
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
              ["Location:", t.D_K2_GetActorLocation()],
            ),
          this.HitLocation
            ? ((i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(
                this.HitLocation,
              )),
              t.ApplyDamage(i, this.HitDirection))
            : ((i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(
                t.D_K2_GetActorLocation(),
              )),
              t.ApplyDamage(i, this.HitDirection))));
  }
  PlayKuroSkeletalMeshDestruction(t, i) {
    this.CurrentState?.SkeletalMeshDestructible.CanPlayDestructionWhenHit &&
      t instanceof UE.BP_KuroSkeletalMeshDestructibleActor_C &&
      -1 !==
        this.CurrentState.SkeletalMeshDestructible.CanPlayDestructionWhenHit.FindIndex(
          t,
        ) &&
      this.PlaySkeletalMeshDestruction(t, i);
  }
  PlaySkeletalMeshDestruction(i, t) {
    if (i instanceof UE.BP_KuroSkeletalMeshDestructibleActor_C)
      if (t) i.SetActorHiddenInGame(!0), i.SetActorEnableCollision(!1);
      else {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneGameplay",
            57,
            "[SceneInteractionActor]PlaySkeletalMeshDestruction",
            ["DestructActor:", i.GetName()],
            ["Location:", i.K2_GetActorLocation()],
          );
        var e = i.StaticMeshChunkList.Num();
        for (let t = 0; t < e; ++t) {
          var s = i.StaticMeshChunkList.Get(t);
          s?.IsValid() && s.K2_DetachFromComponent(1, 1, 1, !0);
        }
        i.PoseableMeshComponent?.IsValid() &&
          i.PoseableMeshComponent.Activate(),
          this.HitLocation
            ? ((t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(
                this.HitLocation,
              )),
              i.ApplyDamage(t, this.HitDirection))
            : ((t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(
                i.D_K2_GetActorLocation(),
              )),
              i.ApplyDamage(t, this.HitDirection)),
          this.SkeletalDestructibleTickIdList ||
            (this.SkeletalDestructibleTickIdList = []);
        const h = TickSystem_1.TickSystem.Add(
          (t) => {
            SceneInteractionActor.DestructiblePostPhysicsStat.Start(),
              i.ApplyTransformToSkeletalMeshComponent(0),
              SceneInteractionActor.DestructiblePostPhysicsStat.Stop();
          },
          "SkeletalDestructibleTickId",
          4,
          !0,
        ).Id;
        this.SkeletalDestructibleTickIdList.push(h),
          TimerSystem_1.TimerSystem.Delay(() => {
            var t;
            this.SkeletalDestructibleTickIdList &&
              ((t = this.SkeletalDestructibleTickIdList.indexOf(h)),
              this.SkeletalDestructibleTickIdList.splice(t, 1),
              TickSystem_1.TickSystem.Remove(h),
              i.PoseableMeshComponent?.IsValid()) &&
              i.PoseableMeshComponent.Deactivate();
          }, MAX_PHYSICS_SIMULATION_TIME);
      }
  }
  GetActiveSequencePlaybackProgress(i) {
    var i = this.GetDirectorBySequence(i),
      e = i?.SequencePlayer;
    if (i && e?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var s = e.GetDuration().Time,
          s = s.FrameNumber.Value + s.SubFrame;
        if (!(s < 1)) {
          var h = e.GetStartTime().Time,
            r = e.GetEndTime().Time,
            h = h.FrameNumber.Value + h.SubFrame,
            r = r.FrameNumber.Value + r.SubFrame;
          if (!(r < h)) {
            (e = e.GetCurrentTime().Time),
              (e = e.FrameNumber.Value + e.SubFrame);
            let t = 0;
            return (
              (t = i.Reverse ? r - e : e - h),
              (t = MathUtils_1.MathUtils.Clamp(t, h, r)),
              MathUtils_1.MathUtils.Clamp(t / s, 0, 1)
            );
          }
        }
      }
    }
  }
  SetActiveSequencePlaybackProgress(i, e) {
    var i = this.GetDirectorBySequence(i),
      s = i?.SequencePlayer;
    if (i && s?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var h = s.GetDuration().Time,
          h = h.FrameNumber.Value + h.SubFrame,
          e = h * MathUtils_1.MathUtils.Clamp(e, 0, 1);
        if (!(h < 1 || h < e)) {
          var h = s.GetStartTime().Time,
            r = s.GetEndTime().Time,
            h = h.FrameNumber.Value + h.SubFrame,
            r = r.FrameNumber.Value + r.SubFrame;
          if (!(r < h)) {
            let t = 0;
            (t = i.Reverse ? r - e : h + e),
              (t = MathUtils_1.MathUtils.Clamp(t, h, r));
            (i = Math.floor(t)),
              (e = t - i),
              (h = new UE.FrameTime(new UE.FrameNumber(i), e)),
              (r = s.GetCurrentTime().Time),
              (i = r.FrameNumber.Value + r.SubFrame);
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneItem",
                39,
                "SetActiveSequencePlaybackProgress",
                ["current", i],
                ["new", t],
              ),
              MathUtils_1.MathUtils.IsNearlyEqual(
                i,
                t,
                MathUtils_1.MathUtils.KindaSmallNumber,
              ) ||
                ((e = new UE.MovieSceneSequencePlaybackParams(h, 0, "", 0, 0)),
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
    var t = this.GetDirectorBySequence(t),
      i = t?.SequencePlayer;
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
    var e,
      s,
      t = this.GetDirectorBySequence(t),
      h = t?.SequencePlayer;
    t &&
      h?.IsValid() &&
      (!(t = this.DirectorConfigMap?.get(t)) ||
        (s = (e = h.GetDuration()).Time.FrameNumber.Value + e.Time.SubFrame) <
          1 ||
        ((s = (s * (e.Rate.Denominator / e.Rate.Numerator)) / i) &&
          isFinite(s) &&
          !isNaN(s) &&
          !MathUtils_1.MathUtils.IsNearlyZero(s) &&
          ((t.PlayRateOverride = s),
          h.SetPlayRate(s * this.CustomTimeDilation))));
  }
  SetActiveTagSequenceDurationTime(t, i) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.SetActiveSequenceDurationTime(t, i);
  }
  PauseActiveSequence(t) {
    var t = this.GetDirectorBySequence(t),
      i = t?.SequencePlayer;
    t && i?.IsValid() && (i.IsPaused() || i.Pause());
  }
  PauseActiveTagSequence(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.PauseActiveSequence(t);
  }
  ResumeActiveSequence(t, i = !1) {
    var t = this.GetDirectorBySequence(t),
      e = t?.SequencePlayer;
    t &&
      e?.IsValid() &&
      (t = this.DirectorConfigMap?.get(t)) &&
      (e.IsPlaying() && e.Pause(),
      (t.ReverseOverride = i ? !t.UeConfig.Reverse : t.UeConfig.Reverse),
      t.Reverse
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
  GetIsActiveSequencePlayReverseFromConfig(t) {
    var t = this.GetDirectorBySequence(t),
      i = t?.SequencePlayer;
    if (t && i?.IsValid()) {
      i = this.DirectorConfigMap?.get(t);
      if (i) return i.Reverse !== i.UeConfig.Reverse;
    }
  }
  GetIsActiveTagSequencePlayReverseFromConfig(t) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    if (t) return this.GetIsActiveSequencePlayReverseFromConfig(t);
  }
  PlayActiveSequenceTo(i, e, s = !1) {
    var i = this.GetDirectorBySequence(i),
      h = i?.SequencePlayer;
    if (i && h?.IsValid()) {
      i = this.DirectorConfigMap?.get(i);
      if (i) {
        var r = h.GetDuration().Time,
          r = r.FrameNumber.Value + r.SubFrame,
          e = r * MathUtils_1.MathUtils.Clamp(e, 0, 1);
        if (!(r < 1 || r < e)) {
          var r = h.GetStartTime().Time,
            o = h.GetEndTime().Time,
            r = r.FrameNumber.Value + r.SubFrame,
            o = o.FrameNumber.Value + o.SubFrame;
          if (!(o < r)) {
            let t = 0;
            (i.ReverseOverride = s ? !i.UeConfig.Reverse : i.UeConfig.Reverse),
              (t = i.Reverse ? o - e : r + e),
              (t = MathUtils_1.MathUtils.Clamp(t, r, o));
            (s = Math.floor(t)),
              (e = t - s),
              (r = new UE.FrameTime(new UE.FrameNumber(s), e)),
              (o = h.GetCurrentTime().Time),
              (s = o.FrameNumber.Value + o.SubFrame);
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneItem",
                39,
                "PlayActiveSequenceTo",
                ["current", s],
                ["target", t],
              ),
              MathUtils_1.MathUtils.IsNearlyEqual(
                s,
                t,
                MathUtils_1.MathUtils.KindaSmallNumber,
              ) ||
                ((e = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0)),
                h.PlayTo_Circle(e, !1, !i.Reverse));
          }
        }
      }
    }
  }
  PlayActiveTagSequenceTo(t, i, e = !1) {
    t = this.TagsAndCorrespondingEffects?.Get(t)?.Sequence?.Sequence;
    t && this.PlayActiveSequenceTo(t, i, e);
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
      this.PlayStateSkeletalMeshDestruction(t, e),
      this.PlayState_BP_MaterialRuntimeParUpdate(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderScene",
          13,
          "场景交互物切换状态",
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
          ["已切换状态到:", this.PlayingState + 1],
        ),
      (this.CurrentState = t));
  }
  PlayStateSequence(t, i) {
    var e;
    t.Sequence.Sequence &&
      (this.ActiveStateSequence &&
        this.ActiveStateSequence !== t.Sequence.Sequence &&
        this.StopSequence(this.ActiveStateSequence),
      (e = this.CreateDirectorBySequence(t.Sequence.Sequence))) &&
      ((this.ActiveStateSequence = t.Sequence.Sequence),
      this.PlaySequence(e, t.Sequence, t.Actors, i));
  }
  PlayStateMontage(i, e) {
    if (
      i.AnimMontage.SkeletalMesh &&
      i.AnimMontage.Montage &&
      (!e?.AnimMontage.Montage ||
        e.AnimMontage.Montage !== i.AnimMontage.Montage)
    ) {
      void 0 === this.SkeletalMontageConfigMap &&
        (this.SkeletalMontageConfigMap = new Map());
      let t = this.SkeletalMontageConfigMap.get(i.AnimMontage.SkeletalMesh);
      t ||
        ((t = new SkeletalMontageConfig(i.AnimMontage)),
        this.SkeletalMontageConfigMap.set(i.AnimMontage.SkeletalMesh, t));
      var s = i.AnimMontage.SkeletalMesh.SkeletalMeshComponent;
      (void 0 === e || i.AnimMontage.SkeletalMesh.bHidden || s.bHiddenInGame) &&
        (t.IsPendingApplyProps() ||
          ((t.PendingCompHiddenInGame = s.bHiddenInGame),
          (t.PendingCompVisibilityBasedAnimTickOption =
            s.VisibilityBasedAnimTickOption)),
        (t.PendingFrameCount = 2),
        (s.VisibilityBasedAnimTickOption = 0),
        s.SetHiddenInGame(!0)),
        !this.IsAnimtionMotagePlayed || i.AnimMontage.Loop
          ? (s.PlayAnimation(i.AnimMontage.Montage, i.AnimMontage.Loop),
            s.SetPlayRate(i.AnimMontage.PlayRate * this.CustomTimeDilation),
            (this.IsAnimtionMotagePlayed = !0))
          : s
              .GetAnimInstance()
              ?.Montage_Play(
                i.AnimMontage.Montage,
                i.AnimMontage.PlayRate * this.CustomTimeDilation,
              );
    }
  }
  ApplyAnimOptimizationParams(i = !0) {
    if (this.AllSkeletalMeshActors) {
      var e = Info_1.Info.IsMobilePlatform(),
        s = new UE.AnimUpdateRateParameters();
      for (let t = 0; t < this.AllSkeletalMeshActors.Num(); t++) {
        var h = this.AllSkeletalMeshActors.Get(t);
        if (h) {
          h = h.SkeletalMeshComponent;
          if (h) {
            var r = h.LODInfo.Num();
            if (i)
              (s.bShouldUseDistanceMap = !0),
                s.BaseVisibleDistanceThresholds.Empty(),
                s.BaseVisibleDistanceThresholds.Add(e ? 500 : 800),
                s.BaseVisibleDistanceThresholds.Add(e ? 1e3 : 1500),
                s.BaseVisibleDistanceThresholds.Add(e ? 1500 : 4e3),
                s.BaseVisibleDistanceThresholds.Add(e ? 2e3 : 5e3),
                s.BaseVisibleDistanceThresholds.Add(e ? 3e3 : 8e3);
            else {
              (s.bShouldUseLodMap = !0), s.LODToFrameSkipMap.Empty();
              for (let t = 0; t < r; t++) {
                var o = t < 2 ? 0 : t - 1;
                s.LODToFrameSkipMap.Add(t, o);
              }
            }
            (s.BaseNonRenderedUpdateRate = e ? 15 : 8),
              (s.MaxEvalRateForInterpolation = 8);
            var a = (0, puerts_1.$ref)(s);
            h.SetAnimUpdateRateParameters(a),
              (0, puerts_1.$unref)(a),
              (h.bEnableUpdateRateOptimizations = !0),
              (h.VisibilityBasedAnimTickOption = 3),
              (h.bUpdateOverlapsOnAnimationFinalize = !1);
          }
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Interaction",
              31,
              "AllSkeletalMeshActors中有空的值，请找对应策划进行修改",
              ["LevelName", this.LevelName],
            );
      }
    }
  }
  PlayStateEffect(i) {
    if (i.Effects) {
      for (let t = 0; t < i.Effects.Num(); t++)
        this.PendingStateEffects.push(i.Effects.Get(t));
      this.PendingStateEffectTickId = TickSystem_1.TickSystem.Add(
        (t) => {
          this.PendingPlayStateEffect();
        },
        "SceneInteractionActor.PendingStateEffectTick",
        0,
        !0,
      ).Id;
    }
  }
  PendingPlayStateEffect() {
    var t;
    0 === this.PendingStateEffects.length
      ? this.RemovePendingStateEffectTick()
      : (t = this.PendingStateEffects?.shift()) &&
        this.PlayEffect(t, "[SceneInteractionActor.PendingPlayStateEffect]");
  }
  RemovePendingStateEffectTick() {
    this.PendingStateEffectTickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.PendingStateEffectTickId),
      (this.PendingStateEffectTickId = TickSystem_1.TickSystem.InvalidId));
  }
  PlayStateMaterialController(t, e) {
    var s,
      h = t.MaterialControllers;
    if (h)
      for (let i = 0; i < h.Num(); i++) {
        if (h.Get(i).Materials) {
          var r = h.Get(i).Materials,
            o = h.Get(i).Actors;
          for (let t = 0; t < o.Num(); t++) {
            var a = o
              .Get(t)
              .K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
            for (let t = 0; t < a.Num(); t++) {
              var n = a.Get(t),
                c =
                  (h.Get(i).IsRevertMaterial ||
                    this.RevertMaterialComponentsMaps?.set(n, new Map()),
                  n.GetNumMaterials()),
                f = n.GetMaterials();
              for (let t = 0; t < c; t++)
                h.Get(i).IsRevertMaterial ||
                  this.RevertMaterialComponentsMaps?.get(n)?.set(t, f.Get(t)),
                  n.SetMaterial(t, r);
            }
          }
        }
        for (let t = 0; t < h.Get(i).Actors.Num(); t++)
          h.Get(i).Actors.Get(t) &&
            h.Get(i).Data &&
            ((s =
              ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.get(
                (h.Get(i).TailIndex =
                  ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
                    h.Get(i).Actors.Get(t),
                    h.Get(i).Data,
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
      var t = this.CharRenderingComponents.keys(),
        e = Array.from(t),
        s = e.length;
      for (let t = 0; t < s; t++) {
        var h = e[t].AddMaterialControllerDataGroup(
          i.CharacterDataGroupForOrgan,
        );
        this.CharRenderingComponents.set(e[t], h);
      }
    }
  }
  PlayStateCrossStateEffects(i) {
    if (i.CrossStateEffects) {
      const o = new Set();
      for (let t = 0; t < i.CrossStateEffects.Num(); t++) {
        var e,
          s,
          h,
          r = i.CrossStateEffects.Get(t);
        r &&
          r.Effect?.IsValid() &&
          ((e = r.Effect),
          o.add(e),
          (s = (0, puerts_1.$ref)(void 0)),
          e.GetHandle(s),
          (s = (0, puerts_1.$unref)(s)),
          EffectSystem_1.EffectSystem.IsValid(s)
            ? ((h = r.EffectExtraState),
              EffectSystem_1.EffectSystem.SetEffectExtraState(s, h))
            : this.PendingCrossStateEffects.set(e, r.EffectExtraState));
      }
      this.CrossStateEffectActors?.forEach((t) => {
        o.has(t) ||
          (this.PendingCrossStateEffects.has(t) &&
            this.PendingCrossStateEffects.delete(t),
          this.StopEffect(
            t,
            "[SceneInteractionActor.PlayStateCrossStateEffects]",
            !1,
          ));
      }),
        0 < this.PendingCrossStateEffects.size &&
          this.PendingCrossStateEffectTickId ===
            TickSystem_1.TickSystem.InvalidId &&
          (this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.Add(
            (t) => {
              this.PendingPlayCrossStateEffect();
            },
            "SceneInteractionActor.PendingCrossStateEffectTick",
            0,
            !0,
          ).Id);
    }
  }
  PendingPlayCrossStateEffect() {
    var t, i, e;
    0 === this.PendingCrossStateEffects.size
      ? this.RemovePendingCrossStateEffectTick()
      : (t = this.PendingCrossStateEffects?.entries().next().value) &&
        ((e = t[0]),
        (t = t[1]),
        this.PendingCrossStateEffects.delete(e),
        this.PlayEffect(
          e,
          "[SceneInteractionActor.PendingPlayCrossStateEffect]",
        ),
        (i = (0, puerts_1.$ref)(void 0)),
        e.GetHandle(i),
        (e = (0, puerts_1.$unref)(i)),
        EffectSystem_1.EffectSystem.SetEffectExtraState(e, t));
  }
  RemovePendingCrossStateEffectTick() {
    this.PendingCrossStateEffectTickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.PendingCrossStateEffectTickId),
      (this.PendingCrossStateEffectTickId = TickSystem_1.TickSystem.InvalidId));
  }
  PlayStateDestruction(e, s) {
    if (e.DestructibleActors)
      for (let t = 0, i = e.DestructibleActors.Num(); t < i; t++) {
        var h = e.DestructibleActors.Get(t);
        this.PlayDestruction(h, s);
      }
  }
  PlayStateSkeletalMeshDestruction(i, e) {
    var s = i.SkeletalMeshDestructible.PlayDestructionAllImmediately.Num();
    if (!(s <= 0))
      for (let t = 0; t < s; t++) {
        var h = i.SkeletalMeshDestructible.PlayDestructionAllImmediately.Get(t);
        this.PlaySkeletalMeshDestruction(h, e);
      }
  }
  PlayTagDestruction(t, e) {
    if (this.TagsAndCorrespondingEffects) {
      var s = this.TagsAndCorrespondingEffects.Get(t)?.DestructibleActors;
      if (s)
        for (let t = 0, i = s.Num(); t < i; t++) {
          var h = s.Get(t);
          this.PlayDestruction(h, e);
        }
    }
  }
  PlayTagSkeletalMeshDestruction(t, e) {
    if (this.TagsAndCorrespondingEffects) {
      var s =
        this.TagsAndCorrespondingEffects.Get(t)?.SkeletalMeshDestructibleActors;
      if (s)
        for (let t = 0, i = s.Num(); t < i; t++) {
          var h = s.Get(t);
          this.PlaySkeletalMeshDestruction(h, e);
        }
    }
  }
  PlayTagSequence(t, i) {
    var e, s;
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
      var i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i) {
        var e = [];
        for (let t = 0; t < i.Num(); t++) e.push(i.Get(t));
        this.PendingTagEffects.set(t, e),
          (this.PendingTagEffectTickId = TickSystem_1.TickSystem.Add(
            () => {
              this.PendingPlayTagEffect();
            },
            "SceneInteractionActor.PendingTagEffectTick",
            0,
            !0,
          ).Id);
      }
    }
  }
  PendingPlayTagEffect() {
    if (0 === this.PendingTagEffects.size) this.RemovePendingTagEffectTick();
    else {
      var i,
        e,
        s,
        h = [];
      let t = void 0;
      for ([i, e] of this.PendingTagEffects) {
        if (0 !== e.length) {
          t = e;
          break;
        }
        h.push(i);
      }
      for (const r of h) this.PendingTagEffects.delete(r);
      void 0 === t || 0 === t.length
        ? this.RemovePendingTagEffectTick()
        : (s = t.shift()) &&
          this.PlayEffect(s, "[SceneInteractionActor.PendingPlayTagEffect]");
    }
  }
  RemovePendingTagEffectTick() {
    this.PendingTagEffectTickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.PendingTagEffectTickId),
      (this.PendingTagEffectTickId = TickSystem_1.TickSystem.InvalidId));
  }
  StopTagEffect(t) {
    if (this.TagsAndCorrespondingEffects) {
      this.PendingTagEffects.delete(t);
      var i = this.TagsAndCorrespondingEffects.Get(t)?.Effects;
      if (i)
        for (let t = 0; t < i.Num(); t++)
          this.StopEffect(
            i.Get(t),
            "[SceneInteractionActor.StopTagEffect]",
            !1,
          );
      var e = this.TagsAndCorrespondingEffects.Get(t)?.EndEffects;
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
      var e = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (e)
        for (let i = 0; i < e.Num(); i++) {
          if (e.Get(i).Materials) {
            var s = e.Get(i).Materials,
              h = e.Get(i).Actors;
            for (let t = 0; t < h.Num(); t++) {
              var r = (0, puerts_1.$ref)(void 0),
                o = (h.Get(t).GetAttachedActors(r), (0, puerts_1.$unref)(r));
              for (let t = 0; t < o.Num(); t++) {
                var a = o
                  .Get(t)
                  .K2_GetComponentsByClass(
                    UE.StaticMeshComponent.StaticClass(),
                  );
                for (let t = 0; t < a.Num(); t++) {
                  var n = a.Get(t),
                    c =
                      (e.Get(i).IsRevertMaterial ||
                        this.RevertMaterialComponentsMaps?.set(n, new Map()),
                      n.GetNumMaterials()),
                    f = n.GetMaterials();
                  for (let t = 0; t < c; t++)
                    e.Get(i).IsRevertMaterial ||
                      this.RevertMaterialComponentsMaps?.get(n)?.set(
                        t,
                        f.Get(t),
                      ),
                      n.SetMaterial(t, s);
                }
              }
              var l = h
                .Get(t)
                .K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < l.Num(); t++) {
                var v = l.Get(t),
                  S =
                    (e.Get(i).IsRevertMaterial ||
                      this.RevertMaterialComponentsMaps?.set(v, new Map()),
                    v.GetNumMaterials()),
                  d = v.GetMaterials();
                for (let t = 0; t < S; t++)
                  e.Get(i).IsRevertMaterial ||
                    this.RevertMaterialComponentsMaps?.get(v)?.set(t, d.Get(t)),
                    v.SetMaterial(t, s);
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
      var i = this.TagsAndCorrespondingEffects.Get(t)?.MaterialControllers;
      if (i)
        for (let t = 0; t < i.Num(); t++) {
          var e = i.Get(t);
          if (i.Get(t).IsRevertMaterial) {
            if (i.Get(t).Materials) {
              var s = i.Get(t).Actors;
              for (let t = 0; t < s.Num(); t++) {
                var h = s
                  .Get(t)
                  .K2_GetComponentsByClass(
                    UE.StaticMeshComponent.StaticClass(),
                  );
                for (let t = 0; t < h.Num(); t++) {
                  var r = h.Get(t),
                    o = this.RevertMaterialComponentsMaps?.get(r),
                    a = r.GetNumMaterials();
                  for (let t = 0; t < a; t++) r.SetMaterial(t, o?.get(t));
                }
              }
            }
            this.CurrentState &&
              this.PlayStateMaterialController(this.CurrentState, !0);
          }
          if (e.Actors)
            for (let t = 0; t < e.Actors.Num(); t++) {
              var n = e.TailIndex - t;
              ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
                n,
              ) &&
                ItemMaterialManager_1.ItemMaterialManager.DisableActorData(n);
            }
        }
    }
  }
  PostTagAkEvent(i, t) {
    void 0 === this.PlayingTagAkEventHandle &&
      (this.PlayingTagAkEventHandle = new Map());
    var e = this.TagsAndCorrespondingEffects?.Get(i)?.AkEvent;
    if (e?.AkEvent) {
      var s = e.AkEvent.IsInfinite;
      if ((s || !t) && !this.PlayingTagAkEventHandle.has(i)) {
        let t = void 0;
        void 0 !==
          (t = e.IsFollow
            ? AudioSystem_1.AudioSystem.PostEvent(e.AkEvent.GetName(), this)
            : AudioSystem_1.AudioSystem.PostEvent(
                e.AkEvent.GetName(),
                this.D_GetTransform(),
              )) && this.PlayingTagAkEventHandle.set(i, t);
      }
    }
  }
  StopTagAkEvent(t) {
    var i;
    void 0 !== this.PlayingTagAkEventHandle &&
      (i = this.TagsAndCorrespondingEffects?.Get(t)?.AkEvent)?.AkEvent &&
      this.PlayingTagAkEventHandle.has(t) &&
      (this.PlayingTagAkEventHandle.delete(t),
      AudioSystem_1.AudioSystem.ExecuteAction(i.AkEvent.GetName(), 0));
  }
  PlayStateBasedEffect(i, e) {
    if (i.StateBasedEffect)
      for (let t = 0; t < i.StateBasedEffect.Num(); t++) {
        var s = i.StateBasedEffect.Get(t).StateBasedEffect;
        s?.IsValid() &&
          (0 === e
            ? s.SetState(0)
            : 1 === e
              ? s.SetState(1)
              : 2 === e
                ? s.SetState(2)
                : 3 === e
                  ? s.SetState(3)
                  : 4 === e && s.SetState(4));
      }
  }
  PostStateAkEvent(t, i) {
    t = t.AkEvent;
    !t.AkEvent ||
      (!t.AkEvent.IsInfinite && i) ||
      (t.IsFollow
        ? (this.CurrentStateAkEventHandle = AudioSystem_1.AudioSystem.PostEvent(
            t.AkEvent.GetName(),
            this,
          ))
        : (this.CurrentStateAkEventHandle = AudioSystem_1.AudioSystem.PostEvent(
            t.AkEvent.GetName(),
            this.D_GetTransform(),
          )));
  }
  SetStateActorHide(t) {
    var e = t.HideActors;
    if (e)
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        if (
          (s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1)),
          s instanceof UE.BP_EffectActor_C)
        ) {
          this.PendingStateEffects.includes(s) &&
            this.PendingStateEffects.splice(
              this.PendingStateEffects.indexOf(s),
              1,
            );
          for (const h of this.PendingTagEffects.values())
            h.includes(s) && h.splice(h.indexOf(s), 1);
          this.PendingCrossStateEffects.has(s) &&
            this.PendingCrossStateEffects.delete(s);
        }
      }
  }
  SetStateActorShow(t) {
    var e = t.Actors;
    if (e)
      for (let t = 0, i = e.Num(); t < i; t++) {
        var s = e.Get(t);
        s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
      }
  }
  MakeActorProjection(t, i) {
    if (this.IsProjecting)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          31,
          "当前已经在投影中，重复调用投影接口",
        );
    else {
      var e = this.ActorsForProjection;
      if (
        (this.ProjectionRootActor?.IsValid() ||
          ((this.ProjectionRootActor = UE.KuroActorManager.D_SpawnActor(
            this.GetWorld(),
            UE.StaticMeshActor.StaticClass(),
            this.D_GetTransform(),
          )),
          this.ProjectionRootActor.RootComponent.SetMobility(2)),
        e && e?.Num() && t)
      ) {
        this.IsProjecting = !0;
        for (let t = 0; t < e.Num(); t++) {
          var s = UE.KuroStaticLibrary.SpawnActorFromAnother(e.Get(t));
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
              var h = (0, puerts_1.$ref)(void 0),
                r = (s.GetAttachedActors(h), (0, puerts_1.$unref)(h));
              for (let t = 0; t < r.Num(); t++) {
                var o = r
                  .Get(t)
                  .K2_GetComponentsByClass(
                    UE.StaticMeshComponent.StaticClass(),
                  );
                for (let t = 0; t < o.Num(); t++) {
                  var a = o.Get(t),
                    n = a.GetNumMaterials();
                  for (let t = 0; t < n; t++)
                    a.SetMaterial(t, this.MaterialForProjection);
                }
              }
              var c = s.K2_GetComponentsByClass(
                UE.StaticMeshComponent.StaticClass(),
              );
              for (let t = 0; t < c.Num(); t++) {
                var f = c.Get(t),
                  l = f.GetNumMaterials();
                for (let t = 0; t < l; t++)
                  f.SetMaterial(t, this.MaterialForProjection);
              }
            }
            i && this.AddMatrialDataForChildrenActor(s, i);
          }
        }
        this.ProjectionRootActor.D_K2_SetActorTransform(t, !1, void 0, !1);
      }
    }
  }
  UpdateProjectionActorTransform(t) {
    this.IsProjecting
      ? this.ProjectionRootActor?.IsValid()
        ? this.ProjectionRootActor.D_K2_SetActorTransform(t, !1, void 0, !1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 31, "找不到投影的Root Actor")
      : this.MakeActorProjection(t);
  }
  AddMatrialDataForChildrenActor(t, i) {
    if (t.IsValid()) {
      var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
        s = (t.GetAttachedActors(e), (0, puerts_1.$unref)(e));
      for (let t = 0; t < s.Num(); t++) {
        var h = s.Get(t);
        h.IsValid() &&
          ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(h, i);
      }
      ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(t, i);
    }
  }
  RemoveStaticMeshDestructibleTicker() {
    this.SkeletalMeshDestructibleTickId !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.SkeletalMeshDestructibleTickId),
      (this.SkeletalMeshDestructibleTickId =
        TickSystem_1.TickSystem.InvalidId));
  }
  RemoveSkeletalDestructibleTicker() {
    !this.SkeletalDestructibleTickIdList ||
      this.SkeletalDestructibleTickIdList.length <= 0 ||
      (this.SkeletalDestructibleTickIdList.forEach((t) => {
        TickSystem_1.TickSystem.Remove(t);
      }),
      (this.SkeletalDestructibleTickIdList.length = 0));
  }
  RemoveActorProjection() {
    this.IsProjecting
      ? this.ProjectionRootActor?.IsValid()
        ? ((this.IsProjecting = !1),
          this.DestroyActor(this.ProjectionRootActor))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 31, "找不到投影的Root Actor")
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("RenderEffect", 31, "当前不在投影中，无法移除投影");
  }
  DestroyActor(t) {
    var i = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      e = (t.GetAttachedActors(i), (0, puerts_1.$unref)(i));
    for (let t = 0; t < e.Num(); t++) this.DestroyActor(e.Get(t));
    t instanceof UE.BP_EffectActor_C && (t.StopEffect(), t.RemoveHandle()),
      t.K2_DestroyActor();
  }
  DestroySelf() {
    (this.SkeletalMeshDestructibleActorsInternal = void 0),
      (this.SkeletalMeshDestructibleActorsList = void 0),
      (this.SkeletalMeshDestructibleCellListMap = void 0),
      this.RemoveStaticMeshDestructibleTicker(),
      this.RemoveSkeletalDestructibleTicker(),
      this.DestroyActor(this);
  }
  SetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          if (
            (s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1)),
            s instanceof UE.BP_EffectActor_C)
          ) {
            this.PendingStateEffects.includes(s) &&
              this.PendingStateEffects.splice(
                this.PendingStateEffects.indexOf(s),
                1,
              );
            for (const h of this.PendingTagEffects.values())
              h.includes(s) && h.splice(h.indexOf(s), 1);
            this.PendingCrossStateEffects.has(s) &&
              this.PendingCrossStateEffects.delete(s);
          }
        }
    }
  }
  ResetTagActorHide(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.HideActors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
        }
    }
  }
  SetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          s && (s.SetActorHiddenInGame(!1), s.SetActorEnableCollision(!0));
        }
    }
  }
  ResetTagActorShow(t) {
    if (this.TagsAndCorrespondingEffects) {
      var e = this.TagsAndCorrespondingEffects.Get(t)?.Actors;
      if (e)
        for (let t = 0, i = e.Num(); t < i; t++) {
          var s = e.Get(t);
          s && (s.SetActorHiddenInGame(!0), s.SetActorEnableCollision(!1));
        }
    }
  }
  SetState(t, i, e) {
    this.States ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderScene",
          39,
          "状态为Undefined",
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
        ));
    var s = this.States.Get(t);
    if (s)
      if (this.InTransition && !s.IsForceSetState)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderScene",
            13,
            "正在过渡状态, 不可设置其他状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else if (this.NextState && !s.IsForceSetState)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderScene",
            13,
            "正在过渡状态, 不可设置其他状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else if (t === this.PlayingState)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderScene",
            13,
            "不可转换到目标状态,因为目标状态即为当前状态",
            ["Actor", this.LevelName],
            ["HandleID", this.HandleId],
          );
      else {
        e = e && !s.NeedExpressionAnyway;
        if (i && this.CurrentState) {
          i = this.CurrentState.TransitionMap.Get(t);
          if (void 0 !== i) {
            var h = this.States.Get(i);
            if (h)
              return (
                (this.InTransition = !0),
                (this.TransitionElapsedTime = 0),
                (this.CurTransitionTime = h.TransitionTime),
                this.StopState(this.CurrentState, h),
                (this.PlayingState = i),
                this.PlayState(h, this.CurrentState, e, this.PlayingState),
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
      20 !== t &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderScene",
          13,
          "状态未配置",
          ["未配置状态", t + 1],
          ["Actor", this.LevelName],
          ["HandleID", this.HandleId],
        );
  }
  StopState(e, t) {
    if (e) {
      this.RemovePendingStateEffectTick(),
        (this.PendingStateEffects = []),
        this.ActiveStateSequence &&
          this.ActiveStateSequence === e.Sequence.Sequence &&
          e.Sequence.Sequence !== t?.Sequence.Sequence &&
          this.StopSequence(this.ActiveStateSequence);
      for (let t = 0; t < e.HideActors.Num(); t++) {
        var i = e.HideActors.Get(t);
        i && (i.SetActorHiddenInGame(!1), i.SetActorEnableCollision(!0));
      }
      for (let t = 0; t < e.Effects.Num(); t++)
        e.Effects.Get(t)?.Stop("[SceneInteractionActor.StopState]", !1);
      var s = e.MaterialControllers;
      if (
        ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap &&
        s
      ) {
        for (let t = 0; t < s.Num(); t++)
          if (s.Get(t).IsRevertMaterial && s.Get(t).Materials) {
            var h = s.Get(t).Actors;
            for (let t = 0; t < h.Num(); t++) {
              var r = h
                .Get(t)
                .K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
              for (let t = 0; t < r.Num(); t++) {
                var o = r.Get(t),
                  a = this.RevertMaterialComponentsMaps?.get(o),
                  n = o.GetNumMaterials();
                for (let t = 0; t < n; t++) o.SetMaterial(t, a?.get(t));
              }
            }
          }
        if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)
          for (let i = 0; i < s.Num(); i++)
            for (let t = 0; t < s.Get(i).Actors.Num(); t++) {
              var c = e.MaterialControllers.Get(i).TailIndex - t;
              ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
                c,
              ) &&
                ItemMaterialManager_1.ItemMaterialManager.DisableActorData(c);
            }
      }
      if (this.CharRenderingComponents) {
        var f,
          t = this.CharRenderingComponents.keys(),
          l = Array.from(t),
          v = l.length;
        for (let t = 0; t < v; t++)
          this.CharRenderingComponents.get(l[t]) &&
            (f = this.CharRenderingComponents.get(l[t])) &&
            l[t].RemoveMaterialControllerDataGroupWithEnding(f);
      }
      void 0 !== this.CurrentStateAkEventHandle &&
        AudioSystem_1.AudioSystem.ExecuteAction(
          this.CurrentStateAkEventHandle,
          0,
        );
    }
  }
  CheckPlaying(t, i) {
    let e = !1,
      s = !0;
    var h;
    this.ActiveStateSequence &&
      ((h = this.GetDirectorBySequence(
        this.ActiveStateSequence,
      )?.SequencePlayer) && (e = h.IsPlaying()),
      (s = !1));
    let r = !1;
    return (
      i.AnimMontage.SkeletalMesh &&
        ((r = i.AnimMontage.SkeletalMesh.SkeletalMeshComponent.IsPlaying()),
        (s = !1)),
      !(!e && !r) ||
        (!(!s || 0 === this.CurTransitionTime) &&
          ((this.TransitionElapsedTime += t),
          this.TransitionElapsedTime <= this.CurTransitionTime))
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
      this.D_GetTransform(),
      void 0,
      !1,
    );
    var t = s.SequencePlayer;
    if (t) {
      (s.bOverrideInstanceData = !0),
        (s.DefaultInstanceData.TransformOriginActor =
          this).ActiveSequenceDirectorMap.set(e, s);
      const h = () => {
        const t = s;
        var i;
        t &&
          ((i = t.SequencePlayer) &&
            (i.OnStop.Remove(h), i.OnFinished.Remove(h)),
          this.ActiveSequenceDirectorMap &&
            this.ActiveSequenceDirectorMap.get(e) === t &&
            this.ActiveSequenceDirectorMap.delete(e),
          this.DirectorConfigMap?.delete(t),
          this.ActiveStateSequence === e && (this.ActiveStateSequence = void 0),
          t.IsValid()) &&
          TimerSystem_1.TimerSystem.Next(() => {
            ActorSystem_1.ActorSystem.Put(
              "SceneInteractionActor.CreateDirectorBySequence",
              t,
            );
          });
      };
      return t.OnStop.Add(h), t.OnFinished.Add(h), s;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RenderScene",
        39,
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
      this.PlayTagDestruction(t, i),
      this.PlayTagSkeletalMeshDestruction(t, i);
  }
  StopExtraEffectOnTagsChange(t) {
    this.StopTagEffect(t),
      this.StopTagMaterialController(t),
      this.StopTagAkEvent(t),
      this.ResetTagActorShow(t),
      this.ResetTagActorHide(t),
      this.StopTagSequence(t);
  }
  UpdateHitInfo(t, i) {
    (this.HitLocation = t), (this.HitDirection = i);
  }
  TryStopCurrentState() {
    this.CurrentState && this.StopState(this.CurrentState, void 0);
  }
  使用字段值切换状态() {
    this.ChangeStateInternal(this.模拟状态);
  }
  ChangeState1() {
    this.ChangeStateInternal(0);
  }
  ChangeState2() {
    this.ChangeStateInternal(1);
  }
  ChangeState3() {
    this.ChangeStateInternal(2);
  }
  ChangeState4() {
    this.ChangeStateInternal(3);
  }
  ChangeState5() {
    this.ChangeStateInternal(4);
  }
  ChangeState6() {
    this.ChangeStateInternal(5);
  }
  ChangeState7() {
    this.ChangeStateInternal(6);
  }
  ChangeState8() {
    this.ChangeStateInternal(7);
  }
  模拟Tag添加() {
    this.模拟Tag
      ? this.PlayExtraEffectOnTagsChange(this.模拟Tag, this.跳过表现过程)
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          18,
          "SimulationTagChange:没有设置SimulationTag",
        );
  }
  模拟Tag移除() {
    var t, i, e;
    this.模拟Tag
      ? (this.StopExtraEffectOnTagsChange(this.模拟Tag),
        this.TagsAndCorrespondingEffects &&
          (i = (t = this.TagsAndCorrespondingEffects.Get(this.模拟Tag))
            ?.Sequence) &&
          (e = (i = new UE.SSceneInteractionSequence(
            i.Sequence,
            i.IsLoop,
            !i.Reverse,
            i.PlayRate,
          )).Sequence) &&
          (e = this.CreateDirectorBySequence(e)) &&
          this.PlaySequence(e, i, t.Actors, !0))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "SceneGameplay",
          18,
          "SimulationTagChange:没有设置SimulationTag",
        );
  }
  PreviewFullDestructible() {
    var t = (0, puerts_1.$ref)(void 0),
      i = (this.GetAttachedActorDescendants(t, !0), (0, puerts_1.$unref)(t));
    for (let t = i.Num() - 1; 0 <= t; --t) {
      var e = i.Get(t);
      e instanceof UE.BP_KuroSkeletalMeshDestructibleActor_C &&
        e.PreviewFullDestructible();
    }
  }
  ChangeStateInternal(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneGameplay", 18, "change state", ["stateId", t]),
      (this.Active = !0),
      this.SetState(t, this.需要过渡状态, this.跳过表现过程);
  }
  重置() {
    var i = UE.KismetSystemLibrary.GetPathName(this.GetLevel()).split("/");
    let e = "";
    for (let t = 1; t < i.length - 1; t++) {
      var s = i[t];
      e = e + "/" + s;
    }
    var t = i[i.length - 1].split(":")[0].split("."),
      t = t[t.length - 1];
    (e = e + "/" + t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneGameplay", 18, "ResetState", ["levelName", e]),
      Global_1.Global.CharacterController?.ClientTravel(e, 0, !0, void 0);
  }
}
(SceneInteractionActor.DestructibleInitStat = Stats_1.Stat.Create(
  "DestructibleInitStat",
)),
  (SceneInteractionActor.DestructiblePostPhysicsStat = Stats_1.Stat.Create(
    "DestructiblePostPhysicsStat",
  )),
  (SceneInteractionActor.TempTransform = new UE.Transform()),
  (exports.default = SceneInteractionActor);
//# sourceMappingURL=SceneInteractionActor.js.map
