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
        (this.SIe = void 0),
        (this.Ben = void 0),
        (this.lsn = void 0),
        (this.Hen = void 0),
        (this.i_n = !1),
        (this.o_n = void 0),
        (this.r_n = IComponent_1.EAudioRangeType.AOI),
        (this.n_n = void 0),
        (this.s_n = void 0),
        (this.a_n = void 0),
        (this.h_n = void 0),
        (this.l_n = void 0),
        (this.__n = void 0),
        (this.u_n = void 0),
        (this.c_n = 0),
        (this.m_n = 0),
        (this.d_n = (t) => {
          if (!this.i_n && t) {
            var i = this.s_n.get(this.c_n);
            i && this.C_n(i, 0);
          } else if (this.i_n && !t) {
            let t = !1;
            (i = this.s_n.get(this.c_n)),
              (i =
                (i && ((t = !0), this.C_n(i, 1)),
                this.n_n.Type !== IComponent_1.EAkEventType.Box ||
                  t ||
                  this.C_n(void 0, 1),
                this.h_n.get(this.c_n)));
            i && this.g_n(i);
          }
          this.i_n = t;
        }),
        (this.Rni = (t, i) => {
          if (this.c_n !== t) {
            var e = this.s_n.get(t),
              o = this.h_n.get(this.c_n);
            if ((o && this.g_n(o), (this.c_n = t), e))
              switch (this.r_n) {
                case IComponent_1.EAudioRangeType.AOI:
                  this.C_n(e, 2);
                  break;
                case IComponent_1.EAudioRangeType.RangeComp:
                case IComponent_1.EAudioRangeType.SceneActorRefComp:
                  this.i_n && this.C_n(e, 2);
              }
          }
        }),
        (this.f_n = (i, t) => {
          if (
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                40,
                "[StateAudioComp] [疑难杂症] AkEvent回调",
                ["PbDataId", this.SIe?.GetPbDataId()],
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
                  ["PbDataId", this.SIe?.GetPbDataId()],
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
                    ["PbDataId", this.SIe?.GetPbDataId()],
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
      return [182, 0];
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemStateAudioComponent_1)[0];
      return (
        (this.o_n = t),
        (this.SIe = this.Entity.GetComponent(0)),
        (this.r_n = this.o_n.AudioRangeType),
        (this.n_n = this.o_n.AkEventType),
        !(!this.r_n || !this.n_n) ||
          ((t = this.SIe.GetPbDataId()),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 40, "组件配置参数缺失", ["entityId", t]),
          !1)
      );
    }
    OnStart() {
      var t;
      if (((this.Ben = this.Entity.GetComponent(117)), !this.Ben))
        return (
          (t = this.SIe.GetPbDataId()),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 40, "StateComponent不存在", [
              "entityId",
              t,
            ]),
          !1
        );
      switch (
        ((this.c_n = this.Ben.StateTagId),
        this.n_n.Type === IComponent_1.EAkEventType.Box && this.p_n(this.n_n),
        this.v_n(),
        this.r_n)
      ) {
        case IComponent_1.EAudioRangeType.RangeComp:
          if (((this.lsn = this.Entity.GetComponent(74)), !this.lsn))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  40,
                  "SceneItemReferenceComponent不存在",
                  ["entityConfigId", this.SIe.GetPbDataId()],
                ),
              !1
            );
          this.lsn.AddOnPlayerOverlapCallback(this.d_n);
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.M_n(!0);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          if (((this.Hen = this.Entity.GetComponent(147)), !this.Hen))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  40,
                  "SceneItemReferenceComponent不存在",
                  ["entityConfigId", this.SIe.GetPbDataId()],
                ),
              !1
            );
          this.Hen.AddOnPlayerOverlapCallback(this.d_n);
      }
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Rni,
        ),
        !0
      );
    }
    OnEnd() {
      switch (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.Rni,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.Rni,
          ),
        this.r_n)
      ) {
        case IComponent_1.EAudioRangeType.RangeComp:
          this.lsn &&
            (this.lsn.RemoveOnPlayerOverlapCallback(this.d_n),
            (this.lsn = void 0)),
            this.i_n && this.d_n(!1);
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.Ben && this.M_n(!1);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          this.Hen &&
            (this.Hen.RemoveOnPlayerOverlapCallback(this.d_n),
            (this.Hen = void 0)),
            this.i_n && this.d_n(!1);
      }
      return !0;
    }
    OnClear() {
      return !0;
    }
    v_n() {
      (this.s_n = new Map()), (this.a_n = new Map()), (this.h_n = new Map());
      for (const i of this.o_n.Config ?? []) {
        var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.State);
        t &&
          (i.AkEvent && this.s_n.set(t, i.AkEvent),
          i.LeaveAkEvent && this.a_n.set(t, i.LeaveAkEvent),
          i.AudioFade) &&
          this.h_n.set(t, i.AudioFade);
      }
    }
    S_n() {
      var t;
      this.l_n?.IsValid() ||
        ((t = this.Entity?.GetComponent(182)?.Owner)?.IsValid()
          ? (this.l_n = t.AddComponentByClass(
              UE.AkComponent.StaticClass(),
              !1,
              MathUtils_1.MathUtils.DefaultTransform,
              !1,
            ))
          : (this.l_n = void 0));
    }
    C_n(t, i) {
      if (this.n_n.Type === IComponent_1.EAkEventType.Point)
        this.n_n.PointIds?.length ? this.E_n(t) : this.y_n(t);
      else if (this.n_n.Type === IComponent_1.EAkEventType.Box) {
        switch (i) {
          case 0:
          case 2:
            this.u_n = t;
            break;
          case 1:
            this.u_n = void 0;
        }
        AudioUtils_1.AudioUtils.HandleAudioBoxUpdate(this.__n, i);
      } else
        this.n_n.Type === IComponent_1.EAkEventType.Default &&
          t &&
          this.I_n(t, i);
    }
    I_n(t, i) {
      var e;
      this.n_n.Type === IComponent_1.EAkEventType.Default && t
        ? (e = this.Entity?.GetComponent(182)?.Owner)?.IsValid()
          ? ((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
            (this.m_n = AudioSystem_1.AudioSystem.PostEvent(t, e)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[PostDefaultAkEvent]未能获取到该实体对应的有效Actor",
              ["PbDataId", this.SIe?.GetPbDataId()],
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneItem", 7, "[PostDefaultAkEvent]Path为空", [
            "PbDataId",
            this.SIe?.GetPbDataId(),
          ]);
    }
    y_n(t) {
      var i = this.n_n;
      this.n_n.Type !== IComponent_1.EAkEventType.Point ||
        i.PointIds?.length ||
        ((i = this.Entity?.GetComponent(182)?.Owner)?.IsValid() &&
          ((t = (0, AudioSystem_1.parseAudioEventPath)(t)),
          (this.m_n = AudioSystem_1.AudioSystem.PostEvent(t, i, {
            StopWhenOwnerDestroyed: !0,
            CallbackMask: 4,
            CallbackHandler: this.f_n,
          }))));
    }
    E_n(t) {
      var i = this.n_n;
      if (
        this.n_n.Type === IComponent_1.EAkEventType.Point &&
        i.PointIds?.length
      ) {
        if (!this.l_n?.IsValid())
          if ((this.S_n(), !this.l_n?.IsValid()))
            return (
              (h = this.SIe.GetPbDataId()),
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
        this.l_n.SetStopWhenOwnerDestroyed(!0),
          AudioController_1.AudioController.SetMultiplePositions(this.l_n, e);
        var h = (0, AudioSystem_1.parseAudioEventPath)(t);
        this.m_n = AudioSystem_1.AudioSystem.PostEvent(h, this.l_n);
      }
    }
    M_n(i) {
      if (i) {
        i = this.s_n.get(this.c_n);
        i && this.C_n(i, 0);
      } else {
        let t = !1;
        (i = this.s_n.get(this.c_n)),
          (i =
            (i && ((t = !0), this.C_n(i, 1)),
            this.n_n.Type !== IComponent_1.EAkEventType.Box ||
              t ||
              this.C_n(void 0, 1),
            this.h_n.get(this.c_n)));
        i && this.g_n(i);
      }
    }
    g_n(t) {
      var i;
      this.m_n &&
        t.FadeCurve &&
        t.FadeDuration &&
        ((i = t.FadeCurve),
        AudioSystem_1.AudioSystem.ExecuteAction(this.m_n, 0, {
          TransitionDuration: t.FadeDuration,
          TransitionFadeCurve: i,
        }));
    }
    p_n(t) {
      var i = t.Priority;
      let e = void 0;
      var o = this.SIe?.GetPbDataId();
      switch (t.AudioType) {
        case IComponent_1.EAudioType.AudioAMB:
          e = "AudioAMB";
          break;
        case IComponent_1.EAudioType.AudioBGM:
          e = "AudioBGM";
      }
      e
        ? (this.__n = new AudioModel_1.AudioBox(i, o, e))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            7,
            "[AudioBox]音频盒子类型未配置，请检查对应实体配置",
            ["EntityConfigId", this.SIe?.GetPbDataId()],
          );
    }
    PostAudioBoxEvent() {
      this.u_n
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Audio",
              40,
              "[AudioBox] 播放音频盒子",
              ["PbDataId", this.SIe?.GetPbDataId()],
              ["AkEventPath", this.u_n],
            ),
          AudioController_1.AudioController.PostEvent(
            this.u_n,
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
            ["PbDataId", this.SIe?.GetPbDataId()],
          );
    }
  });
(SceneItemStateAudioComponent = SceneItemStateAudioComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(116)],
    SceneItemStateAudioComponent,
  )),
  (exports.SceneItemStateAudioComponent = SceneItemStateAudioComponent);
//# sourceMappingURL=SceneItemStateAudioComponent.js.map
