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
  Constructor() {
    super.Constructor();
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
          this.cBe.BeginSkill(t, { Reason: "技能触发器GameplayEvent" });
      }),
      (this.EVs = (i, t) => {
        t &&
          (([t, i] = this.yzt(1, i)), t) &&
          this.cBe.BeginSkill(i, { Reason: "技能触发器OwnedTagAdded" });
      }),
      (this.yVs = (i, t) => {
        var [i, s] = this.yzt(2, i);
        i &&
          (t
            ? this.cBe.BeginSkill(s, { Reason: "技能触发器OwnedTagPresent" })
            : this.cBe.EndSkill(s, "技能触发器OwnedTagPresent"));
      });
  }
  Create() {
    (this.cBe = this.Entity.CheckGetComponent(38)),
      (this.pZo = this.Entity.CheckGetComponent(17)),
      (this.Xte = this.Entity.CheckGetComponent(203));
  }
  Destroy() {
    this.vVs && this.vVs.EndTask();
    for (const i of this.Cer) i.EndTask();
  }
  AddSkillTrigger(t, s, e) {
    if ("None" === t.TriggerData.TriggerTag.TagName)
      CombatLog_1.CombatLog.Error(
        "Skill",
        this.Entity,
        "注册技能触发器失败，触发标签为空",
        ["技能Id", s],
        ["技能名", e.SkillName.toString()],
        ["触发器", t.GetName()],
      );
    else {
      var a = t.TriggerData.TriggerSource,
        l = t.TriggerData.TriggerTag.TagId;
      let i = this.MVs.get(a);
      if ((i || ((i = new Map()), this.MVs.set(a, i)), i.has(l)))
        CombatLog_1.CombatLog.Error(
          "Skill",
          this.Entity,
          "注册技能触发器失败，重复的触发器",
          ["技能Id", s],
          ["技能名", e.SkillName.toString()],
          ["触发器", t.GetName()],
        );
      else {
        switch ((i.set(l, [s, t]), a)) {
          case 0:
            this.vVs || (this.vVs = this.pZo.CreateGameplayEventTask(this.SVs));
            break;
          case 1:
            this.Cer.push(this.Xte.ListenForTagAddOrRemove(l, this.EVs));
            break;
          case 2:
            this.Cer.push(this.Xte.ListenForTagAddOrRemove(l, this.yVs));
        }
        CombatLog_1.CombatLog.Info(
          "Skill",
          this.Entity,
          "注册技能触发器成功",
          ["技能Id", s],
          ["技能名", e.SkillName.toString()],
          ["触发器", t.GetName()],
        );
      }
    }
  }
  yzt(i, t) {
    var s,
      i = this.MVs.get(i);
    return (i = i && i.get(t))
      ? (([i, s] = i),
        SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
          s.TriggerConditionGroup,
          s.TriggerConditionFormula,
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
              ["技能名", s.GetName()],
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
