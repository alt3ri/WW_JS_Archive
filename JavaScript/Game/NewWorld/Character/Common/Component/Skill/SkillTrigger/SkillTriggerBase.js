"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillTriggerBaseHandle = void 0);
const UE = require("ue");
class SkillTriggerBase extends UE.KuroBpDataAsset {
  constructor() {
    super(...arguments),
      (this.TriggerConditionGroup = void 0),
      (this.TriggerConditionFormula = "");
  }
}
exports.default = SkillTriggerBase;
class SkillTriggerBaseHandle {
  constructor(e) {
    this.Entity = e;
  }
  static Spawn(e) {
    e = new this(e);
    return e.Create(), e;
  }
  Create() {}
  Destroy() {}
  AddSkillTrigger(e, r, s) {}
}
exports.SkillTriggerBaseHandle = SkillTriggerBaseHandle;
//# sourceMappingURL=SkillTriggerBase.js.map
