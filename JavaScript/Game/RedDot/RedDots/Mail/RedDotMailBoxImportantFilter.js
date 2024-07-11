"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotMailBoxImportantFilter = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMailBoxImportantFilter extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.SwitchUnfinishedFlag,
      EventDefine_1.EEventName.OnPlayerLevelChanged,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MailModel.GetRedDotImportant();
  }
}
exports.RedDotMailBoxImportantFilter = RedDotMailBoxImportantFilter;
// # sourceMappingURL=RedDotMailBoxImportantFilter.js.map
