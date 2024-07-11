"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideFocusView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideBaseView_1 = require("./GuideBaseView");
const GuideFocusItem_1 = require("./GuideFocusItem");
class GuideFocusView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments),
      (this.Config = void 0),
      (this.IsAttachItemsReady = !1),
      (this.ozt = !1),
      (this.ReadyToShow = !1),
      (this.rzt = 4e3),
      (this.nzt = void 0),
      (this.szt = void 0),
      (this.azt = () => {
        let t;
        !this.hzt ||
          ((t = UiManager_1.UiManager.GetViewByName(
            "BattleView",
          )?.GetGuideUiItemAndUiItemForShowEx(this.Config.ExtraParam)) &&
            t[0] === this.GuideStepInfo?.ViewData?.GetAttachedUiItem()) ||
          this.GuideStepInfo.SwitchState(3);
      }),
      (this.lzt = () => {
        const t = this._zt();
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
            this.uzt());
      }),
      (this.czt = () => {
        this.UiViewSequence.PlaySequence("AutoLoopManual");
      }),
      (this.mzt = (t, i) => {
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
      (this.rzt = 4e3),
      this.Config.ContentDirection)
    ) {
      case "D":
        this.szt = "StartManualUp";
        break;
      case "U":
        this.szt = "StartManualDown";
        break;
      case "L":
        this.szt = "StartManualRight";
        break;
      case "R":
        this.szt = "StartManualLeft";
    }
    this.szt && this.UiViewSequence.AddSequenceFinishEvent(this.szt, this.czt);
  }
  OnGuideBaseViewAddEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
      this.azt,
    );
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillButtonIndexRefresh,
      this.azt,
    );
  }
  OnGuideViewAfterShow() {
    this.RootItem.SetRaycastTarget(!1),
      this.lzt(),
      this.BindInputAfterSequence(),
      InputManager_1.InputManager.SetShowCursor(this.Config.ShowMouse);
  }
  OnGuideBaseViewAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
    const t = this.Config.InputEnums;
    this.UnbindInput(this.Config.InputEnums, t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCursor);
  }
  OnGuideBaseViewDestroy() {
    this.nzt && (this.nzt.Destroy(), (this.nzt = void 0));
  }
  get hzt() {
    return (
      this.Config?.ViewName === "BattleView" &&
      this.Config.ExtraParam &&
      this.Config.ExtraParam[0] === "Skill"
    );
  }
  OnGuideBaseViewTick(t) {
    this.lzt(),
      this.IsShow &&
        this.Config.ShowMouse &&
        InputManager_1.InputManager.SetShowCursor(!0),
      this.nzt?.OnTick(t),
      this.dzt(),
      this.ozt &&
        !this.IsAttachItemsReady &&
        ((this.rzt -= t), this.rzt < 0) &&
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
    this.nzt?.OnDurationChange(t);
  }
  _zt() {
    let t = this.GuideStepInfo.ViewData.GetAttachedView();
    if (
      !t ||
      !t.GetRootActor() ||
      !t.IsUiActiveInHierarchy() ||
      !t.IsShow ||
      this.HasConflictView()
    )
      return (this.ozt = !1);
    this.ozt = !0;
    t = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow();
    return !(
      !ObjectUtils_1.ObjectUtils.IsValid(t) || !t.IsUIActiveInHierarchy()
    );
  }
  uzt() {
    let t;
    const i = this.GuideStepInfo.ViewData.GetAttachedUiItem();
    i?.IsValid() &&
      ((t = this.GuideStepInfo.ViewData.GetAttachedUiItemForShow()),
      (this.nzt = this.Czt(i, t)),
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
  dzt() {
    this.GetActive() &&
      this.ReadyToShow &&
      ((this.ReadyToShow = !1),
      this.GetRootItem().SetAlpha(1),
      this.szt ? this.UiViewSequence.PlaySequence(this.szt) : this.czt(),
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
    const t = this.Config.InputEnums;
    this.BindInput(this.Config.InputEnums, t, this.mzt);
  }
  OnGuideViewCloseWhenFinish() {
    this.UiViewSequence?.HasSequenceNameInPlaying("Start") &&
      this.UiViewSequence.StopPrevSequence(!1, !0),
      this.nzt?.OnBaseViewCloseWhenFinish();
  }
  Czt(t, i) {
    const e = this.GetItem(0);
    var t = (e.SetActive(!1), new GuideFocusItem_1.GuideFocusItem(t, i, this));
    return t.Init(e), t;
  }
}
exports.GuideFocusView = GuideFocusView;
// # sourceMappingURL=GuideFocusView.js.map
