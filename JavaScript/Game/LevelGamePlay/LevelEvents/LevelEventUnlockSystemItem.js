"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventUnlockSystemItem = void 0);
const IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUnlockSystemItem extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    e &&
      (e.SystemOption.Type === IAction_1.EUnlockSystemItemType.CookSystem &&
        ControllerHolder_1.ControllerHolder.CookController.SendInteractiveUpdateRequest(
          e.SystemOption?.UnlockOption?.CookBookId,
        ),
      e.SystemOption.Type === IAction_1.EUnlockSystemItemType.AtlasSystem &&
        (e.SystemOption.UnlockOption.Type ===
        IAction_1.EUnlockAtlasSystemType.PlotPhoto
          ? ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedUnlockRequest(
              7,
              e.SystemOption.UnlockOption.Id,
            )
          : e.SystemOption.UnlockOption.Type ===
              IAction_1.EUnlockAtlasSystemType.GeographicalAtlas &&
            ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedUnlockRequest(
              2,
              e.SystemOption.UnlockOption.Id,
            )),
      e.SystemOption.Type ===
        IAction_1.EUnlockSystemItemType.AchievementSystem) &&
      ControllerHolder_1.ControllerHolder.AchievementController.RequestAchievementFinish(
        e.SystemOption.Id,
      );
  }
}
exports.LevelEventUnlockSystemItem = LevelEventUnlockSystemItem;
//# sourceMappingURL=LevelEventUnlockSystemItem.js.map
