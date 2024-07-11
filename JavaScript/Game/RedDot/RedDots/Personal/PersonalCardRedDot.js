"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class PersonalCardRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPersonalCardRefreshRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PersonalModel.GetPersonalCardRedDotState();
  }
}
exports.PersonalCardRedDot = PersonalCardRedDot;
//# sourceMappingURL=PersonalCardRedDot.js.map
