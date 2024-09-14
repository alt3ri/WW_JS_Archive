"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayAbilityVisionControl = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  SceneTeamData_1 = require("../../../../../../Module/SceneTeam/SceneTeamData"),
  CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds"),
  GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase"),
  GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionControl extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments),
      (this.wZo = void 0),
      (this.BZo = void 0),
      (this.kQo = 0),
      (this.ota = void 0),
      (this._yo = (i, t, e) => {
        t < Number.EPSILON &&
          (this.TeamComponent?.SetTeamTag(1),
          this.GameplayTagComponent.HasTag(GameplayAbilityVisionMisc_1.skillTag)
            ? this.wZo ||
              (this.wZo = this.GameplayTagComponent.ListenForTagAddOrRemove(
                GameplayAbilityVisionMisc_1.skillTag,
                (i, t) => {
                  t || (this.wZo?.EndTask(), (this.wZo = void 0), this.bZo());
                },
              ))
            : this.bZo());
      });
  }
  OnCreate() {
    var i, t, e, o;
    this.CreatureDataComponent.SummonType ===
      Protocol_1.Aki.Protocol.Summon.x3s
        .Proto_ESummonTypeConcomitantPhantomRole &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 29, "GameplayAbilityVisionControl.OnCreate"),
      this.qZo(this.CreatureDataComponent.GetCreatureDataId()),
      this.AttributeComponent.AddListener(
        GameplayAbilityVisionMisc_1.controlVisionEnergy,
        this._yo,
      ),
      (i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0),
      (e = (t = this.EntityHandle.Entity.GetComponent(0)).GetRoleId()),
      ((o = new SceneTeamData_1.SceneTeamRole()).CreatureDataId =
        t.GetCreatureDataId()),
      (o.RoleId = e),
      ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupData(i, {
        GroupType: -1,
        GroupRoleList: [o],
        CurrentRoleId: e,
      }));
  }
  OnDestroy() {
    var i;
    this.CreatureDataComponent.SummonType ===
      Protocol_1.Aki.Protocol.Summon.x3s
        .Proto_ESummonTypeConcomitantPhantomRole &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 29, "GameplayAbilityVisionControl.OnDestroy"),
      this.qZo(void 0),
      this.AttributeComponent.RemoveListener(
        GameplayAbilityVisionMisc_1.controlVisionEnergy,
        this._yo,
      ),
      this.bZo(),
      (i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0),
      ModelManager_1.ModelManager.SceneTeamModel.UpdateGroupData(i, {
        GroupType: -1,
        GroupRoleList: [],
        CurrentRoleId: 0,
      })),
      this.wZo && (this.wZo.EndTask(), (this.wZo = void 0));
  }
  OnActivateAbility() {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          29,
          "GameplayAbilityVisionControl.OnActivateAbility",
        ),
      GameplayAbilityVisionControl.VisionControlHandle)
    )
      return !1;
    var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
      this.Entity,
      Protocol_1.Aki.Protocol.Summon.x3s
        .Proto_ESummonTypeConcomitantPhantomRole,
    );
    if (!i) return !1;
    i.Entity.CheckGetComponent(84)?.SetTeamTag(2),
      (GameplayAbilityVisionControl.VisionControlHandle = i),
      this.GZo(i),
      (this.BZo = ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType);
    i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    return (
      ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(i, -1, !0), !0
    );
  }
  OnEndAbility() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          29,
          "GameplayAbilityVisionControl.OnEndAbility",
        ),
      !(
        !GameplayAbilityVisionControl.VisionControlHandle ||
        (this.NZo(),
        (GameplayAbilityVisionControl.VisionControlHandle = void 0))
      )
    );
  }
  qZo(i) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.CreatureDataComponent.GetSummonerId(),
    );
    t && (t.Entity.GetComponent(0).VisionControlCreatureDataId = i);
  }
  bZo() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.CreatureDataComponent.GetSummonerId(),
    );
    i?.Valid
      ? i.Entity.GetComponent(36).EndAbilityVision(3)
      : (GameplayAbilityVisionControl.VisionControlHandle = void 0);
  }
  GZo(i) {
    i.Valid &&
      (i = i.Entity.GetComponent(160)).AddBuff(
        CharacterBuffIds_1.buffId.VisionControl,
        { InstigatorId: i.CreatureDataId, Reason: "操控幻象回满能量" },
      );
  }
  NZo() {
    this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, "幻象消失材质没有正常结束，被保底"),
        this.Cga();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY);
    var i =
      GameplayAbilityVisionControl.VisionControlHandle.Entity.GetComponent(19);
    i?.CreateGameplayCue(GameplayAbilityVisionMisc_1.morphParticleCueId, {
      Sync: !0,
      Instant: !0,
    }),
      (this.kQo = i.CreateGameplayCue(
        GameplayAbilityVisionMisc_1.materialCueId,
        {
          EndCallback: () => {
            TimerSystem_1.TimerSystem.Has(this.ota) &&
              (TimerSystem_1.TimerSystem.Remove(this.ota), this.Cga());
          },
          Sync: !0,
        },
      ));
  }
  Cga() {
    (this.ota = void 0),
      this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.roleAppearBuffId, {
        InstigatorId: this.BuffComponent.CreatureDataId,
        Reason: "幻象变身结束时角色自身的材质和粒子",
      });
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    ModelManager_1.ModelManager.SceneTeamModel.SwitchGroup(i, this.BZo ?? 1),
      (this.BZo = void 0),
      GameplayAbilityVisionControl.VisionControlHandle.Entity.GetComponent(
        19,
      )?.DestroyGameplayCueByHandle(this.kQo);
  }
}
(exports.GameplayAbilityVisionControl =
  GameplayAbilityVisionControl).VisionControlHandle = void 0;
//# sourceMappingURL=GameplayAbilityVisionControl.js.map
