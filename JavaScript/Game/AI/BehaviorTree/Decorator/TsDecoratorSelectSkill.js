"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  AiLibrary_1 = require("../../Common/AiLibrary");
class TsDecoratorSelectSkill extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.SkillType = -1),
      (this.DebugLog = !1),
      (this.IsInitTsVariables = !1),
      (this.TsSkillType = 0),
      (this.TsDebugLog = !1);
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsSkillType = 0),
      (this.TsDebugLog = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSkillType = this.SkillType),
      (this.TsDebugLog = this.DebugLog));
  }
  PerformConditionCheckAI(r, i) {
    var t,
      e,
      s = r.AiController;
    return s
      ? (this.InitTsVariables(),
        s.AiSkill
          ? !!(t = s.CharAiDesignComp.Entity.GetComponent(39)).Valid &&
            ((e = s.AiHateList.GetCurrentTarget())?.Valid
              ? AiLibrary_1.AiLibrary.SelectSkillWithTarget(
                  s,
                  t,
                  e.Entity.GetComponent(3),
                  this.TsSkillType,
                  this.TsDebugLog,
                )
              : AiLibrary_1.AiLibrary.SelectSkillWithoutTarget(
                  s,
                  t,
                  this.TsSkillType,
                ))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能", [
                "AiBaseId",
                s.AiBase.Id,
              ]),
            !1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1);
  }
}
exports.default = TsDecoratorSelectSkill;
//# sourceMappingURL=TsDecoratorSelectSkill.js.map
