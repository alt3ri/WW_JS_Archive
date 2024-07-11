"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayFlowBehaviorNode = void 0);
const ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class PlayFlowBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
  get CorrelativeEntities() {}
  OnCreate(e) {
    return !!super.OnCreate(e) && e.Condition.Type === "PlayFlow";
  }
}
exports.PlayFlowBehaviorNode = PlayFlowBehaviorNode;
// # sourceMappingURL=PlayFlowBehaviorNode.js.map
