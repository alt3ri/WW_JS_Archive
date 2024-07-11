"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRewardPopUpView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class ActivityRewardPopUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.DataList = []),
      (this.ContentLayout = void 0),
      (this.TabLayout = void 0),
      (this.$Fe = 0),
      (this.InitContentItem = () => {
        return new ActivityRewardPopUpContent();
      }),
      (this.InitTabItem = () => {
        return new TabItem();
      }),
      (this.YFe = (t) => {
        (this.Data = t), this.Refresh();
      }),
      (this.JFe = (t) => {
        var i = this.Data.DataPageList[t],
          e = this.$Fe;
        (this.$Fe = t),
          0 <= e &&
            e !== this.$Fe &&
            this.TabLayout.GetLayoutItemByIndex(e)?.SetTabToggleState(!1, !1),
          this.zFe(i.DataList),
          this.ZFe(void 0 !== i.TabTips, i.TabTips);
      }),
      (this.e3e = (t, i) => !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
      [6, UE.UIText],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.YFe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.YFe,
    );
  }
  OnStart() {
    (this.Data = this.OpenParam ?? void 0),
      this.Data &&
        ((this.ContentLayout = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.InitContentItem,
        )),
        (this.TabLayout = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(4),
          this.InitTabItem,
        )),
        this.GetText(6).SetUIActive(!1),
        this.Refresh());
  }
  Refresh() {
    this.t3e();
  }
  t3e() {
    if (0 !== this.Data.DataPageList.length) {
      var i = [];
      let t = !1;
      for (const s of this.Data.DataPageList) {
        t ||
          !s.TabName ||
          StringUtils_1.StringUtils.IsEmpty(s.TabName) ||
          (t = !0);
        var e = {
          TabData: s,
          TabFunction: this.JFe,
          TabCanExecuteFunction: this.e3e,
        };
        i.push(e);
      }
      this.TabLayout?.RefreshByData(
        i,
        () => {
          this.TabLayout.GetLayoutItemByIndex(this.$Fe)?.SetTabToggleState(
            !0,
            !0,
          );
        },
        !1,
      ),
        this.GetItem(3).SetUIActive(t);
    }
  }
  zFe(t) {
    (this.DataList = t),
      this.ContentLayout?.RefreshByData(this.DataList, void 0, !1);
  }
  ZFe(t, i) {
    i && this.GetText(6).SetText(i), this.GetText(6).SetUIActive(t);
  }
}
exports.ActivityRewardPopUpView = ActivityRewardPopUpView;
class ActivityRewardPopUpContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.i3e = void 0),
      (this.jFe = void 0),
      (this.Rke = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  OnStart() {
    (this.jFe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.Rke,
    )),
      (this.i3e = new ButtonItem_1.ButtonItem(this.GetItem(3)));
  }
  Refresh(t, i, e) {
    this.mGe(t.NameText),
      this.o3e(t.RewardList ?? [], t.RewardState),
      this._Oe(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t);
  }
  o3e(t, i) {
    this.jFe?.SetActive(0 !== t.length),
      0 !== t.length && this.jFe?.RefreshByData(t);
  }
  _Oe(t) {
    switch (
      (this.i3e.SetActive(1 === t.RewardState),
      this.GetItem(4)?.SetUIActive(2 === t.RewardState),
      this.GetText(5)?.SetUIActive(0 === t.RewardState),
      t.RewardState)
    ) {
      case 1:
        this.i3e?.SetRedDotVisible(!0),
          t.ClickFunction && this.i3e?.SetFunction(t.ClickFunction),
          void 0 !== t.RewardButtonText &&
            this.i3e?.SetText(t.RewardButtonText);
        break;
      case 0:
        this.i3e?.SetRedDotVisible(!1),
          void 0 !== t.RewardButtonText &&
            this.GetText(5).SetText(t.RewardButtonText);
    }
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.JFe = void 0),
      (this.r3e = void 0),
      (this.n3e = void 0),
      (this.kqe = () => {
        this.JFe?.(this.GridIndex), this.r3e?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    const t = this.GetExtendToggle(0);
    t.CanExecuteChange.Bind(() => this.s3e(t.ToggleState)),
      this.GetItem(2).SetUIActive(!1);
  }
  s3e(t) {
    return !this.n3e || this.n3e(1 === t, this.GridIndex);
  }
  Refresh(t, i, e) {
    t.TabData.TabName && !StringUtils_1.StringUtils.IsEmpty(t.TabData.TabName)
      ? (this.GetText(1).SetText(t.TabData.TabName), this.SetActive(!0))
      : this.SetActive(!1);
    let s = !1;
    for (const h of t.TabData.DataList)
      if (1 === h.RewardState) {
        s = !0;
        break;
      }
    this.GetItem(2).SetUIActive(s),
      t.TabData.TabExtraFunction && (this.r3e = t.TabData.TabExtraFunction),
      (this.JFe = t.TabFunction),
      (this.n3e = t.TabCanExecuteFunction);
  }
  SetTabToggleState(t, i) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0), t && i && this.kqe();
  }
}
//# sourceMappingURL=ActivityRewardPopUpView.js.map
