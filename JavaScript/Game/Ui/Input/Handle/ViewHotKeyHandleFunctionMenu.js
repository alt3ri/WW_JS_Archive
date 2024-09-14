"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleFunctionMenu = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelEventLockInputState_1 = require("../../../LevelGamePlay/LevelEventLockInputState"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleFunctionMenu extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  SpecialConditionCheck() {
    return (
      !(
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
        !ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
          2,
        )
      ) ||
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.InputDistribute,
        this.ActionName,
      ),
      !1)
    );
  }
  CheckHasInputLimit() {
    return (
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.includes(
        this.ViewName,
      )
    );
  }
}
exports.ViewHotKeyHandleFunctionMenu = ViewHotKeyHandleFunctionMenu;
//# sourceMappingURL=ViewHotKeyHandleFunctionMenu.js.map
