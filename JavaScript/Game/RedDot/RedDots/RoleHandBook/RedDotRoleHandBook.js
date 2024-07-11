"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRoleHandBook = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleHandBook extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.RedDotRefreshItemData,
      EventDefine_1.EEventName.RedDotStart,
    ];
  }
  OnCheck() {
    const n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1);
    const o = n.length;
    for (let e = 0; e < o; e++) {
      var r;
      var a;
      let t = n[e];
      let i = t.Id;
      if (t.PartyId !== 9) {
        let e = void 0;
        let n = void 0;
        for ([r, a] of t.ExchangeConsume) {
          (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r)), (n = a);
          break;
        }
        (t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i)),
          (i =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              e.Id,
            ));
        if (!(void 0 !== t) && i >= n) return !0;
      }
    }
    return !1;
  }
}
exports.RedDotRoleHandBook = RedDotRoleHandBook;
// # sourceMappingURL=RedDotRoleHandBook.js.map
