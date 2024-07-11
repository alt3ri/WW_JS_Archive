"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotInventoryCollection = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryCollection extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnAddCommonItemList,
      EventDefine_1.EEventName.OnRemoveItemRedDot,
    ];
  }
  OnCheck(e) {
    const n =
      ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(4);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventoryCollection = RedDotInventoryCollection;
// # sourceMappingURL=RedDotInventoryCollection.js.map
