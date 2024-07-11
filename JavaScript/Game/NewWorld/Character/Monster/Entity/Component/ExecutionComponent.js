"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, n) {
    let r;
    const i = arguments.length;
    let a =
      i < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, o)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(e, t, o, n);
    else
      for (let l = e.length - 1; l >= 0; l--)
        (r = e[l]) && (a = (i < 3 ? r(a) : i > 3 ? r(t, o, a) : r(t, o)) || a);
    return i > 3 && a && Object.defineProperty(t, o, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecutionComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const ExecutionConfById_1 = require("../../../../../../Core/Define/ConfigQuery/ExecutionConfById");
const MonsterBattleConfById_1 = require("../../../../../../Core/Define/ConfigQuery/MonsterBattleConfById");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const CodeDefineLevelConditionInfo_1 = require("../../../../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo");
const LevelGameplayActionsDefine_1 = require("../../../../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const ScrollingTipsController_1 = require("../../../../../Module/ScrollingTips/ScrollingTipsController");
const CharacterBuffIds_1 = require("../../../Common/Component/Abilities/CharacterBuffIds");
const MAX_CHARACTERID = 9999;
let ExecutionComponent = class ExecutionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.jtn = void 0),
      (this.Wtn = void 0),
      (this.SJi = void 0),
      (this.Ktn = void 0),
      (this.Qtn = (e, t) => {
        const o = this.Entity.GetComponent(178);
        o
          ? ((this.SJi = o.GetInteractController()),
            this.SJi
              ? t
                ? this.Xtn()
                  ? this.$tn()
                  : Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug("Battle", 4, "队伍内没有符合处决条件的角色")
                : this.Wtn &&
                  (this.SJi.RemoveClientInteractOption(this.Wtn),
                  (this.Wtn = void 0))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Battle", 4, "Can not find interactController"))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              4,
              "Can not find PawnInteractNewComponent",
            );
      });
  }
  OnStart() {
    return !0;
  }
  OnActivate() {
    const e = this.Entity.GetComponent(185);
    const t = this.Entity.GetComponent(0);
    const o = t.GetMonsterComponent().FightConfigId;
    (this.Ktn =
      MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(o)),
      (this.jtn = e.ListenForTagAddOrRemove(-121513115, this.Qtn)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "处决组件初始化完成",
          ["EntityId", this.Entity.Id],
          ["CreatureDataId", t.GetCreatureDataId()],
          ["PbDataId", t.GetPbDataId()],
          ["ExecutionId", this.Ktn.ExecutionId],
        );
  }
  Ytn() {
    const e =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        0,
      )?.GetPbDataId();
    for (const r of this.Ktn.ExecutionId) {
      const t = ExecutionConfById_1.configExecutionConfById.GetConfig(r);
      if (t) {
        if (t.ExecutionRoleId === e || this.Jtn(e, t.ExecutionRoleId)) return t;
        for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          let o = i.GetConfigId;
          if (o > MAX_CHARACTERID) {
            o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o);
            if (o && o.ParentId === t.ExecutionRoleId) return t;
          }
        }
        if (
          ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ===
          t.ExecutionRoleId
        ) {
          const n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
            t.ExecutionRoleId,
            { ParamType: 0 },
          )?.GetCreatureDataId();
          if (n && n > 0) return t;
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
            "ExecutionId",
            r,
          ]);
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 4, "不存在合适的处决配置项", [
        "MonsterBattleConfigId",
        this.Ktn.Id,
      ]);
  }
  $tn() {
    let e;
    let t;
    const o = new LevelGameplayActionsDefine_1.ActionExecution();
    const n = this.Ytn();
    const r = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
    r.Type = 0;
    for (const i of n.LimitExecutionTags)
      i &&
        i.length !== 0 &&
        (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)) &&
        (((t =
          new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId =
          e),
        (t.IsContain = !1),
        r.Conditions.push(t));
    this.Wtn = this.SJi.AddClientInteractOption(
      o,
      r,
      "Direct",
      this.Ktn.ExecutionRadius,
      void 0,
      1,
    );
  }
  Xtn() {
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    for (const n of this.Ktn.ExecutionId) {
      const t = ExecutionConfById_1.configExecutionConfById.GetConfig(n);
      if (t) {
        if (
          ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
            t.ExecutionRoleId,
            { ParamType: 0 },
          )?.GetCreatureDataId()
        )
          return !0;
        for (const r of e) {
          let o = r.GetConfigId;
          if (o > MAX_CHARACTERID) {
            o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o);
            if (o && o.ParentId === t.ExecutionRoleId) return !0;
          }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
            "ExecutionId",
            n,
          ]);
    }
    return !1;
  }
  OnEnd() {
    return this.jtn?.EndTask(), !0;
  }
  StartExecution() {
    let t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    const e = t.Entity.GetComponent(0)?.GetPbDataId();
    let o = !1;
    for (const l of this.Ktn.ExecutionId) {
      const n = ExecutionConfById_1.configExecutionConfById.GetConfig(l);
      if (n) {
        if (n.ExecutionRoleId === e || this.Jtn(e, n.ExecutionRoleId)) {
          if (
            !this.ztn(
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId(),
            )
          )
            return;
          this.Ztn(t.Entity, n), (o = !0);
          break;
        }
        const r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
          n.ExecutionRoleId,
          { ParamType: 0 },
        )?.GetCreatureDataId();
        if (r) {
          if (!this.ztn(r)) return;
          SceneTeamController_1.SceneTeamController.RequestChangeRole(
            r,
            !1,
            !0,
          ),
            (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
            this.ein(t.Entity),
            this.Ztn(t.Entity, n) ||
              this.tin(
                ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
                  .Entity,
              ),
            (o = !0);
          break;
        }
        for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          const i = s.GetConfigId;
          if (i > MAX_CHARACTERID) {
            let a =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(i);
            if (a && a.ParentId === n.ExecutionRoleId) {
              a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
                ParamType: 0,
              })?.GetCreatureDataId();
              if (!this.ztn(a)) return;
              let e = !1;
              (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
                ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetCreatureDataId() !==
                  a &&
                  (SceneTeamController_1.SceneTeamController.RequestChangeRole(
                    a,
                    !1,
                    !0,
                  ),
                  (t =
                    ModelManager_1.ModelManager.SceneTeamModel
                      .GetCurrentEntity),
                  this.ein(t.Entity),
                  (e = !0)),
                !this.Ztn(t.Entity, n) &&
                  e &&
                  this.tin(
                    ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
                      .Entity,
                  ),
                (o = !0);
              break;
            }
          }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "Execution can not find ExecutionConf", [
            "ExecutionId",
            l,
          ]);
    }
    o ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "Execution can not find execution role", [
          "MonsterBattleConfigId",
          this.Ktn.Id,
        ]));
  }
  Jtn(e, t) {
    return !(
      t <= MAX_CHARACTERID ||
      !(t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)) ||
      t.ParentId !== e
    );
  }
  ztn(e) {
    const t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 3,
    });
    return t?.IsMyRole()
      ? !t.IsDead() ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Execution_Error_Die",
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 4, "Execution character is dead!", [
              "CreatureDataId",
              e,
            ]),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "Execution character is not Player!", [
            "CreatureDataId",
            e,
          ]),
        !1);
  }
  Ztn(e, t) {
    t = e
      .GetComponent(33)
      ?.BeginSkill(t.ExecutionSkillId, {
        Context: "ExecutionComponent.UseExecutionSkill",
      });
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "触发处决技能！",
          ["触发者", e.Id],
          ["处决对象", this.Entity.Id],
          ["是否成功执行", t],
        ),
      t ?? !1
    );
  }
  ein(e) {
    e = e.GetComponent(157);
    e?.AddBuff(CharacterBuffIds_1.buffId.ChangeRoleBuff, {
      InstigatorId: e?.CreatureDataId,
      Reason: "处决换人",
    });
  }
  tin(e) {
    e.GetComponent(157)?.RemoveBuff(
      CharacterBuffIds_1.buffId.ChangeRoleBuff,
      -1,
      "处决换人失败",
    );
  }
};
(ExecutionComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(76)],
  ExecutionComponent,
)),
  (exports.ExecutionComponent = ExecutionComponent);
// # sourceMappingURL=ExecutionComponent.js.map
