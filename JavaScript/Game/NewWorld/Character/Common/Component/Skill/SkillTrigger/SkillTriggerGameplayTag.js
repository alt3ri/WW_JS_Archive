"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillTriggerGameplayTagHandle = void 0);
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  SkillBehaviorCondition_1 = require("../SkillBehavior/SkillBehaviorCondition"),
  SkillTriggerBase_1 = require("./SkillTriggerBase");
class SkillTriggerGameplayTag extends SkillTriggerBase_1.default {
  constructor() {
    super(...arguments), (this.TriggerData = void 0);
  }
}
exports.default = SkillTriggerGameplayTag;
class SkillTriggerGameplayTagHandle extends SkillTriggerBase_1.SkillTriggerBaseHandle {
  constructor() {
    super(...arguments),
      (this.cBe = void 0),
      (this.pZo = void 0),
      (this.Xte = void 0),
      (this.vVs = void 0),
      (this.MVs = new Map()),
      (this.Cer = []),
      (this.SVs = (i) => {
        var t;
        i &&
          (([i, t] = this.yzt(0, i.TagId)), i) &&
          this.cBe.BeginSkill(t, { Context: "技能触发器GameplayEvent" });
      }),
      (this.EVs = (i, t) => {
        t &&
          (([t, i] = this.yzt(1, i)), t) &&
          this.cBe.BeginSkill(i, { Context: "技能触发器OwnedTagAdded" });
      }),
      (this.yVs = (i, t) => {
        var [i, e] = this.yzt(2, i);
        i &&
          (t
            ? this.cBe.BeginSkill(e, { Context: "技能触发器OwnedTagPresent" })
            : this.cBe.EndSkill(e, "技能触发器OwnedTagPresent"));
      });
  }
  Create() {
    (this.cBe = this.Entity.CheckGetComponent(34)),
      (this.pZo = this.Entity.CheckGetComponent(17)),
      (this.Xte = this.Entity.CheckGetComponent(190));
  }
  Destroy() {
    this.vVs && this.vVs.EndTask();
    for (const i of this.Cer) i.EndTask();
  }
  AddSkillTrigger(t, e, s) {
    if ("None" === t.TriggerData.TriggerTag.TagName)
      CombatLog_1.CombatLog.Error(
        "Skill",
        this.Entity,
        "注册技能触发器失败，触发标签为空",
        ["技能Id", e],
        ["技能名", s.SkillName.toString()],
        ["触发器", t.GetName()],
      );
    else {
      var l = t.TriggerData.TriggerSource,
        a = t.TriggerData.TriggerTag.TagId;
      let i = this.MVs.get(l);
      if ((i || ((i = new Map()), this.MVs.set(l, i)), i.has(a)))
        CombatLog_1.CombatLog.Error(
          "Skill",
          this.Entity,
          "注册技能触发器失败，重复的触发器",
          ["技能Id", e],
          ["技能名", s.SkillName.toString()],
          ["触发器", t.GetName()],
        );
      else {
        switch ((i.set(a, [e, t]), l)) {
          case 0:
            this.vVs || (this.vVs = this.pZo.CreateGameplayEventTask(this.SVs));
            break;
          case 1:
            this.Cer.push(this.Xte.ListenForTagAddOrRemove(a, this.EVs));
            break;
          case 2:
            this.Cer.push(this.Xte.ListenForTagAddOrRemove(a, this.yVs));
        }
        CombatLog_1.CombatLog.Info(
          "Skill",
          this.Entity,
          "注册技能触发器成功",
          ["技能Id", e],
          ["技能名", s.SkillName.toString()],
          ["触发器", t.GetName()],
        );
      }
    }
  }
  yzt(i, t) {
    var e,
      i = this.MVs.get(i);
    return (i = i && i.get(t))
      ? (([i, e] = i),
        SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
          e.TriggerConditionGroup,
          e.TriggerConditionFormula,
          {
            Entity: this.Entity,
            SkillComponent: this.cBe,
            Skill: this.cBe.GetSkill(i),
          },
        )
          ? [!0, i]
          : (CombatLog_1.CombatLog.Info(
              "Skill",
              this.Entity,
              "技能触发器条件不满足",
              ["技能Id", i],
              ["技能名", e.GetName()],
              [
                "触发标签",
                GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t),
              ],
            ),
            [!1, 0]))
      : [!1, 0];
  }
}
exports.SkillTriggerGameplayTagHandle = SkillTriggerGameplayTagHandle;
//# sourceMappingURL=SkillTriggerGameplayTag.js.map
