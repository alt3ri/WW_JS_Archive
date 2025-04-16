"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreSkillFlagModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ExploreSkillFlagDefine_1 = require("./ExploreSkillFlagDefine");
class ExploreSkillFlagModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Cd_ = new Map());
  }
  OnInit() {
    for (var [e, l] of ExploreSkillFlagDefine_1.levelExploreSkillFlagDefaultVal)
      this.Cd_.set(e, l);
    return !0;
  }
  OnClear() {
    return this.Cd_.clear(), !0;
  }
  GetExploreSkillFlagEnable(e) {
    return this.Cd_.get(e) ?? !0;
  }
  SetExploreSkillFlagEnable(e, l) {
    this.Cd_.get(e) !== l &&
      (this.Cd_.set(e, l), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Functional",
        31,
        "探索技能标记更新",
        ["skillType", e],
        ["enable", l],
      );
  }
  DisableAllExploreSkillFlag() {
    for (var [e] of this.Cd_) this.SetExploreSkillFlagEnable(e, !1);
  }
  EnableAllExploreSkillFlag() {
    for (var [e] of this.Cd_) this.SetExploreSkillFlagEnable(e, !0);
  }
}
exports.ExploreSkillFlagModel = ExploreSkillFlagModel;
//# sourceMappingURL=ExploreSkillFlagModel.js.map
