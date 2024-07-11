"use strict";
var CharacterLogComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, r, a) {
      var o,
        n = arguments.length,
        i =
          n < 3
            ? e
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(e, r))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(t, e, r, a);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (o = t[s]) &&
            (i = (n < 3 ? o(i) : 3 < n ? o(e, r, i) : o(e, r)) || i);
      return 3 < n && i && Object.defineProperty(e, r, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterLogComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine"),
  LogController_1 = require("../../../../../World/Controller/LogController"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterDamageCalculations_1 = require("./CharacterDamageCalculations"),
  CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes"),
  ATK_RATIO = 1.4,
  SKILLLEVEL_CONST = 0.111111,
  RESONANT_CONST = 0.041667;
let CharacterLogComponent =
  (CharacterLogComponent_1 = class CharacterLogComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.qGr = void 0),
        (this.GGr = []),
        (this.OnAggroChanged = (t, e) => {
          var r, a, o;
          ModelManager_1.ModelManager.GameModeModel.IsMulti ||
            ((r = e.CharActorComp.Entity.Id),
            (e = e.CharActorComp.Entity),
            (a = CharacterLogComponent_1.NGr),
            (o = CharacterLogComponent_1.OGr),
            this.gWe(r)
              ? t
                ? (a.add(r),
                  CharacterLogComponent_1.kGr.set(r, this.FGr(r)),
                  o.has(r) ||
                    (((t = CharacterLogComponent_1.VGr(r)).i_monster_level =
                      e
                        .GetComponent(158)
                        ?.GetCurrentValue(
                          CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
                        ) ?? 0),
                    (e = e.GetComponent(3)?.ActorLocationProxy),
                    (t.f_pos_x = e.X),
                    (t.f_pos_y = e.Y),
                    (t.f_pos_z = e.Z),
                    (t.InitTime = TimeUtil_1.TimeUtil.GetServerTime())),
                  o.add(r))
                : (CharacterLogComponent_1.HGr.add(r), a.delete(r))
              : a.delete(r));
        }),
        (this.jGr = (t, e) => {
          CharacterLogComponent_1.WGr() && (CharacterLogComponent_1.KGr += t),
            e && (this.QGr = 2);
        }),
        (this.XGr = (t) => {
          t && (this.QGr = 3);
        }),
        (this.$Gr = (t, e, r) => {
          if (CharacterLogComponent_1.WGr()) {
            switch (r) {
              case 6:
              case 11:
                (CharacterLogComponent_1.YGr += 1),
                  (CharacterLogComponent_1.JGr.i_acc_dodge_times += 1);
                break;
              case 7:
                (CharacterLogComponent_1.zGr += 1),
                  (CharacterLogComponent_1.JGr.i_dodge_succ_times += 1);
                break;
              case 4:
                CharacterLogComponent_1.ZGr += 1;
            }
            var a = this.Entity.GetComponent(0);
            if (a.IsRole()) {
              var o = CharacterLogComponent_1.eNr(this.Entity.Id, e),
                n =
                  (o.use_count++,
                  (o.skill_type = r),
                  CharacterLogComponent_1.tNr(this.Entity.Id));
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
                CharacterLogComponent_1.iNr(this.Entity.Id, Number(e))
                  .use_count++;
            o = this.Entity.Id.toFixed() + "-" + e;
            CharacterLogComponent_1.oNr.set(o, !1);
          }
        }),
        (this.rNr = (t, e) => {
          CharacterLogComponent_1.WGr() &&
            (CharacterLogComponent_1.tNr(this.Entity.Id)
              .i_bullet_rebound_times++,
            CharacterLogComponent_1.VGr(t.Id).i_bullet_rebound_times++,
            CharacterLogComponent_1.iNr(t.Id, e).bullet_rebound_times++,
            CharacterLogComponent_1.nNr++,
            CharacterLogComponent_1.JGr.i_bullet_rebound_times++);
        }),
        (this.sNr = (t, e, r) => {
          CharacterLogComponent_1.WGr() &&
            r < e &&
            (CharacterLogComponent_1.tNr(this.Entity.Id).l_acc_element +=
              e - r);
        }),
        (this.aNr = (t, e, r) => {
          CharacterLogComponent_1.WGr() &&
            t === CharacterAttributeTypes_1.EAttributeId.Proto_Energy &&
            r < e &&
            (((t = CharacterLogComponent_1.tNr(this.Entity.Id)).l_acc_energy +=
              e - r),
            e >=
              this.Entity.GetComponent(158).GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
              ) -
                Number.EPSILON) &&
            t.i_full_energy_times++;
        }),
        (this.hUe = () => {
          this.Entity.GetComponent(160)?.IsInFightState() &&
            CharacterLogComponent_1.hNr();
        }),
        (this.BJe = (t, e) => {
          this.Entity.GetComponent(160)?.IsInFightState() &&
            CharacterLogComponent_1.hNr();
        }),
        (this.lNr = () => {
          CharacterLogComponent_1.WGr() &&
            (this.Entity.GetComponent(0).IsRole() &&
              ((CharacterLogComponent_1._Nr += 1),
              (CharacterLogComponent_1.tNr(this.Entity.Id).i_revive_times +=
                1)),
            CharacterLogComponent_1.JGr.i_revive_times++);
        }),
        (this.uNr = (t, e, r) => {
          r -= e;
          r <= 0 ||
            ((e = CharacterLogComponent_1.VGr(this.Entity.Id)) &&
              ((e.l_acc_rage += r),
              this.Entity.GetComponent(52)?.IsTriggerCounterAttack) &&
              (e.l_acc_rage_counter += r));
        }),
        (this.QGr = 0),
        (this.cNr = (t, e) => {
          CharacterLogComponent_1.WGr() &&
            e &&
            CharacterLogComponent_1.VGr(this.Entity.Id).i_paralysis_times++;
        });
    }
    OnStart() {
      return (
        CharacterLogComponent_1.mNr ||
          ((CharacterLogComponent_1.mNr = !0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnBattleStateChanged,
            CharacterLogComponent_1.dNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnChangeRole,
            CharacterLogComponent_1.CNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnTeamLivingStateChange,
            CharacterLogComponent_1.gNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.CharOnRoleDead,
            CharacterLogComponent_1.fNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.WorldDone,
            CharacterLogComponent_1.pNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.LeaveInstanceDungeon,
            CharacterLogComponent_1.vNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.TriggerUiTimeDilation,
            CharacterLogComponent_1.MNr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnInstResultNotify,
            CharacterLogComponent_1.ENr,
          ),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.OnTowerChallengeChangeTeamNotify,
            CharacterLogComponent_1.SNr,
          )),
        this.yNr(),
        !0
      );
    }
    OnEnd() {
      return this.INr(), !0;
    }
    yNr() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.OnAggroChanged,
      ),
        (this.qGr = this.Entity.CheckGetComponent(188).ListenForTagAddOrRemove(
          1922078392,
          this.cNr,
        )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.$Gr,
        );
      var t = this.Entity.GetComponent(0);
      t.IsRole()
        ? (EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnFallInjure,
            this.jGr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRoleDrownInjure,
            this.XGr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRevive,
            this.lNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BulletRebound,
            this.rNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnElementEnergyChanged,
            this.sNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnEnergyChanged,
            this.aNr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          ),
          this.GGr.push(
            this.Entity.CheckGetComponent(188).ListenForTagAddOrRemove(
              -1371021686,
              this.BJe,
            ),
          ),
          this.GGr.push(
            this.Entity.CheckGetComponent(188).ListenForTagAddOrRemove(
              -1800191060,
              this.BJe,
            ),
          ),
          this.GGr.push(
            this.Entity.CheckGetComponent(188).ListenForTagAddOrRemove(
              -1221493771,
              this.BJe,
            ),
          ))
        : t.IsMonster() &&
          this.Entity.GetComponent(158)?.AddListener(
            CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
            this.uNr,
          );
    }
    INr() {
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.AiHateAddOrRemove,
        this.OnAggroChanged,
      ),
        this.qGr.EndTask(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.$Gr,
        );
      var t = this.Entity.GetComponent(0);
      if (t.IsRole()) {
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnFallInjure,
          this.jGr,
        ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRoleDrownInjure,
            this.XGr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnRevive,
            this.lNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.BulletRebound,
            this.rNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnElementEnergyChanged,
            this.sNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnEnergyChanged,
            this.aNr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hUe,
          );
        for (const e of this.GGr) e.EndTask();
        this.GGr.length = 0;
      } else if (t.IsMonster()) {
        this.Entity.GetComponent(158)?.RemoveListener(
          CharacterAttributeTypes_1.EAttributeId.Proto_Rage,
          this.uNr,
        );
        for (const r of this.GGr) r.EndTask();
        this.GGr.length = 0;
      }
    }
    static WGr() {
      return (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !this.TNr() &&
        0 < this.c9
      );
    }
    static TNr() {
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      ).FightFormationId;
      return (
        0 <
        (ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          t,
        )?.TrialRole?.length ?? 0)
      );
    }
    FGr(t) {
      var e,
        t = EntitySystem_1.EntitySystem.Get(t);
      if (t)
        return (
          (e = new LogReportDefine_1.MonsterInfoLogData(void 0)),
          (t = t.GetComponent(0)),
          (e.pbdata_id = t.GetPbDataId()),
          (e.config_type = t.GetEntityConfigType()),
          e
        );
    }
    gWe(t) {
      t = EntitySystem_1.EntitySystem.Get(t);
      return (
        !!t &&
        "Monster" ===
          t.GetComponent(3)?.CreatureData.GetBaseInfo()?.Category.MainType
      );
    }
    LNr() {
      var t = this.Entity.GetComponent(188);
      return t.HasTag(-1800191060) || t.HasTag(-1221493771)
        ? 7
        : t.HasTag(-1371021686)
          ? 6
          : void 0;
    }
    DNr() {
      switch (this.Entity.GetComponent(160).MoveState) {
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
    static RNr() {
      if (void 0 === this.CurrentEntity)
        for (const r of this.UNr.values())
          if (r.Entity.GetComponent(160)?.IsInFightState()) {
            this.CurrentEntity = r;
            break;
          }
      var t, e;
      return this.CurrentEntity
        ? void 0 !==
          (e = (t = this.CurrentEntity.Entity.GetComponent(21))?.LNr())
          ? e
          : t?.DNr() ?? 0
        : 0;
    }
    static ANr() {
      var t = this.PNr,
        t =
          ((t.i_move_duration = 0),
          (t.i_swim_duration = 0),
          (t.i_glide_duration = 0),
          (t.i_climb_duration = 0),
          (t.i_behit_duration = 0),
          (t.i_skill_duration = 0),
          (t.i_dash_duration = 0),
          (t.i_other_duration = 0),
          this.RNr()),
        e = TimeUtil_1.TimeUtil.GetServerTime();
      this.xNr = { State: t, StartTime: e };
    }
    static hNr() {
      var t = TimeUtil_1.TimeUtil.GetServerTime(),
        e = this.RNr(),
        r = this.PNr;
      if (void 0 === this.xNr)
        (this.xNr = { State: e, StartTime: t }),
          0 < this.wNr && (r.i_other_duration += t - this.wNr);
      else {
        var a = this.xNr,
          o = this.JGr,
          n = t - a.StartTime;
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
    static BNr(t) {
      return t?.Valid && (t = t.GetComponent(0))?.Valid ? t.GetRoleId() : -1;
    }
    static get UNr() {
      return ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
    }
    static bNr() {
      (this.c9 = 0),
        (this.qNr = 0),
        (this._Nr = 0),
        (this.GNr = 0),
        (this.KGr = 0),
        (this.NNr = 0),
        (this.ONr = 0),
        (this.kNr = 0),
        (this.FNr = 0),
        (this.YGr = 0),
        (this.zGr = 0),
        (this.VNr = 0),
        (this.HNr = 0),
        (this.jNr = 0),
        (this.ZGr = 0),
        (this.wNr = 0),
        (this.WNr = 0),
        (this.KNr = 0),
        (this.nNr = 0),
        (this.xNr = void 0),
        (this.PNr.s_monster_hate.length = 0),
        (this.PNr.s_death_monster.length = 0),
        (this.PNr.s_run_monster.length = 0),
        (this.PNr.s_team_character.length = 0),
        (this.PNr.s_team_hp_per.length = 0),
        (this.PNr.i_move_duration = 0),
        (this.PNr.i_swim_duration = 0),
        (this.PNr.i_glide_duration = 0),
        (this.PNr.i_climb_duration = 0),
        (this.PNr.i_behit_duration = 0),
        (this.PNr.i_skill_duration = 0),
        (this.PNr.i_dash_duration = 0),
        (this.PNr.i_other_duration = 0),
        this.NGr.clear(),
        this.OGr.clear(),
        this.QNr.clear(),
        this.HGr.clear(),
        this.kGr.clear(),
        this.oNr.clear();
    }
    static tNr(t) {
      let e = this.XNr.get(t);
      return (
        e ||
          (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)?.GetRoleId()
            ? (e = this.$Nr(t)) && this.XNr.set(t, e)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Battle", 20, "无法获取entity的config Id", [
                "entityId",
                t,
              ])),
        e
      );
    }
    static YNr() {
      var t = this.UNr,
        e = new Array();
      for (const a of t) {
        var r = this.tNr(a.Id);
        e.push(r.i_role_id);
      }
      return e.toString();
    }
    static eNr(r, a) {
      var o = r.toFixed() + "-" + a.toFixed();
      let n = this.JNr.get(o);
      if (!n) {
        (n = new LogReportDefine_1.RoleSkillRecord(a)), this.JNr.set(o, n);
        let t = this.zNr.get(r),
          e =
            (t || ((t = new Array()), this.zNr.set(r, t)),
            t.push(n),
            this.ZNr.get(r));
        e ||
          ((a = this.BNr(EntitySystem_1.EntitySystem.Get(r))),
          (o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a)),
          ((e = this.eOr()
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
          this.ZNr.set(r, e));
      }
      return n;
    }
    static VGr(t) {
      let e = this.tOr.get(t);
      var r, a;
      return (
        e ||
          ((a = EntitySystem_1.EntitySystem.Get(t)) &&
            ((r = a.GetComponent(0)),
            ((e = this.eOr()
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
            (e.i_monster_score = this.iOr(t)),
            (r = a.GetComponent(0).GetPbDataId()),
            "Quest" ===
            (a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
              ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
              r,
            ))?.Type
              ? (e.i_from_quest = a.QuestId)
              : "LevelPlay" === a?.Type && (e.i_from_play = a.LevelPlayId),
            this.tOr.set(t, e))),
        e
      );
    }
    static iNr(r, a) {
      var o = r.toFixed() + "-" + a.toFixed();
      let n = this.oOr.get(o);
      if (!n) {
        (n = new LogReportDefine_1.MonsterSkillRecord(a)), this.oOr.set(o, n);
        let t = this.rOr.get(r),
          e =
            (t || ((t = new Array()), this.rOr.set(r, t)),
            t.push(n),
            this.nOr.get(r));
        e ||
          ((o = (a = EntitySystem_1.EntitySystem.Get(r)).GetComponent(0)),
          ((e = this.eOr()
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
              .GetComponent(158)
              ?.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
              ) ?? 0),
          this.nOr.set(r, e));
      }
      return n;
    }
    static sOr() {
      if (
        !(
          0 < this.c9 ||
          this.eOr() ||
          ((this.c9 = Math.floor(TimeUtil_1.TimeUtil.GetServerTime())),
          this.c9 <= 0)
        )
      ) {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
          e = t.Entity.GetComponent(3),
          t =
            ((this.wNr = TimeUtil_1.TimeUtil.GetServerTime()),
            this.ANr(),
            t?.Valid &&
              (((t = this.tNr(t.Id)).LastGoToBattleTimePoint =
                TimeUtil_1.TimeUtil.GetServerTime()),
              t.i_enter_times++),
            this.UNr),
          r = new Array(),
          a = new Array();
        for (const i of t) {
          var o = this.tNr(i.Id),
            n = i.Entity.GetComponent(158);
          (o.i_begin_hp = n.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          )),
            (o.i_hp_max = n.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.e5n,
            )),
            (o.i_enter_battle_score = this.hOr(i.Id)),
            r.push(o.i_role_id),
            a.push(Math.round((o.i_begin_hp / o.i_hp_max) * 1e4)),
            n.GetCurrentValue(
              CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
            ) >=
              n.GetCurrentValue(
                CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax,
              ) && o.i_full_energy_times++;
        }
        (this.lOr.i_area_id =
          ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
          (this.lOr.f_x = e.ActorLocationProxy.X),
          (this.lOr.f_y = e.ActorLocationProxy.Y),
          (this.lOr.f_z = e.ActorLocationProxy.Z),
          (this.lOr.s_battle_id =
            (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
              "0") +
            "_" +
            String(this.c9)),
          (this.lOr.s_team_character = r),
          (this.lOr.s_team_hp_per = a),
          0 < this.c9
            ? LogController_1.LogController.LogBattleStartPush(this.lOr)
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "战斗ID不合法", [
                "battle_id",
                this.c9,
              ]);
      }
    }
    static _Or() {
      if (
        !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        0 !== this.c9 &&
        !this.eOr()
      ) {
        var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity,
          [r, a] = this.cOr(e.Entity);
        const o = this.PNr;
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
        const n = this.kGr;
        this.OGr.forEach((t) => {
          o.s_monster_hate.push(n.get(t));
        }),
          this.QNr.forEach((t) => {
            o.s_death_monster.push(
              new LogReportDefine_1.MonsterInfoLogData(n.get(t)),
            );
          }),
          this.OGr.forEach((t) => {
            this.QNr.has(t) ||
              o.s_run_monster.push(
                new LogReportDefine_1.MonsterInfoLogData(n.get(t)),
              );
          });
        e = o.s_run_monster.length;
        let t = this.WNr;
        t !== Protocol_1.Aki.Protocol.T4s.Proto_Death &&
          (0 === e
            ? (t = Protocol_1.Aki.Protocol.T4s.Proto_AllKill)
            : e < this.OGr.size
              ? (t = Protocol_1.Aki.Protocol.T4s.aEs)
              : e === this.OGr.size &&
                (t = Protocol_1.Aki.Protocol.T4s.Proto_Run)),
          (o.i_result = t),
          (o.i_death_role_count = this.qNr),
          (o.i_revive_times = this._Nr),
          (o.l_acc_damage = this.NNr),
          (o.l_acc_shield_damage = this.ONr),
          (o.l_acc_self_damage = this.GNr),
          (o.l_acc_skill_heal = this.kNr),
          (o.l_acc_item_heal = this.FNr),
          (o.i_stop_times = this.VNr),
          (o.i_damage_max = this.HNr),
          (o.i_acc_dodge_times = this.YGr),
          (o.i_dodge_succ_times = this.zGr),
          (o.i_non_character_damage = this.KGr),
          (o.i_non_character_shield_damage = 0),
          (o.i_change_character_times = this.jNr),
          (o.i_qte_times = this.ZGr),
          (o.i_cost_time = TimeUtil_1.TimeUtil.GetServerTime() - this.wNr),
          (o.i_counter_attack_times = this.KNr),
          (o.i_bullet_rebound_times = this.nNr),
          this.hNr(),
          o.i_cost_time <= 0 || o.s_monster_hate.length <= 0
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "战斗时长为0,或者历史仇恨为0", [
                "Data",
                o,
              ])
            : LogController_1.LogController.LogBattleEndPush(o, !0),
          this.mOr(),
          this.dOr(),
          this.COr(),
          this.gOr(),
          this.fOr(),
          this.bNr();
      }
    }
    static mOr() {
      for (const t of this.XNr.values())
        LogController_1.LogController.LogSingleCharacterStatusPush(t, !0);
      this.XNr.clear();
    }
    static dOr() {
      for (const e of this.tOr.values()) {
        e.i_acc_time <= 0 &&
          (e.i_acc_time = TimeUtil_1.TimeUtil.GetServerTime() - e.InitTime);
        var t = e.l_acc_rage;
        (e.l_acc_rage_other =
          t - e.l_acc_rage_normal - e.l_acc_rage_counter - e.l_acc_rage_vision),
          LogController_1.LogController.LogSingleMonsterStatusPush(e, !0);
      }
      this.tOr.clear();
    }
    static COr() {
      for (const t of this.ZNr.entries())
        LogController_1.LogController.LogRoleSkillReportPush(
          t[1],
          this.zNr.get(t[0]),
          !0,
        );
      this.zNr.clear(), this.JNr.clear(), this.ZNr.clear();
    }
    static gOr() {
      if (0 < this.pOr.size) {
        let t = void 0;
        this.eOr()
          ? (t = new LogReportDefine_1.InstReactionLogRecord(
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
              ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
            ))
          : ((t = new LogReportDefine_1.ReactionLogRecord()).s_battle_id =
              (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
                "0") +
              "_" +
              String(this.c9)),
          LogController_1.LogController.LogDoubleBallReport(t, this.pOr, !0);
      }
      this.pOr.clear(), this.vOr.clear();
    }
    static MOr() {
      this.EOr.Clear(),
        this.JGr.Clear(),
        (this.EOr.i_start_time = TimeUtil_1.TimeUtil.GetServerTime()),
        (this.EOr.i_inst_id =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
        (this.EOr.s_fight_id =
          ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
        (this.EOr.s_fight_roles = this.YNr()),
        (this.EOr.i_area_index = this.SOr),
        LogController_1.LogController.LogInstFightStartPush(this.EOr);
    }
    static yOr() {
      (this.JGr.i_inst_id =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
        (this.JGr.s_fight_id =
          ModelManager_1.ModelManager.CreatureModel.GetSceneId()),
        this.cOr(
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity,
        ),
        (this.JGr.i_fight_use_time +=
          TimeUtil_1.TimeUtil.GetServerTime() - this.wNr),
        (this.JGr.i_inst_use_time =
          TimeUtil_1.TimeUtil.GetServerTime() - this.EOr.i_start_time),
        (this.JGr.s_fight_roles = this.YNr()),
        (this.JGr.i_area_index = this.SOr),
        this.mOr(),
        this.dOr(),
        this.COr(),
        this.gOr(),
        this.fOr(),
        this.bNr(),
        LogController_1.LogController.LogInstFightEndPush(this.JGr),
        this.EOr.Clear(),
        this.JGr.Clear();
    }
    static fOr() {
      for (const t of this.nOr.entries())
        LogController_1.LogController.LogMonsterSkillReportPush(
          t[1],
          this.rOr.get(t[0]),
          !0,
        );
      this.oOr.clear(), this.rOr.clear(), this.nOr.clear();
    }
    static IOr(t) {
      var e = new Map(),
        t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
          ParamType: 1,
        }).GetConfigId,
        r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
      for (const o of r.GetSkillData().GetSkillList()) {
        var a = r.GetSkillData().GetSkillLevel(o.Id);
        e.set(o.Id, a);
      }
      return Object.fromEntries(e);
    }
    static TOr(t) {
      const a = new Array();
      return (
        ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t)
          .GetIncrIdList()
          .forEach((t, e) => {
            var r;
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
    static hOr(t) {
      var e = 0,
        r = EntitySystem_1.EntitySystem.Get(t),
        a = r.GetComponent(158),
        r = r.GetComponent(81),
        r = CharacterDamageCalculations_1.Calculation.GetElementDamageBonus(
          a.TakeSnapshot(),
          r.RoleElementType,
        ),
        t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
          ParamType: 1,
        }).GetConfigId,
        o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t),
        t = a.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Atk),
        e = ATK_RATIO * t,
        t = a.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Crit,
        ),
        n = a.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_CritDamage,
        ),
        n =
          ((e *=
            (t / CharacterAttributeTypes_1.PER_TEN_THOUSAND) *
              (n / CharacterAttributeTypes_1.PER_TEN_THOUSAND) +
            (1 - t / CharacterAttributeTypes_1.PER_TEN_THOUSAND)),
          a.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.Proto_DamageChange,
          )),
        t =
          ((e *=
            1 +
            n / CharacterAttributeTypes_1.PER_TEN_THOUSAND +
            r / CharacterAttributeTypes_1.PER_TEN_THOUSAND),
          o.GetSkillData().GetSkillList());
      let i = 0,
        s = 0;
      for (const _ of t) {
        var h = o.GetSkillData().GetSkillLevel(_.Id);
        i < h ? (i = h) : s < h && (s = h);
      }
      return (e =
        (e *= 1 + ((i + s) / 2 - 1) * SKILLLEVEL_CONST) *
        (1 +
          o.GetResonanceData().GetResonantChainGroupIndex() * RESONANT_CONST));
    }
    static $Nr(e) {
      var r =
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)
            ?.Entity?.GetComponent(0)
            ?.GetRoleId() ?? 0,
        a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
          ParamType: 1,
        });
      if (a) {
        let t = void 0;
        (t = this.eOr()
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
          (t.s_role_skill = this.IOr(e)),
          (t.s_phantom_battle_data = this.TOr(r)),
          (t.s_phantom_fetter_list = [
            ...ModelManager_1.ModelManager.PhantomBattleModel.GetTargetRoleFetterList(
              r,
            ),
          ]),
          t
        );
      }
    }
    static iOr(t) {
      var t = EntitySystem_1.EntitySystem.Get(t).GetComponent(158),
        e =
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
          CharacterAttributeTypes_1.PER_TEN_THOUSAND,
        t =
          t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.e5n) /
          (1 - e) /
          0.5;
      let r = 0;
      for (const o of this.UNr) {
        var a = this.tNr(o.Id);
        a.i_enter_battle_score > r && (r = a.i_enter_battle_score);
      }
      return t / r;
    }
    static eOr() {
      return 0 < this.EOr.i_start_time;
    }
    static cOr(t) {
      t?.Valid &&
        0 !== (t = this.tNr(t.Id)).LastGoToBattleTimePoint &&
        (t.i_acc_time +=
          TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint);
      var t = this.UNr,
        e = new Array(),
        r = new Array();
      for (const n of t) {
        var a = this.tNr(n.Id),
          o = n.Entity.GetComponent(158);
        (a.i_end_hp = o.GetCurrentValue(
          CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        )),
          (a.i_hp_max = o.GetCurrentValue(
            CharacterAttributeTypes_1.EAttributeId.e5n,
          )),
          e.push(a.i_role_id),
          r.push(Math.round((a.i_end_hp / a.i_hp_max) * 1e4));
      }
      return [e, r];
    }
  });
(CharacterLogComponent.mNr = !1),
  (CharacterLogComponent.dNr = (t) => {
    t ? CharacterLogComponent_1.sOr() : CharacterLogComponent_1._Or();
  }),
  (CharacterLogComponent.pNr = () => {
    1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ((CharacterLogComponent_1.SOr = 0), CharacterLogComponent_1.MOr());
  }),
  (CharacterLogComponent.vNr = () => {
    1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (CharacterLogComponent_1.yOr(), (CharacterLogComponent_1.SOr = 0));
  }),
  (CharacterLogComponent.MNr = () => {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((CharacterLogComponent_1.VNr += 1),
      (CharacterLogComponent_1.JGr.i_stop_times += 1));
  }),
  (CharacterLogComponent.xNr = void 0),
  (CharacterLogComponent.CurrentEntity = void 0),
  (CharacterLogComponent.CNr = (t, e) => {
    (CharacterLogComponent_1.CurrentEntity = t),
      CharacterLogComponent_1.WGr() &&
        ((CharacterLogComponent_1.jNr += 1),
        (t = CharacterLogComponent_1.tNr(t?.Id)) &&
          ((t.LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime()),
          t.i_enter_times++),
        (t = CharacterLogComponent_1.tNr(e?.Id ?? 0)) &&
          ((t.i_leave_times += 1),
          0 !== t.LastGoToBattleTimePoint
            ? (t.i_acc_time +=
                TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint)
            : (t.LastGoToBattleTimePoint =
                TimeUtil_1.TimeUtil.GetServerTime())),
        CharacterLogComponent_1.hNr());
  }),
  (CharacterLogComponent.gNr = (t, e, r) => {
    t &&
      1 === e &&
      1 !== r &&
      CharacterLogComponent_1.WGr() &&
      ((CharacterLogComponent_1.WNr = Protocol_1.Aki.Protocol.T4s.Proto_Death),
      CharacterLogComponent_1.dNr(!1));
  }),
  (CharacterLogComponent.c9 = 0),
  (CharacterLogComponent.qNr = 0),
  (CharacterLogComponent._Nr = 0),
  (CharacterLogComponent.GNr = 0),
  (CharacterLogComponent.KGr = 0),
  (CharacterLogComponent.ONr = 0),
  (CharacterLogComponent.NNr = 0),
  (CharacterLogComponent.kNr = 0),
  (CharacterLogComponent.FNr = 0),
  (CharacterLogComponent.YGr = 0),
  (CharacterLogComponent.zGr = 0),
  (CharacterLogComponent.VNr = 0),
  (CharacterLogComponent.HNr = 0),
  (CharacterLogComponent.jNr = 0),
  (CharacterLogComponent.ZGr = 0),
  (CharacterLogComponent.wNr = 0),
  (CharacterLogComponent.WNr = 0),
  (CharacterLogComponent.KNr = 0),
  (CharacterLogComponent.nNr = 0),
  (CharacterLogComponent.NGr = new Set()),
  (CharacterLogComponent.OGr = new Set()),
  (CharacterLogComponent.QNr = new Set()),
  (CharacterLogComponent.HGr = new Set()),
  (CharacterLogComponent.kGr = new Map()),
  (CharacterLogComponent.oNr = new Map()),
  (CharacterLogComponent.EOr = new LogReportDefine_1.InstFightStartRecord()),
  (CharacterLogComponent.JGr = new LogReportDefine_1.InstFightEndRecord()),
  (CharacterLogComponent.SOr = 0),
  (CharacterLogComponent.XNr = new Map()),
  (CharacterLogComponent.JNr = new Map()),
  (CharacterLogComponent.zNr = new Map()),
  (CharacterLogComponent.ZNr = new Map()),
  (CharacterLogComponent.tOr = new Map()),
  (CharacterLogComponent.oOr = new Map()),
  (CharacterLogComponent.rOr = new Map()),
  (CharacterLogComponent.nOr = new Map()),
  (CharacterLogComponent.pOr = new Map()),
  (CharacterLogComponent.vOr = new Map()),
  (CharacterLogComponent.lOr = new LogReportDefine_1.BattleStartLogData()),
  (CharacterLogComponent.aOr = void 0),
  (CharacterLogComponent.PNr = new LogReportDefine_1.BattleEndLogData()),
  (CharacterLogComponent.uOr = void 0),
  (CharacterLogComponent.fNr = (t) => {
    var e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ((t = EntitySystem_1.EntitySystem.Get(t))?.GetComponent(0)?.IsRole() &&
        ((e = CharacterLogComponent_1.BNr(t)), (t = t.GetComponent(21)), e) &&
        (LogController_1.LogController.LogCharacterDeathPush(e, t.QGr, !0),
        (t.QGr = 0)),
      CharacterLogComponent_1.JGr.i_death_role_count++);
  }),
  (CharacterLogComponent.ENr = (t) => {
    t.Qps && (CharacterLogComponent_1.JGr.i_result = Number(t.Qps)),
      t.E9n && (CharacterLogComponent_1.JGr.i_reason = t.E9n);
  }),
  (CharacterLogComponent.SNr = () => {
    1 < ModelManager_1.ModelManager.GameModeModel.InstanceType &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (CharacterLogComponent_1.SOr++,
      CharacterLogComponent_1.yOr(),
      CharacterLogComponent_1.MOr());
  }),
  (CharacterLogComponent = CharacterLogComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(21)],
      CharacterLogComponent,
    )),
  (exports.CharacterLogComponent = CharacterLogComponent);
//# sourceMappingURL=CharacterLogComponent.js.map
