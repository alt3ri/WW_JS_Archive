"use strict";
var RoleAudioComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, i) {
      var n,
        s = arguments.length,
        _ =
          s < 3
            ? t
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(t, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        _ = Reflect.decorate(e, t, o, i);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (n = e[a]) &&
            (_ = (s < 3 ? n(_) : 3 < s ? n(t, o, _) : n(t, o)) || _);
      return 3 < s && _ && Object.defineProperty(t, o, _), _;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudioComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  StateRef_1 = require("../../../../../Core/Utils/Audio/StateRef"),
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
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CharacterAudioComponent_1 = require("../../Common/Component/CharacterAudioComponent"),
  CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine"),
  hookSkillEventMap = new Map([
    [100020, "play_role_commonskl_gousuo_target_start"],
    [100021, "play_role_commonskl_gousuo_target_start"],
    [100022, "play_amb_interact_suiguang_gousuo_target_start"],
    [100024, "play_role_commonskl_gousuo_target_start"],
    [210130, "play_role_commonskl_gousuo_target_start"],
  ]),
  footstepVariantMap = new Map([
    [0, "land"],
    [1, "run"],
    [2, "runstop"],
    [3, "sprint"],
    [4, "sprintstop"],
    [5, "walk"],
    [6, "walkstop"],
    [7, "turnback"],
  ]),
  foleyVariantMap = new Map([
    [0, "bodyfall"],
    [1, "fly"],
    [2, "run"],
    [3, "sprint"],
    [4, "hard"],
    [5, "hardfast"],
    [6, "weak"],
    [7, "weakfast"],
  ]),
  ROLE_GO_DOWN_FINISH_EVENT = "scene_role_switched_behind",
  ROLE_INTERACT_SHR = "play_amb_role_interact_shr",
  ROLE_MOVE = "role_move",
  TICK_INTERVAL = 250,
  LOCATION_TOLERANCE = 32,
  MATERIAL_ID_SHR = 14,
  SPECIAL_JINXI_OPEN_BOX_ROLE_ID = 1304,
  SPECIAL_JINXI_OPEN_BOX_COUNTRY_ID = 1;
let RoleAudioComponent =
  (RoleAudioComponent_1 = class RoleAudioComponent extends (
    CharacterAudioComponent_1.CharacterAudioComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Ysl = "none"),
        (this.Config = void 0),
        (this.mxt = new SwitchRef_1.SwitchRef("role_name", "chixia")),
        (this.crl = new SwitchRef_1.SwitchRef(
          "footstep_texture",
          "DirtSurface",
        )),
        (this.mrl = new SwitchRef_1.SwitchRef("footstep_variant", "walk")),
        (this.drl = new SwitchRef_1.SwitchRef("foley_variant", "weak")),
        (this.nk_ = new SwitchRef_1.SwitchRef(
          "role_interact_water",
          "default",
        )),
        (this.Xvl = void 0),
        (this.mBe = void 0),
        (this.$te = void 0),
        (this.Hje = () => {
          ModelManager_1.ModelManager.AreaModel.AreaInfo.CountryId ===
          SPECIAL_JINXI_OPEN_BOX_COUNTRY_ID
            ? "jinzhou" !== this.Xvl.State &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Audio", 42, "[Game.Role] 今汐切换至今州地区"),
              (this.Xvl.State = "jinzhou"))
            : "none" !== this.Xvl.State &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  42,
                  "[Game.Role] 今汐切换至非今州地区",
                ),
              (this.Xvl.State = "none"));
        }),
        (this.PPr = (e, t) => {
          this.ActorComp?.Owner &&
            (GameAudioController_1.GameAudioController.SetRolePriority(
              0,
              this.ActorComp.Owner,
            ),
            GameAudioController_1.GameAudioController.RoleChangeController(
              this.Entity.Id,
              !0,
            ));
        }),
        (this.xPr = (e, t) => {
          this.ActorComp?.Owner &&
            (GameAudioController_1.GameAudioController.SetRolePriority(
              1,
              this.ActorComp.Owner,
            ),
            GameAudioController_1.GameAudioController.RoleChangeController(
              this.Entity.Id,
              !1,
            )),
            this.zsl("none");
        }),
        (this.sk_ = (e) => {
          (this.nk_.State = 1 === e ? "cloud" : "default"),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Game.Role] OnInteractionWaterTypeChange",
                ["EntityId", this.Entity.Id],
                ["Owner", this.ActorComp?.Owner?.GetName()],
                ["WaterTypeState", this.nk_.State],
              );
        }),
        (this.Hqr = (e, t, o, i, n) => {
          if (
            this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId &&
            this.mBe
          ) {
            let e = "none";
            switch (o) {
              case 3:
                this.mBe.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
                  this.mBe.MoveState !==
                    CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
                  (e = "fall");
                break;
              case 5:
                this.mBe.MoveState !==
                  CharacterUnifiedStateTypes_1.ECharMoveState.Captured &&
                  (e = "hook");
                break;
              case 6:
                switch (n) {
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL:
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
                    break;
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
                    e = "fly";
                    break;
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
                    e = "slide";
                    break;
                  case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
                    e = "ski";
                    break;
                  default:
                    e = "fall";
                }
            }
            this.zsl(e);
          }
        }),
        (this.Dca = (o, i, e, n, t) => {
          if (
            !(o === i || n.ChangeLife <= 0) &&
            this.$te &&
            i.Id === Global_1.Global.BaseCharacter?.EntityId
          ) {
            var o = this.ActorComp?.Owner,
              i = this.Config?.LostHealthEventMap,
              s = this.$te.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.l5n,
              ),
              _ = this.$te.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_Life,
              );
            if (o && i && s) {
              var a,
                r,
                h = (_ / s) * 100,
                l = ((_ + n.ChangeLife) / s) * 100;
              let e = 100,
                t = "";
              for ([a, r] of i) h > a || l < a || (e > a && ((e = a), (t = r)));
              t &&
                (AudioSystem_1.AudioSystem.PostEvent(t, o),
                Log_1.Log.CheckDebug()) &&
                Log_1.Log.Debug(
                  "Audio",
                  42,
                  "[Game.Role] PostEvent",
                  ["Event", t],
                  ["Owner", o.GetName()],
                  ["Reason", "HealthChanged"],
                );
            }
          }
        }),
        (this.ero = (e, t) => {
          var o = this.ActorComp?.Owner,
            t = hookSkillEventMap.get(t);
          o?.IsValid() && t && AudioSystem_1.AudioSystem.PostEvent(t, o);
        }),
        (this.M9s = () => {
          var e = this.ActorComp?.Owner;
          e?.IsValid() &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[Game.Role] PostEvent 角色完全离场语音事件",
                ["RoleId", this.ActorComp?.CreatureData.GetPbDataId()],
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
        (this.mBe = this.Entity.CheckGetComponent(173)),
        (this.$te = this.Entity.CheckGetComponent(171)),
        this.Config &&
          (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharBeDamage,
            this.Dca,
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
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharPossessed,
            this.PPr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharUnpossessed,
            this.xPr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnInteractionWaterTypeChange,
            this.sk_,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharMovementModeChanged,
            this.Hqr,
          ),
          this.Config.Id === SPECIAL_JINXI_OPEN_BOX_ROLE_ID) &&
          ((this.Xvl = new StateRef_1.StateRef(
            "patch_jinxi_openbox_state",
            "none",
          )),
          this.Hje(),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.ChangeArea,
            this.Hje,
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
            this.Dca,
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
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharPossessed,
            this.PPr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharUnpossessed,
            this.xPr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnInteractionWaterTypeChange,
            this.sk_,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharMovementModeChanged,
            this.Hqr,
          ),
          this.Config.Id === SPECIAL_JINXI_OPEN_BOX_ROLE_ID) &&
          (EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.ChangeArea,
            this.Hje,
          ),
          (this.Xvl = void 0)),
        !0
      );
    }
    BindGameSyncs(e) {
      super.BindGameSyncs(e),
        this.mxt.Bind(e),
        this.crl.Bind(e),
        this.mrl.Bind(e),
        this.drl.Bind(e),
        this.nk_.Bind(e);
    }
    OnStart() {
      return (
        super.OnStart(),
        (this.mxt.State = this.Config?.Name ? this.Config.Name : "chixia"),
        this.zsl("none"),
        !0
      );
    }
    OnTick(e) {
      this.Entity.Id === Global_1.Global.BaseCharacter?.EntityId &&
        Time_1.Time.Now - RoleAudioComponent_1.IYt > TICK_INTERVAL &&
        ((RoleAudioComponent_1.IYt = Time_1.Time.Now), this.xin());
    }
    ChangeFootstepTexture(e) {
      this.crl.State = e;
    }
    ChangeFootstepVariant(e) {
      footstepVariantMap.has(e)
        ? (this.mrl.State = footstepVariantMap.get(e))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[ChangeFootstepVariant] Map里不含指定枚举类型E_FootstepVariant项,需要更新Map",
            ["Variant", e],
          );
    }
    ChangeFoleyVariant(e) {
      foleyVariantMap.has(e)
        ? (this.drl.State = foleyVariantMap.get(e))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Audio",
            42,
            "[ChangeFoleyVariant] Map里不含指定枚举类型E_FoleyVariant项,需要更新Map",
            ["Variant", e],
          );
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
    xin() {
      var e;
      !this.ActorComp?.Valid ||
        (e = this.ActorComp.ActorLocationProxy).Equals(
          RoleAudioComponent_1.LHo,
          LOCATION_TOLERANCE,
        ) ||
        (RoleAudioComponent_1.LHo.DeepCopy(e),
        GameAudioController_1.GameAudioController.UpdatePlayerLocation(e),
        (e = this.ActorComp.ActorLocation),
        VoxelUtils_1.VoxelUtils.GetVoxelInfo(Info_1.Info.World, e).MtlID ===
          MATERIAL_ID_SHR &&
          AudioSystem_1.AudioSystem.PostEvent(
            ROLE_INTERACT_SHR,
            new UE.TransformDouble(e),
          ));
    }
    zsl(e) {
      this.Ysl !== e &&
        ((this.Ysl = e), AudioSystem_1.AudioSystem.SetState(ROLE_MOVE, e));
    }
  });
(RoleAudioComponent.IYt = 0),
  (RoleAudioComponent.LHo = Vector_1.Vector.Create()),
  (RoleAudioComponent = RoleAudioComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(187)],
      RoleAudioComponent,
    )),
  (exports.RoleAudioComponent = RoleAudioComponent);
//# sourceMappingURL=RoleAudioComponent.js.map
