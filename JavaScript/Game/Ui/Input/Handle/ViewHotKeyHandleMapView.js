"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandleMapView = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleMapView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  SpecialConditionCheck() {
    return (
      !ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower() &&
      !ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss()
    );
  }
}
exports.ViewHotKeyHandleMapView = ViewHotKeyHandleMapView;
//# sourceMappingURL=ViewHotKeyHandleMapView.js.map
