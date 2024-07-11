"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckOnSelectSettingMainType = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckOnSelectSettingMainType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var a;
    return (
      !!e.LimitParams &&
      !!(e = e.LimitParams.get("MainType")) &&
      !!UiManager_1.UiManager.IsViewOpen("MenuView") &&
      ((a = UiManager_1.UiManager.GetViewByName("MenuView")),
      parseInt(e) === a.MenuViewDataExternal.MenuViewDataCurMainType)
    );
  }
}
exports.LevelConditionCheckOnSelectSettingMainType =
  LevelConditionCheckOnSelectSettingMainType;
//# sourceMappingURL=LevelConditionCheckOnSelectSettingMainType.js.map
