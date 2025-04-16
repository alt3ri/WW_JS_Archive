"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnSkillButtonDataRefresh = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnSkillButtonDataRefresh extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments), (this.MGl = -1), (this.xk_ = -1), (this.yGl = -1);
  }
  Check(e, t, ...s) {
    var i = ModelManager_1.ModelManager.SkillButtonUiModel,
      e = e.LimitParams.get("skillId");
    return (
      void 0 !== e &&
      0 !== s.length &&
      ((s = s[0]),
      this.yGl !== s && ((this.yGl = s), (this.MGl = -1), (this.xk_ = -1)),
      (s = Number(e)),
      (e = i.GetSkillButtonIndexByButton(s)),
      (i = i.GetSkillButtonDataByButton(s)?.GetSkillId()),
      -1 === this.MGl && -1 === this.xk_
        ? ((this.MGl = e), (this.xk_ = i ?? -1), !0)
        : this.MGl === e && this.xk_ === i)
    );
  }
}
exports.LevelConditionOnSkillButtonDataRefresh =
  LevelConditionOnSkillButtonDataRefresh;
//# sourceMappingURL=LevelConditionOnSkillButtonDataRefresh.js.map
