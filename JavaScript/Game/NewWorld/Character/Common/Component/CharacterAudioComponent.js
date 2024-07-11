"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, o, e, r) {
    var i,
      n = arguments.length,
      _ =
        n < 3
          ? o
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(o, e))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(t, o, e, r);
    else
      for (var c = t.length - 1; 0 <= c; c--)
        (i = t[c]) && (_ = (n < 3 ? i(_) : 3 < n ? i(o, e, _) : i(o, e)) || _);
    return 3 < n && _ && Object.defineProperty(o, e, _), _;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAudioComponent = void 0);
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef"),
  ENTITY_TYPE_VOLUME_CONTROLS = [
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
  ];
let CharacterAudioComponent = class CharacterAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Priority = new SwitchRef_1.SwitchRef("char_p1orp3", "p1")),
      (this.CreatureData = void 0),
      (this.ActorComponent = void 0);
  }
  static get Dependencies() {
    return [0, 3];
  }
  OnInit() {
    return (
      (this.CreatureData = this.Entity.CheckGetComponent(0)),
      (this.ActorComponent = this.Entity.CheckGetComponent(3)),
      !0
    );
  }
  OnEnd() {
    return !0;
  }
  OnStart() {
    return !(
      !this.ActorComponent?.Valid ||
      !this.ActorComponent.Owner ||
      (this.BindGameSyncs(this.ActorComponent.Owner),
      (this.Priority.State =
        this.ActorComponent.IsRoleAndCtrlByMe ||
        this.ActorComponent.IsSummonsAndCtrlByMe
          ? "p1"
          : "p3"),
      0)
    );
  }
  GetAkComponent(t) {
    var o = this.ActorComponent?.Owner;
    if (o?.IsValid())
      return AudioSystem_1.AudioSystem.GetAkComponent(o, {
        SocketName: t,
        OnCreated: (t, o) => {
          var e = this.CreatureData?.GetEntityType();
          (e !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
            e !== Protocol_1.Aki.Protocol.HBs.Proto_Monster) ||
            (o.bEnableOcclusion = !0),
            this.BindGameSyncs(t),
            this.M4r();
        },
      });
  }
  BindGameSyncs(t) {
    this.Priority.Bind(t);
  }
  M4r() {
    const e = this.ActorComponent?.Owner,
      r = this.CreatureData?.GetEntityType();
    e
      ? (ENTITY_TYPE_VOLUME_CONTROLS.forEach(([t, o]) => {
          t = r === t ? 1 : 0;
          AudioSystem_1.AudioSystem.SetRtpcValue(o, t, { Actor: e });
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Audio",
            56,
            "实体类型设置音量控制: SOLO此类型, 静音其他类型",
            ["actor", e.GetName()],
            ["entityType", r],
          ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Audio", 56, "实体类型设置音量控制: 无法获取角色Actor");
  }
};
(CharacterAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(42)],
  CharacterAudioComponent,
)),
  (exports.CharacterAudioComponent = CharacterAudioComponent);
//# sourceMappingURL=CharacterAudioComponent.js.map
