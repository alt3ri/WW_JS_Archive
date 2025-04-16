"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityFunctionalArea = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../../../Common/Button/ButtonSpriteItem"),
  ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityButtonItem_1 = require("./ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("./ActivityFunctionalTypeA");
class ActivityFunctionalArea extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Data = t),
      (this.FunctionButton = void 0),
      (this.CircleButton = void 0),
      (this.PanelLock = void 0),
      (this.xJa = () => {
        this.Data &&
          ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(
            this.Data,
          );
      }),
      (this.OpenPreOpenRequestConfirmBox = () => {
        var t, e;
        this.Data &&
          ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(251)).FunctionMap.set(
            2,
            () => {
              ControllerHolder_1.ControllerHolder.ActivityController.RequestPreOpenActivity(
                this.Data,
                (t) => {
                  t &&
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.ActivityViewRefreshCurrent,
                      this.Data.Id,
                    );
                },
              );
            },
          ),
          (e = this.Data.LocalConfig.PreOpenText) &&
            t.SetTextArgs(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
            ),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
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
    this.FunctionButton.SetExtraFunction(this.xJa),
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
  SetPanelTipByTextId(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t, e);
  }
  SetPanelTipByText(t) {
    this.GetText(5).SetText(t);
  }
  SetPanelTipVisible(t) {
    this.GetItem(4).SetUIActive(t);
  }
  RefreshGeneralPerformance(t) {
    var e, i, n;
    this.Data
      ? ((e = this.Data.IsUnLock()),
        (i = this.Data.CanPreOpen()),
        (n = this.Data.HasPreOpenCondition()),
        e
          ? t && this.SetGeneralUnlockPerformance(t)
          : n
            ? i
              ? (this.SetPanelTipByTextId("ActivityPreOpenTip"),
                this.SetPanelConditionVisible(!0),
                this.FunctionButton.SetLocalTextNew("ActivityPreOpen"),
                this.FunctionButton.SetFunction(() => {
                  (t?.BeforePreOpenCheck && !t.BeforePreOpenCheck()) ||
                    this.OpenPreOpenRequestConfirmBox();
                }),
                this.FunctionButton.SetUiActive(!0),
                this.SetPanelConditionVisible(!1))
              : (this.FunctionButton.SetUiActive(!1),
                this.SetPerformanceConditionLock(
                  this.Data.PreOpenConditionGroupId,
                  this.Data.Id,
                ))
            : (this.FunctionButton.SetUiActive(!1),
              this.SetPerformanceConditionLock(
                this.Data.ConditionGroupId,
                this.Data.Id,
              )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 37, "未传递活动数据,请传递数据再刷新");
  }
  SetGeneralUnlockPerformance(t) {
    this.SetPanelConditionVisible(!1),
      t.UnlockBtnTextId &&
        (t.UnlockBtnTextArgs
          ? this.FunctionButton.SetLocalTextNew(
              t.UnlockBtnTextId,
              ...t.UnlockBtnTextArgs,
            )
          : this.FunctionButton.SetLocalTextNew(t.UnlockBtnTextId)),
      t.UnlockBtnFunction &&
        this.FunctionButton.SetFunction(t.UnlockBtnFunction),
      this.FunctionButton.SetUiActive(!0);
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
