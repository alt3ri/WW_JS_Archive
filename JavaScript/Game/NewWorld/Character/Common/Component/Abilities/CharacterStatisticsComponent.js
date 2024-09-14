"use strict";
var CharacterStatisticsComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, a) {
      var s,
        r = arguments.length,
        n =
          r < 3
            ? i
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(i, e))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, e, a);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (s = t[o]) &&
            (n = (r < 3 ? s(n) : 3 < r ? s(i, e, n) : s(i, e)) || n);
      return 3 < r && n && Object.defineProperty(i, e, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterStatisticsComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  DamageById_1 = require("../../../../../../Core/Define/ConfigQuery/DamageById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes"),
  skillTypeToString = [
    "常态攻击",
    "共鸣技能",
    "共鸣解放",
    "固有技能",
    "连携技能",
    "异能力",
    "声骸技能",
  ],
  attackTypeToString = [
    "普攻伤害",
    "蓄力攻击伤害",
    "大招伤害",
    "QTE伤害",
    "普通技能伤害",
    "战斗幻象技能伤害",
    "探索幻象技能伤害",
  ];
class TargetDamageStatistics {
  constructor(t) {
    (this.TargetId = t), (this.DQo = 0), (this.IsValid = !0);
    var t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0),
      i = t.GetEntityType();
    (this.JB = i === Protocol_1.Aki.Protocol.kks.Proto_Monster),
      (this.Xjt = i === Protocol_1.Aki.Protocol.kks.Proto_Player),
      (this.Mne = 0),
      (this.RQo = ""),
      this.JB
        ? ((this.Mne = t.GetPbDataId()),
          (this.RQo = PublicUtil_1.PublicUtil.GetConfigTextByKey(
            t.GetBaseInfo()?.TidName ?? "",
          )))
        : this.Xjt &&
          ((i = t.Valid ? t.GetRoleId() : 0),
          (t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i))
            ? ((this.Mne = t),
              (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                this.Mne,
              )),
              (this.RQo = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                i.Name,
              )))
            : (this.IsValid = !1));
  }
  AddDamageValue(t) {
    this.DQo += t;
  }
  ToString() {
    return StringUtils_1.StringUtils.Format(
      ",{0},{1},{2},{3},{4}",
      this.JB ? "怪物" : this.Xjt ? "角色" : "出错？？",
      this.RQo,
      this.Mne.toString(),
      this.TargetId.toString(),
      this.DQo.toString(),
    );
  }
}
class DamageStatisticsData {
  constructor(t, i, e, a) {
    (this.RoleId = t),
      (this.RoleName = i),
      (this.DamageType = e),
      (this.IsHeal = a),
      (this.UQo = new Map());
  }
  AddDamageValue(t, i) {
    let e = this.UQo.get(t);
    if (!e) {
      if (!(e = new TargetDamageStatistics(t)).IsValid) return;
      this.UQo.set(t, e);
    }
    e.AddDamageValue(i);
  }
  GetTargetCount() {
    return this.UQo.size;
  }
  ToString() {
    var t = new StringBuilder_1.StringBuilder();
    for (const i of this.UQo.values()) t.Append(i.ToString());
    return StringUtils_1.StringUtils.Format(
      "{0},{1},{2},{3}{4}\n",
      this.RoleId.toString(),
      this.RoleName,
      this.IsHeal ? "治疗" : "伤害",
      this.DamageType,
      t.ToString(),
    );
  }
}
class CombatDataBase {
  constructor(t, i = 0) {
    (this.AttackerId = t), (this.TargetId = i), (this.String = "");
    var t = new Date(),
      i = t.getHours(),
      e = t.getMinutes(),
      t = t.getSeconds();
    this.DateCreate = StringUtils_1.StringUtils.Format(
      "{0}-{1}-{2}",
      i < 10 ? "0" + i : i.toString(),
      e < 10 ? "0" + e : e.toString(),
      t < 10 ? "0" + t : t.toString(),
    );
  }
  ToString() {
    return (
      (this.String && 0 < this.String.length) ||
        (this.String = this.ParseToString()),
      this.String
    );
  }
  static GetEntityConfigName(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      var i,
        t = t.GetComponent(0),
        e = t?.GetEntityType();
      if (e === Protocol_1.Aki.Protocol.kks.Proto_Player)
        return (
          (i = t.Valid ? t.GetRoleId() : 0),
          (i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i))
            ? ((i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name))
            : void 0
        );
      if (e === Protocol_1.Aki.Protocol.kks.Proto_Monster)
        return PublicUtil_1.PublicUtil.GetConfigTextByKey(
          t.GetBaseInfo()?.TidName ?? "",
        );
    }
  }
  static GetSkillConfigName(t, i) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) return t.GetComponent(34).GetSkillInfo(i).SkillName.toString();
  }
  static GetEntityConfigNameAndSkillName(t, i, e) {
    t = EntitySystem_1.EntitySystem.Get(t);
    let a = void 0,
      s = void 0;
    if (t) {
      var r = t.GetComponent(0),
        n = r?.GetEntityType();
      if (n === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        var o = r.Valid ? r.GetRoleId() : 0,
          o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o);
        if (!o) return [void 0, void 0];
        (o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o)),
          (o =
            ((a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name)),
            ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
              o.SkillId,
            )));
        let t = -1;
        if (o)
          for (const h of o)
            if (h.DamageList.includes(i)) {
              (s = skillTypeToString[h.SkillType - 1]), (t = h.SkillType);
              break;
            }
        return (
          t < 0 &&
            5 === DamageById_1.configDamageById.GetConfig(i).Type &&
            (s = "幻象技能"),
          [a, s]
        );
      }
      if (n === Protocol_1.Aki.Protocol.kks.Proto_Monster)
        return (
          (a = PublicUtil_1.PublicUtil.GetConfigTextByKey(
            r.GetBaseInfo()?.TidName ?? "",
          )),
          (o = t.GetComponent(34).GetSkillInfo(e)),
          (s = o.SkillName.toString()),
          [a, s]
        );
    }
    return [void 0, void 0];
  }
}
class CombatDataDamage extends CombatDataBase {
  constructor(t, i, e, a, s = 0) {
    super(t, s),
      (this.DamageId = i),
      (this.DamageValue = e),
      (this.SkillId = a);
  }
  ParseToString() {
    var [t, i] = CombatDataBase.GetEntityConfigNameAndSkillName(
        this.AttackerId,
        this.DamageId,
        this.SkillId,
      ),
      e = CombatDataBase.GetEntityConfigName(this.TargetId),
      a = 0,
      a = EntitySystem_1.EntitySystem.Get(this.TargetId)
        .GetComponent(159)
        .GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life);
    return StringUtils_1.StringUtils.Format(
      "<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>对<Victim>{3}</>造成<NumDmg>{4}</>点伤害<Change>{5}</>",
      this.DateCreate,
      t ?? "",
      i ?? "",
      e ?? "",
      this.DamageValue.toString(),
      a <= 0
        ? "(死亡)"
        : StringUtils_1.StringUtils.Format(
            "({0}->{1})",
            (a + this.DamageValue).toString(),
            a.toString(),
          ),
    );
  }
}
class CombatDataHeal extends CombatDataBase {
  constructor(t, i, e, a, s = 0) {
    super(t, s), (this.HealId = i), (this.HealValue = e), (this.SkillId = a);
  }
  ParseToString() {
    var [t, i] = CombatDataBase.GetEntityConfigNameAndSkillName(
        this.AttackerId,
        this.HealId,
        this.SkillId,
      ),
      e = CombatDataBase.GetEntityConfigName(this.TargetId),
      a = 0,
      s = EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(159),
      a = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life),
      s = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n);
    return StringUtils_1.StringUtils.Format(
      "<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>使<Victim>{3}</>恢复<NumDmg>{4}</>点生命<Change>{5}</>",
      this.DateCreate,
      t ?? "",
      i ?? "",
      e ?? "",
      this.HealValue.toString(),
      a === s
        ? "(满血)"
        : StringUtils_1.StringUtils.Format(
            "({0}->{1})",
            a.toString(),
            (a - this.HealValue).toString(),
          ),
    );
  }
}
class CombatDataSkill extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e), (this.SkillId = i);
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
      i = CombatDataBase.GetSkillConfigName(this.AttackerId, this.SkillId);
    return StringUtils_1.StringUtils.Format(
      "<Date>[{0}]</><Atk>{1}</>施放了技能<Skill>{2}</>。",
      this.DateCreate,
      t ?? "",
      i ?? "",
    );
  }
}
class CombatDataBuffAdded extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e), (this.BuffId = i);
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
      i = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format(
      "<Date>{0}</><Victim>{1}</>获得了<Atk>{2}</>添加的Buff<NumDmg>{3}</>",
      this.DateCreate,
      i ?? "",
      t ?? "",
      this.BuffId.toString(),
    );
  }
}
class CombatDataBuffRemoved extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e), (this.BuffId = i);
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format(
      "<Date>{0}</><Victim>{1}</>失去了Buff<NumDmg>{2}</>",
      this.DateCreate,
      t ?? "",
      this.BuffId.toString(),
    );
  }
}
class CombatDataKilled extends CombatDataBase {
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId),
      i = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format(
      "<Date>{0}</><Atk>{1}</>消灭了<Victim>{2}</>!",
      this.DateCreate,
      t ?? "",
      i ?? "",
    );
  }
}
class CombatDataRevive extends CombatDataBase {
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
    return StringUtils_1.StringUtils.Format(
      "<Date>{0}</><Atk>{1}</>复活",
      this.DateCreate,
      t ?? "",
    );
  }
}
let CharacterStatisticsComponent =
  (CharacterStatisticsComponent_1 = class CharacterStatisticsComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.qOr = (t, i, e, a, s, r, n) => {
          switch (a.CalculateType) {
            case 1:
              this.GOr && this.NOr(-e, t, i, r), this.OOr(-e, t, i, r, s);
              break;
            case 0:
              this.GOr &&
                this.kOr(
                  e,
                  a.Element,
                  n,
                  t,
                  i,
                  s.IsCritical,
                  a.DamageTextType,
                  s.IsImmune,
                  a.Id,
                  s.BulletId,
                  s.BuffId,
                ),
                this.FOr(
                  e,
                  a.Element,
                  n,
                  t,
                  i,
                  s.IsCritical,
                  a.DamageTextType,
                  s.IsImmune,
                  a.Id,
                  s.BulletId,
                  s.BuffId,
                  s.IsTargetKilled,
                  s,
                );
          }
        }),
        (this.VOr = () => {
          this.HOr();
        }),
        (this.GOr = !1),
        (this.jOr = new Map()),
        (this.WOr = new Map()),
        (this.KOr = new Map()),
        (this.QOr = new Array()),
        (this.XOr = (t, i) => {
          CharacterStatisticsComponent_1.$Or &&
            this.Entity.GetComponent(0).IsRole() &&
            (this.YOr(t), this.JOr(i));
        }),
        (this.zOr = (t, i) => {
          var e;
          CharacterStatisticsComponent_1.$Or &&
            this.Entity.GetComponent(0).IsRole() &&
            (this.jOr.get(i) &&
              ((e = this.Entity.GetComponent(0).GetRoleConfig()),
              Log_1.Log.CheckError()) &&
              Log_1.Log.Error(
                "Character",
                21,
                "记录技能开始使用时间时有技能未执行EndSkill",
                [
                  "RoleName",
                  ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name),
                ],
                ["SkillId", i],
              ),
            this.jOr.set(i, Time_1.Time.NowSeconds));
        }),
        (this.ZOr = (e, a) => {
          if (
            CharacterStatisticsComponent_1.$Or &&
            this.Entity.GetComponent(0).IsRole()
          ) {
            let t = CharacterStatisticsComponent_1.ekr.get(e);
            t ||
              ((r = this.Entity.GetComponent(0).GetRoleConfig()),
              (s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                r.Name,
              )),
              (t = new CharacterOperationRecord(s, e, r.Id)),
              CharacterStatisticsComponent_1.ekr.set(e, t));
            var s = this.Entity.GetComponent(34).GetSkillInfo(a).SkillGenre;
            let i = t.SkillOperationMap.get(s);
            i ||
              ((i = new SkillOperationRecord(
                CharacterStatisticsComponent_1.tkr[s],
              )),
              t.SkillOperationMap.set(s, i));
            var r = this.jOr.get(a);
            void 0 === r
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Test",
                  21,
                  "计算出现异常 EndSkill",
                  ["Name", t.Name],
                  ["Id", t.EntityId],
                  ["Map", this.jOr],
                )
              : ((e = Time_1.Time.NowSeconds - r), i.AddOptCountAndTime(e)),
              this.jOr.set(a, void 0);
          }
        }),
        (this.UWi = (e, a) => {
          if (CharacterStatisticsComponent_1.$Or)
            if (a) this.WOr.set(e, Time_1.Time.NowSeconds);
            else {
              var a = this.WOr.get(e),
                s = Time_1.Time.NowSeconds - a,
                r = this.Entity.Id;
              let t = CharacterStatisticsComponent_1.ekr.get(r);
              var n = this.Entity.GetComponent(0);
              t ||
                ((o = n.GetEntityType()) ===
                Protocol_1.Aki.Protocol.kks.Proto_Monster
                  ? ((h = PublicUtil_1.PublicUtil.GetConfigTextByKey(
                      n.GetBaseInfo()?.TidName ?? "",
                    )),
                    (t = new CharacterOperationRecord(h, r, n.GetPbDataId())))
                  : o === Protocol_1.Aki.Protocol.kks.Proto_Player &&
                    ((h = n.GetRoleConfig()),
                    (o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                      h.Name,
                    )),
                    (t = new CharacterOperationRecord(o, r, h.Id))),
                CharacterStatisticsComponent_1.ekr.set(r, t));
              let i = t.TagOperationMap.get(e);
              var o = n.GetEntityType(),
                h = CharacterStatisticsComponent_1.StageInfo(o);
              i ||
                ((i = new SkillOperationRecord(h.get(e))),
                t.TagOperationMap.set(e, i)),
                Number.isNaN(s)
                  ? Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Test",
                      21,
                      "计算出现异常 OnTagChanged",
                      ["Id", this.Entity.Id],
                      ["beginTime", a],
                      ["Map", this.WOr],
                      ["TagId", e],
                    )
                  : i.AddOptCountAndTime(s);
            }
        }),
        (this.ikr = (t, i) => {
          CharacterStatisticsComponent_1.okr &&
            ((i = new CombatDataSkill(this.Entity.Id, i)).ToString(),
            CharacterStatisticsComponent_1.rkr.push(i),
            CharacterStatisticsComponent_1.nkr(i)) &&
            CharacterStatisticsComponent_1.skr.push(i);
        });
    }
    OnInit(t) {
      return (
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeDamage,
          this.qOr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ikr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.VOr,
        ),
        !0
      );
    }
    OnStart() {
      return this.akr(), !0;
    }
    OnActivate() {
      CharacterStatisticsComponent_1.OpenOperationRecord &&
        (this.GOr = CharacterStatisticsComponent_1.IsInRecordArea(this.Entity)),
        this.hkr();
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeDamage,
          this.qOr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.ikr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.VOr,
        ),
        CharacterStatisticsComponent_1.$Or && this.lkr(),
        !0
      );
    }
    OnBuffAdded(t) {
      this._kr(t);
    }
    OnBuffRemoved(t) {
      this.ukr(t);
    }
    GetStatisticsEnable() {
      return this.GOr;
    }
    static SetStatisticsEnable(t) {
      if (t) {
        var i;
        for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
          CharacterStatisticsComponent_1.IsInRecordArea(a.Entity) &&
            (i = a.Entity.GetComponent(24))?.Valid &&
            ((i.GOr = !0), this.ckr.push(a.Id));
      } else {
        for (const s of this.ckr) {
          var e = EntitySystem_1.EntitySystem.Get(s);
          e?.Valid && (e.GetComponent(24).GOr = !1);
        }
        this.ckr.length = 0;
      }
    }
    static CleanupRecordData() {
      this.mkr.clear(), this.dkr.clear(), this.Ckr.clear(), this.gkr.clear();
    }
    NOr(t, i, e, a) {
      var s = a.Damage,
        a = a.DamageData.Id;
      CharacterStatisticsComponent_1.ProcessRecordBySkillType(s, i, e, a, !0),
        CharacterStatisticsComponent_1.fkr(s, i, e, a, !0);
    }
    kOr(t, i, e, a, s, r, n, o, h, c, C) {
      CharacterStatisticsComponent_1.ProcessRecordBySkillType(
        t,
        a,
        s,
        h,
        !1,
        c,
        C,
      ),
        CharacterStatisticsComponent_1.fkr(t, a, s, h, !1);
    }
    static ProcessRecordBySkillType(a, t, s, r, n, o, h) {
      t = t.GetComponent(0);
      if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        var t = t.Valid ? t.GetRoleId() : 0,
          c = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
        if (c) {
          var C = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(c),
            _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(C.Name),
            C = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
              C.SkillId,
            );
          let i = 0;
          if (C)
            for (const m of C)
              if (m.DamageList.includes(r)) {
                i = m.SkillType;
                break;
              }
          C = n
            ? CharacterStatisticsComponent_1.gkr
            : CharacterStatisticsComponent_1.Ckr;
          let e = C.get(c);
          if ((e || ((e = new Map()), C.set(c, e)), 0 < i)) {
            let t = e.get(i);
            t ||
              ((C = skillTypeToString[i - 1]),
              (t = new DamageStatisticsData(c, _, C, n)),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Test",
                  21,
                  "伤害记录-技能",
                  ["伤害ID", r],
                  ["类型", C],
                ),
              e.set(i, t)),
              t.AddDamageValue(s.Id, a),
              t.GetTargetCount() > this.pkr && (this.pkr = t.GetTargetCount());
          } else if (5 !== DamageById_1.configDamageById.GetConfig(r).Type)
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Test",
                21,
                "结算ID不在幻象表中",
                ["结算ID", r],
                ["子弹ID", o],
                ["buffID", h],
              );
          else {
            let t = e.get(6);
            t ||
              ((t = new DamageStatisticsData(c, _, skillTypeToString[6], n)),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Test",
                  21,
                  "伤害记录-技能",
                  ["伤害ID", r],
                  ["类型", "声骸技能"],
                ),
              e.set(6, t)),
              t.AddDamageValue(s.Id, a),
              t.GetTargetCount() > this.pkr && (this.pkr = t.GetTargetCount());
          }
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Test", 21, "获取不到roleData", ["roleId", t]);
      }
    }
    static fkr(e, t, a, i, s) {
      t = t.GetComponent(0);
      if (t?.IsRole()) {
        var r = DamageById_1.configDamageById.GetConfig(i);
        if (r) {
          var t = t.Valid ? t.GetRoleId() : 0,
            n = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
          if (n) {
            var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n),
              o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name),
              h = s ? this.dkr : this.mkr;
            let t = h.get(n),
              i = (t || ((t = new Map()), h.set(n, t)), t.get(r.Type));
            i ||
              ((i = new DamageStatisticsData(
                n,
                o,
                attackTypeToString[r.Type],
                s,
              )),
              t.set(r.Type, i)),
              i.AddDamageValue(a.Id, e),
              this.vkr < i.GetTargetCount() && (this.vkr = i.GetTargetCount());
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Test", 21, "获取不到roleData", ["roleId", t]);
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Test", 21, "伤害表中找不到id", ["伤害Id", i]);
      }
    }
    static ExportStatisticsBySkillType() {
      var i = new StringBuilder_1.StringBuilder();
      i.Append("角色Id,名称,治疗/伤害,技能");
      for (let t = 0; t < this.pkr; t++) {
        var e = (t + 1).toString();
        i.Append(StringUtils_1.StringUtils.Format(this.Mkr, e, e, e, e, e));
      }
      i.Append("\n");
      var t = this.Ckr;
      if (0 < t?.size)
        for (var [, a] of t) for (var [, s] of a) i.Append(s.ToString());
      if (0 < (t = this.gkr)?.size)
        for (var [, r] of t) for (var [, n] of r) i.Append(n.ToString());
      return i.ToString();
    }
    static ExportStatisticsByAttackType() {
      var i = new StringBuilder_1.StringBuilder();
      i.Append("角色Id,名称,治疗/伤害,伤害类型");
      for (let t = 0; t < this.vkr; t++) {
        var e = (t + 1).toString();
        i.Append(StringUtils_1.StringUtils.Format(this.Mkr, e, e, e, e, e));
      }
      i.Append("\n");
      var t = this.mkr;
      if (0 < t?.size)
        for (var [, a] of t) for (var [, s] of a) i.Append(s.ToString());
      if (0 < (t = this.dkr)?.size)
        for (var [, r] of t) for (var [, n] of r) i.Append(n.ToString());
      return i.ToString();
    }
    static get OpenOperationRecord() {
      return this.$Or;
    }
    hkr() {
      var t;
      CharacterStatisticsComponent_1.$Or &&
        ((t = this.Entity),
        CharacterStatisticsComponent_1.ekr.has(t.Id) ||
          (CharacterStatisticsComponent_1.IsInRecordArea(t) && this.Ekr()));
    }
    Ekr() {
      if (
        (this.jOr.clear(),
        this.KOr.clear(),
        this.WOr.clear(),
        this.Entity.GetComponent(0).IsRole())
      ) {
        CharacterStatisticsComponent_1.Skr.push(this.Entity.Id),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharUseSkill,
            this.zOr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSkillEnd,
            this.ZOr,
          ),
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.XOr,
          );
        var t,
          i = this.Entity.GetComponent(161),
          e =
            (i?.Valid && ((i = i.MoveState), this.JOr(i)),
            this.Entity.CheckGetComponent(190));
        e?.Valid &&
          this.QOr.push(e.ListenForTagAddOrRemove(-2044964178, this.UWi));
        for ([t] of CharacterStatisticsComponent_1.ykr)
          e.HasTag(t) && this.WOr.set(t, Time_1.Time.NowSeconds);
      } else {
        var a = this.Entity.CheckGetComponent(190);
        if (a?.Valid) {
          CharacterStatisticsComponent_1.Skr.push(this.Entity.Id),
            this.QOr.push(a.ListenForTagAddOrRemove(-1112841587, this.UWi)),
            this.QOr.push(a.ListenForTagAddOrRemove(-1109506297, this.UWi)),
            this.QOr.push(a.ListenForTagAddOrRemove(-1838149281, this.UWi)),
            this.QOr.push(a.ListenForTagAddOrRemove(1922078392, this.UWi));
          for (var [s] of CharacterStatisticsComponent_1.Ikr)
            a.HasTag(s) && this.WOr.set(s, Time_1.Time.NowSeconds);
        }
      }
    }
    lkr() {
      this.Entity.GetComponent(0)?.IsRole() &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          this.zOr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.ZOr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
          this.XOr,
        ));
      for (const t of this.QOr) t.EndTask();
      this.QOr.length = 0;
    }
    JOr(t) {
      var i;
      CharacterStatisticsComponent_1.Tkr.has(t) &&
        (this.KOr.get(t) &&
          ((i = this.Entity.GetComponent(0).GetRoleConfig()),
          Log_1.Log.CheckError()) &&
          Log_1.Log.Error(
            "Character",
            21,
            "记录移动开始时间时有未执行OnMoveStateEnd",
            [
              "RoleName",
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name),
            ],
            ["State", t],
          ),
        this.KOr.set(t, Time_1.Time.NowSeconds));
    }
    YOr(e) {
      if (CharacterStatisticsComponent_1.Tkr.has(e)) {
        var a = this.Entity.Id;
        let t = CharacterStatisticsComponent_1.ekr.get(a),
          i =
            (t ||
              ((s = this.Entity.GetComponent(0).GetRoleConfig()),
              (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
                s.Name,
              )),
              (t = new CharacterOperationRecord(r, a, s.Id)),
              CharacterStatisticsComponent_1.ekr.set(a, t)),
            t.MoveOperationMap.get(e));
        i ||
          ((i = new SkillOperationRecord(
            CharacterStatisticsComponent_1.Tkr.get(e),
          )),
          t.MoveOperationMap.set(e, i));
        var s,
          r = this.KOr.get(e);
        void 0 === r
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              21,
              "计算出现异常 OnMoveStateEnd",
              ["Name", t.Name],
              ["Id", t.EntityId],
              ["Map", this.KOr],
            )
          : ((s = Time_1.Time.NowSeconds - r), i.AddOptCountAndTime(s)),
          this.KOr.set(e, void 0);
      }
    }
    static StageInfo(t) {
      return t === Protocol_1.Aki.Protocol.kks.Proto_Monster
        ? CharacterStatisticsComponent_1.Ikr
        : t === Protocol_1.Aki.Protocol.kks.Proto_Player
          ? CharacterStatisticsComponent_1.ykr
          : void 0;
    }
    akr() {
      if (CharacterStatisticsComponent_1.$Or) {
        var t = this.Entity.GetComponent(190);
        if (t) {
          var i,
            e = this.Entity.GetComponent(0).GetEntityType();
          for ([i] of CharacterStatisticsComponent_1.StageInfo(e))
            t.HasTag(i) &&
              (this.UWi(i, !0), Log_1.Log.CheckDebug()) &&
              Log_1.Log.Debug(
                "Test",
                21,
                "InitStageBeginTime",
                ["Id", this.Entity.Id],
                ["TagId", i],
              );
        }
      }
    }
    static OperationRecord(t) {
      if ((this.$Or = t))
        for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
          var i = a.Entity.GetComponent(24);
          i &&
            a.Entity.GetComponent(17)?.Valid &&
            this.IsInRecordArea(a.Entity) &&
            ((i.GOr = !0), i.Ekr());
        }
      else {
        for (const s of this.Skr) {
          var e = EntitySystem_1.EntitySystem.Get(s);
          e?.Valid && (e = e.GetComponent(24)) && ((e.GOr = !1), e.lkr());
        }
        this.Skr.length = 0;
      }
    }
    static IsInRecordArea(t) {
      if (t?.Valid) {
        var i = t.GetComponent(0);
        if (i.IsRole()) return !0;
        if (i.IsMonster()) {
          i = t.GetComponent(1);
          if (!i) return !1;
          if (
            Vector_1.Vector.DistSquaredXY(
              i.ActorLocationProxy,
              ModelManager_1.ModelManager.CameraModel.CameraLocation,
            ) < CharacterStatisticsComponent_1.HalfLengthRecordSquared
          )
            return !0;
        }
      }
      return !1;
    }
    static ExportRecord() {
      if (0 !== this.ekr.size) {
        this.$Or && this.OperationRecord(!1);
        var t,
          i = new StringBuilder_1.StringBuilder();
        i.Append(this.Lkr);
        for ([, t] of this.ekr) i.Append(t.ToString());
        return i.ToString();
      }
    }
    static OperationRecordCount() {
      let t = 0;
      for (var [, i] of this.ekr)
        t =
          (t = (t += i.SkillOperationMap.size) + i.MoveOperationMap.size) +
          i.TagOperationMap.size;
      return t;
    }
    static CleanupOperationRecord() {
      this.ekr.clear();
    }
    static SetCombatStarted(t, i, e, a) {
      (this.okr = t) &&
        (this.SetTypeOpen(i),
        this.SetCurrentAttacker(e),
        this.SetCurrentTarget(a));
    }
    static GetAttackerCombatEntities() {
      this.Dkr.length = 0;
      var t = UE.NewArray(UE.BuiltinString),
        i =
          (t.Add("无"),
          this.Dkr.push(0),
          ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
      for (const a of i) {
        var e = this.GetEntityName(a);
        e && (t.Add(e), this.Dkr.push(a.Id));
      }
      return t;
    }
    static GetTargetCombatEntities() {
      this.Rkr.length = 0;
      var t = UE.NewArray(UE.BuiltinString),
        i =
          (t.Add("无"),
          this.Rkr.push(0),
          ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
      for (const a of i) {
        var e = this.GetEntityName(a);
        e && (t.Add(e), this.Rkr.push(a.Id));
      }
      return t;
    }
    static GetEntityName(t) {
      var i, e;
      if (t)
        return (i = (t = t.Entity.GetComponent(0))?.GetEntityType()) ===
          Protocol_1.Aki.Protocol.kks.Proto_Player
          ? ((e = t.Valid ? t.GetRoleId() : 0),
            (e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e))
              ? ((e =
                  ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
                ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name))
              : void 0)
          : i === Protocol_1.Aki.Protocol.kks.Proto_Monster
            ? PublicUtil_1.PublicUtil.GetConfigTextByKey(
                t.GetBaseInfo()?.TidName ?? "",
              )
            : void 0;
    }
    static SetTypeOpen(e) {
      if (!this.Ukr) {
        var i = e.length;
        if (this.Akr.size !== i) this.Ukr = !0;
        else
          for (let t = 0; t < i; t++) {
            var a = e[t];
            if (!this.Akr.get(a)) {
              this.Ukr = !0;
              break;
            }
          }
      }
      this.Akr.clear();
      for (let t = 0, i = e.length; t < i; t++) {
        var s = e[t];
        this.Akr.set(s, !0);
      }
    }
    static SetCurrentAttacker(t) {
      t = this.Dkr[t];
      this.Pkr !== t && (this.Ukr = !0), (this.Pkr = t);
    }
    static SetCurrentTarget(t) {
      t = this.Rkr[t];
      this.xkr !== t && (this.Ukr = !0), (this.xkr = t);
    }
    static get ItemReset() {
      return this.Ukr;
    }
    static OnItemsResetFinished() {
      (this.Ukr = !1), (this.skr.length = 0);
      for (const t of this.rkr) this.nkr(t) && this.skr.push(t);
    }
    static GetSubItemsListView(i, e) {
      var a = UE.NewArray(UE.BuiltinString);
      for (let t = 0; t < e; t++) a.Add(this.skr[i + t].ToString());
      return a;
    }
    static GetItemListViewCount() {
      return this.skr.length;
    }
    OOr(t, i, e, a, s) {
      var r;
      CharacterStatisticsComponent_1.okr &&
        ((r = a.Damage),
        (a = a.DamageData.Id),
        (i = new CombatDataHeal(i.Id, a, r, s.SkillId, e.Id)).ToString(),
        CharacterStatisticsComponent_1.rkr.push(i),
        CharacterStatisticsComponent_1.nkr(i)) &&
        CharacterStatisticsComponent_1.skr.push(i);
    }
    FOr(t, i, e, a, s, r, n, o, h, c, C, _, m) {
      CharacterStatisticsComponent_1.okr &&
        ((h = new CombatDataDamage(a.Id, h, t, m.SkillId, s.Id)).ToString(),
        CharacterStatisticsComponent_1.rkr.push(h),
        CharacterStatisticsComponent_1.nkr(h) &&
          CharacterStatisticsComponent_1.skr.push(h),
        _) &&
        ((t = new CombatDataKilled(a.Id, s.Id)).ToString(),
        CharacterStatisticsComponent_1.rkr.push(t),
        CharacterStatisticsComponent_1.nkr(t)) &&
        CharacterStatisticsComponent_1.skr.push(t);
    }
    _kr(t) {
      var i;
      !CharacterStatisticsComponent_1.okr ||
        !(i = t.Config.Id) ||
        i <= 0 ||
        ((i = new CombatDataBuffAdded(
          t.GetInstigator().Id,
          i,
          t.GetOwner().Id,
        )).ToString(),
        CharacterStatisticsComponent_1.rkr.push(i),
        CharacterStatisticsComponent_1.nkr(i) &&
          CharacterStatisticsComponent_1.skr.push(i));
    }
    ukr(t) {
      var i;
      !CharacterStatisticsComponent_1.okr ||
        !(i = t.Config.Id) ||
        i <= 0 ||
        ((i = new CombatDataBuffRemoved(
          t.GetInstigator().Id,
          i,
          t.GetOwner().Id,
        )).ToString(),
        CharacterStatisticsComponent_1.rkr.push(i),
        CharacterStatisticsComponent_1.nkr(i) &&
          CharacterStatisticsComponent_1.skr.push(i));
    }
    HOr() {
      var t;
      CharacterStatisticsComponent_1.okr &&
        ((t = new CombatDataRevive(this.Entity.Id)).ToString(),
        CharacterStatisticsComponent_1.rkr.push(t),
        CharacterStatisticsComponent_1.nkr(t)) &&
        CharacterStatisticsComponent_1.skr.push(t);
    }
    static nkr(t) {
      return !(
        (0 < this.Pkr && this.Pkr !== t.AttackerId) ||
        (0 < this.xkr && this.xkr !== t.TargetId) ||
        (!this.Akr.get(0) && t instanceof CombatDataDamage) ||
        (!this.Akr.get(1) && t instanceof CombatDataHeal) ||
        (!this.Akr.get(2) && t instanceof CombatDataSkill) ||
        (!this.Akr.get(3) &&
          (t instanceof CombatDataBuffRemoved ||
            t instanceof CombatDataBuffAdded)) ||
        (!this.Akr.get(4) && t instanceof CombatDataKilled) ||
        (!this.Akr.get(5) && t instanceof CombatDataRevive)
      );
    }
  });
(CharacterStatisticsComponent.ckr = new Array()),
  (CharacterStatisticsComponent.Ckr = new Map()),
  (CharacterStatisticsComponent.mkr = new Map()),
  (CharacterStatisticsComponent.gkr = new Map()),
  (CharacterStatisticsComponent.dkr = new Map()),
  (CharacterStatisticsComponent.Mkr =
    ",目标{0}类型,目标{1}名称,目标{2}配置ID,目标{3}单位Id,目标{4}伤害"),
  (CharacterStatisticsComponent.pkr = 0),
  (CharacterStatisticsComponent.vkr = 0),
  (CharacterStatisticsComponent.HalfLengthRecordSquared = 25e6),
  (CharacterStatisticsComponent.ekr = new Map()),
  (CharacterStatisticsComponent.$Or = !1),
  (CharacterStatisticsComponent.Tkr = new Map([
    [CharacterUnifiedStateTypes_1.ECharMoveState.Walk, "走"],
    [CharacterUnifiedStateTypes_1.ECharMoveState.Run, "跑"],
    [CharacterUnifiedStateTypes_1.ECharMoveState.Sprint, "冲刺"],
    [CharacterUnifiedStateTypes_1.ECharMoveState.Dodge, "闪避"],
  ])),
  (CharacterStatisticsComponent.tkr = [
    "普攻0",
    "蓄力1",
    "E技能2",
    "大招3",
    "QTE4",
    "极限闪避反击5",
    "地面闪避6",
    "极限闪避7",
    "被动技能8",
    "战斗幻象技9",
    "探索幻象技10",
    "空中闪避11",
    "无类别",
  ]),
  (CharacterStatisticsComponent.Ikr = new Map([
    [-1109506297, "正常时间"],
    [-1838149281, "狂暴时间"],
    [1922078392, "瘫痪时间"],
    [-1112841587, "脆弱时间"],
  ])),
  (CharacterStatisticsComponent.ykr = new Map([[-2044964178, "受击硬直"]])),
  (CharacterStatisticsComponent.Skr = new Array()),
  (CharacterStatisticsComponent.Lkr =
    "角色ID,角色名称,配置ID,技能/阶段,时间,次数\n"),
  (CharacterStatisticsComponent.okr = !1),
  (CharacterStatisticsComponent.Akr = new Map()),
  (CharacterStatisticsComponent.Dkr = new Array()),
  (CharacterStatisticsComponent.Rkr = new Array()),
  (CharacterStatisticsComponent.Pkr = 0),
  (CharacterStatisticsComponent.xkr = 0),
  (CharacterStatisticsComponent.Ukr = !1),
  (CharacterStatisticsComponent.skr = new Array()),
  (CharacterStatisticsComponent.rkr = new Array()),
  (CharacterStatisticsComponent = CharacterStatisticsComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(24)],
      CharacterStatisticsComponent,
    )),
  (exports.CharacterStatisticsComponent = CharacterStatisticsComponent);
const SKILL_RECORD_FMT = "{0},{1},{2}";
class SkillOperationRecord {
  constructor(t) {
    (this.he = t), (this.oUe = 0), (this.JXt = 0);
  }
  AddOptCountAndTime(t, i = 1) {
    (this.oUe += t), (this.JXt += i);
  }
  ToString() {
    return StringUtils_1.StringUtils.Format(
      SKILL_RECORD_FMT,
      this.he,
      this.oUe.toString(),
      this.JXt.toString(),
    );
  }
}
const CHARACTER_RECORD_FMT = "{0},{1},{2},{3}\n";
class CharacterOperationRecord {
  constructor(t, i, e) {
    (this.Name = t),
      (this.EntityId = i),
      (this.AQo = e),
      (this.SkillOperationMap = new Map()),
      (this.MoveOperationMap = new Map()),
      (this.TagOperationMap = new Map());
  }
  ToString() {
    var t,
      i,
      e,
      a = new StringBuilder_1.StringBuilder();
    for ([, t] of this.SkillOperationMap) {
      var s = StringUtils_1.StringUtils.Format(
        CHARACTER_RECORD_FMT,
        this.EntityId.toString(),
        this.Name,
        this.AQo.toString(),
        t.ToString(),
      );
      a.Append(s);
    }
    for ([, i] of this.MoveOperationMap) {
      var r = StringUtils_1.StringUtils.Format(
        CHARACTER_RECORD_FMT,
        this.EntityId.toString(),
        this.Name,
        this.AQo.toString(),
        i.ToString(),
      );
      a.Append(r);
    }
    for ([, e] of this.TagOperationMap) {
      var n = StringUtils_1.StringUtils.Format(
        CHARACTER_RECORD_FMT,
        this.EntityId.toString(),
        this.Name,
        this.AQo.toString(),
        e.ToString(),
      );
      a.Append(n);
    }
    return a.ToString();
  }
}
//# sourceMappingURL=CharacterStatisticsComponent.js.map
