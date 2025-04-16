"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonController = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../../ActivityControllerBase"),
  AvignonActivitySubView_1 = require("../View/AvignonActivitySubView");
class AvignonController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.gcc = (e) => {
        ModelManager_1.ModelManager.AvignonModel.AvignonInfoUpdate(e);
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16416, this.gcc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16416);
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["AvignonActivityMainView", "AvignonStageTaskView"])
      if (UiManager_1.UiManager.IsViewOpen(e)) return !0;
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_CollegeThemeGuide";
  }
  OnCreateSubPageComponent(e) {
    return new AvignonActivitySubView_1.AvignonActivitySubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.AvignonModel.GetAvigonoProtocolData();
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("ActivityUnlockTipAvignonView");
  }
  static RequestTaskReward(t) {
    var e = new Protocol_1.Aki.Protocol.Enc(),
      r =
        ((e.gps = t),
        ModelManager_1.ModelManager.AvignonModel.GetAvignonActivityId());
    (e.w6n = r),
      Net_1.Net.Call(17865, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                27375,
              )
            : ModelManager_1.ModelManager.AvignonModel.UpdateTaskRewardStatus(
                t,
              ));
      });
  }
}
exports.AvignonController = AvignonController;
//# sourceMappingURL=AvignonController.js.map
