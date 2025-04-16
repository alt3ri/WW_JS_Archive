"use strict";
var SceneItemGravityFlipComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
        o = arguments.length,
        r =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (n = t[a]) &&
            (r = (o < 3 ? n(r) : 3 < o ? n(e, i, r) : n(e, i)) || r);
      return 3 < o && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemGravityFlipComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo"),
  LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FlowController_1 = require("../../Module/Plot/Flow/FlowController"),
  BINDING_TAG = new UE.FName("Obj"),
  POINT_LIGHT_DOWN = "HaloYellow",
  POINT_LIGHT_UP = "HaloBlue",
  POINT_LIGHT_LEFT_RIGHT = "HaloGreen",
  SEQ_ROTATE_LEFT_90 =
    "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_L_90.Gravity_L_90",
  SEQ_ROTATE_RIGHT_90 =
    "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_R_90.Gravity_R_90",
  SEQ_ROTATE_LEFT_180 =
    "/Game/Aki/Scene/InteractionLevel/Animation/2_2/GravitySwitch/Gravity_L_180.Gravity_L_180",
  interactEffectTagMap = new Map([
    [0, 122403501],
    [180, -1277883221],
    [90, 1745511332],
    [270, -1597014724],
  ]),
  enterEffectTagMap = new Map([
    [0, -1768442878],
    [180, -1745523076],
    [90, -355027021],
    [270, 504823315],
  ]),
  notInteractEffectTagMap = new Map([
    [0, -1112012100],
    [180, 414541970],
    [90, 539102901],
    [270, -2085310779],
  ]),
  notInteractStateMap = new Map([
    [0, 4],
    [180, 5],
    [90, 6],
    [270, 7],
  ]),
  interactingStateMap = new Map([
    [0, 0],
    [180, 1],
    [90, 2],
    [270, 3],
  ]),
  lockStateMap = 8;
let SceneItemGravityFlipComponent =
  (SceneItemGravityFlipComponent_1 = class SceneItemGravityFlipComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this._un = void 0),
        (this.JK_ = !1),
        (this.CurGravityDirection = 0),
        (this.upn = void 0),
        (this.qZ_ = -1),
        (this.IsInteracting = !1),
        (this.tEc = !1),
        (this.Rjt = !1),
        (this.AOc = !1),
        (this.P2c = void 0),
        (this.x2c = void 0),
        (this.U2c = void 0),
        (this.Rnn = () => {
          this.Rtn(), this.RemoveInteractTag(), this.UpdatePrefabState(!0);
        }),
        (this.F0n = (t) => {
          (this.Rjt = t),
            this.Rjt
              ? (this.Lie?.RemoveTag(-674731505),
                this.Lie?.RemoveTag(1272257853))
              : (this.Lie?.AddTag(
                  notInteractEffectTagMap.get(this.CurGravityDirection),
                ),
                this.fRc(),
                this.AOc && this.POc()),
            this.UpdatePrefabState(!0);
        }),
        (this.Etn = (t) => {
          (this.AOc = t),
            this.Rjt ||
              this.tEc ||
              (t ? this.POc() : this.Lie?.RemoveTag(this.qZ_));
        }),
        (this.D2c = (t, e) => {
          if (e)
            switch (t) {
              case 1586172671:
                this.PlayRotateSequence(90);
                break;
              case 887665186:
                this.PlayRotateSequence(270);
                break;
              case -1670724542:
                this.PlayRotateSequence(180);
            }
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemGravityFlipComponent_1)[0];
      return (this.Lo = t), !0;
    }
    OnStart() {
      (this.EIe = this.Entity.GetComponent(0)),
        (this.Hte = this.Entity.GetComponent(200)),
        (this.Lie = this.Entity.GetComponent(194)),
        (this._un = this.Entity.GetComponent(128));
      var t = this.EIe?.PbGravityFlipDirection;
      return (
        this.SetGravityDirection(t) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              31,
              "[SceneItemGravityFlipComponent] InitGravityDirection Failed",
              ["Id", this.EIe?.GetPbDataId()],
              ["index", this.EIe?.PbGravityFlipDirection],
            ),
          (this.CurGravityDirection = 0)),
        (this.Rjt = this._un?.IsLocked ?? !1),
        this.B2c(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.F0n,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        ),
        this.Lie?.AddTagAddOrRemoveListener(1586172671, this.D2c),
        this.Lie?.AddTagAddOrRemoveListener(887665186, this.D2c),
        this.Lie?.AddTagAddOrRemoveListener(-1670724542, this.D2c),
        !0
      );
    }
    OnEnd() {
      if (this.upn) {
        const t = this.upn;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(
            "SceneItemGravityFlipComponent.OnEnd",
            t,
          );
        });
      }
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemLockPropChange,
          this.F0n,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.Etn,
        ),
        this.Lie?.RemoveTagAddOrRemoveListener(1586172671, this.D2c),
        this.Lie?.RemoveTagAddOrRemoveListener(887665186, this.D2c),
        this.Lie?.RemoveTagAddOrRemoveListener(-1670724542, this.D2c),
        !0
      );
    }
    SetGravityDirection(t) {
      return (
        void 0 !== t &&
        ((this.CurGravityDirection = this.FZ_(t)),
        this.UpdatePrefabState(!0),
        !0)
      );
    }
    B2c() {
      ResourceSystem_1.ResourceSystem.LoadAsync(
        SEQ_ROTATE_LEFT_90,
        UE.LevelSequence,
        (t) => {
          t
            ? (this.P2c = t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                31,
                "[SceneItemGravityFlipComponent] LoadRotateSequence Failed",
                ["path", SEQ_ROTATE_LEFT_90],
              );
        },
      ),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          SEQ_ROTATE_RIGHT_90,
          UE.LevelSequence,
          (t) => {
            t
              ? (this.x2c = t)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  31,
                  "[SceneItemGravityFlipComponent] LoadRotateSequence Failed",
                  ["path", SEQ_ROTATE_RIGHT_90],
                );
          },
        ),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          SEQ_ROTATE_LEFT_180,
          UE.LevelSequence,
          (t) => {
            t
              ? (this.U2c = t)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  31,
                  "[SceneItemGravityFlipComponent] LoadRotateSequence Failed",
                  ["path", SEQ_ROTATE_LEFT_180],
                );
          },
        );
    }
    Rtn() {
      var t, e, i, s;
      this.JK_ ||
        ((t = this.EIe?.GetPbDataId()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneItem",
            31,
            "[SceneItemGravityFlipComponent] CreateInteractOption",
            ["PbDataId", t],
          ),
        (e = this.Entity.GetComponent(195))
          ? ((e = e.GetInteractController()) ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneItem",
                  31,
                  "[SceneItemGravityFlipComponent]CreateInteractOption Failed_1",
                  ["EntityId", t],
                )),
            (i = new CodeDefineLevelConditionInfo_1.LevelConditionGroup()),
            ((s =
              new CodeDefineLevelConditionInfo_1.LevelConditionCheckGravityFlipEntityDirectionSameAsPlayerInfo()).EntityId =
              this.Entity.Id),
            i.Conditions?.push(s),
            ((s =
              new LevelGameplayActionsDefine_1.ActionInteractGravityFlip()).EntityId =
              this.Entity.Id),
            e.AddClientInteractOption(s, i, "Direct"),
            (this.JK_ = !0))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneItem",
              31,
              "[SceneItemGravityFlipComponent]CreateInteractOption Failed_0",
              ["pbDataId", t],
            ));
    }
    ExecuteInteract() {
      ModelManager_1.ModelManager.GravityFlipModel.InitGravityFlipParams(this);
      FlowController_1.FlowController.StartFlowForView(
        "剧情_2_2_重力机关交互表现",
        1,
        1,
        { HideAllUi: !0 },
      );
    }
    GetGravityFlipDirection() {
      return this.Lo?.Config;
    }
    Qpn() {
      void 0 === this.upn &&
        ((this.upn = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransformDouble,
          void 0,
          !1,
        )),
        (this.upn.bOverrideInstanceData = !0));
    }
    PlayRotateSequence(t, e) {
      let i = "",
        s = void 0;
      switch (t) {
        case 90:
          (i = SEQ_ROTATE_LEFT_90), (s = this.P2c);
          break;
        case 270:
          (i = SEQ_ROTATE_RIGHT_90), (s = this.x2c);
          break;
        case 180:
          (i = SEQ_ROTATE_LEFT_180), (s = this.U2c);
      }
      var n, o;
      s ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SceneItem",
          31,
          "[GravityFlipModel] 未找到对应的Sequence",
          ["path", i],
        ),
      (s = ResourceSystem_1.ResourceSystem.Load(i, UE.LevelSequence)))
        ? (void 0 === this.upn && this.Qpn(),
          (t = this.upn.DefaultInstanceData),
          (n = this.Hte.ActorLocationProxy),
          (o = this.Hte.ActorRotationProxy),
          (o = Transform_1.Transform.Create(
            o.Quaternion(void 0),
            n,
            Vector_1.Vector.OneVectorProxy,
          )),
          (t.TransformOrigin = o.ToUeTransformOld()),
          (t.TransformOriginActor = this.Hte.Owner),
          this.upn &&
            (this.upn.SetActorTickEnabled(!0),
            this.upn.SetSequence(s),
            this.upn.SequencePlayer.OnFinished.Clear(),
            this.upn.AddBindingByTag(BINDING_TAG, this.Hte.Owner),
            this.upn.SequencePlayer.IsValid()) &&
            (this.upn.SequencePlayer.SetPlayRate(1),
            this.upn.SequencePlayer.Play(),
            this.upn.SequencePlayer.OnFinished.Add(() => {
              this.upn.RemoveBindingByTag(BINDING_TAG, this.Hte.Owner), e?.();
            })))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[GravityFlipModel] 尝试重新同步加载后仍未找到Sequence",
            ["path", i],
          );
    }
    CheckPlayerGravityDirectionAsSelf() {
      var t, e;
      return (
        !!(this.P2c && this.x2c && this.U2c) &&
        ((t = Vector_1.Vector.Create(this.Hte?.ActorUp)).MultiplyEqual(-1),
        (e = Global_1.Global.BaseCharacter?.CharacterActorComponent)
          ? 0.99 <
            Vector_1.Vector.Create(e.ActorGravityDirectProxy).DotProduct(t)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("SceneItem", 31, "[GravityFlipModel] 未找到角色"),
            !1))
      );
    }
    OnNotifyUpdateGravityDirection(t) {
      (this.tEc = !0),
        this.Lie?.RemoveTag(this.qZ_),
        this.Lie?.RemoveTag(
          notInteractEffectTagMap.get(this.CurGravityDirection),
        );
      var t = this.FZ_(t),
        e = (e = t - this.CurGravityDirection) < 0 ? 360 + e : e,
        i =
          ((this.CurGravityDirection = t),
          () => {
            this.OnExitInteract(!0), this.RemoveInteractTag(), (this.tEc = !1);
          });
      switch (e) {
        case 90:
          this.PlayRotateSequence(90, i);
          break;
        case 180:
          this.PlayRotateSequence(180, i);
          break;
        case 270:
          this.PlayRotateSequence(270, i);
      }
      this.Lie?.RemoveTag(this.qZ_);
      e = notInteractStateMap.get(t);
      this.Hte.SwitchToState(e, !0, !1);
    }
    FZ_(t) {
      switch (t) {
        case Protocol_1.Aki.Protocol.AY_.Proto_GravityLeft:
          return 90;
        case Protocol_1.Aki.Protocol.AY_.Proto_GravityRight:
          return 270;
        case Protocol_1.Aki.Protocol.AY_.Proto_GravityUp:
          return 180;
        case Protocol_1.Aki.Protocol.AY_.Proto_GravityDown:
          return 0;
      }
      return 0;
    }
    AddInteractTag() {
      var t = interactEffectTagMap.get(this.CurGravityDirection);
      this.Lie?.HasTag(t) || this.Lie?.AddTag(t),
        this.Lie?.RemoveTag(-674731505),
        this.UpdatePrefabState();
    }
    RemoveInteractTag() {
      this.Lie?.RemoveTag(589539912);
      var t = notInteractEffectTagMap.get(this.CurGravityDirection);
      this.Lie?.HasTag(t) || this.Rjt || this.Lie?.AddTag(t);
    }
    OnEnterInteract() {
      this.Lie?.RemoveTag(this.qZ_), (this.IsInteracting = !0);
    }
    OnExitInteract(t = !1) {
      var e = t
        ? this.CurGravityDirection
        : ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection;
      this.AOc &&
        ((e = enterEffectTagMap.get(e)),
        this.Lie?.HasTag(e) || this.Lie?.AddTag(e),
        (this.qZ_ = e)),
        (this.IsInteracting = !1),
        this.UpdatePrefabState(t);
    }
    UpdatePrefabState(t = !1) {
      this.Rjt
        ? (this.Hte.SwitchToState(lockStateMap, !0, !1),
          this.Lie?.RemoveTag(this.qZ_),
          this.gRc())
        : ((t = t
            ? this.CurGravityDirection
            : ModelManager_1.ModelManager.GravityFlipModel
                .CurrentGravityDirection),
          (t = (
            this.IsInteracting ? interactingStateMap : notInteractStateMap
          ).get(t)),
          this.Hte.SwitchToState(t, !0, !1));
    }
    gRc() {
      var t = this.Hte?.GetInteractionMainActor();
      t
        ? (t.GetActorByKey(POINT_LIGHT_DOWN)?.SetActorHiddenInGame(!0),
          t.GetActorByKey(POINT_LIGHT_UP)?.SetActorHiddenInGame(!0),
          t.GetActorByKey(POINT_LIGHT_LEFT_RIGHT)?.SetActorHiddenInGame(!0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[HideAllHalo] 找不到sceneInteractionActor",
          );
    }
    fRc() {
      let t = "";
      switch (this.CurGravityDirection) {
        case 0:
          t = POINT_LIGHT_DOWN;
          break;
        case 180:
          t = POINT_LIGHT_UP;
          break;
        case 90:
        case 270:
          t = POINT_LIGHT_LEFT_RIGHT;
      }
      var e = this.Hte?.GetInteractionMainActor();
      e
        ? e.GetActorByKey(t)?.SetActorHiddenInGame(!1)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            31,
            "[ShowDirectionHalo] 找不到sceneInteractionActor",
          );
    }
    POc() {
      var t = enterEffectTagMap.get(this.CurGravityDirection);
      this.Lie?.HasTag(t) || this.Lie?.AddTag(t), (this.qZ_ = t);
    }
  });
(SceneItemGravityFlipComponent = SceneItemGravityFlipComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(278)],
    SceneItemGravityFlipComponent,
  )),
  (exports.SceneItemGravityFlipComponent = SceneItemGravityFlipComponent);
//# sourceMappingURL=SceneItemGravityFlipComponent.js.map
