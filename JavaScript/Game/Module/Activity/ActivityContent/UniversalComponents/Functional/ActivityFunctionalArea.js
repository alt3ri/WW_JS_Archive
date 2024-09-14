"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityFunctionalArea = void 0);
const UE = require("ue"),
  LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../../../Common/Button/ButtonSpriteItem"),
  ActivityButtonItem_1 = require("./ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("./ActivityFunctionalTypeA");
class ActivityFunctionalArea extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Data = t),
      (this.FunctionButton = void 0),
      (this.CircleButton = void 0),
      (this.PanelLock = void 0),
      (this.X$a = () => {
        this.Data &&
          ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
            this.Data,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [],
      e = this.GetItem(0),
      e =
        ((this.PanelLock =
          new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock()),
        t.push(this.PanelLock.CreateByActorAsync(e.GetOwner())),
        this.GetItem(3)),
      e =
        ((this.CircleButton = new ButtonSpriteItem_1.ButtonSpriteItem()),
        t.push(this.CircleButton.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(1));
    (this.FunctionButton = new ActivityButtonItem_1.ActivityButtonItem()),
      t.push(this.FunctionButton.CreateThenShowByActorAsync(e.GetOwner())),
      await Promise.all(t);
  }
  OnStart() {
    this.FunctionButton.SetExtraFunction(this.X$a),
      this.SetRewardRedDotVisible(!1);
  }
  SetLockTextByTextId(t, ...e) {
    this.PanelLock.SetTextByTextId(t, ...e);
  }
  SetLockTextByText(t) {
    this.PanelLock.SetTextByText(t);
  }
  SetLockSpriteVisible(t) {
    this.PanelLock.SetSpriteVisible(t);
  }
  SetPanelConditionVisible(t) {
    this.GetItem(0).SetUIActive(t);
  }
  SetRewardButtonVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetRewardButtonFunction(t) {
    this.CircleButton.SetFunction(t);
  }
  SetRewardRedDotVisible(t) {
    this.CircleButton.SetRedDotVisible(t);
  }
  BindRewardRedDot(t, e = 0) {
    this.CircleButton.BindRedDot(t, e);
  }
  UnbindRewardRedDot() {
    this.CircleButton.UnBindRedDot();
  }
  SetFunctionButtonVisible(t) {
    this.FunctionButton?.SetUiActive(t);
  }
  SetPerformanceOpenTimeOver() {
    this.SetPanelConditionVisible(!0),
      this.SetLockTextByTextId("Activity_EndDesc01"),
      this.PanelLock.SetButtonVisible(!1),
      this.SetRewardButtonVisible(!1),
      this.FunctionButton.SetUiActive(!1);
  }
  SetPerformanceConditionLock(t, e) {
    this.SetPanelConditionVisible(!0), this.PanelLock.SetButtonVisible(!0);
    t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t);
    t && this.SetLockTextByTextId(t),
      (this.PanelLock.ButtonCallBack = () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(
          e,
        );
      });
  }
}
exports.ActivityFunctionalArea = ActivityFunctionalArea;
//# sourceMappingURL=ActivityFunctionalArea.js.map
