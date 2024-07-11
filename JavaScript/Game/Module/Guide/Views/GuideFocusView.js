"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideFocusView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputManager_1 = require("../../../Ui/Input/InputManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GuideBaseView_1 = require("./GuideBaseView"),
  GuideFocusItem_1 = require("./GuideFocusItem");
class GuideFocusView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments),
      (this.Config = void 0),
      (this.IsAttachItemsReady = !1),
      (this.oZt = !1),
      (this.ReadyToShow = !1),
      (this.rZt = 4e3),
      (this.nZt = void 0),
      (this.sZt = void 0),
      (this.aZt = () => {
        var t;
        !this.hZt ||
          ((t = UiManager_1.UiManager.GetViewByName(
            "BattleView",
          )?.GetGuideUiItemAndUiItemForShowEx(this.Config.ExtraParam)) &&
            t[0] === this.GuideStepInfo?.ViewData?.GetAttachedUiItem()) ||
          this.GuideStepInfo.SwitchState(3);
      }),
      (this.lZt = () => {
        var t = this._Zt();
        this.SetActive(t),
          this.IsAttachItemsReady !== t &&
            (this.IsAttachItemsReady = t) &&
            (this.GetRootItem().SetAlpha(0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Guide",
                17,
                "[聚焦引导界面:CheckAttachedItemVisible 附着UI对象可见性检查通过]",
                ["引导步骤", this.GuideStepInfo.Id],
              ),
            this.uZt());
      }),
      (this.cZt = () => {
        this.UiViewSequence.PlaySequence("AutoLoopManual");
      }),
      (this.mZt = (t, i) => {
        (this.RootItem && !this.RootItem.bIsUIActive) ||
          (t &&
            (this.CombineInputMap.set(t, i), !this.IsAllCombineInputPass())) ||
          ((i = this.Config.InputEnums),
          this.UnbindInput(this.Config.InputEnums, i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Guide", 54, "聚焦监听按键完成引导", [
              "最后按键",
              t,
            ]),
          this.DoCloseByFinished());
      });
  }
  OnBeforeGuideBaseViewCreate() {
    (this.Config = this.GuideStepInfo.ViewData.ViewConf),
      this.BindInputAfterSequence();
  }
  OnGuideBaseViewStart() {
    switch (
      (this.GetRootItem().SetAlpha(0),
      (this.rZt = 4e3),
      this.Config.ContentDirection)
    ) {
      case "D":
        this.sZt = "StartManualUp";
        break;
      case "U":
        this.sZt = "StartManualDown";
        break;
      case "L":
        this.sZt = "StartManualRight";
        break;
      case "R":
        this.sZt = "StartManualLeft";
    }
    this.sZt && this.UiViewSequence.AddSequenceFinishEvent(this.sZt, this.cZt);
  }
  OnGuideBaseViewAddEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
      this.aZt,
    );
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
      this.aZt,
    );
  }
  OnGuideViewAfterShow() {
    this.RootItem.SetRaycastTarget(!1),
      this.lZt(),
      this.BindInputAfterSequence(),
      InputManager_1.InputManager.SetShowCursor(this.Config.ShowMouse);
  }
  OnGuideBaseViewAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
    var t = this.Config.InputEnums;
    this.UnbindInput(this.Config.InputEnums, t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
  }
  OnGuideBaseViewDestroy() {
    this.nZt && (this.nZt.Destroy(), (this.nZt = void 0));
  }
  get hZt() {
    return (
      "BattleView" === this.Config?.ViewName &&
      this.Config.ExtraParam &&
      "Skill" === this.Config.ExtraParam[0]
    );
  }
  OnGuideBaseViewTick(t) {
    this.lZt(),
      this.IsShow &&
        this.Config.ShowMouse &&
        InputManager_1.InputManager.SetShowCursor(!0),
      this.nZt?.OnTick(t),
      this.dZt(),
      this.oZt &&
        !this.IsAttachItemsReady &&
        ((this.rZt -= t), this.rZt < 0) &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Guide",
            54,
            "[Guide][引导界面打开后5秒后目标没有显示出来,触发保底]",
            ["步骤Id", this.GuideStepInfo.Id],
          ),
        this.CloseMe());
  }
  OnDurationChange(t) {
    this.nZt?.OnDurationChange(t);
  }
  _Zt() {
    var t = this.GuideStepInfo.ViewData.GetAttachedView();
    if (
      !t ||
      !t.GetRootActor() ||
      !t.IsUiActiveInHierarchy() ||
      !t.IsShow ||
      this.HasConflictView()
    )
      return (this.oZt = !1);
    this.oZt = !0;
    t = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow();
    return !(
      !ObjectUtils_1.ObjectUtils.IsValid(t) || !t.IsUIActiveInHierarchy()
    );
  }
  uZt() {
    var t,
      i = this.GuideStepInfo.ViewData.GetAttachedUiItem();
    i?.IsValid() &&
      ((t = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow()),
      (this.nZt = this.CZt(i, t)),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Guide",
        17,
        "[聚焦引导界面:InitFocusItem 初始化附着UI对象管理类成功]",
        ["引导步骤", this.GuideStepInfo.Id],
        ["框住的按钮名称", i.GetDisplayName()],
        ["框住的显示节点名称", t.GetDisplayName()],
      );
  }
  dZt() {
    this.GetActive() &&
      this.ReadyToShow &&
      ((this.ReadyToShow = !1),
      this.GetRootItem().SetAlpha(1),
      this.sZt ? this.UiViewSequence.PlaySequence(this.sZt) : this.cZt(),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Guide", 17, "[聚焦引导界面:ShowInner 真正显示]", [
        "引导步骤",
        this.GuideStepInfo.Id,
      ]);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  GetGuideStepInfo() {
    return this.GuideStepInfo;
  }
  GetFocusViewConf() {
    return this.Config;
  }
  BindInputAfterSequence() {
    var t = this.Config.InputEnums;
    this.BindInput(this.Config.InputEnums, t, this.mZt);
  }
  OnGuideViewCloseWhenFinish() {
    this.UiViewSequence?.HasSequenceNameInPlaying("Start") &&
      this.UiViewSequence.StopPrevSequence(!1, !0),
      this.nZt?.OnBaseViewCloseWhenFinish();
  }
  CZt(t, i) {
    var e = this.GetItem(0),
      t = (e.SetActive(!1), new GuideFocusItem_1.GuideFocusItem(t, i, this));
    return t.Init(e), t;
  }
}
exports.GuideFocusView = GuideFocusView;
//# sourceMappingURL=GuideFocusView.js.map
