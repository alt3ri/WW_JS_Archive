"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, r) {
    let o;
    const s = arguments.length;
    let l =
      s < 3 ? i : r === null ? (r = Object.getOwnPropertyDescriptor(i, e)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      l = Reflect.decorate(t, i, e, r);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (o = t[n]) && (l = (s < 3 ? o(l) : s > 3 ? o(i, e, l) : o(i, e)) || l);
    return s > 3 && l && Object.defineProperty(i, e, l), l;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillCdComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const CombatDebugController_1 = require("../../../../../Utils/CombatDebugController");
let CharacterSkillCdComponent = class CharacterSkillCdComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.eZr = void 0),
      (this.Mzo = void 0),
      (this.tZr = void 0),
      (this.iZr = void 0),
      (this.oZr = void 0),
      (this.FBn = void 0),
      (this.Izo = void 0);
  }
  OnInit() {
    return (
      (this.eZr = this.Entity.CheckGetComponent(156)),
      (this.Mzo =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldSkillCdData()),
      (this.tZr =
        ModelManager_1.ModelManager.SkillCdModel.GetCurWorldPassiveSkillCdData()),
      (this.iZr = new Map()),
      (this.oZr = new Map()),
      (this.FBn = new Map()),
      (this.Izo = this.Mzo.InitMultiSkill(this.Entity.Id)),
      this.Izo.Init(this.Entity.Id),
      !0
    );
  }
  OnStart() {
    if (GlobalData_1.GlobalData.IsPlayInEditor)
      for (const t of this.iZr.values()) t.CheckConfigValid();
    return !0;
  }
  OnEnd() {
    return (
      this.Mzo && (this.Mzo.RemoveEntity(this.Entity), (this.Mzo = void 0)),
      this.tZr && (this.tZr.RemoveEntity(this.Entity), (this.tZr = void 0)),
      !0
    );
  }
  GetMultiSkillInfo(t) {
    return this.Izo.GetMultiSkillInfo(t);
  }
  GetNextMultiSkillId(t) {
    if (GlobalData_1.GlobalData.IsPlayInEditor)
      for (const [i, e] of this.FBn)
        if (i === t) {
          this.IsMultiSkill(e) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                18,
                "获取多段技能下一段技能Id时，传入的技能Id不是多段技能",
                ["skillId", t],
              ));
          break;
        }
    return this.Izo.GetNextMultiSkillId(t);
  }
  IsMultiSkill(t) {
    return this.Izo.IsMultiSkill(t);
  }
  CanStartMultiSkill(t) {
    return this.Izo.CanStartMultiSkill(t);
  }
  StartMultiSkill(t, i = !0) {
    return this.Izo.StartMultiSkill(t, i);
  }
  ResetMultiSkills(t) {
    this.Izo.ResetMultiSkills(t);
  }
  ResetAllMultiSkillOnChangeRole() {
    this.Izo.ResetOnChangeRole();
  }
  InitSkillCd(t) {
    let i;
    const e = t.SkillId;
    let r = this.iZr.get(e);
    return (
      r ||
      ((i = t.SkillInfo.CooldownConfig).SectionCount - i.SectionRemaining > 1
        ? void 0
        : ((r = this.Mzo.InitSkillCd(this.Entity, t.SkillId, t.SkillInfo)),
          this.iZr.set(e, r),
          this.FBn.set(e, t.SkillInfo),
          r))
    );
  }
  InitSkillCdBySkillInfo(i, e) {
    let t = this.iZr.get(i);
    if (t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "技能重复初始化", ["skillId", i]),
        t
      );
    try {
      const r = e.CooldownConfig;
      return r.SectionCount - r.SectionRemaining > 1
        ? void 0
        : ((t = this.Mzo.InitSkillCd(this.Entity, i, e)),
          this.iZr.set(i, t),
          this.FBn.set(i, e),
          t);
    } catch (t) {
      t instanceof Error
        ? CombatDebugController_1.CombatDebugController.CombatErrorWithStack(
            "Skill",
            this.Entity,
            "初始化技能CD异常",
            t,
            ["skillId", i],
            ["skillId", e?.SkillName],
            ["error", t.message],
          )
        : CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "初始化技能CD异常",
            ["skillId", i],
            ["skillId", e?.SkillName],
            ["error", t],
          );
    }
  }
  GetGroupSkillCdInfo(t) {
    return this.iZr.get(t);
  }
  IsSkillInCd(t, i = !0) {
    t = this.iZr.get(t);
    return !!t && (i ? !t.HasRemainingCount() : t.IsInCd());
  }
  ModifyCdInfo(t, i) {
    let e;
    return this.iZr
      ? !!(e = this.iZr.get(t)) && ((e.SkillCdInfoMap.get(t).SkillCd = i), !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            18,
            "角色技能组件还没有初始化，不允许修改技能CD",
          ),
        !1);
  }
  ModifyCdTime(t, i, e) {
    let r;
    if (t && t.length !== 0)
      if (t.length === 1)
        (r = this.iZr.get(Number(t[0]))) && r.ModifyRemainingCd(i, e);
      else {
        const o = new Set();
        for (const l of t) {
          const s = this.iZr.get(Number(l));
          s && o.add(s);
        }
        for (const n of o) n.ModifyRemainingCd(i, e);
      }
  }
  ModifyCdTimeBySkillGenres(t, i, e) {
    const r = new Array();
    for (const a of t) r.push(Number(a));
    let o;
    let s;
    let l;
    const n = new Set();
    for ([o, s] of this.FBn)
      r.includes(s.SkillGenre) && (l = this.iZr.get(o)) && n.add(l);
    for (const h of n) h.ModifyRemainingCd(i, e);
  }
  StartCd(t, i = -1) {
    const e = this.iZr.get(t);
    return !!e && (e.StartCd(t, this.eZr, i), !0);
  }
  SetLimitCount(t, i) {
    const e = this.iZr.get(t);
    return e
      ? (e.SetLimitCount(i), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "SetLimitCount 不存在该技能:",
            ["EntityId", this.Entity.Id],
            ["limitCount", i],
            ["skillID", t],
          ),
        !1);
  }
  ResetCdDelayTime(t) {
    let i = this.iZr.get(t);
    return i
      ? (i.ResetDelayCd() &&
          (((i = Protocol_1.Aki.Protocol.BNn.create()).vkn = t),
          CombatMessage_1.CombatNet.Call(11892, this.Entity, i, () => {}),
          this.Izo?.ResetMultiSkills(t, !0)),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            18,
            "修改CD不生效，该技能不记录CD",
            ["EntityId", this.Entity.Id],
            ["skillID", t],
          ),
        !1);
  }
  InitPassiveSkill(t) {
    const i = t.Id;
    let e = this.oZr.get(i);
    return (
      e ||
        ((e = this.tZr.InitPassiveSkillCd(this.Entity, t)), this.oZr.set(i, e)),
      e
    );
  }
  IsPassiveSkillInCd(t) {
    t = this.oZr.get(t);
    return !!t && t.IsInCd();
  }
  StartPassiveCd(t, i = -1) {
    const e = this.oZr.get(t);
    return !!e && (e.StartCd(t, i), !0);
  }
  GetPassiveSkillCdInfo(t) {
    return this.oZr.get(t);
  }
};
(CharacterSkillCdComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(186)],
  CharacterSkillCdComponent,
)),
  (exports.CharacterSkillCdComponent = CharacterSkillCdComponent);
// # sourceMappingURL=CharacterSkillCdComponent.js.map
