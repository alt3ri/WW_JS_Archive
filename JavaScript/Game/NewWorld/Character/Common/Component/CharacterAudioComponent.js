"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var r,
      n = arguments.length,
      _ =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      _ = Reflect.decorate(t, e, o, i);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (r = t[s]) && (_ = (n < 3 ? r(_) : 3 < n ? r(e, o, _) : r(e, o)) || _);
    return 3 < n && _ && Object.defineProperty(e, o, _), _;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAudioComponent = void 0);
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  ENTITY_TYPE_VOLUME_CONTROLS = [
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
  ];
let CharacterAudioComponent = class CharacterAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Priority = new SwitchRef_1.SwitchRef("char_p1orp3", "p1")),
      (this.AkComponentMap = new Map()),
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
    return this.AkComponentMap.clear(), !0;
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
  GetAkComponent(e) {
    var o = this.ActorComponent?.Owner;
    if (o?.IsValid()) {
      let t = "None";
      t =
        "string" == typeof e
          ? 0 < e.length
            ? e
            : "None"
          : e && 0 < e.toString().length
            ? e.toString()
            : "None";
      var i,
        e = this.AkComponentMap.get(t);
      return e?.IsValid()
        ? e
        : (e = AudioSystem_1.AudioSystem.GetAkComponent(o, {
              SocketName: FNameUtil_1.FNameUtil.GetDynamicFName(t),
            }))?.IsValid()
          ? (((i = this.CreatureData?.GetEntityType()) !==
              Protocol_1.Aki.Protocol.wks.Proto_Npc &&
              i !== Protocol_1.Aki.Protocol.wks.Proto_Monster) ||
              (e.bEnableOcclusion = !0),
            this.BindGameSyncs(o),
            this.Z3r(),
            this.AkComponentMap.set(t, e),
            e)
          : void 0;
    }
  }
  BindGameSyncs(t) {
    this.Priority.Bind(t);
  }
  Z3r() {
    const o = this.ActorComponent?.Owner,
      i = this.CreatureData?.GetEntityType();
    o
      ? (ENTITY_TYPE_VOLUME_CONTROLS.forEach(([t, e]) => {
          t = i === t ? 1 : 0;
          AudioSystem_1.AudioSystem.SetRtpcValue(e, t, { Actor: o });
        }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Audio",
            56,
            "实体类型设置音量控制: SOLO此类型, 静音其他类型",
            ["actor", o.GetName()],
            ["entityType", i],
          ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Audio", 56, "实体类型设置音量控制: 无法获取角色Actor");
  }
};
(CharacterAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(43)],
  CharacterAudioComponent,
)),
  (exports.CharacterAudioComponent = CharacterAudioComponent);
//# sourceMappingURL=CharacterAudioComponent.js.map
