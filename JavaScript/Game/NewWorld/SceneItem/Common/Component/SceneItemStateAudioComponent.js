"use strict";
var SceneItemStateAudioComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, o) {
      var s,
        n = arguments.length,
        h =
          n < 3
            ? i
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(i, e))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, i, e, o);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (h = (n < 3 ? s(h) : 3 < n ? s(i, e, h) : s(i, e)) || h);
      return 3 < n && h && Object.defineProperty(i, e, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemStateAudioComponent = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  AudioModel_1 = require("../../../../../Core/Audio/AudioModel"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AudioUtils_1 = require("../../../../Utils/AudioUtils");
let SceneItemStateAudioComponent =
  (SceneItemStateAudioComponent_1 = class SceneItemStateAudioComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.cen = void 0),
        (this.jnn = void 0),
        (this.Men = void 0),
        (this.b1n = !1),
        (this.q1n = void 0),
        (this.G1n = IComponent_1.EAudioRangeType.AOI),
        (this.N1n = void 0),
        (this.O1n = void 0),
        (this.k1n = void 0),
        (this.F1n = void 0),
        (this.V1n = void 0),
        (this.H1n = void 0),
        (this.j1n = void 0),
        (this.W1n = 0),
        (this.K1n = 0),
        (this.Q1n = (t) => {
          if (!this.b1n && t) {
            var i = this.O1n.get(this.W1n);
            i && this.X1n(i, 0);
          } else if (this.b1n && !t) {
            let t = !1;
            (i = this.k1n.get(this.W1n)),
              (i =
                (i && ((t = !0), this.X1n(i, 1)),
                this.N1n.Type !== IComponent_1.EAkEventType.Box ||
                  t ||
                  this.X1n(void 0, 1),
                this.F1n.get(this.W1n)));
            i && this.$1n(i);
          }
          this.b1n = t;
        }),
        (this.Usi = (t, i) => {
          if (this.W1n !== t) {
            var e = this.O1n.get(t),
              o = this.F1n.get(this.W1n);
            if ((o && this.$1n(o), (this.W1n = t), e))
              switch (this.G1n) {
                case IComponent_1.EAudioRangeType.AOI:
                  this.X1n(e, 2);
                  break;
                case IComponent_1.EAudioRangeType.RangeComp:
                case IComponent_1.EAudioRangeType.SceneActorRefComp:
                  this.b1n && this.X1n(e, 2);
              }
          }
        }),
        (this.Y1n = (i, t) => {
          if (
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                40,
                "[StateAudioComp] [疑难杂症] AkEvent回调",
                ["PbDataId", this.EIe?.GetPbDataId()],
                ["CallbackType", i],
              ),
            2 === i)
          ) {
            i = t;
            if (i?.Label) {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  40,
                  "[StateAudioComp] [疑难杂症] 解析AkEvent回调",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                  ["Label", i.Label],
                );
              let t = void 0;
              try {
                t = JSON.parse(i.Label);
              } catch (t) {
                return void (
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    40,
                    "[StateAudioComp] [疑难杂症] AkEvent回调解析失败",
                    ["PbDataId", this.EIe?.GetPbDataId()],
                    ["Label", i.Label],
                  )
                );
              }
              "SoundTrackingEffectNotify" === t?.MarkerType &&
                "Start" === t.Action &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.Entity,
                  EventDefine_1.EEventName.PlaySoundTrackEffect,
                  t.Length,
                );
            }
          }
        });
    }
    static get Dependencies() {
      return [185, 0];
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemStateAudioComponent_1)[0];
      return (
        (this.q1n = t),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.G1n = this.q1n.AudioRangeType),
        (this.N1n = this.q1n.AkEventType),
        !(!this.G1n || !this.N1n) ||
          ((t = this.EIe.GetPbDataId()),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 40, "组件配置参数缺失", ["entityId", t]),
          !1)
      );
    }
    OnStart() {
      var t;
      if (((this.cen = this.Entity.GetComponent(119)), !this.cen))
        return (
          (t = this.EIe.GetPbDataId()),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 40, "StateComponent不存在", [
              "entityId",
              t,
            ]),
          !1
        );
      switch (
        ((this.W1n = this.cen.StateTagId),
        this.N1n.Type === IComponent_1.EAkEventType.Box && this.J1n(this.N1n),
        this.z1n(),
        this.G1n)
      ) {
        case IComponent_1.EAudioRangeType.RangeComp:
          if (((this.jnn = this.Entity.GetComponent(76)), !this.jnn))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  40,
                  "SceneItemReferenceComponent不存在",
                  ["entityConfigId", this.EIe.GetPbDataId()],
                ),
              !1
            );
          this.jnn.AddOnPlayerOverlapCallback(this.Q1n);
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.Z1n(!0);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          if (((this.Men = this.Entity.GetComponent(149)), !this.Men))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  40,
                  "SceneItemReferenceComponent不存在",
                  ["entityConfigId", this.EIe.GetPbDataId()],
                ),
              !1
            );
          this.Men.AddOnPlayerOverlapCallback(this.Q1n);
      }
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Usi,
        ),
        !0
      );
    }
    OnEnd() {
      switch (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Usi,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.Usi,
          ),
        this.G1n)
      ) {
        case IComponent_1.EAudioRangeType.RangeComp:
          this.jnn &&
            (this.jnn.RemoveOnPlayerOverlapCallback(this.Q1n),
            (this.jnn = void 0)),
            this.b1n && this.Q1n(!1);
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.cen && this.Z1n(!1);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          this.Men &&
            (this.Men.RemoveOnPlayerOverlapCallback(this.Q1n),
            (this.Men = void 0)),
            this.b1n && this.Q1n(!1);
      }
      return !0;
    }
    OnClear() {
      return !0;
    }
    z1n() {
      (this.O1n = new Map()), (this.k1n = new Map()), (this.F1n = new Map());
      for (const i of this.q1n.Config ?? []) {
        var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.State);
        t &&
          (i.AkEvent && this.O1n.set(t, i.AkEvent),
          i.LeaveAkEvent && this.k1n.set(t, i.LeaveAkEvent),
          i.AudioFade) &&
          this.F1n.set(t, i.AudioFade);
      }
    }
    e_n() {
      var t;
      this.V1n?.IsValid() ||
        ((t = this.Entity?.GetComponent(185)?.Owner)?.IsValid()
          ? (this.V1n = t.AddComponentByClass(
              UE.AkComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            ))
          : (this.V1n = void 0));
    }
    X1n(t, i) {
      if (this.N1n.Type === IComponent_1.EAkEventType.Point)
        this.N1n.PointIds?.length ? this.t_n(t) : this.i_n(t);
      else if (this.N1n.Type === IComponent_1.EAkEventType.Box) {
        switch (i) {
          case 0:
          case 2:
            this.j1n = t;
            break;
          case 1:
            this.j1n = void 0;
        }
        AudioUtils_1.AudioUtils.HandleAudioBoxUpdate(this.H1n, i);
      } else
        this.N1n.Type === IComponent_1.EAkEventType.Default &&
          t &&
          this.o_n(t, i);
    }
    o_n(t, i) {
      var e;
      this.N1n.Type === IComponent_1.EAkEventType.Default && t
        ? (e = this.Entity?.GetComponent(185)?.Owner)?.IsValid()
          ? ((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
            (this.K1n = AudioSystem_1.AudioSystem.PostEvent(t, e)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[PostDefaultAkEvent]未能获取到该实体对应的有效Actor",
              ["PbDataId", this.EIe?.GetPbDataId()],
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneItem", 7, "[PostDefaultAkEvent]Path为空", [
            "PbDataId",
            this.EIe?.GetPbDataId(),
          ]);
    }
    i_n(t) {
      var i = this.N1n;
      this.N1n.Type !== IComponent_1.EAkEventType.Point ||
        i.PointIds?.length ||
        ((i = this.Entity?.GetComponent(185)?.Owner)?.IsValid() &&
          ((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
          (this.K1n = AudioSystem_1.AudioSystem.PostEvent(t, i, {
            StopWhenOwnerDestroyed: !0,
            CallbackMask: 4,
            CallbackHandler: this.Y1n,
          }))));
    }
    t_n(t) {
      var i = this.N1n;
      if (
        this.N1n.Type === IComponent_1.EAkEventType.Point &&
        i.PointIds?.length
      ) {
        if (!this.V1n?.IsValid())
          if ((this.e_n(), !this.V1n?.IsValid()))
            return (
              (h = this.EIe.GetPbDataId()),
              void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 40, "AkComponent创建失败", [
                  "entityId",
                  h,
                ])
              )
            );
        var e = UE.NewArray(UE.Transform);
        for (const r of i.PointIds) {
          var o =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
          let t = void 0;
          if (o)
            t =
              o.Entity.GetComponent(1)?.ActorTransform ??
              o.Entity.GetComponent(0)?.GetTransform();
          else {
            o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r);
            if (!o)
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Audio", 40, "多点音源位置实体不存在", [
                  "entityId",
                  r,
                ])
              );
            var s,
              n,
              o = o.Transform;
            o &&
              ((s = Vector_1.Vector.Create(
                o.Pos?.X ?? 0,
                o.Pos?.Y ?? 0,
                o.Pos?.Z ?? 0,
              )),
              (n = Rotator_1.Rotator.Create(
                o.Rot?.X ?? 0,
                o.Rot?.Y ?? 0,
                o.Rot?.Z ?? 0,
              )),
              (o = Vector_1.Vector.Create(
                o.Scale?.X ?? 0,
                o.Scale?.Y ?? 0,
                o.Scale?.Z ?? 0,
              )),
              (t = new UE.Transform(
                n.ToUeRotator(),
                s.ToUeVector(),
                o.ToUeVector(),
              )));
          }
          if (!t?.IsValid())
            return void (
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                34,
                "未能获取到多点音源位置实体的有效Transform",
                ["entityId", r],
              )
            );
          e.Add(t);
        }
        this.V1n.SetStopWhenOwnerDestroyed(!0),
          AudioController_1.AudioController.SetMultiplePositions(this.V1n, e);
        var h = (0, AudioSystem_1.parseAudioEventPath)(t);
        this.K1n = AudioSystem_1.AudioSystem.PostEvent(h, this.V1n);
      }
    }
    Z1n(i) {
      if (i) {
        i = this.O1n.get(this.W1n);
        i && this.X1n(i, 0);
      } else {
        let t = !1;
        (i = this.k1n.get(this.W1n)),
          (i =
            (i && ((t = !0), this.X1n(i, 1)),
            this.N1n.Type !== IComponent_1.EAkEventType.Box ||
              t ||
              this.X1n(void 0, 1),
            this.F1n.get(this.W1n)));
        i && this.$1n(i);
      }
    }
    $1n(t) {
      var i;
      this.K1n &&
        t.FadeCurve &&
        t.FadeDuration &&
        ((i = t.FadeCurve),
        AudioSystem_1.AudioSystem.ExecuteAction(this.K1n, 0, {
          TransitionDuration: t.FadeDuration,
          TransitionFadeCurve: i,
        }));
    }
    J1n(t) {
      var i = t.Priority;
      let e = void 0;
      var o = this.EIe?.GetPbDataId();
      switch (t.AudioType) {
        case IComponent_1.EAudioType.AudioAMB:
          e = "AudioAMB";
          break;
        case IComponent_1.EAudioType.AudioBGM:
          e = "AudioBGM";
      }
      e
        ? (this.H1n = new AudioModel_1.AudioBox(i, o, e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            7,
            "[AudioBox]音频盒子类型未配置，请检查对应实体配置",
            ["EntityConfigId", this.EIe?.GetPbDataId()],
          );
    }
    PostAudioBoxEvent() {
      this.j1n
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              40,
              "[AudioBox] 播放音频盒子",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["AkEventPath", this.j1n],
            ),
          AudioController_1.AudioController.PostEvent(
            this.j1n,
            void 0,
            void 0,
            void 0,
            void 0,
            void 0,
            !0,
          ))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Audio",
            40,
            "[AudioBox] 播放音频盒子失败, 缺少对应的AkEventPath配置",
            ["PbDataId", this.EIe?.GetPbDataId()],
          );
    }
  });
(SceneItemStateAudioComponent = SceneItemStateAudioComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(118)],
    SceneItemStateAudioComponent,
  )),
  (exports.SceneItemStateAudioComponent = SceneItemStateAudioComponent);
//# sourceMappingURL=SceneItemStateAudioComponent.js.map
