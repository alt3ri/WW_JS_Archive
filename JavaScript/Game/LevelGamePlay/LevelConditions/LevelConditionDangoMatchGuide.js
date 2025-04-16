"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDangoMatchFinalEnd =
    exports.LevelConditionCheckDangoMatchPlayerNumType =
    exports.LevelConditionCheckDangoMatchState =
    exports.LevelConditionOnEnterDangoMatchView =
      void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnEnterDangoMatchView extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    return !0;
  }
}
exports.LevelConditionOnEnterDangoMatchView =
  LevelConditionOnEnterDangoMatchView;
class LevelConditionCheckDangoMatchState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n;
    return (
      !!e.LimitParams &&
      ((e = Number(e.LimitParams.get("State"))),
      !!(n =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData())) &&
      !!(n = n.GetCurLegMatchData()) &&
      n.GetLegMatchState() === e
    );
  }
}
exports.LevelConditionCheckDangoMatchState = LevelConditionCheckDangoMatchState;
class LevelConditionCheckDangoMatchPlayerNumType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n, t;
    return (
      !!e.LimitParams &&
      ((e = Number(e.LimitParams.get("Type"))),
      !!(n =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData())) &&
      !!(n = n.GetCurLegMatchData()) &&
      ((t = n.GetLegMatchState()),
      n.GetRacingBetsMainViewActorShowType(t) === e)
    );
  }
}
exports.LevelConditionCheckDangoMatchPlayerNumType =
  LevelConditionCheckDangoMatchPlayerNumType;
class LevelConditionCheckDangoMatchFinalEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var n,
      t = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return (
      !!t &&
      !!(t = t.GetCurLegMatchData()) &&
      ((n = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(t.Id)),
      (t = 4 === t.GetLegMatchState()),
      n) &&
      t
    );
  }
}
exports.LevelConditionCheckDangoMatchFinalEnd =
  LevelConditionCheckDangoMatchFinalEnd;
//# sourceMappingURL=LevelConditionDangoMatchGuide.js.map
