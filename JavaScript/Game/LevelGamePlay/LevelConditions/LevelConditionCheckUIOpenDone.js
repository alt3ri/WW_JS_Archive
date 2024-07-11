"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckUIOpenDone = void 0);
const UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckUIOpenDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...r) {
    return (
      !(
        r.length < 1 ||
        ((r = r[0]), !(e = e.LimitParams.get("UIName"))) ||
        r !== e
      ) && UiManager_1.UiManager.IsViewOpen(e)
    );
  }
}
exports.LevelConditionCheckUIOpenDone = LevelConditionCheckUIOpenDone;
//# sourceMappingURL=LevelConditionCheckUIOpenDone.js.map
