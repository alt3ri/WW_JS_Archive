"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureTaskController = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController");
class DailyAdventureTaskController extends UiControllerBase_1.UiControllerBase {
  static TrackTaskByType(e, r) {
    switch (e) {
      case 1:
        break;
      case 2:
        var a = [];
        for (const o of r) a.push(Number(o));
        DailyAdventureTaskController.dOe(a);
        break;
      case 3: {
        let e = "DailyActivityTabView";
        r && 1 <= r.length && (e = r[0]), DailyAdventureTaskController.COe(e);
        break;
      }
      case 4:
        var l = Number(r[0]);
        DailyAdventureTaskController.gha(l);
    }
  }
  static dOe(e) {
    let r = 0;
    1 < e.length &&
      ((a = ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e[0])),
      (r = a ? e[0] : e[1]));
    var a = { MarkId: r, MarkType: 0, OpenAreaId: 0 };
    WorldMapController_1.WorldMapController.OpenView(2, !1, a);
  }
  static COe(e) {
    RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
  }
  static gha(e) {
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(e);
  }
}
exports.DailyAdventureTaskController = DailyAdventureTaskController;
//# sourceMappingURL=DailyAdventureTaskController.js.map
