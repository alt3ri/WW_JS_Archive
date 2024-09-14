"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialSkillBase = void 0);
class SpecialSkillBase {
  constructor(e) {
    this.SpecialSkillComponent = e;
  }
  static Spawn(e) {
    return new this(e);
  }
  OnStart() {}
  OnEnd() {}
  OnTick(e) {}
  OnEnable() {}
  OnDisable() {}
}
exports.SpecialSkillBase = SpecialSkillBase;
//# sourceMappingURL=SpecialSkillBase.js.map
