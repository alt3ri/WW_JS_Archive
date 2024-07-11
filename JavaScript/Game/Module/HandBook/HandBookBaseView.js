"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookBaseView =
    exports.initAttributeItem =
    exports.initContentItem =
    exports.initInfoItem =
      void 0);
const UE = require("ue");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const AttributeItem_1 = require("../Common/AttributeItem");
const CommonTabTitle_1 = require("../Common/TabComponent/CommonTabTitle");
const TabComponent_1 = require("../Common/TabComponent/TabComponent");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const HandBookCommonItem_1 = require("./HandBookCommonItem");
const HandBookCommonTypeItem_1 = require("./HandBookCommonTypeItem");
const HandBookContentItem_1 = require("./HandBookContentItem");
const HandBookFetterItem_1 = require("./HandBookFetterItem");
const HandBookInfoTextItem_1 = require("./HandBookInfoTextItem");
const HandBookPhantomItem_1 = require("./HandBookPhantomItem");
const initInfoItem = (t, i, e) => {
  return {
    Key: e,
    Value: new HandBookInfoTextItem_1.HandBookInfoTextItem(t, i),
  };
};
const initContentItem =
  ((exports.initInfoItem = initInfoItem),
  (t, i, e) => {
    return {
      Key: e,
      Value: new HandBookContentItem_1.HandBookContentItem(t, i),
    };
  });
const initAttributeItem =
  ((exports.initContentItem = initContentItem),
  () => new AttributeItem_1.AttributeItem());
exports.initAttributeItem = initAttributeItem;
class HandBookBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabList = []),
      (this.OnToggleCallBack = void 0),
      (this.OnPhantomToggleCallBack = void 0),
      (this.CommonTabTitle = void 0),
      (this.HandBookCommonItemDataList = []),
      (this.PhantomFetterDataList = []),
      (this.HandBookCommonTypeItemDataList = []),
      (this.ScrollViewCommon = void 0),
      (this.ScrollViewFetter = void 0),
      (this.ScrollViewCommonType = void 0),
      (this.InfoItemLayout = void 0),
      (this.ContentItemLayout = void 0),
      (this.StarItemLayout = void 0),
      (this.HandBookPhantomLayout = void 0),
      (this.AttributeLayout = void 0),
      (this.InfoTextList = []),
      (this.ContentTextList = []),
      (this.AttributeList = []),
      (this.PhantomDataList = []),
      (this.StarCount = 0),
      (this.OnPhantomToggleClick = (t) => {}),
      (this.pqe = (t) => {
        this.OnToggleCallBack && this.OnToggleCallBack(t);
      }),
      (this.TabItemProxyCreate = (t, i) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.InitHandBookCommonItem = () => {
        return new HandBookCommonItem_1.HandBookCommonItem();
      }),
      (this.InitHandBookFetterItem = () => {
        return new HandBookFetterItem_1.HandBookFetterItem();
      }),
      (this.InitHandBookCommonTypeItem = (t, i, e) => {
        const s = new HandBookCommonTypeItem_1.HandBookCommonTypeItem();
        return s.Initialize(), { Key: e, Value: s };
      }),
      (this.EZt = (t) => this.PhantomFetterDataList[t]),
      (this.yZt = (t) => this.HandBookCommonItemDataList[t]),
      (this.InitHandBookPhantom = (t, i, e) => {
        const s = new HandBookPhantomItem_1.HandBookPhantomItem();
        return (
          s.Initialize(t, i),
          s.BindToggleCallback(this.OnPhantomToggleClick),
          { Key: e, Value: s }
        );
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIScrollViewWithScrollbarComponent],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIVerticalLayout],
      [13, UE.UIItem],
      [14, UE.UIHorizontalLayout],
      [15, UE.UIItem],
      [16, UE.UIVerticalLayout],
      [17, UE.UIText],
      [18, UE.UIVerticalLayout],
      [19, UE.UIVerticalLayout],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIButtonComponent],
      [23, UE.UIText],
      [24, UE.UIText],
      [25, UE.UITexture],
      [26, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[22, this.CloseClick]]);
  }
  SetDefaultState() {
    this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetLoopScrollViewComponent(4).RootUIComp.SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetScrollViewWithScrollbar(7).RootUIComp.SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetText(9).SetUIActive(!1),
      this.GetText(10).SetUIActive(!1),
      this.GetText(11).SetUIActive(!1),
      this.GetVerticalLayout(12).RootUIComp.SetUIActive(!1),
      this.GetItem(13).SetUIActive(!1),
      this.GetHorizontalLayout(14).RootUIComp.SetUIActive(!1),
      this.GetItem(15).SetUIActive(!1),
      this.GetVerticalLayout(16).RootUIComp.SetUIActive(!1),
      this.GetText(17).SetUIActive(!1),
      this.GetVerticalLayout(18).RootUIComp.SetUIActive(!1),
      this.GetVerticalLayout(19).RootUIComp.SetUIActive(!1),
      this.GetTexture(25).SetUIActive(!1),
      this.GetItem(26).SetUIActive(!1);
  }
  InitTabComponent(t) {
    this.GetItem(26).SetUIActive(!0);
    var i = this.GetItem(0);
    var i =
      (this.GetItem(1).SetUIActive(!0),
      i.SetUIActive(!0),
      this.TabComponent ||
        (this.TabComponent = new TabComponent_1.TabComponent(
          i,
          this.TabItemProxyCreate,
          this.pqe,
          void 0,
        )),
      (this.TabList = t),
      this.GetTabItemData(this.TabList));
    this.TabComponent.RefreshTabItem(i),
      this.TabComponent.SelectToggleByIndex(0);
  }
  InitCommonTabTitle(t, i) {
    const e = this.GetItem(2);
    e.SetUIActive(!0),
      (this.CommonTabTitle = new CommonTabTitle_1.CommonTabTitle(e)),
      this.CommonTabTitle.UpdateIcon(t),
      this.CommonTabTitle.UpdateTitle(i);
  }
  UpdateTitle(t) {
    this.CommonTabTitle && this.CommonTabTitle.UpdateTitle(t);
  }
  SetTabToggleCallBack(t) {
    this.OnToggleCallBack = t;
  }
  InitScrollViewByCommonItem(t) {
    this.HandBookCommonItemDataList = t;
    var t = this.GetItem(6);
    const i = t.GetOwner();
    const e = (t.SetUIActive(!0), this.GetLoopScrollViewComponent(4));
    e.RootUIComp.SetUIActive(!0),
      this.ScrollViewFetter &&
        (this.ScrollViewFetter.ClearGridProxies(),
        (this.ScrollViewFetter = void 0)),
      this.ScrollViewCommon ||
        (this.ScrollViewCommon = new LoopScrollView_1.LoopScrollView(
          e,
          i,
          this.InitHandBookCommonItem,
        )),
      t.SetUIActive(!1),
      this.ScrollViewCommon.ClearGridProxies(),
      this.ScrollViewCommon.DeselectCurrentGridProxy(),
      this.ScrollViewCommon.ReloadProxyData(
        this.yZt,
        this.HandBookCommonItemDataList.length,
        !1,
      ),
      this.ScrollViewCommon.RefreshAllGridProxies(),
      this.ScrollViewCommon.IZt !== -1 &&
        (this.ScrollViewCommon.ScrollToGridIndex(0),
        this.ScrollViewCommon.SelectGridProxy(0, !0));
  }
  InitScrollViewByFetterItem(t) {
    this.PhantomFetterDataList = t;
    var t = this.GetItem(5);
    const i = t.GetOwner();
    const e = (t.SetUIActive(!0), this.GetLoopScrollViewComponent(4));
    e.RootUIComp.SetUIActive(!0),
      this.ScrollViewCommon &&
        (this.ScrollViewCommon.ClearGridProxies(),
        (this.ScrollViewCommon = void 0)),
      this.ScrollViewFetter ||
        (this.ScrollViewFetter = new LoopScrollView_1.LoopScrollView(
          e,
          i,
          this.InitHandBookFetterItem,
        )),
      t.SetUIActive(!1),
      this.ScrollViewFetter.ClearGridProxies(),
      this.ScrollViewFetter.ReloadProxyData(
        this.EZt,
        this.PhantomFetterDataList.length,
        !1,
      ),
      this.ScrollViewFetter.RefreshAllGridProxies();
  }
  InitScrollViewByCommonTypeItem(t) {
    this.HandBookCommonTypeItemDataList = t;
    t = this.GetScrollViewWithScrollbar(7);
    t.RootUIComp.SetUIActive(!0),
      this.ScrollViewCommonType ||
        (this.ScrollViewCommonType = new GenericScrollView_1.GenericScrollView(
          t,
          this.InitHandBookCommonTypeItem,
        )),
      this.ScrollViewCommonType.RefreshByData(
        this.HandBookCommonTypeItemDataList,
      );
  }
  SetNameText(t) {
    const i = this.GetText(9);
    i.SetUIActive(!0), i.SetText(t);
  }
  SetTypeText(t) {
    const i = this.GetText(10);
    i.SetUIActive(!0), i.SetText(t);
  }
  SetDescribeText(t) {
    const i = this.GetText(11);
    i.SetUIActive(!0), i.SetText(t);
  }
  InitInfoItemLayout(t) {
    this.InfoTextList = t;
    t = this.GetVerticalLayout(12);
    t.RootUIComp.SetUIActive(!0),
      this.InfoItemLayout ||
        (this.InfoItemLayout = new GenericLayoutNew_1.GenericLayoutNew(
          t,
          exports.initInfoItem,
        )),
      this.InfoItemLayout.RebuildLayoutByDataNew(this.InfoTextList);
  }
  InitStarItemLayout(t) {
    this.StarCount = t;
    t = this.GetHorizontalLayout(14);
    t.RootUIComp.SetUIActive(!0),
      this.StarItemLayout ||
        (this.StarItemLayout = new GenericLayoutNew_1.GenericLayoutNew(
          t,
          void 0,
        )),
      this.StarItemLayout.RebuildLayoutByDataNew(void 0, this.StarCount);
  }
  InitContentItemLayout(t) {
    this.ContentTextList = t;
    t = this.GetVerticalLayout(16);
    t.RootUIComp.SetUIActive(!0),
      this.ContentItemLayout ||
        (this.ContentItemLayout = new GenericLayoutNew_1.GenericLayoutNew(
          t,
          exports.initContentItem,
        )),
      this.ContentItemLayout.RebuildLayoutByDataNew(this.ContentTextList);
  }
  InitAttributeLayout(t) {
    this.GetVerticalLayout(19).RootUIComp.SetUIActive(!0),
      (this.AttributeList = t),
      this.AttributeLayout.RefreshByData(this.AttributeList);
  }
  InitHandBookPhantomLayout(t) {
    const i = this.GetVerticalLayout(18);
    i.RootUIComp.SetUIActive(!0),
      (this.PhantomDataList = t),
      this.HandBookPhantomLayout ||
        (this.HandBookPhantomLayout = new GenericLayoutNew_1.GenericLayoutNew(
          i,
          this.InitHandBookPhantom,
        )),
      this.HandBookPhantomLayout.RebuildLayoutByDataNew(this.PhantomDataList);
  }
  SetDateText(t) {
    const i = this.GetText(17);
    i.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalText(i, "HandBookGet", t);
  }
  SetCollectText(t, i) {
    this.GetText(23).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(23), "RoleExp", t, i);
  }
  SetOwnText(t) {
    this.GetText(17).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(17),
        "HandBookItemHaveNum",
        t,
      );
  }
  SetKillText(t) {
    this.GetText(17).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(17), "KillCount", t);
  }
  SetLockState(t) {
    this.GetItem(21).SetUIActive(t), this.GetItem(20).SetUIActive(!t);
  }
  SetLockText(t) {
    this.GetText(24).SetText(t);
  }
  SetItemTexture(t) {
    const i = this.GetTexture(25);
    i.SetUIActive(!0), this.SetTextureByPath(t, i);
  }
  OnStart() {}
  OnAfterShow() {}
  OnBeforeDestroy() {
    this.ScrollViewCommon &&
      (this.ScrollViewCommon.ClearGridProxies(),
      (this.ScrollViewCommon = void 0)),
      this.ScrollViewFetter &&
        (this.ScrollViewFetter.ClearGridProxies(),
        (this.ScrollViewFetter = void 0)),
      this.ScrollViewCommonType &&
        (this.ScrollViewCommonType.ClearChildren(),
        (this.ScrollViewCommonType = void 0)),
      this.InfoItemLayout &&
        (this.InfoItemLayout.ClearChildren(), (this.InfoItemLayout = void 0)),
      this.ContentItemLayout &&
        (this.ContentItemLayout.ClearChildren(),
        (this.ContentItemLayout = void 0)),
      this.StarItemLayout &&
        (this.StarItemLayout.ClearChildren(), (this.StarItemLayout = void 0)),
      this.TabComponent &&
        (this.TabComponent.Destroy(), (this.TabComponent = void 0)),
      this.HandBookPhantomLayout &&
        (this.HandBookPhantomLayout.ClearChildren(),
        (this.HandBookPhantomLayout = void 0)),
      (this.TabList = []),
      (this.OnToggleCallBack = void 0),
      (this.OnPhantomToggleCallBack = void 0),
      (this.CommonTabTitle = void 0),
      (this.HandBookCommonItemDataList = []),
      (this.PhantomFetterDataList = []),
      (this.HandBookCommonTypeItemDataList = []),
      (this.InfoTextList = []),
      (this.ContentTextList = []),
      (this.AttributeList = []),
      (this.PhantomDataList = []),
      (this.StarCount = 0);
  }
}
exports.HandBookBaseView = HandBookBaseView;
// # sourceMappingURL=HandBookBaseView.js.map
