"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityShipTowerController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityShipTowerData_1 = require("./ActivityShipTowerData"),
  ActivitySubViewShipTower_1 = require("./ActivitySubViewShipTower");
class ActivityShipTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.J7_ = () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(
          this.Data?.Id,
        );
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowingTower2";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewShipTower_1.ActivitySubViewShipTower();
  }
  OnCreateActivityData(e) {
    return (
      (this.Data = new ActivityShipTowerData_1.ActivityShipTowerData()),
      this.Data
    );
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenActivityViewShipTower,
      this.J7_,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenActivityViewShipTower,
      this.J7_,
    );
  }
  static RefreshActivityRedDot() {
    ModelManager_1.ModelManager.ActivityModel.GetCurrentActivitiesByType(
      Protocol_1.Aki.Protocol.uks.Proto_SlashAndTowerLevelPlay,
    ).forEach((e) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.Id,
      );
    });
  }
}
exports.ActivityShipTowerController = ActivityShipTowerController;
//# sourceMappingURL=ActivityShipTowerController.js.map
