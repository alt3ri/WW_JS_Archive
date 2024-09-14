"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallStartView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ActivityController_1 = require("../../ActivityController"),
  ActivityRecallHelper_1 = require("./Misc/ActivityRecallHelper"),
  RecallTransitionStateMachine_1 = require("./RecallTransitionState/RecallTransitionStateMachine");
class ActivityRecallStartView extends UiViewBase_1.UiViewBase {
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
    ]),
      (this.BtnBindInfo = [[1, this.xMo]]);
  }
  OnStart() {
    this.Lle =
      new RecallTransitionStateMachine_1.RecallTransitionStateMachine();
  }
  OnBeforeShow() {
    this.Lle.Start();
  }
  OnBeforeDestroy() {
    this.Lle?.Clear();
  }
  PlayFirstShow() {}
  PlayRecallRewardTransition() {}
  GotoActivityViewAndCloseSelf() {
    (ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallFirstShow = !1),
      this.CloseMe();
    var e = ModelManager_1.ModelManager.ActivityRecallModel.ActivityId;
    0 !== e && ActivityController_1.ActivityController.OpenActivityById(e);
  }
}
exports.ActivityRecallStartView = ActivityRecallStartView;
//# sourceMappingURL=ActivityRecallStartView.js.map
