"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeTagContainer = void 0);
const DEFAULET_REASON = "";
class BehaviorTreeTagContainer {
  constructor() {
    this.mQt = new Map();
  }
  AddTag(e, t = DEFAULET_REASON) {
    let s = this.mQt.get(e);
    (s = s || new Set()).add(t), this.mQt.set(e, s);
  }
  RemoveTag(e, t = DEFAULET_REASON) {
    var s = this.mQt.get(e);
    s && (s.delete(t), 0 === s.size) && this.mQt.delete(e);
  }
  ContainTag(e) {
    return void 0 !== this.mQt.get(e);
  }
}
exports.BehaviorTreeTagContainer = BehaviorTreeTagContainer;
//# sourceMappingURL=BehaviorTreeTagComponent.js.map
