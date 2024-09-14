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
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRewardPopUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.DataList = []),
      (this.ContentLayout = void 0),
      (this.TabLayout = void 0),
      (this.u4e = 0),
      (this.InitContentItem = () => {
        var t = new ActivityRewardPopUpContent();
        return (
          (t.CloseViewFunction = () => {
            this.CloseMe();
          }),
          t
        );
      }),
      (this.InitTabItem = () => {
        return new TabItem();
      }),
      (this.c4e = (t) => {
        (this.Data = t), this.Refresh();
      }),
      (this.m4e = (t) => {
        var i = this.Data.DataPageList[t],
          e = this.u4e;
        (this.u4e = t),
          0 <= e &&
            e !== this.u4e &&
            this.TabLayout.GetLayoutItemByIndex(e)?.SetTabToggleState(!1, !1),
          this.d4e(i.DataList),
          this.C4e(void 0 !== i.TabTips, i.TabTips);
      }),
      (this.g4e = (t, i) => !0);
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
      this.c4e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
      this.c4e,
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
    this.f4e();
  }
  f4e() {
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
          TabFunction: this.m4e,
          TabCanExecuteFunction: this.g4e,
        };
        i.push(e);
      }
      this.TabLayout?.RefreshByData(
        i,
        () => {
          this.TabLayout.GetLayoutItemByIndex(this.u4e)?.SetTabToggleState(
            !0,
            !0,
          );
        },
        !1,
      ),
        this.GetItem(3).SetUIActive(t);
    }
  }
  d4e(t) {
    (this.DataList = t),
      this.ContentLayout?.RefreshByData(this.DataList, void 0, !1);
  }
  C4e(t, i) {
    i && this.GetText(6).SetText(i), this.GetText(6).SetUIActive(t);
  }
}
exports.ActivityRewardPopUpView = ActivityRewardPopUpView;
class ActivityRewardPopUpContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.p4e = void 0),
      (this.s4e = void 0),
      (this.CloseViewFunction = void 0),
      (this.W2e = () => {
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
    (this.s4e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.W2e,
    )),
      (this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(3)));
  }
  Refresh(t, i, e) {
    var s;
    t.NameTextId
      ? ((s = t.NameTextArgs ?? []), this.Jma(t.NameTextId, s))
      : this.mGe(t.NameText),
      this.v4e(t.RewardList ?? [], t.RewardState),
      this._Oe(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t);
  }
  Jma(t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t, ...i);
  }
  v4e(t, i) {
    this.s4e?.SetActive(0 !== t.length),
      0 !== t.length && this.s4e?.RefreshByData(t);
  }
  _Oe(t) {
    switch (
      (this.p4e.SetActive(1 === t.RewardState),
      this.GetItem(4)?.SetUIActive(2 === t.RewardState),
      this.GetText(5)?.SetUIActive(0 === t.RewardState),
      t.RewardState)
    ) {
      case 1:
        this.p4e?.SetRedDotVisible(t.RewardButtonRedDot ?? !0),
          t.ClickFunction &&
            this.p4e?.SetFunction(() => {
              t.ClickFunction?.(),
                t.ClickFunctionAndCloseSelf && this.CloseViewFunction?.();
            }),
          void 0 !== t.RewardButtonText &&
            this.p4e?.SetText(t.RewardButtonText);
        break;
      case 0:
        this.p4e?.SetRedDotVisible(!1),
          void 0 !== t.RewardButtonText &&
            this.GetText(5).SetText(t.RewardButtonText);
    }
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.m4e = void 0),
      (this.M4e = void 0),
      (this.E4e = void 0),
      (this.kqe = () => {
        this.m4e?.(this.GridIndex), this.M4e?.(this.GridIndex);
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
    t.CanExecuteChange.Bind(() => this.S4e(t.ToggleState)),
      this.GetItem(2).SetUIActive(!1);
  }
  S4e(t) {
    return !this.E4e || this.E4e(1 === t, this.GridIndex);
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
      t.TabData.TabExtraFunction && (this.M4e = t.TabData.TabExtraFunction),
      (this.m4e = t.TabFunction),
      (this.E4e = t.TabCanExecuteFunction);
  }
  SetTabToggleState(t, i) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0), t && i && this.kqe();
  }
}
//# sourceMappingURL=ActivityRewardPopUpView.js.map
