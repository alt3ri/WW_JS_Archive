"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionalPanelConditionActivate =
    exports.FunctionalPanelConditionLock =
    exports.ActivityFunctionalTypeA =
      void 0);
const UE = require("ue"),
  LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../../../Common/Button/ButtonSpriteItem"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityButtonItem_1 = require("./ActivityButtonItem");
class ActivityFunctionalTypeA extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Data = t),
      (this.FunctionButton = void 0),
      (this.CircleButton = void 0),
      (this.PanelLock = void 0),
      (this.PanelActivate = void 0),
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
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [],
      e = this.GetItem(0),
      e =
        ((this.PanelLock = new FunctionalPanelConditionLock()),
        t.push(this.PanelLock.CreateByActorAsync(e.GetOwner())),
        this.GetItem(2)),
      e =
        ((this.PanelActivate = new FunctionalPanelConditionActivate()),
        t.push(this.PanelActivate.CreateByActorAsync(e.GetOwner())),
        this.GetItem(1)),
      e =
        ((this.FunctionButton = new ActivityButtonItem_1.ActivityButtonItem()),
        this.FunctionButton.SetExtraFunction(this.X$a),
        t.push(this.FunctionButton.CreateThenShowByActorAsync(e.GetOwner())),
        this.GetItem(5));
    (this.CircleButton = new ButtonSpriteItem_1.ButtonSpriteItem()),
      t.push(this.CircleButton.CreateByActorAsync(e.GetOwner())),
      await Promise.all(t),
      this.SetRewardButtonVisible(!1);
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
  SetLockConditionButtonVisible(t) {
    this.PanelLock.SetButtonVisible(t);
  }
  SetActivateTextByTextId(t, ...e) {
    this.PanelActivate.SetTextByTextId(t, ...e);
  }
  SetActivateTextByText(t) {
    this.PanelActivate.SetTextByText(t);
  }
  SetActivateSpriteVisible(t) {
    this.PanelActivate.SetSpriteVisible(t);
  }
  SetActivatePanelConditionVisible(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetRewardButtonVisible(t) {
    this.GetItem(4).SetUIActive(t);
  }
  SetFunctionRedDotVisible(t) {
    this.FunctionButton.SetRedDotVisible(t);
  }
  SetPerformanceOpenTimeOver() {
    this.SetPanelConditionVisible(!0),
      this.SetLockTextByTextId("Activity_EndDesc01"),
      this.SetActivatePanelConditionVisible(!1),
      this.SetLockConditionButtonVisible(!1),
      this.SetRewardButtonVisible(!1),
      this.FunctionButton.SetUiActive(!1);
  }
  SetPerformanceConditionLock(t, e) {
    this.SetPanelConditionVisible(!0),
      this.SetActivatePanelConditionVisible(!1),
      this.SetLockConditionButtonVisible(!0);
    t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t);
    t && this.SetLockTextByTextId(t),
      (this.PanelLock.ButtonCallBack = () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(
          e,
        );
      });
  }
}
exports.ActivityFunctionalTypeA = ActivityFunctionalTypeA;
class FunctionalPanelConditionLock extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ButtonCallBack = void 0),
      (this.IUn = () => {
        this.ButtonCallBack?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.IUn]]);
  }
  SetTextByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
  }
  SetTextByText(t) {
    this.GetText(1).SetText(t);
  }
  GetIconSprite() {
    return this.GetSprite(0);
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
  SetButtonVisible(t) {
    this.GetButton(2).RootUIComp.SetUIActive(t);
  }
}
exports.FunctionalPanelConditionLock = FunctionalPanelConditionLock;
class FunctionalPanelConditionActivate extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  SetTextByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, e);
  }
  SetTextByText(t) {
    this.GetText(1).SetText(t);
  }
  GetIconSprite() {
    return this.GetSprite(0);
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
}
exports.FunctionalPanelConditionActivate = FunctionalPanelConditionActivate;
//# sourceMappingURL=ActivityFunctionalTypeA.js.map
