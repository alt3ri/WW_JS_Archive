"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnDangoMonopolyCameraFocusOnMainDango =
    exports.LevelConditionOnDangoMonopolyViewShowProcessEnd =
    exports.LevelConditionOnDangoMonopolyViewStart =
    exports.LevelConditionOnDangoMonopolyMoveStop =
    exports.LevelConditionCheckDangoMonopolyHasFinishedRound =
      void 0);
const ActivityDangoMonopolyController_1 = require("../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDangoMonopolyHasFinishedRound extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return (
      0 <
      (ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.GetFinishedRoundNum() ??
        0)
    );
  }
}
exports.LevelConditionCheckDangoMonopolyHasFinishedRound =
  LevelConditionCheckDangoMonopolyHasFinishedRound;
class LevelConditionOnDangoMonopolyMoveStop extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...n) {
    var [n] = n;
    return !n;
  }
}
exports.LevelConditionOnDangoMonopolyMoveStop =
  LevelConditionOnDangoMonopolyMoveStop;
class LevelConditionOnDangoMonopolyViewStart extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return !0;
  }
}
exports.LevelConditionOnDangoMonopolyViewStart =
  LevelConditionOnDangoMonopolyViewStart;
class LevelConditionOnDangoMonopolyViewShowProcessEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...n) {
    var [n] = n;
    return !n;
  }
}
exports.LevelConditionOnDangoMonopolyViewShowProcessEnd =
  LevelConditionOnDangoMonopolyViewShowProcessEnd;
class LevelConditionOnDangoMonopolyCameraFocusOnMainDango extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o) {
    return !0;
  }
}
exports.LevelConditionOnDangoMonopolyCameraFocusOnMainDango =
  LevelConditionOnDangoMonopolyCameraFocusOnMainDango;
//# sourceMappingURL=LevelConditionDangoMonopolyGuide.js.map
