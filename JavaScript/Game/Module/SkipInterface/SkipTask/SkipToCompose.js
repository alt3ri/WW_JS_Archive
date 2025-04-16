"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToCompose = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ComposeDefine_1 = require("../../Manufacture/Compose/ComposeDefine"),
  SkipTask_1 = require("./SkipTask");
class SkipToCompose extends SkipTask_1.SkipTask {
  OnRun(e, i, n, a) {
    e = Number(e);
    UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ComposeSwitchType,
          e,
          a,
        ),
        UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
          UiManager_1.UiManager.CloseView("ItemTipsView"))
      : (((a = new ComposeDefine_1.ComposeViewOpenData()).Type = e),
        (a.SelectData =
          ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem),
        UiManager_1.UiManager.OpenView("ComposeCarryOnView", a),
        (ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = void 0),
        UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
          UiManager_1.UiManager.CloseView("ItemTipsView"),
        this.Finish());
  }
}
exports.SkipToCompose = SkipToCompose;
//# sourceMappingURL=SkipToCompose.js.map
