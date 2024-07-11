"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotInventoryMissionItem = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryMissionItem extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnAddCommonItemList,
      EventDefine_1.EEventName.OnRemoveItemRedDot,
    ];
  }
  OnCheck(e) {
    var n =
      ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(6);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventoryMissionItem = RedDotInventoryMissionItem;
//# sourceMappingURL=RedDotInventoryMissionItem.js.map
