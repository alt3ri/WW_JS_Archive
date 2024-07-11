"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotInventoryWeapon = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInventoryWeapon extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnAddWeaponItem,
      EventDefine_1.EEventName.OnRemoveItemRedDot,
    ];
  }
  OnCheck(e) {
    const n =
      ModelManager_1.ModelManager.InventoryModel.GetItemMainTypeMapping(2);
    return !!n && n.HasRedDot();
  }
}
exports.RedDotInventoryWeapon = RedDotInventoryWeapon;
// # sourceMappingURL=RedDotInventoryWeapon.js.map
