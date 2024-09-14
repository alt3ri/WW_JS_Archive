"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckTeleportStatus = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeleportStatus extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    return (
      !!e.LimitParams &&
      ((r = e.LimitParams.get("TeleportId")),
      (e = e.LimitParams.get("State")),
      !!r) &&
      (1 === (e ? parseInt(e) : 0)
        ? (ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
            parseInt(r),
          ) ?? !1)
        : !ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(
            parseInt(r),
          ))
    );
  }
}
exports.LevelConditionCheckTeleportStatus = LevelConditionCheckTeleportStatus;
//# sourceMappingURL=LevelConditionCheckTeleportStatus.js.map
