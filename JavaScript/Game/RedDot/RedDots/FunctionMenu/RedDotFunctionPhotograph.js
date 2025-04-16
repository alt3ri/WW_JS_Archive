"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionPhotograph = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPhotograph extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotFilter];
  }
  OnCheck() {
    return LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint,
      !0,
    );
  }
}
exports.RedDotFunctionPhotograph = RedDotFunctionPhotograph;
//# sourceMappingURL=RedDotFunctionPhotograph.js.map
