"use strict";
var RoleAudioComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, i) {
      var n,
        r = arguments.length,
        _ =
          r < 3
            ? t
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(t, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        _ = Reflect.decorate(e, t, o, i);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (n = e[s]) &&
            (_ = (r < 3 ? n(_) : 3 < r ? n(t, o, _) : n(t, o)) || _);
      return 3 < r && _ && Object.defineProperty(t, o, _), _;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudioComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  SwitchRef_1 = require("../../../../../Core/Utils/Audio/SwitchRef"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GameAudioController_1 = require("../../../../Module/Audio/GameAudioController"),
  VoxelUtils_1 = require("../../../../Utils/VoxelUtils"),
  CharacterAttributeTypes_1 = require("../../Common/Component/Abilities/CharacterAttributeTypes"),
  CharacterAudioComponent_1 = require("../../Common/Component/CharacterAudioComponent"),
  MOVE_STATE_TAGS = [
    ["fly", -1717024120],
    ["fall", -1527053051],
    ["highspeed", -742314429],
    ["sit", -1446183172],
    ["slide", 786967831],
  ],
  SKILL_EVENT_MAP = new Map([
    [100020, "play_role_commonskl_gousuo_target_start"],
    [100021, "play_role_commonskl_gousuo_target_start"],
    [100022, "play_amb_interact_suiguang_gousuo_target_start"],
  ]),
  ROLE_GO_DOWN_FINISH_EVENT = "scene_role_switched_behind",
  TICK_INTERVAL = 250,
  LOCATION_TOLERANCE = 32,
  MATERIAL_ID_SHR = 14;
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
        (this.Ica = (o, i, e, t, n, r, _) => {
          if (!(o === i || 0 <= r.Damage) && this.$te) {
            var o = this.ActorComponent?.Owner,
              i = this.Config?.LostHealthEventMap,
              s = this.$te.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.l5n,
              ),
              a = this.$te.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_Life,
              );
            if (o && i && s) {
              var u,
                l,
                m = (a / s) * 100,
                h = ((a - r.Damage) / s) * 100;
              let e = 100,
                t = "";
              for ([u, l] of i) m > u || h < u || (e > u && ((e = u), (t = l)));
              t &&
                (AudioSystem_1.AudioSystem.PostEvent(t, o),
                Log_1.Log.CheckDebug()) &&
                Log_1.Log.Debug(
                  "Audio",
                  43,
                  "[Game.Role] PostEvent",
                  ["Event", t],
                  ["Owner", o.GetName()],
                  ["Reason", "HealthChanged"],
                );
            }
          }
        }),
        (this.ero = (e, t) => {
          var o = this.ActorComponent?.Owner,
            t = SKILL_EVENT_MAP.get(t);
          o?.IsValid() && t && AudioSystem_1.AudioSystem.PostEvent(t, o);
        }),
        (this.M9s = () => {
          var e = this.ActorComponent?.Owner;
          e?.IsValid() &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                43,
                "[Game.Role] PostEvent 角色完全离场语音事件",
                ["RoleId", this.ActorComponent?.CreatureData.GetPbDataId()],
                ["Event", ROLE_GO_DOWN_FINISH_EVENT],
                ["Owner", e.GetName()],
              ),
            AudioSystem_1.AudioSystem.PostEvent(ROLE_GO_DOWN_FINISH_EVENT, e));
        });
    }
    OnInit() {
      return (
        super.OnInit(),
        this.lUr(),
        (this.Xte = this.Entity.CheckGetComponent(190)),
        (this.$te = this.Entity.CheckGetComponent(159)),
        this.Config &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBeDamage,
            this.Ica,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharUseSkill,
            this.ero,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnRoleGoDownFinish,
            this.M9s,
          )),
        !0
      );
    }
    OnEnd() {
      return (
        super.OnEnd(),
        this.Config &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBeDamage,
            this.Ica,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharUseSkill,
            this.ero,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnRoleGoDownFinish,
            this.M9s,
          )),
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
        Time_1.Time.Now - RoleAudioComponent_1.IYt > TICK_INTERVAL &&
        ((RoleAudioComponent_1.IYt = Time_1.Time.Now), this.XFr(), this.xin());
    }
    lUr() {
      var e, t;
      this.CreatureData?.Valid &&
        ModelManager_1.ModelManager.RoleModel &&
        ((e = this.CreatureData.GetPbDataId()),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e)),
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e))) &&
        1 === t.RoleType &&
        (this.Config =
          ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(e));
    }
    XFr() {
      let e = "normal";
      for (var [t, o] of MOVE_STATE_TAGS)
        if (this.Xte?.HasTag(o)) {
          e = t;
          break;
        }
      RoleAudioComponent_1.win !== e &&
        ((RoleAudioComponent_1.win = e),
        AudioSystem_1.AudioSystem.SetState("role_move", e));
    }
    xin() {
      var e;
      !this.ActorComponent?.Valid ||
        (e = this.ActorComponent.ActorLocationProxy).Equals(
          RoleAudioComponent_1.LHo,
          LOCATION_TOLERANCE,
        ) ||
        (RoleAudioComponent_1.LHo.DeepCopy(e),
        GameAudioController_1.GameAudioController.UpdatePlayerLocation(e),
        (e = this.ActorComponent.ActorLocation),
        VoxelUtils_1.VoxelUtils.GetVoxelInfo(Info_1.Info.World, e).MtlID ===
          MATERIAL_ID_SHR &&
          AudioSystem_1.AudioSystem.PostEvent(
            "play_amb_role_interact_shr",
            new UE.Transform(e),
          ));
    }
  });
(RoleAudioComponent.IYt = 0),
  (RoleAudioComponent.win = "normal"),
  (RoleAudioComponent.LHo = Vector_1.Vector.Create()),
  (RoleAudioComponent = RoleAudioComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(174)],
      RoleAudioComponent,
    )),
  (exports.RoleAudioComponent = RoleAudioComponent);
//# sourceMappingURL=RoleAudioComponent.js.map
