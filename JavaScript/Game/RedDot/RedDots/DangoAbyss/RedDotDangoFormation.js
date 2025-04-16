"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoFormation = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoFormation extends RedDotBase_1.RedDotBase {
  IsAllEventParamAsUId() {
    return !1;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssDangoRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoFormationNewRedDot();
  }
}
exports.RedDotDangoFormation = RedDotDangoFormation;
//# sourceMappingURL=RedDotDangoFormation.js.map
