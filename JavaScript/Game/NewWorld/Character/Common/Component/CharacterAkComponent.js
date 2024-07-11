"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, o, e, i) {
    var r,
      n = arguments.length,
      s =
        n < 3
          ? o
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(o, e))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, o, e, i);
    else
      for (var _ = t.length - 1; 0 <= _; _--)
        (r = t[_]) && (s = (n < 3 ? r(s) : 3 < n ? r(o, e, s) : r(o, e)) || s);
    return 3 < n && s && Object.defineProperty(o, e, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAkComponent = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  AkComponentDynamicConditionProxy_1 = require("./Audio/AkComponentDynamicConditionProxy"),
  FoleySynthController_1 = require("./Audio/Controller/FoleySynthController"),
  DEBUG_RADIUS = 15,
  DEBUG_SEG = 12,
  ROLE_MOVE_GROUP = "role_move",
  ENVIRONMENT_AUDIO_UPDATE_INTERVAL = 500,
  ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED = 4,
  AUDIO_ENTITY_TYPE_VOLUME_CONTROL = new Map([
    [
      Protocol_1.Aki.Protocol.wks.Proto_Animal,
      "entity_type_volume_control_animal",
    ],
    [
      Protocol_1.Aki.Protocol.wks.Proto_Custom,
      "entity_type_volume_control_custom_other",
    ],
    [
      Protocol_1.Aki.Protocol.wks.Proto_Monster,
      "entity_type_volume_control_monster",
    ],
    [Protocol_1.Aki.Protocol.wks.Proto_Npc, "entity_type_volume_control_npc"],
    [
      Protocol_1.Aki.Protocol.wks.Proto_Player,
      "entity_type_volume_control_player_role",
    ],
    [
      Protocol_1.Aki.Protocol.wks.Proto_SceneItem,
      "entity_type_volume_control_scene_item",
    ],
    [
      Protocol_1.Aki.Protocol.wks.Proto_Vision,
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
      (this.Ovr = void 0),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.Lie = void 0),
      (this.VFr = !1),
      (this.IsRole = !1),
      (this.IsP1 = !1),
      (this.AkComponentConfig = void 0),
      (this.HFr = void 0),
      (this.jFr = !1),
      (this.WaterDepth = -0),
      (this.WFr = void 0),
      (this.FootSwitch = ""),
      (this.KFr = 0),
      (this.QFr = Vector_1.Vector.Create());
  }
  static get Dependencies() {
    return [3, 0];
  }
  OnInitData() {
    return (
      (this.DynamicConditionProxy =
        new AkComponentDynamicConditionProxy_1.AkComponentDynamicConditionProxy()),
      (this.XZt = new AudioController_1.PlayResult()),
      !0
    );
  }
  OnStart() {
    return (
      (this.Ovr = this.Entity.GetComponent(0)),
      !(
        !this.Ovr ||
        ((this.Hte = this.Entity.GetComponent(3)), !this.Hte?.Actor) ||
        ((this.Gce = this.Entity.GetComponent(37)), !this.Gce) ||
        ((this.jFr = !1),
        (this.VFr = !0),
        AkComponentStatic.Load(),
        this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig),
        0)
      )
    );
  }
  OnTick(t) {
    this.jFr && this.Ybt(),
      this.IsRole &&
        this.IsP1 &&
        (this.XFr(), this.$Fr(), this.WFr) &&
        this.WFr.Tick(t);
  }
  OnActivate() {
    var t;
    (this.IsRole =
      this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player),
      (this.IsP1 = !1),
      ((this.IsRole && this.Hte?.IsAutonomousProxy) ||
        (this.Ovr?.IsConcomitantEntity &&
          ((t = this.Ovr.GetSummonerId()),
          (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityId(t))) &&
          EntitySystem_1.EntitySystem.GetComponent(t, 41)?.IsP1)) &&
        (this.IsP1 = !0),
      this.IsRole &&
        ((this.Lie = this.Entity.GetComponent(188)), this.IsP1) &&
        ((this.WFr = new FoleySynthController_1.FoleySynthController(
          this.Hte,
          this,
          this.Lie,
        )),
        this.WFr.Init(this.HFr)),
      this.YFr();
  }
  YFr() {
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
  XFr() {
    if ("normal" === AkComponentStatic.AkMoveState) {
      for (var [t, o] of AkComponentStatic.AkMoveStateMap)
        if (this.Lie?.HasTag(o))
          return (
            (AkComponentStatic.AkMoveState = t),
            void AudioSystem_1.AudioSystem.SetState(ROLE_MOVE_GROUP, t)
          );
    } else {
      var e = AkComponentStatic.AkMoveStateMap.get(
        AkComponentStatic.AkMoveState,
      );
      if (!this.Lie?.HasTag(e)) {
        for (var [i, r] of AkComponentStatic.AkMoveStateMap)
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
  JFr() {
    const e = this.Ovr?.GetEntityType(),
      i = this.Hte?.Actor;
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
      this.WFr && this.WFr.Clear(),
      (this.VFr = !0)
    );
  }
  PostAudioEvent(t) {
    var o = this.Entity.GetComponent(0).GetRoleId(),
      e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)
        .GetAudioData()
        .GetAudioPathByName(t);
    e
      ? (this.XZt.EventPath && !e.CanInterrupt) ||
        ((e = e.AudioPath),
        this.XZt.EventPath !== e &&
          (AudioController_1.AudioController.StopEvent(this.XZt),
          e
            ? (AudioController_1.AudioController.PostEvent(
                e,
                this.Hte.Actor,
                this.XZt,
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
      var e = i.split(".");
      2 === e.length
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
      var i = e.Get(t).split(".");
      2 === i.length
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
    this.jFr = t;
  }
  GetDebug() {
    return this.jFr;
  }
  Ybt() {
    var o = this.Hte.Actor,
      t = o.GetName(),
      e = o.K2_GetComponentsByClass(UE.AkComponent.StaticClass());
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
      var i,
        r = e.Get(t);
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
      (this.VFr &&
        ((e = t.GetComponentByClass(UE.AkComponent.StaticClass())),
        (this.VFr = !1),
        e)) ||
      t.AddComponentByClass(
        UE.AkComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )).K2_AttachToComponent(this.Hte.Actor.Mesh, o, 2, 2, 1, !0);
    t = this.Ovr?.GetEntityType();
    return (
      (t !== Protocol_1.Aki.Protocol.wks.Proto_Npc &&
        t !== Protocol_1.Aki.Protocol.wks.Proto_Monster) ||
        (e.bEnableOcclusion = !0),
      this.YFr(),
      this.DynamicConditionProxy.Init(this.Hte, this.AkComponentConfig),
      this.JFr(),
      e
    );
  }
  $Fr() {
    Time_1.Time.Now - this.KFr > ENVIRONMENT_AUDIO_UPDATE_INTERVAL &&
      (this.Hte?.Valid
        ? Vector_1.Vector.DistSquared(this.QFr, this.Hte.ActorLocationProxy) >
            ENVIRONMENT_AUDIO_UPDATE_DIST_SQUARED &&
          (this.QFr.DeepCopy(this.Hte.ActorLocationProxy),
          (this.KFr = Time_1.Time.Now))
        : (this.KFr = Time_1.Time.Now));
  }
  SetFoleySynthFileDebug(t, o) {
    this.WFr && this.WFr.SetDebug(t, o);
  }
  static SetGlobalCharacterFoleySynthFileDebug(t, o) {
    var e;
    Global_1.Global.BaseCharacter &&
      (e =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          41,
        )) &&
      (0 < o?.length ? e.SetFoleySynthFileDebug(t, o) : e.SetDebug(t));
  }
};
(CharacterAkComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(41)],
  CharacterAkComponent,
)),
  (exports.CharacterAkComponent = CharacterAkComponent);
//# sourceMappingURL=CharacterAkComponent.js.map
