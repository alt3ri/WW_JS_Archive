"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckGridHasExplored =
    exports.LevelConditionCheckMapRogueEventDetailShow =
    exports.LevelConditionOnMapRogueEventDetailShow =
    exports.LevelConditionOnMovieRogueMapMoveEnd =
    exports.LevelConditionOnMovieRogueLinkRefresh =
    exports.LevelConditionCheckMovieRogueFinishedEndingCount =
    exports.LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds =
      void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return (
      1 <
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetInstDungeonEndingTotalCount(
        o,
      )
    );
  }
}
exports.LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds =
  LevelConditionOnMovieRogueInfoRefreshWithMultipleEnds;
class LevelConditionCheckMovieRogueFinishedEndingCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var o;
    return (
      !!e.LimitParams &&
      ((o =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId()),
      (e = Number(e.LimitParams.get("TargetCount"))),
      ([o] =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingCount(
          o,
        )),
      e <= o)
    );
  }
}
exports.LevelConditionCheckMovieRogueFinishedEndingCount =
  LevelConditionCheckMovieRogueFinishedEndingCount;
class LevelConditionOnMovieRogueLinkRefresh extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnMovieRogueLinkRefresh =
  LevelConditionOnMovieRogueLinkRefresh;
class LevelConditionOnMovieRogueMapMoveEnd extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return !o;
  }
}
exports.LevelConditionOnMovieRogueMapMoveEnd =
  LevelConditionOnMovieRogueMapMoveEnd;
class LevelConditionOnMapRogueEventDetailShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...o) {
    var [o] = o;
    return o;
  }
}
exports.LevelConditionOnMapRogueEventDetailShow =
  LevelConditionOnMapRogueEventDetailShow;
class LevelConditionCheckMapRogueEventDetailShow extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments), (this.xC = !1);
  }
  Check(e, n, ...o) {
    return o && 0 < o.length && (this.xC = o[0]), this.xC;
  }
}
exports.LevelConditionCheckMapRogueEventDetailShow =
  LevelConditionCheckMapRogueEventDetailShow;
class LevelConditionCheckGridHasExplored extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = Number(e.LimitParams.get("GridIndex"));
    return (
      ModelManager_1.ModelManager.MapRogueModel.GameInfo?.MapGrids[e]
        ?.IsExplore ?? !1
    );
  }
}
exports.LevelConditionCheckGridHasExplored = LevelConditionCheckGridHasExplored;
//# sourceMappingURL=LevelConditionMovieRogueGuide.js.map
