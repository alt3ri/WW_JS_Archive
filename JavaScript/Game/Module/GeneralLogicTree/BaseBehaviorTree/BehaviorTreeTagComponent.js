"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeTagContainer = void 0);
class BehaviorTreeTagContainer {
  constructor() {
    (this.mQt = void 0), (this.mQt = new Map());
  }
  AddTag(e) {
    this.mQt.set(e, !0);
  }
  RemoveTag(e) {
    this.mQt.delete(e);
  }
  ContainTag(e) {
    return this.mQt.get(e) ?? !1;
  }
}
exports.BehaviorTreeTagContainer = BehaviorTreeTagContainer;
//# sourceMappingURL=BehaviorTreeTagComponent.js.map
