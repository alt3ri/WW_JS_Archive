"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginQueueTipsView = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class LoginQueueTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.vSi = void 0),
      (this.MSi = 0),
      (this.ESi = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.ESi]]);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.LoginModel.HasAutoLoginPromise() &&
      ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(!1);
  }
  OnStart() {
    switch (((this.vSi = this.GetViewParam()), this.vSi?.G9n)) {
      case 0:
        this.GetText(0).ShowTextNew("NormalWaitTipsText"),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "ExpectWaitingTimeText",
            Math.round(this.vSi.O9n / TimeUtil_1.TimeUtil.Minute)
              .toString()
              .padStart(2, "0"),
          ),
          this.SSi();
        break;
      case 1:
        this.GetText(0).ShowTextNew("specialWaitTipsText"),
          this.GetText(1).SetUIActive(!1),
          this.GetText(2).SetUIActive(!1);
    }
  }
  OnTick(i) {
    (this.MSi += i), this.SSi();
  }
  SSi() {
    var i, e;
    this.GetText(2).IsUIActiveInHierarchy() &&
      ((i = Math.round(TimeUtil_1.TimeUtil.SetTimeSecond(this.MSi))),
      (e = Math.floor(i / TimeUtil_1.TimeUtil.Minute)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "AddWaitingTimeText",
        e.toString().padStart(2, "0"),
        (i % TimeUtil_1.TimeUtil.Minute).toString().padStart(2, "0"),
      ));
  }
}
exports.LoginQueueTipsView = LoginQueueTipsView;
//# sourceMappingURL=LoginQueueTipsView.js.map
