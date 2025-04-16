"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  MowingRiskDefine_1 = require("../MowingRiskDefine"),
  MowingBuffOverview_1 = require("./MowingBuffOverview"),
  MowingBuffProgress_1 = require("./MowingBuffProgress");
class MowingBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.M9a = void 0),
      (this.S9a = void 0),
      (this.Kda = void 0),
      (this.y9a = () => {
        this.CloseMe();
      }),
      (this.E9a = () => {
        var e = new UiAsyncTask_1.UiAsyncTask(
          "MowingBuffView.RefreshTab",
          async () => {
            await this.A6_();
          },
        );
        this.RunAsyncTask(e);
      }),
      (this.L9a = () => {
        var e = new UiAsyncTask_1.UiAsyncTask(
          "MowingBuffView.RefreshTab",
          async () => {
            await this.P6_();
          },
        );
        this.RunAsyncTask(e);
      }),
      (this.A9a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        1 !== e.CurrentBuffViewType &&
          ((e = e.BuildOverviewViewData()),
          this.M9a.RefreshByCustomDataAsync(e));
      }),
      (this.D9a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        0 !== e.CurrentBuffViewType &&
          ((e = e.BuildProgressViewData()), this.S9a?.RefreshByCustomData(e));
      }),
      (this.X$a = () =>
        0 !== ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType),
      (this.Y$a = () =>
        1 !== ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.E9a],
        [2, this.L9a],
      ]);
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage =
      this.OpenParam;
    var e = this.R9a();
    await Promise.all(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
      this.A9a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
        this.D9a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
      this.A9a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
        this.D9a,
      );
  }
  OnStart() {
    this.cQa(), this.I9a(), this.T9a(!1), this.z$a();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.MowingRiskModel.ResetBuffViewCache(),
      this.J$a();
  }
  async A6_() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    0 !== e.CurrentBuffViewType &&
      ((e.CurrentBuffViewType = 0), this.I9a(), await this.x6_(!0));
  }
  async P6_() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    1 !== e.CurrentBuffViewType &&
      ((e.CurrentBuffViewType = 1), this.I9a(), await this.x6_(!0));
  }
  R9a() {
    var e = [];
    return (
      e.push(this.U9a()),
      e.push(this.x9a()),
      1 === ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage &&
        e.push(this.P9a()),
      e
    );
  }
  async U9a() {
    var e = new MowingBuffOverview_1.MowingBuffOverview();
    await e.CreateByResourceIdAsync(
      MowingRiskDefine_1.MOWING_BUFF_OVERVIEW_RESOURCE_ID,
      this.GetItem(3),
    ),
      (this.M9a = e);
  }
  async P9a() {
    var e = new MowingBuffProgress_1.MowingBuffProgress();
    await e.CreateByResourceIdAsync(
      MowingRiskDefine_1.MOWING_BUFF_PROGRESS_RESOURCE_ID,
      this.GetItem(3),
    ),
      (this.S9a = e);
  }
  async x9a() {
    var e = new PopupCaptionItem_1.PopupCaptionItem();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      e.SetCloseCallBack(this.y9a),
      e.SetHelpBtnActive(!1),
      (this.Kda = e);
  }
  cQa() {
    var e = ModelManager_1.ModelManager.MowingRiskModel.BuildCaptionViewData();
    this.Kda.SetTitleByTextIdAndArgNew(e.TitleTextId),
      this.Kda.SetTitleIcon(e.IconPath);
  }
  I9a() {
    var e,
      i = this.GetExtendToggle(1),
      t = this.GetExtendToggle(2);
    0 === ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage
      ? (i.RootUIComp.SetUIActive(!0),
        t.RootUIComp.SetUIActive(!1),
        i.SetToggleState(1, !1),
        (i.IsSelfInteractive = !1))
      : ((e = ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType),
        i.RootUIComp.SetActive(!0),
        t.RootUIComp.SetActive(!0),
        0 === e
          ? (i.SetToggleStateForce(1, !1), t.SetToggleStateForce(0, !1))
          : (i.SetToggleStateForce(0, !1), t.SetToggleStateForce(1, !1)));
  }
  T9a(e) {
    var i = new UiAsyncTask_1.UiAsyncTask(
      "MowingBuffView.RefreshTab",
      async () => {
        await this.x6_(e);
      },
    );
    this.RunAsyncTask(i);
  }
  async x6_(e) {
    await Promise.all([this.w9a(e), this.B9a(e)]);
  }
  async w9a(e) {
    var i = ModelManager_1.ModelManager.MowingRiskModel;
    0 !== i.CurrentBuffViewType
      ? this.M9a.SetUiActive(!1)
      : (this.M9a.SetUiActive(!0),
        (i = i.BuildOverviewViewData()),
        await this.M9a.RefreshByCustomDataAsync(i),
        await this.M9a.ShowAsync(),
        e && (await this.M9a.PlayStartSequenceAsync()),
        1 ===
          ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage &&
          this.M9a.PlayUnlockSequenceAsync());
  }
  async B9a(e) {
    var i;
    void 0 !== this.S9a &&
      (1 !==
      (i = ModelManager_1.ModelManager.MowingRiskModel).CurrentBuffViewType
        ? this.S9a.SetUiActive(!1)
        : (this.S9a.SetUiActive(!0),
          (i = i.BuildProgressViewData()),
          this.S9a.RefreshByCustomData(i),
          await this.S9a.ShowAsync(),
          e && (await this.S9a.PlayStartSequenceAsync()),
          await this.S9a.PlayProgressTween()));
  }
  z$a() {
    var e = this.GetExtendToggle(1),
      i = this.GetExtendToggle(2);
    e.CanExecuteChange.Bind(this.X$a), i.CanExecuteChange.Bind(this.Y$a);
  }
  J$a() {
    var e = this.GetExtendToggle(1),
      i = this.GetExtendToggle(2);
    e.CanExecuteChange.Unbind(), i.CanExecuteChange.Unbind();
  }
}
exports.MowingBuffView = MowingBuffView;
//# sourceMappingURL=MowingBuffView.js.map
