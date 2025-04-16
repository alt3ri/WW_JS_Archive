"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnCiacconaChapterRestart =
    exports.LevelConditionOnCiacconaChapterFirstStart =
    exports.LevelConditionOnCiacconaAvgInspirationChoiceShow =
      void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnCiacconaAvgInspirationChoiceShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    var [t] = t;
    return t;
  }
}
exports.LevelConditionOnCiacconaAvgInspirationChoiceShow =
  LevelConditionOnCiacconaAvgInspirationChoiceShow;
class LevelConditionOnCiacconaChapterFirstStart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !0;
  }
}
exports.LevelConditionOnCiacconaChapterFirstStart =
  LevelConditionOnCiacconaChapterFirstStart;
class LevelConditionOnCiacconaChapterRestart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !0;
  }
}
exports.LevelConditionOnCiacconaChapterRestart =
  LevelConditionOnCiacconaChapterRestart;
//# sourceMappingURL=LevelConditionCiacconaAvgGuide.js.map
