"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventWaitTime = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventWaitTime extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.oUe = -0), (this.yRn = !1);
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, t) {
    (this.oUe = e.Time * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      e.BanInput &&
        ((this.yRn = !0),
        (ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput = !0),
        ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ForceReleaseInput,
        "LevelEventWait",
      ),
      this.oUe ||
        (this.yRn &&
          ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
            !1),
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
          (this.yRn = !1)),
        this.FinishExecute(!1));
  }
  OnTick(e) {
    (this.oUe -= e),
      this.oUe < 0 &&
        (this.yRn &&
          ((ModelManager_1.ModelManager.GeneralLogicTreeModel.DisableInput =
            !1),
          ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(),
          (this.yRn = !1)),
        this.FinishExecute(!0));
  }
  OnReset() {
    (this.yRn = !1), (this.oUe = 0);
  }
}
exports.LevelEventWaitTime = LevelEventWaitTime;
//# sourceMappingURL=LevelEventWaitTime.js.map
