"use strict";
let RoleAudioComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (e, o, t, i) {
    let n;
    const r = arguments.length;
    let _ =
      r < 3 ? o : i === null ? (i = Object.getOwnPropertyDescriptor(o, t)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      _ = Reflect.decorate(e, o, t, i);
    else
      for (let s = e.length - 1; s >= 0; s--)
        (n = e[s]) && (_ = (r < 3 ? n(_) : r > 3 ? n(o, t, _) : n(o, t)) || _);
    return r > 3 && _ && Object.defineProperty(o, t, _), _;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudioComponent = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GameAudioController_1 = require("../../../../Module/Audio/GameAudioController");
const CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes");
const CharacterAudioComponent_1 = require("../../Common/Component/CharacterAudioComponent");
const MOVE_STATE_TAGS = [
  ["fly", -1717024120],
  ["fall", -1527053051],
  ["highspeed", -742314429],
  ["sit", -1446183172],
  ["slide", 786967831],
];
const SKILL_EVENT_MAP = new Map([
  [100020, "play_role_commonskl_gousuo_target_start"],
  [100021, "play_role_commonskl_gousuo_target_start"],
  [100022, "play_amb_interact_suiguang_gousuo_target_start"],
]);
const TICK_INTERVAL = 250;
const LOCATION_TOLERANCE = 32;
const MATERIAL_ID_SHR = 14;
let RoleAudioComponent =
  (RoleAudioComponent_1 = class RoleAudioComponent extends (
    CharacterAudioComponent_1.CharacterAudioComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.RoleName = new SwitchRef_1.SwitchRef("role_name", "chixia")),
        (this.FootstepTexture = new SwitchRef_1.SwitchRef(
          "footstep_ground_texture",
          "DirtSurface",
        )),
        (this.Xte = void 0),
        (this.$te = void 0),
        (this.YKe = (t, i, n) => {
          if (this.Active && t === this.Entity.Id && !(n < i)) {
            var t = this.ActorComponent?.Owner;
            const r = this.Config?.LostHealthEventMap;
            const _ = this.$te?.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Tkn,
            );
            if (t && r && _) {
              let s;
              let a;
              const u = (i / _) * 100;
              const m = (n / _) * 100;
              let e = 100;
              let o = "";
              for ([s, a] of r) u > s || m < s || (e > s && ((e = s), (o = a)));
              o &&
                (AudioSystem_1.AudioSystem.PostEvent(o, t),
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info(
                  "Audio",
                  57,
                  "[Game.Role] PostEvent",
                  ["Event", o],
                  ["Owner", t.GetName()],
                  ["Reason", "HealthChanged"],
                );
            }
          }
        }),
        (this.ooo = (e, o) => {
          const t = this.ActorComponent?.Owner;
          var o = SKILL_EVENT_MAP.get(o);
          t?.IsValid() && o && AudioSystem_1.AudioSystem.PostEvent(o, t);
        });
    }
    OnInit() {
      return (
        super.OnInit(),
        this.cRr(),
        (this.Xte = this.Entity.CheckGetComponent(185)),
        (this.$te = this.Entity.CheckGetComponent(156)),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnHealthChanged,
          this.YKe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        super.OnEnd(),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnHealthChanged,
          this.YKe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ooo,
        ),
        !0
      );
    }
    BindGameSyncs(e) {
      super.BindGameSyncs(e),
        this.RoleName.Bind(e),
        this.FootstepTexture.Bind(e);
    }
    OnStart() {
      return (
        super.OnStart(),
        (this.RoleName.State = this.Config?.Name ? this.Config.Name : "chixia"),
        !0
      );
    }
    OnTick(e) {
      this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId &&
        Time_1.Time.Now - RoleAudioComponent_1.I$t > TICK_INTERVAL &&
        ((RoleAudioComponent_1.I$t = Time_1.Time.Now), this.C3r(), this.zin());
    }
    cRr() {
      let e, o;
      this.CreatureData?.Valid &&
        ModelManager_1.ModelManager.RoleModel &&
        ((e = this.CreatureData.GetPbDataId()),
        (o = (o =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            e,
          ))?.IsTrialRole()
          ? o.GetRoleId()
          : e),
        (this.Config =
          ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(o)));
    }
    C3r() {
      let e = "normal";
      for (const [o, t] of MOVE_STATE_TAGS)
        if (this.Xte?.HasTag(t)) {
          e = o;
          break;
        }
      RoleAudioComponent_1.Zin !== e &&
        ((RoleAudioComponent_1.Zin = e),
        AudioSystem_1.AudioSystem.SetState("role_move", e));
    }
    zin() {
      let e;
      this.ActorComponent?.Valid &&
        !this.ActorComponent.ActorLocationProxy.Equals(
          RoleAudioComponent_1.U7o,
          LOCATION_TOLERANCE,
        ) &&
        (RoleAudioComponent_1.U7o.DeepCopy(
          this.ActorComponent.ActorLocationProxy,
        ),
        (e = this.ActorComponent.ActorLocation),
        GameAudioController_1.GameAudioController.UpdatePlayerLocation(e),
        UE.KuroVoxelSystem.GetVoxelInfoAtPos(Info_1.Info.World, e).MtlID ===
          MATERIAL_ID_SHR) &&
        AudioSystem_1.AudioSystem.PostEvent(
          "play_amb_role_interact_shr",
          new UE.Transform(e),
        );
    }
  });
(RoleAudioComponent.I$t = 0),
  (RoleAudioComponent.Zin = "normal"),
  (RoleAudioComponent.U7o = Vector_1.Vector.Create()),
  (RoleAudioComponent = RoleAudioComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(170)],
      RoleAudioComponent,
    )),
  (exports.RoleAudioComponent = RoleAudioComponent);
// # sourceMappingURL=RoleAudioComponent.js.map
