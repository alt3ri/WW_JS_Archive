"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, i) {
    var o,
      n = arguments.length,
      a =
        n < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, r, i);
    else
      for (var s = e.length - 1; 0 <= s; s--)
        (o = e[s]) && (a = (n < 3 ? o(a) : 3 < n ? o(t, r, a) : o(t, r)) || a);
    return 3 < n && a && Object.defineProperty(t, r, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillTriggerComponent = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  TriggerType_1 = require("../Abilities/Trigger/TriggerType");
let CharacterSkillTriggerComponent = class CharacterSkillTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.cBe = void 0),
      (this.EIe = void 0),
      (this.dHs = void 0);
  }
  OnInit() {
    return (
      (this.cBe = this.Entity.CheckGetComponent(34)),
      (this.EIe = this.Entity.CheckGetComponent(0)),
      (this.dHs = this.Entity.CheckGetComponent(25)),
      !0
    );
  }
  OnStart() {
    return !0;
  }
  OnActivate() {
    return this.fVs(), !0;
  }
  OnEnd() {
    return !0;
  }
  fVs() {
    if (this.cBe.DtSkillInfo) {
      var e = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
        this.cBe.DtSkillInfo,
        e,
      );
      for (const l of e) {
        var t = Number(l),
          r = this.cBe.GetSkillInfo(t);
        this.pVs(t, r);
      }
    }
    let i = [];
    switch (this.EIe.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        i =
          ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        i =
          ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        i =
          ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
    }
    for (const g of i) {
      var o = Number(g),
        n = this.cBe.GetSkillInfo(o);
      this.pVs(o, n);
    }
    if (this.cBe.DtSkillInfoExtra) {
      e = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
        this.cBe.DtSkillInfoExtra,
        e,
      );
      for (const c of e) {
        var a = Number(c),
          s = this.cBe.GetSkillInfo(a);
        this.pVs(a, s);
      }
    }
  }
  pVs(r, t) {
    if (t)
      for (let e = 0; e < t.SkillTriggers.Num(); e++) {
        var i,
          o = t.SkillTriggers.Get(e),
          n = [];
        if (o.TriggerPreset)
          for (let e = 0; e < o.TriggerPreset.Num(); e++)
            n.push(o.TriggerPreset.Get(e));
        TriggerType_1.ETriggerEvent[o.TriggerType] ===
        TriggerType_1.ETriggerEvent.GlobalDamageTrigger
          ? CombatLog_1.CombatLog.Error(
              "Skill",
              this.Entity,
              "禁止白名单之外的技能使用全局伤害监听",
              ["skillId", r],
            )
          : ((i = this.dHs.AddTrigger(
              {
                Type: o.TriggerType,
                Preset: n,
                Params: o.TriggerParams || "{}",
                Formula: o.TriggerFormula || "TRUE",
              },
              (e, t) => {
                this.cBe.BeginSkill(r, { Context: "技能触发器触发" });
              },
            )),
            this.dHs.SetTriggerActive(i, !0));
      }
  }
  AddSkillTriggerDebug(e, t) {
    this.pVs(e, t);
  }
};
(CharacterSkillTriggerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(193)],
  CharacterSkillTriggerComponent,
)),
  (exports.CharacterSkillTriggerComponent = CharacterSkillTriggerComponent);
//# sourceMappingURL=CharacterSkillTriggerComponent.js.map
