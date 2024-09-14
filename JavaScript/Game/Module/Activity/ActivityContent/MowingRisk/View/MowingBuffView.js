"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  MowingRiskDefine_1 = require("../MowingRiskDefine"),
  MowingBuffOverview_1 = require("./MowingBuffOverview"),
  MowingBuffProgress_1 = require("./MowingBuffProgress");
class MowingBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.q6a = void 0),
      (this.O6a = void 0),
      (this.xda = void 0),
      (this.G6a = () => {
        this.CloseMe();
      }),
      (this.k6a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        0 !== e.CurrentBuffViewType &&
          ((e.CurrentBuffViewType = 0), this.N6a(), this.F6a());
      }),
      (this.V6a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        1 !== e.CurrentBuffViewType &&
          ((e.CurrentBuffViewType = 1), this.N6a(), this.F6a());
      }),
      (this.H6a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        1 !== e.CurrentBuffViewType &&
          ((e = e.BuildOverviewViewData()),
          this.q6a.RefreshByCustomDataAsync(e));
      }),
      (this.j6a = () => {
        var e = ModelManager_1.ModelManager.MowingRiskModel;
        0 !== e.CurrentBuffViewType &&
          ((e = e.BuildProgressViewData()), this.O6a?.RefreshByCustomData(e));
      }),
      (this.RWa = () =>
        0 !== ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType),
      (this.UWa = () =>
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
        [1, this.k6a],
        [2, this.V6a],
      ]);
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage =
      this.OpenParam;
    var e = this.W6a();
    await Promise.all(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
      this.H6a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
        this.j6a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
      this.H6a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
        this.j6a,
      );
  }
  OnStart() {
    this._Ha(), this.N6a(), this.F6a(), this.xWa();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.MowingRiskModel.ResetBuffViewCache(),
      this.PWa();
  }
  W6a() {
    var e = [];
    return (
      e.push(this.Q6a()),
      e.push(this.K6a()),
      1 === ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage &&
        e.push(this.$6a()),
      e
    );
  }
  async Q6a() {
    var e = new MowingBuffOverview_1.MowingBuffOverview();
    await e.CreateByResourceIdAsync(
      MowingRiskDefine_1.MOWING_BUFF_OVERVIEW_RESOURCE_ID,
      this.GetItem(3),
    ),
      (this.q6a = e);
  }
  async $6a() {
    var e = new MowingBuffProgress_1.MowingBuffProgress();
    await e.CreateByResourceIdAsync(
      MowingRiskDefine_1.MOWING_BUFF_PROGRESS_RESOURCE_ID,
      this.GetItem(3),
    ),
      (this.O6a = e);
  }
  async K6a() {
    var e = new PopupCaptionItem_1.PopupCaptionItem();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      e.SetCloseCallBack(this.G6a),
      e.SetHelpBtnActive(!1),
      (this.xda = e);
  }
  _Ha() {
    var e = ModelManager_1.ModelManager.MowingRiskModel.BuildCaptionViewData();
    this.xda.SetTitleByTextIdAndArgNew(e.TitleTextId),
      this.xda.SetTitleIcon(e.IconPath);
  }
  N6a() {
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
  F6a() {
    this.X6a(), this.Y6a();
  }
  async X6a() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    0 !== e.CurrentBuffViewType
      ? this.q6a.SetUiActive(!1)
      : (this.q6a.SetUiActive(!0),
        (e = e.BuildOverviewViewData()),
        await this.q6a.RefreshByCustomDataAsync(e),
        await this.q6a.ShowAsync(),
        this.q6a.PlayStartSequence());
  }
  async Y6a() {
    var e;
    void 0 !== this.O6a &&
      (1 !==
      (e = ModelManager_1.ModelManager.MowingRiskModel).CurrentBuffViewType
        ? this.O6a.SetUiActive(!1)
        : (this.O6a.SetUiActive(!0),
          (e = e.BuildProgressViewData()),
          this.O6a.RefreshByCustomData(e),
          await this.O6a.ShowAsync(),
          this.O6a.PlayStartSequence()));
  }
  xWa() {
    var e = this.GetExtendToggle(1),
      i = this.GetExtendToggle(2);
    e.CanExecuteChange.Bind(this.RWa), i.CanExecuteChange.Bind(this.UWa);
  }
  PWa() {
    var e = this.GetExtendToggle(1),
      i = this.GetExtendToggle(2);
    e.CanExecuteChange.Unbind(), i.CanExecuteChange.Unbind();
  }
}
exports.MowingBuffView = MowingBuffView;
//# sourceMappingURL=MowingBuffView.js.map
