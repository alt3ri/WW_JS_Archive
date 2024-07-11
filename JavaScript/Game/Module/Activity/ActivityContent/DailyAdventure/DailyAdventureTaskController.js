"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureTaskController = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController");
class DailyAdventureTaskController extends UiControllerBase_1.UiControllerBase {
  static TrackTaskByType(e, r) {
    switch (e) {
      case 1:
        break;
      case 2:
        var o = [];
        for (const a of r) o.push(Number(a));
        DailyAdventureTaskController.dOe(o);
        break;
      case 3: {
        let e = "DailyActivityTabView";
        r && 1 <= r.length && (e = r[0]), DailyAdventureTaskController.COe(e);
        break;
      }
    }
  }
  static dOe(e) {
    let r = 0;
    1 < e.length &&
      ((o = ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e[0])),
      (r = o ? e[0] : e[1]));
    var o = { MarkId: r, MarkType: 0, OpenAreaId: 0 };
    WorldMapController_1.WorldMapController.OpenView(2, !1, o);
  }
  static COe(e) {
    RoleController_1.RoleController.OpenRoleMainView(0, 0, [], e);
  }
}
exports.DailyAdventureTaskController = DailyAdventureTaskController;
//# sourceMappingURL=DailyAdventureTaskController.js.map
