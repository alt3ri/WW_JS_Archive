"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NiagaraMenuData = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  MenuData_1 = require("../MenuData");
class NiagaraMenuData extends MenuData_1.MenuData {
  OnSet(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetNiagaraQuality);
  }
}
exports.NiagaraMenuData = NiagaraMenuData;
//# sourceMappingURL=NiagaraMenuData.js.map
