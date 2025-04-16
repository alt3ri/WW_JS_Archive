"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressStartupView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  SplashScreenController_1 = require("../../../../SplashScreen/SplashScreenController"),
  ActivityController_1 = require("../../../ActivityController"),
  RegressTransitionStateMachine_1 = require("./RegressTransitionStateMachine");
class ActivityRegressStartupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Lle = void 0),
      (this.xMo = () => {
        this.Lle.PlayNextState();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.xMo]]);
  }
  OnStart() {
    this.Lle =
      new RegressTransitionStateMachine_1.RegressTransitionStateMachine();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    this.GetItem(2).SetUIActive(1 === e), this.GetItem(3).SetUIActive(2 === e);
  }
  OnBeforeShow() {
    (ModelManager_1.ModelManager.ActivityRegressModel.AlreadyStartView = !0),
      SplashScreenController_1.SplashScreenController.FinishCurTask(4),
      this.Lle.Start();
  }
  OnBeforeDestroy() {
    this.Lle.ShutDown();
  }
  GotoActivityViewAndCloseSelf() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetFirstShowChecked(),
      this.CloseMe();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
    0 !== e && ActivityController_1.ActivityController.OpenActivityById(e);
  }
}
exports.ActivityRegressStartupView = ActivityRegressStartupView;
//# sourceMappingURL=ActivityRegressStartupView.js.map
