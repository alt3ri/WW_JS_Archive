"use strict";
let CharacterLogComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, a) {
    let o;
    const n = arguments.length;
    let i =
      n < 3 ? e : a === null ? (a = Object.getOwnPropertyDescriptor(e, r)) : a;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      i = Reflect.decorate(t, e, r, a);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (o = t[s]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, r, i) : o(e, r)) || i);
    return n > 3 && i && Object.defineProperty(e, r, i), i;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLogComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const LogController_1 = require("../../../../../World/Controller/LogController");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterDamageCalculations_1 = require("./CharacterDamageCalculations");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
const ATK_RATIO = 1.4;
const SKILLLEVEL_CONST = 0.111111;
const RESONANT_CONST = 0.041667;
let CharacterLogComponent =
  (CharacterLogComponent_1 = class CharacterLogComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.sNr = void 0),
        (this.aNr = []),
        (this.OnAggroChanged = (t, e) => {
          let r, a, o;
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            ((r = e.CharActorComp.Entity.Id),
            (e = e.CharActorComp.Entity),
            (a = CharacterLogComponent_1.hNr),
            (o = CharacterLogComponent_1.lNr),
            this.rje(r)
              ? t
                ? (a.add(r),
                  CharacterLogComponent_1._Nr.set(r, this.uNr(r)),
                  o.has(r) ||
                    (((t = CharacterLogComponent_1.cNr(r)).i_monster_level =
                      e
                        .GetComponent(156)
                        ?.GetCurrentValue(
                          CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
                        ) ?? 0),
                    (e = e.GetComponent(3)?.ActorLocationProxy),
                    (t.f_pos_x = e.X),
                    (t.f_pos_y = e.Y),
                    (t.f_pos_z = e.Z),
                    (t.InitTime = TimeUtil_1.TimeUtil.GetServerTime())),
                  o.add(r))
                : (CharacterLogComponent_1.mNr.add(r), a.delete(r))
              : a.delete(r));
        }),
        (this.dNr = (t, e) => {
          CharacterLogComponent_1.CNr() && (CharacterLogComponent_1.gNr += t),
            e && (this.fNr = 2);
        }),
        (this.pNr = (t) => {
          t && (this.fNr = 3);
        }),
        (this.vNr = (t, e, r) => {
          if (CharacterLogComponent_1.CNr()) {
            switch (r) {
              case 6:
              case 11:
                (CharacterLogComponent_1.MNr += 1),
                  (CharacterLogComponent_1.SNr.i_acc_dodge_times += 1);
                break;
              case 7:
                (CharacterLogComponent_1.ENr += 1),
                  (CharacterLogComponent_1.SNr.i_dodge_succ_times += 1);
                break;
              case 4:
                CharacterLogComponent_1.yNr += 1;
            }
            const a = this.Entity.GetComponent(0);
            if (a.IsRole()) {
              var o = CharacterLogComponent_1.INr(this.Entity.Id, e);
              const n =
                (o.use_count++,
                (o.skill_type = r),
                CharacterLogComponent_1.TNr(this.Entity.Id));
              switch (r) {
                case 6:
                case 11:
                  n.i_acc_dodge_times += 1;
                  break;
                case 7:
                  n.i_dodge_succ_times += 1;
              }
            } else
              a.IsMonster() &&
                CharacterLogComponent_1.LNr(this.Entity.Id, Number(e))
                  .use_count++;
            o = this.Entity.Id.toFixed() + "-" + e;
            CharacterLogComponent_1.DNr.set(o, !1);
          }
        }),
        (this.RNr = (t, e) => {
          CharacterLogComponent_1.CNr() &&
            (CharacterLogComponent_1.TNr(this.Entity.Id)
              .i_bullet_rebound_times++,
            CharacterLogComponent_1.cNr(t.Id).i_bullet_rebound_times++,
            CharacterLogComponent_1.LNr(t.Id, e).bullet_rebound_times++,
            CharacterLogComponent_1.ANr++,
            CharacterLogComponent_1.SNr.i_bullet_rebound_times++);
        }),
        (this.UNr = (t, e, r) => {
          CharacterLogComponent_1.CNr() &&
            r < e &&
            (CharacterLogComponent_1.TNr(this.Entity.Id).l_acc_element +=
              e - r);
        }),
        (this.PNr = (t, e, r) => {
          CharacterLogComponent_1.CNr() &&
            t === CharacterAttributeTypes_1.EAttributeId.Proto_Energy &&
            r < e &&
            (((t = CharacterLogComponent_1.TNr(this.Entity.Id)).l_acc_energy +=
              e - r),
            e >=
              this.Entity.GetComponent(156).GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
              ) -
                Number.EPSILON) &&
            t.i_full_energy_times++;
        }),
        (this.hUe = () => {
          this.Entity.GetComponent(158)?.IsInFightState() &&
            CharacterLogComponent_1.xNr();
        }),
        (this.EYe = (t, e) => {
          this.Entity.GetComponent(158)?.IsInFightState() &&
            CharacterLogComponent_1.xNr();
        }),
        (this.wNr = () => {
          CharacterLogComponent_1.CNr() &&
            (this.Entity.GetComponent(0).IsRole() &&
              ((CharacterLogComponent_1.BNr += 1),
              (CharacterLogComponent_1.TNr(this.Entity.Id).i_revive_times +=
                1)),
            CharacterLogComponent_1.SNr.i_revive_times++);
        }),
        (this.bNr = (t, e, r) => {
          r -= e;
          r <= 0 ||
            ((e = CharacterLogComponent_1.cNr(this.Entity.Id)) &&
              ((e.l_acc_rage += r),
              this.Entity.GetComponent(51)?.IsTriggerCounterAttack) &&
              (e.l_acc_rage_counter += r));
        }),
        (this.fNr = 0),
        (this.qNr = (t, e) => {
          CharacterLogComponent_1.CNr() &&
            e &&
            CharacterLogComponent_1.cNr(this.Entity.Id).i_paralysis_times++;
        });
    }
    OnStart() {
      return (
        CharacterLogComponent_1.GNr ||
          ((CharacterLogComponent_1.GNr = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnBattleStateChanged,
            CharacterLogComponent_1.NNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnChangeRole,
            CharacterLogComponent_1.ONr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CharRecordTeamDeath,
            CharacterLogComponent_1.kNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CharOnRoleDead,
            CharacterLogComponent_1.FNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            CharacterLogComponent_1.VNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.LeaveInstanceDungeon,
            CharacterLogComponent_1.HNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.TriggerUiTimeDilation,
            CharacterLogComponent_1.jNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnInstResultNotify,
            CharacterLogComponent_1.WNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnTowerChallengeChangeTeamNotify,
            CharacterLogComponent_1.KNr,
          )),
        this.QNr(),
        !0
      );
    }
    OnEnd() {
      return this.XNr(), !0;
    }
    QNr() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.OnAggroChanged,
      ),
        (this.sNr = this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
          1922078392,
          this.qNr,
        )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.vNr,
        );
      const t = this.Entity.GetComponent(0);
      t.IsRole()
        ? (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnFallInjure,
            this.dNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRoleDrownInjure,
            this.pNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRevive,
            this.wNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BulletRebound,
            this.RNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnElementEnergyChanged,
            this.UNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnEnergyChanged,
            this.PNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          ),
          this.aNr.push(
            this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
              -1371021686,
              this.EYe,
            ),
          ),
          this.aNr.push(
            this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
              -1800191060,
              this.EYe,
            ),
          ),
          this.aNr.push(
            this.Entity.CheckGetComponent(185).ListenForTagAddOrRemove(
              -1221493771,
              this.EYe,
            ),
          ))
        : t.IsMonster() &&
          this.Entity.GetComponent(156)?.AddListener(
            CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
            this.bNr,
          );
    }
    XNr() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.OnAggroChanged,
      ),
        this.sNr.EndTask(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.vNr,
        );
      const t = this.Entity.GetComponent(0);
      if (t.IsRole()) {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnFallInjure,
          this.dNr,
        ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRoleDrownInjure,
            this.pNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRevive,
            this.wNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BulletRebound,
            this.RNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnElementEnergyChanged,
            this.UNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnEnergyChanged,
            this.PNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          );
        for (const e of this.aNr) e.EndTask();
        this.aNr.length = 0;
      } else if (t.IsMonster()) {
        this.Entity.GetComponent(156)?.RemoveListener(
          CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
          this.bNr,
        );
        for (const r of this.aNr) r.EndTask();
        this.aNr.length = 0;
      }
    }
    static CNr() {
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !this.$Nr() &&
        this.c9 > 0
      );
    }
    static $Nr() {
      const t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      ).FightFormationId;
      return (
        (ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          t,
        )?.TrialRole?.length ?? 0) > 0
      );
    }
    uNr(t) {
      let e;
      var t = EntitySystem_1.EntitySystem.Get(t);
      if (t)
        return (
          (e = new LogReportDefine_1.MonsterInfoLogData(void 0)),
          (t = t.GetComponent(0)),
          (e.pbdata_id = t.GetPbDataId()),
          (e.config_type = t.GetEntityConfigType()),
          e
        );
    }
    rje(t) {
      t = EntitySystem_1.EntitySystem.Get(t);
      return (
        !!t &&
        t.GetComponent(3)?.CreatureData.GetBaseInfo()?.Category.MainType ===
          "Monster"
      );
    }
    YNr() {
      const t = this.Entity.GetComponent(185);
      return t.HasTag(-1800191060) || t.HasTag(-1221493771)
        ? 7
        : t.HasTag(-1371021686)
          ? 6
          : void 0;
    }
    JNr() {
      switch (this.Entity.GetComponent(158).MoveState) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
        case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
        case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
          return 1;
        case CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb:
        case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
          return 4;
        case CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim:
        case CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim:
          return 2;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
          return 3;
        case CharacterUnifiedStateTypes_1.ECharMoveState.Captured:
        case CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock:
        case CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown:
        case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
        case CharacterUnifiedStateTypes_1.ECharMoveState.Parry:
          return 5;
        default:
          return 0;
      }
    }
    static zNr() {
      if (void 0 === this.CurrentEntity)
        for (const r of this.ZNr.values())
          if (r.Entity.GetComponent(158)?.IsInFightState()) {
            this.CurrentEntity = r;
            break;
          }
      let t, e;
      return this.CurrentEntity
        ? void 0 !==
          (e = (t = this.CurrentEntity.Entity.GetComponent(21))?.YNr())
          ? e
          : t?.JNr() ?? 0
        : 0;
    }
    static eOr() {
      var t = this.tOr;
      var t =
        ((t.i_move_duration = 0),
        (t.i_swim_duration = 0),
        (t.i_glide_duration = 0),
        (t.i_climb_duration = 0),
        (t.i_behit_duration = 0),
        (t.i_skill_duration = 0),
        (t.i_dash_duration = 0),
        (t.i_other_duration = 0),
        this.zNr());
      const e = TimeUtil_1.TimeUtil.GetServerTime();
      this.iOr = { State: t, StartTime: e };
    }
    static xNr() {
      const t = TimeUtil_1.TimeUtil.GetServerTime();
      const e = this.zNr();
      const r = this.tOr;
      if (void 0 === this.iOr)
        (this.iOr = { State: e, StartTime: t }),
          this.oOr > 0 && (r.i_other_duration += t - this.oOr);
      else {
        const a = this.iOr;
        const o = this.SNr;
        const n = t - a.StartTime;
        switch (a.State) {
          case 1:
            (r.i_move_duration += n), (o.i_move_duration += n);
            break;
          case 2:
            (r.i_swim_duration += n), (o.i_swim_duration += n);
            break;
          case 3:
            (r.i_glide_duration += n), (o.i_glide_duration += n);
            break;
          case 4:
            (r.i_climb_duration += n), (o.i_climb_duration += n);
            break;
          case 5:
            (r.i_behit_duration += n), (o.i_behit_duration += n);
            break;
          case 6:
            (r.i_skill_duration += n), (o.i_skill_duration += n);
            break;
          case 7:
            (r.i_dash_duration += n), (o.i_dash_duration += n);
            break;
          default:
            (r.i_other_duration += n), (o.i_other_duration += n);
        }
        (a.State = e), (a.StartTime = t);
      }
    }
    static rOr(t) {
      return t?.Valid && (t = t.GetComponent(0))?.Valid ? t.GetRoleId() : -1;
    }
    static get ZNr() {
      return ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
    }
    static nOr() {
      (this.c9 = 0),
        (this.sOr = 0),
        (this.BNr = 0),
        (this.aOr = 0),
        (this.gNr = 0),
        (this.hOr = 0),
        (this.lOr = 0),
        (this._Or = 0),
        (this.uOr = 0),
        (this.MNr = 0),
        (this.ENr = 0),
        (this.cOr = 0),
        (this.mOr = 0),
        (this.dOr = 0),
        (this.yNr = 0),
        (this.oOr = 0),
        (this.COr = 0),
        (this.gOr = 0),
        (this.ANr = 0),
        (this.iOr = void 0),
        (this.tOr.s_monster_hate.length = 0),
        (this.tOr.s_death_monster.length = 0),
        (this.tOr.s_run_monster.length = 0),
        (this.tOr.s_team_character.length = 0),
        (this.tOr.s_team_hp_per.length = 0),
        (this.tOr.i_move_duration = 0),
        (this.tOr.i_swim_duration = 0),
        (this.tOr.i_glide_duration = 0),
        (this.tOr.i_climb_duration = 0),
        (this.tOr.i_behit_duration = 0),
        (this.tOr.i_skill_duration = 0),
        (this.tOr.i_dash_duration = 0),
        (this.tOr.i_other_duration = 0),
        this.hNr.clear(),
        this.lNr.clear(),
        this.fOr.clear(),
        this.mNr.clear(),
        this._Nr.clear(),
        this.DNr.clear();
    }
    static TNr(t) {
      let e = this.pOr.get(t);
      return (
        e ||
          (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)?.GetRoleId()
            ? (e = this.vOr(t)) && this.pOr.set(t, e)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 20, "无法获取entity的config Id", [
                "entityId",
                t,
              ])),
        e
      );
    }
    static MOr() {
      const t = this.ZNr;
      const e = new Array();
      for (const a of t) {
        const r = this.TNr(a.Id);
        e.push(r.i_role_id);
      }
      return e.toString();
    }
    static INr(r, a) {
      let o = r.toFixed() + "-" + a.toFixed();
      let n = this.SOr.get(o);
      if (!n) {
        (n = new LogReportDefine_1.RoleSkillRecord(a)), this.SOr.set(o, n);
        let t = this.EOr.get(r);
        let e =
          (t || ((t = new Array()), this.EOr.set(r, t)),
          t.push(n),
          this.yOr.get(r));
        e ||
          ((a = this.rOr(EntitySystem_1.EntitySystem.Get(r))),
          (o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a)),
          ((e = this.IOr()
            ? new LogReportDefine_1.InstRoleSkillReportLog(
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
                ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              )
            : new LogReportDefine_1.RoleSkillReportLog()).s_battle_id =
            (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
              "0") +
            "_" +
            String(this.c9)),
          (e.i_role_id = a),
          (e.i_role_level = o.GetLevelData()?.GetLevel()),
          (e.i_role_quality = o.GetQualityConfig().Id),
          this.yOr.set(r, e));
      }
      return n;
    }
    static cNr(t) {
      let e = this.TOr.get(t);
      let r, a;
      return (
        e ||
          ((a = EntitySystem_1.EntitySystem.Get(t)) &&
            ((r = a.GetComponent(0)),
            ((e = this.IOr()
              ? new LogReportDefine_1.InstMonsterStateRecord(
                  r.GetPbDataId(),
                  r.EntityPbModelConfigId,
                  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
                  ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
                )
              : new LogReportDefine_1.MonsterStateRecord(
                  r.GetPbDataId(),
                  r.EntityPbModelConfigId,
                )).s_battle_id =
              (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
                "0") +
              "_" +
              String(this.c9)),
            (e.i_monster_score = this.LOr(t)),
            (r = a.GetComponent(0).GetPbDataId()),
            (a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
              ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
              r,
            ))?.Type === "Quest"
              ? (e.i_from_quest = a.QuestId)
              : a?.Type === "LevelPlay" && (e.i_from_play = a.LevelPlayId),
            this.TOr.set(t, e))),
        e
      );
    }
    static LNr(r, a) {
      let o = r.toFixed() + "-" + a.toFixed();
      let n = this.DOr.get(o);
      if (!n) {
        (n = new LogReportDefine_1.MonsterSkillRecord(a)), this.DOr.set(o, n);
        let t = this.ROr.get(r);
        let e =
          (t || ((t = new Array()), this.ROr.set(r, t)),
          t.push(n),
          this.AOr.get(r));
        e ||
          ((o = (a = EntitySystem_1.EntitySystem.Get(r)).GetComponent(0)),
          ((e = this.IOr()
            ? new LogReportDefine_1.InstMonsterSkillReportLog(
                o.GetPbDataId(),
                o.EntityPbModelConfigId,
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
                ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
              )
            : new LogReportDefine_1.MonsterSkillReportLog(
                o.GetPbDataId(),
                o.EntityPbModelConfigId,
              )).s_battle_id =
            (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
              "0") +
            "_" +
            String(this.c9)),
          (e.i_monster_level =
            a
              .GetComponent(156)
              ?.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
              ) ?? 0),
          this.AOr.set(r, e));
      }
      return n;
    }
    static UOr() {
      if (
        !(
          this.c9 > 0 ||
          this.IOr() ||
          ((this.c9 = Math.floor(TimeUtil_1.TimeUtil.GetServerTime())),
          this.c9 <= 0)
        )
      ) {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        const e = t.Entity.GetComponent(3);
        var t =
          ((this.oOr = TimeUtil_1.TimeUtil.GetServerTime()),
          this.eOr(),
          t?.Valid &&
            (((t = this.TNr(t.Id)).LastGoToBattleTimePoint =
              TimeUtil_1.TimeUtil.GetServerTime()),
            t.i_enter_times++),
          this.ZNr);
        const r = new Array();
        const a = new Array();
        for (const s of t) {
          const o = this.TNr(s.Id);
          const n = s.Entity.GetComponent(156);
          const i =
            ((o.i_begin_hp = n.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_Life,
            )),
            (o.i_hp_max = n.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Tkn,
            )),
            (o.i_enter_battle_score = this.xOr(s.Id)),
            r.push(o.i_role_id),
            a.push(Math.round((o.i_begin_hp / o.i_hp_max) * 1e4)),
            s.Entity.GetComponent(79));
          i.RoleElementEnergy >= CharacterAttributeTypes_1.ELEMENT_POWER_MAX &&
            o.i_full_element_times++,
            n.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
            ) >=
              n.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
              ) && o.i_full_energy_times++;
        }
        (this.wOr.i_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
          (this.wOr.f_x = e.ActorLocationProxy.X),
          (this.wOr.f_y = e.ActorLocationProxy.Y),
          (this.wOr.f_z = e.ActorLocationProxy.Z),
          (this.wOr.s_battle_id =
            (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
              "0") +
            "_" +
            String(this.c9)),
          (this.wOr.s_team_character = r),
          (this.wOr.s_team_hp_per = a),
          this.c9 > 0
            ? LogController_1.LogController.LogBattleStartPush(this.wOr)
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "战斗ID不合法", [
                "battle_id",
                this.c9,
              ]);
      }
    }
    static BOr() {
      if (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        this.c9 !== 0 &&
        !this.IOr()
      ) {
        let e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        const [r, a] = this.qOr(e.Entity);
        const o = this.tOr;
        o.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
        e = e.Entity.GetComponent(3).ActorLocationProxy;
        (o.f_x = e.X),
          (o.f_y = e.Y),
          (o.f_z = e.Z),
          (o.s_team_character = r),
          (o.s_team_hp_per = a),
          (o.s_battle_id =
            (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
              "0") +
            "_" +
            String(this.c9));
        const n = this._Nr;
        this.lNr.forEach((t) => {
          o.s_monster_hate.push(n.get(t));
        }),
          this.fOr.forEach((t) => {
            o.s_death_monster.push(
              new LogReportDefine_1.MonsterInfoLogData(n.get(t)),
            );
          }),
          this.lNr.forEach((t) => {
            this.fOr.has(t) ||
              o.s_run_monster.push(
                new LogReportDefine_1.MonsterInfoLogData(n.get(t)),
              );
          });
        e = o.s_run_monster.length;
        let t = this.COr;
        t !== Protocol_1.Aki.Protocol.qOs.Proto_Death &&
          (e === 0
            ? (t = Protocol_1.Aki.Protocol.qOs.Proto_AllKill)
            : e < this.lNr.size
              ? (t = Protocol_1.Aki.Protocol.qOs.Hfs)
              : e === this.lNr.size &&
                (t = Protocol_1.Aki.Protocol.qOs.Proto_Run)),
          (o.i_result = t),
          (o.i_death_role_count = this.sOr),
          (o.i_revive_times = this.BNr),
          (o.l_acc_damage = this.hOr),
          (o.l_acc_shield_damage = this.lOr),
          (o.l_acc_self_damage = this.aOr),
          (o.l_acc_skill_heal = this._Or),
          (o.l_acc_item_heal = this.uOr),
          (o.i_stop_times = this.cOr),
          (o.i_damage_max = this.mOr),
          (o.i_acc_dodge_times = this.MNr),
          (o.i_dodge_succ_times = this.ENr),
          (o.i_non_character_damage = this.gNr),
          (o.i_non_character_shield_damage = 0),
          (o.i_change_character_times = this.dOr),
          (o.i_qte_times = this.yNr),
          (o.i_cost_time = TimeUtil_1.TimeUtil.GetServerTime() - this.oOr),
          (o.i_counter_attack_times = this.gOr),
          (o.i_bullet_rebound_times = this.ANr),
          this.xNr(),
          o.i_cost_time <= 0 || o.s_monster_hate.length <= 0
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "战斗时长为0,或者历史仇恨为0", [
                "Data",
                o,
              ])
            : LogController_1.LogController.LogBattleEndPush(o, !0),
          this.GOr(),
          this.NOr(),
          this.OOr(),
          this.kOr(),
          this.FOr(),
          this.nOr();
      }
    }
    static GOr() {
      for (const t of this.pOr.values())
        LogController_1.LogController.LogSingleCharacterStatusPush(t, !0);
      this.pOr.clear();
    }
    static NOr() {
      for (const e of this.TOr.values()) {
        e.i_acc_time <= 0 &&
          (e.i_acc_time = TimeUtil_1.TimeUtil.GetServerTime() - e.InitTime);
        const t = e.l_acc_rage;
        (e.l_acc_rage_other =
          t - e.l_acc_rage_normal - e.l_acc_rage_counter - e.l_acc_rage_vision),
          LogController_1.LogController.LogSingleMonsterStatusPush(e, !0);
      }
      this.TOr.clear();
    }
    static OOr() {
      for (const t of this.yOr.entries())
        LogController_1.LogController.LogRoleSkillReportPush(
          t[1],
          this.EOr.get(t[0]),
          !0,
        );
      this.EOr.clear(), this.SOr.clear(), this.yOr.clear();
    }
    static kOr() {
      if (this.VOr.size > 0) {
        let t = void 0;
        this.IOr()
          ? (t = new LogReportDefine_1.InstReactionLogRecord(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
              ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
            ))
          : ((t = new LogReportDefine_1.ReactionLogRecord()).s_battle_id =
              (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
                "0") +
              "_" +
              String(this.c9)),
          LogController_1.LogController.LogDoubleBallReport(t, this.VOr, !0);
      }
      this.VOr.clear(), this.HOr.clear();
    }
    static jOr() {
      this.WOr.Clear(),
        this.SNr.Clear(),
        (this.WOr.i_start_time = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.WOr.i_inst_id =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
        (this.WOr.s_fight_id =
          ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
        (this.WOr.s_fight_roles = this.MOr()),
        (this.WOr.i_area_index = this.KOr),
        LogController_1.LogController.LogInstFightStartPush(this.WOr);
    }
    static QOr() {
      (this.SNr.i_inst_id =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
        (this.SNr.s_fight_id =
          ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
        this.qOr(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity,
        ),
        (this.SNr.i_fight_use_time +=
          TimeUtil_1.TimeUtil.GetServerTime() - this.oOr),
        (this.SNr.i_inst_use_time =
          TimeUtil_1.TimeUtil.GetServerTime() - this.WOr.i_start_time),
        (this.SNr.s_fight_roles = this.MOr()),
        (this.SNr.i_area_index = this.KOr),
        this.GOr(),
        this.NOr(),
        this.OOr(),
        this.kOr(),
        this.FOr(),
        this.nOr(),
        LogController_1.LogController.LogInstFightEndPush(this.SNr),
        this.WOr.Clear(),
        this.SNr.Clear();
    }
    static FOr() {
      for (const t of this.AOr.entries())
        LogController_1.LogController.LogMonsterSkillReportPush(
          t[1],
          this.ROr.get(t[0]),
          !0,
        );
      this.DOr.clear(), this.ROr.clear(), this.AOr.clear();
    }
    static XOr(t) {
      const e = new Map();
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
        ParamType: 1,
      }).GetConfigId;
      const r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
      for (const o of r.GetSkillData().GetSkillList()) {
        const a = r.GetSkillData().GetSkillLevel(o.Id);
        e.set(o.Id, a);
      }
      return Object.fromEntries(e);
    }
    static $Or(t) {
      const a = new Array();
      return (
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t)
          .GetIncrIdList()
          .forEach((t, e) => {
            let r;
            t &&
              ((r = new Array()),
              (t =
                ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                  t,
                )),
              r.push(t.GetConfigId()),
              r.push(t.GetPhantomLevel()),
              r.push(e),
              a.push(r));
          }),
        a
      );
    }
    static xOr(t) {
      var e = 0;
      var r = EntitySystem_1.EntitySystem.Get(t);
      const a = r.GetComponent(156);
      var r = r.GetComponent(79);
      var r = CharacterDamageCalculations_1.Calculation.GetElementDamageBonus(
        a.TakeSnapshot(),
        r.RoleElementType,
      );
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
        ParamType: 1,
      }).GetConfigId;
      const o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
      var t = a.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Atk,
      );
      var e = ATK_RATIO * t;
      var t = a.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_Crit,
      );
      var n = a.GetCurrentValue(
        CharacterAttributeTypes_1.EAttributeId.Proto_CritDamage,
      );
      var n =
        ((e *=
          (t / CharacterAttributeTypes_1.PER_TEN_THOUSAND) *
            (n / CharacterAttributeTypes_1.PER_TEN_THOUSAND) +
          (1 - t / CharacterAttributeTypes_1.PER_TEN_THOUSAND)),
        a.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_DamageChange,
        ));
      var t =
        ((e *=
          1 +
          n / CharacterAttributeTypes_1.PER_TEN_THOUSAND +
          r / CharacterAttributeTypes_1.PER_TEN_THOUSAND),
        o.GetSkillData().GetSkillList());
      let i = 0;
      let s = 0;
      for (const _ of t) {
        const h = o.GetSkillData().GetSkillLevel(_.Id);
        i < h ? (i = h) : s < h && (s = h);
      }
      return (e =
        (e *= 1 + ((i + s) / 2 - 1) * SKILLLEVEL_CONST) *
        (1 +
          o.GetResonanceData().GetResonantChainGroupIndex() * RESONANT_CONST));
    }
    static vOr(e) {
      let r =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)
          ?.Entity?.GetComponent(0)
          ?.GetRoleId() ?? 0;
      let a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
        ParamType: 1,
      });
      if (a) {
        let t = void 0;
        (t = this.IOr()
          ? new LogReportDefine_1.InstRoleStateRecord(
              r,
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
              ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
            )
          : new LogReportDefine_1.RoleStateRecord(r)).s_battle_id =
          (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
            "0") +
          "_" +
          String(this.c9);
        (r = a.GetConfigId),
          (a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r)),
          (a =
            ((t.i_role_level = a.GetLevelData().GetLevel()),
            (t.i_role_quality = a.GetQualityConfig().Id),
            (t.i_role_reson = a
              .GetResonanceData()
              .GetResonantChainGroupIndex()),
            ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
              r,
            ))),
          (a =
            ((t.i_weapon_id = a.GetItemId()),
            (t.i_weapon_type = a.GetItemConfig().WeaponType),
            (t.i_weapon_quality = a.GetItemConfig().QualityId),
            (t.i_weapon_level = a.GetLevel()),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(
              r,
              0,
            ))),
          (a =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              a,
            ));
        return (
          a &&
            ((t.i_vision_skill_id = a.GetConfigId()),
            (t.i_vision_skill_level = a.GetPhantomLevel())),
          (t.s_role_skill = this.XOr(e)),
          (t.s_phantom_battle_data = this.$Or(r)),
          (t.s_phantom_fetter_list = [
            ...ModelManager_1.ModelManager.PhantomBattleModel.GetTargetRoleFetterList(
              r,
            ),
          ]),
          t
        );
      }
    }
    static LOr(t) {
      var t = EntitySystem_1.EntitySystem.Get(t).GetComponent(156);
      const e =
        (t.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistancePhys,
        ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement1,
          ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement2,
          ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement3,
          ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement4,
          ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement5,
          ) +
          t.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId
              .Proto_DamageResistanceElement6,
          )) /
        7 /
        CharacterAttributeTypes_1.PER_TEN_THOUSAND;
      var t =
        t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn) /
        (1 - e) /
        0.5;
      let r = 0;
      for (const o of this.ZNr) {
        const a = this.TNr(o.Id);
        a.i_enter_battle_score > r && (r = a.i_enter_battle_score);
      }
      return t / r;
    }
    static IOr() {
      return this.WOr.i_start_time > 0;
    }
    static qOr(t) {
      t?.Valid &&
        (t = this.TNr(t.Id)).LastGoToBattleTimePoint !== 0 &&
        (t.i_acc_time +=
          TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint);
      var t = this.ZNr;
      const e = new Array();
      const r = new Array();
      for (const n of t) {
        const a = this.TNr(n.Id);
        const o = n.Entity.GetComponent(156);
        (a.i_end_hp = o.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        )),
          (a.i_hp_max = o.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Tkn,
          )),
          e.push(a.i_role_id),
          r.push(Math.round((a.i_end_hp / a.i_hp_max) * 1e4));
      }
      return [e, r];
    }
  });
(CharacterLogComponent.GNr = !1),
  (CharacterLogComponent.NNr = (t) => {
    t ? CharacterLogComponent_1.UOr() : CharacterLogComponent_1.BOr();
  }),
  (CharacterLogComponent.VNr = () => {
    ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ((CharacterLogComponent_1.KOr = 0), CharacterLogComponent_1.jOr());
  }),
  (CharacterLogComponent.HNr = () => {
    ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (CharacterLogComponent_1.QOr(), (CharacterLogComponent_1.KOr = 0));
  }),
  (CharacterLogComponent.jNr = () => {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((CharacterLogComponent_1.cOr += 1),
      (CharacterLogComponent_1.SNr.i_stop_times += 1));
  }),
  (CharacterLogComponent.iOr = void 0),
  (CharacterLogComponent.CurrentEntity = void 0),
  (CharacterLogComponent.ONr = (t, e) => {
    (CharacterLogComponent_1.CurrentEntity = t),
      CharacterLogComponent_1.CNr() &&
        ((CharacterLogComponent_1.dOr += 1),
        (t = CharacterLogComponent_1.TNr(t?.Id)) &&
          ((t.LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime()),
          t.i_enter_times++),
        (t = CharacterLogComponent_1.TNr(e?.Id ?? 0)) &&
          ((t.i_leave_times += 1),
          t.LastGoToBattleTimePoint !== 0
            ? (t.i_acc_time +=
                TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint)
            : (t.LastGoToBattleTimePoint =
                TimeUtil_1.TimeUtil.GetServerTime())),
        CharacterLogComponent_1.xNr());
  }),
  (CharacterLogComponent.kNr = () => {
    CharacterLogComponent_1.CNr() &&
      ((CharacterLogComponent_1.COr = Protocol_1.Aki.Protocol.qOs.Proto_Death),
      CharacterLogComponent_1.NNr(!1));
  }),
  (CharacterLogComponent.c9 = 0),
  (CharacterLogComponent.sOr = 0),
  (CharacterLogComponent.BNr = 0),
  (CharacterLogComponent.aOr = 0),
  (CharacterLogComponent.gNr = 0),
  (CharacterLogComponent.lOr = 0),
  (CharacterLogComponent.hOr = 0),
  (CharacterLogComponent._Or = 0),
  (CharacterLogComponent.uOr = 0),
  (CharacterLogComponent.MNr = 0),
  (CharacterLogComponent.ENr = 0),
  (CharacterLogComponent.cOr = 0),
  (CharacterLogComponent.mOr = 0),
  (CharacterLogComponent.dOr = 0),
  (CharacterLogComponent.yNr = 0),
  (CharacterLogComponent.oOr = 0),
  (CharacterLogComponent.COr = 0),
  (CharacterLogComponent.gOr = 0),
  (CharacterLogComponent.ANr = 0),
  (CharacterLogComponent.hNr = new Set()),
  (CharacterLogComponent.lNr = new Set()),
  (CharacterLogComponent.fOr = new Set()),
  (CharacterLogComponent.mNr = new Set()),
  (CharacterLogComponent._Nr = new Map()),
  (CharacterLogComponent.DNr = new Map()),
  (CharacterLogComponent.WOr = new LogReportDefine_1.InstFightStartRecord()),
  (CharacterLogComponent.SNr = new LogReportDefine_1.InstFightEndRecord()),
  (CharacterLogComponent.KOr = 0),
  (CharacterLogComponent.pOr = new Map()),
  (CharacterLogComponent.SOr = new Map()),
  (CharacterLogComponent.EOr = new Map()),
  (CharacterLogComponent.yOr = new Map()),
  (CharacterLogComponent.TOr = new Map()),
  (CharacterLogComponent.DOr = new Map()),
  (CharacterLogComponent.ROr = new Map()),
  (CharacterLogComponent.AOr = new Map()),
  (CharacterLogComponent.VOr = new Map()),
  (CharacterLogComponent.HOr = new Map()),
  (CharacterLogComponent.wOr = new LogReportDefine_1.BattleStartLogData()),
  (CharacterLogComponent.POr = void 0),
  (CharacterLogComponent.tOr = new LogReportDefine_1.BattleEndLogData()),
  (CharacterLogComponent.bOr = void 0),
  (CharacterLogComponent.FNr = (t) => {
    let e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ((t = EntitySystem_1.EntitySystem.Get(t))?.GetComponent(0)?.IsRole() &&
        ((e = CharacterLogComponent_1.rOr(t)), (t = t.GetComponent(21)), e) &&
        (LogController_1.LogController.LogCharacterDeathPush(e, t.fNr, !0),
        (t.fNr = 0)),
      CharacterLogComponent_1.SNr.i_death_role_count++);
  }),
  (CharacterLogComponent.WNr = (t) => {
    t.U0s && (CharacterLogComponent_1.SNr.i_result = Number(t.U0s)),
      t.V5n && (CharacterLogComponent_1.SNr.i_reason = t.V5n);
  }),
  (CharacterLogComponent.KNr = () => {
    ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (CharacterLogComponent_1.KOr++,
      CharacterLogComponent_1.QOr(),
      CharacterLogComponent_1.jOr());
  }),
  (CharacterLogComponent = CharacterLogComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(21)],
      CharacterLogComponent,
    )),
  (exports.CharacterLogComponent = CharacterLogComponent);
// # sourceMappingURL=CharacterLogComponent.js.map
