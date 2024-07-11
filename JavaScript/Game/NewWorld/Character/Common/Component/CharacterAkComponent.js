"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, o, e, i) {
    let r;
    const n = arguments.length;
    let s =
      n < 3 ? o : i === null ? (i = Object.getOwnPropertyDescriptor(o, e)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, o, e, i);
    else
      for (let _ = t.length - 1; _ >= 0; _--)
        (r = t[_]) && (s = (n < 3 ? r(s) : n > 3 ? r(o, e, s) : r(o, e)) || s);
    return n > 3 && s && Object.defineProperty(o, e, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAkComponent = void 0);
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const AkComponentDynamicConditionProxy_1 = require("./Audio/AkComponentDynamicConditionProxy");
const FoleySynthController_1 = require("./Audio/Controller/FoleySynthController");
const DEBUG_RADIUS = 15;
const DEBUG_SEG = 12;
const ROLE_MOVE_GROUP = "role_move";
const ENVIRONMENT_AUDIO_UPDATE_INTERVAL = 500;
const ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED = 4;
const AUDIO_ENTITY_TYPE_VOLUME_CONTROL = new Map([
  [
    Protocol_1.Aki.Protocol.HBs.Proto_Animal,
    "entity_type_volume_control_animal",
  ],
  [
    Protocol_1.Aki.Protocol.HBs.Proto_Custom,
    "entity_type_volume_control_custom_other",
  ],
  [
    Protocol_1.Aki.Protocol.HBs.Proto_Monster,
    "entity_type_volume_control_monster",
  ],
  [Protocol_1.Aki.Protocol.HBs.Proto_Npc, "entity_type_volume_control_npc"],
  [
    Protocol_1.Aki.Protocol.HBs.Proto_Player,
    "entity_type_volume_control_player_role",
  ],
  [
    Protocol_1.Aki.Protocol.HBs.Proto_SceneItem,
    "entity_type_volume_control_scene_item",
  ],
  [
    Protocol_1.Aki.Protocol.HBs.Proto_Vision,
    "entity_type_volume_control_vision",
  ],
]);
class AkComponentStatic {
  static Load() {
    return (
      AkComponentStatic.Init ||
        (AkComponentStatic.AkMoveStateMap.set("fall", -1527053051),
        AkComponentStatic.AkMoveStateMap.set("fly", -1717024120),
        AkComponentStatic.AkMoveStateMap.set("highspeed", -742314429),
        AkComponentStatic.AkMoveStateMap.set("sit", -1446183172),
        AkComponentStatic.AkMoveStateMap.set("slide", 786967831),
        AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, "normal"),
        (AkComponentStatic.Init = !0)),
      !0
    );
  }
}
(AkComponentStatic.Init = !1),
  (AkComponentStatic.AkMoveState = "normal"),
  (AkComponentStatic.AkMoveStateMap = new Map());
let CharacterAkComponent = class CharacterAkComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Vpr = void 0),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.Lie = void 0),
      (this.l3r = !1),
      (this.IsRole = !1),
      (this.IsP1 = !1),
      (this.AkComponentConfig = void 0),
      (this._3r = void 0),
      (this.u3r = !1),
      (this.WaterDepth = -0),
      (this.c3r = void 0),
      (this.FootSwitch = ""),
      (this.m3r = 0),
      (this.d3r = Vector_1.Vector.Create());
  }
  static get Dependencies() {
    return [3, 0];
  }
  OnInitData() {
    return (
      (this.DynamicConditionProxy =
        new AkComponentDynamicConditionProxy_1.AkComponentDynamicConditionProxy()),
      (this.Xzt = new AudioController_1.PlayResult()),
      !0
    );
  }
  OnStart() {
    return (
      (this.Vpr = this.Entity.GetComponent(0)),
      !(
        !this.Vpr ||
        ((this.Hte = this.Entity.GetComponent(3)), !this.Hte?.Actor) ||
        ((this.Gce = this.Entity.GetComponent(36)), !this.Gce) ||
        ((this.u3r = !1),
        (this.l3r = !0),
        AkComponentStatic.Load(),
        this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig),
        0)
      )
    );
  }
  OnTick(t) {
    this.u3r && this.QBt(),
      this.IsRole &&
        this.IsP1 &&
        (this.C3r(), this.g3r(), this.c3r) &&
        this.c3r.Tick(t);
  }
  OnActivate() {
    let t;
    (this.IsRole =
      this.Vpr?.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player),
      (this.IsP1 = !1),
      ((this.IsRole && this.Hte?.IsAutonomousProxy) ||
        (this.Vpr?.IsConcomitantEntity &&
          ((t = this.Vpr.GetSummonerId()),
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityId(t))) &&
          EntitySystem_1.EntitySystem.GetComponent(t, 40)?.IsP1)) &&
        (this.IsP1 = !0),
      this.IsRole &&
        ((this.Lie = this.Entity.GetComponent(185)), this.IsP1) &&
        ((this.c3r = new FoleySynthController_1.FoleySynthController(
          this.Hte,
          this,
          this.Lie,
        )),
        this.c3r.Init(this._3r)),
      this.f3r();
  }
  f3r() {
    this.Hte?.Valid &&
      (this.IsP1
        ? AudioSystem_1.AudioSystem.SetSwitch(
            "char_p1orp3",
            "p1",
            this.Hte.Actor,
          )
        : AudioSystem_1.AudioSystem.SetSwitch(
            "char_p1orp3",
            "p3",
            this.Hte.Actor,
          ));
  }
  C3r() {
    if (AkComponentStatic.AkMoveState === "normal") {
      for (const [t, o] of AkComponentStatic.AkMoveStateMap)
        if (this.Lie?.HasTag(o))
          return (
            (AkComponentStatic.AkMoveState = t),
            void AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, t)
          );
    } else {
      const e = AkComponentStatic.AkMoveStateMap.get(
        AkComponentStatic.AkMoveState,
      );
      if (!this.Lie?.HasTag(e)) {
        for (const [i, r] of AkComponentStatic.AkMoveStateMap)
          if (this.Lie?.HasTag(r))
            return (
              (AkComponentStatic.AkMoveState = i),
              void AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, i)
            );
        (AkComponentStatic.AkMoveState = "normal"),
          AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, "normal");
      }
    }
  }
  p3r() {
    const e = this.Vpr?.GetEntityType();
    const i = this.Hte?.Actor;
    if (!e || !i) {
      if (e)
        return void (
          i ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              56,
              "实体类型设置音量控制: 无法获取角色Actor",
            ))
        );
      throw Error("实体类型设置音量控制: 无法获取实体类型");
    }
    AUDIO_ENTITY_TYPE_VOLUME_CONTROL.forEach((t, o) => {
      e === o
        ? AudioSystem_1.AudioSystem.SetRtpcValue(t, 1, { Actor: i })
        : AudioSystem_1.AudioSystem.SetRtpcValue(t, 0, { Actor: i });
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          56,
          "实体类型设置音量控制: SOLO此类型，静音其他类型",
          ["actor", i.ActorLabel],
          ["entityType", e],
          ["rtpc", AUDIO_ENTITY_TYPE_VOLUME_CONTROL.get(e)],
        );
  }
  OnEnd() {
    return (
      this.DynamicConditionProxy.Clear(),
      this.c3r && this.c3r.Clear(),
      (this.l3r = !0)
    );
  }
  PostAudioEvent(t) {
    const o = this.Entity.GetComponent(0).GetRoleId();
    let e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)
      .GetAudioData()
      .GetAudioPathByName(t);
    e
      ? (this.Xzt.EventPath && !e.CanInterrupt) ||
        ((e = e.AudioPath),
        this.Xzt.EventPath !== e &&
          (AudioController_1.AudioController.StopEvent(this.Xzt),
          e
            ? (AudioController_1.AudioController.PostEvent(
                e,
                this.Hte.Actor,
                this.Xzt,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("UiCore", 22, "事件播放指定音效", [
                  "audioEventPath",
                  e,
                ]))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("UiCore", 22, "没有事件播放指定音效")))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "UiCore",
          22,
          "没有配置目标角色动作音效,到角色动画音效表中配置",
          ["角色Id", o.toString()],
          ["角色动作", t],
        );
  }
  SetSwitchByData(t, o) {
    for (const i of o) {
      const e = i.split(".");
      e.length === 2
        ? t.SetSwitch(void 0, e[0], e[1])
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            58,
            "[PostAkEvent] switchData配置无效",
            ["ActorName:", this.Hte.Actor.GetName()],
            ["switchArray:", e],
          );
    }
  }
  SetSwitchByUeData(o, e) {
    for (let t = 0; t < e.Num(); ++t) {
      const i = e.Get(t).split(".");
      i.length === 2
        ? o.SetSwitch(void 0, i[0], i[1])
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            58,
            "[PostAkEvent] switchData配置无效",
            ["ActorName:", this.Hte.Actor.GetName()],
            ["switchArray:", i],
          );
    }
  }
  PostAkEvent(t, o, e, i, r) {
    return o
      ? (this.SetSwitchByUeData(t, i),
        this.DynamicConditionProxy.Do(this.Hte),
        r
          ? t.PostAkEvent(o, 0, void 0, o.GetName())
          : UE.AkGameplayStatics.PostEventAtLocation(
              o,
              this.Hte.ActorLocation,
              Rotator_1.Rotator.ZeroRotator,
              o.GetName(),
              this.Hte.Actor,
            ))
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Audio", 58, "[PostAkEvent] eventPtr无效", [
            "ActorName:",
            this.Hte.Actor?.GetName(),
          ]),
        -1);
  }
  SetDebug(t) {
    this.u3r = t;
  }
  GetDebug() {
    return this.u3r;
  }
  QBt() {
    const o = this.Hte.Actor;
    const t = o.GetName();
    const e = o.K2_GetComponentsByClass(UE.AkComponent.StaticClass());
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Audio",
        58,
        "---------------------------------------------",
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 58, "CharacterAkComponent Tick Debug;", [
          "Actor:",
          t,
        ]);
    for (let t = 0; t < e.Num(); ++t) {
      var i;
      const r = e.Get(t);
      r instanceof UE.AkComponent &&
        ((i = r.K2_GetComponentLocation()),
        UE.KismetSystemLibrary.DrawDebugSphere(
          o,
          i,
          DEBUG_RADIUS,
          DEBUG_SEG,
          ColorUtils_1.ColorUtils.LinearRed,
          0,
        ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Audio",
          58,
          "-----------AkComponent信息:",
          ["Comp:", r.GetName()],
          ["AttachSocketName:", r.AttachSocketName],
        );
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Audio", 58, "-----------AkStatic信息:", [
        "State:",
        AkComponentStatic.AkMoveState,
      ]);
  }
  GetAkComponentBySocketName(t) {
    let o = t;
    FNameUtil_1.FNameUtil.IsEmpty(o) &&
      (o = CharacterNameDefines_1.CharacterNameDefines.HIT_CASE_NAME);
    t = this.Hte.Actor;
    let e = void 0;
    (e =
      (this.l3r &&
        ((e = t.GetComponentByClass(UE.AkComponent.StaticClass())),
        (this.l3r = !1),
        e)) ||
      t.AddComponentByClass(
        UE.AkComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )).K2_AttachToComponent(this.Hte.Actor.Mesh, o, 2, 2, 1, !0);
    t = this.Vpr?.GetEntityType();
    return (
      (t !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
        t !== Protocol_1.Aki.Protocol.HBs.Proto_Monster) ||
        (e.bEnableOcclusion = !0),
      this.f3r(),
      this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig),
      this.p3r(),
      e
    );
  }
  g3r() {
    Time_1.Time.Now - this.m3r > ENVIRONMENT_AUDIO_UPDATE_INTERVAL &&
      (this.Hte?.Valid
        ? Vector_1.Vector.DistSquared(this.d3r, this.Hte.ActorLocationProxy) >
            ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED &&
          (this.d3r.DeepCopy(this.Hte.ActorLocationProxy),
          (this.m3r = Time_1.Time.Now))
        : (this.m3r = Time_1.Time.Now));
  }
  SetFoleySynthFileDebug(t, o) {
    this.c3r && this.c3r.SetDebug(t, o);
  }
  static SetGlobalCharacterFoleySynthFileDebug(t, o) {
    let e;
    Global_1.Global.BaseCharacter &&
      (e =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          40,
        )) &&
      (o?.length > 0 ? e.SetFoleySynthFileDebug(t, o) : e.SetDebug(t));
  }
};
(CharacterAkComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(40)],
  CharacterAkComponent,
)),
  (exports.CharacterAkComponent = CharacterAkComponent);
// # sourceMappingURL=CharacterAkComponent.js.map
