"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionPhantomExploreSet = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPhantomExploreSet extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RouletteRefreshRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.RouletteModel.CheckHasAnyRedDotItem();
  }
}
exports.RedDotFunctionPhantomExploreSet = RedDotFunctionPhantomExploreSet;
//# sourceMappingURL=RedDotFunctionPhantomExploreSet.js.map
