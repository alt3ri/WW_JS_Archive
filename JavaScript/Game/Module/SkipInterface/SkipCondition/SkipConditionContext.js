"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipConditionContext = void 0);
const SkipConditionDefine_1 = require("./SkipConditionDefine");
class SkipConditionContext {
  Check(i, e) {
    i = SkipConditionDefine_1.skipConditionCheckerMap.get(i);
    return !!i && i.Check(e);
  }
}
exports.SkipConditionContext = SkipConditionContext;
//# sourceMappingURL=SkipConditionContext.js.map
