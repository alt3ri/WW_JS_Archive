"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveItemView = exports.ReviveItemData = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  ReviveSmallItemGrid_1 = require("./ReviveSmallItemGrid");
class ReviveItemData {
  constructor(i, e, t) {
    (this.PlayerId = 0),
      (this.ChoseId = 0),
      (this.ItemIdList = []),
      (this.PlayerId = i),
      (this.ItemIdList = e),
      (this.ChoseId = t);
  }
}
exports.ReviveItemData = ReviveItemData;
class ReviveItemView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PropScrollView = void 0),
      (this.ItemIdMap = void 0),
      (this.SelectedItemId = -1),
      (this.zke = -1),
      (this.N2t = void 0),
      (this.mIt = () => {
        this.ConfirmBoxButtonClick();
      }),
      (this.JGe = (i, e, t) => {
        var s = new ReviveSmallItemGrid_1.ReviveSmallItemGrid();
        return (
          s.Initialize(e.GetOwner()),
          s.BindOnExtendToggleStateChanged(this.zAt),
          s.Refresh(i[0], i[1]),
          { Key: t, Value: s }
        );
      }),
      (this.zAt = (i) => {
        i = i.MediumItemGrid;
        this.O2t(i);
      }),
      (this.k2t = () => {
        -1 === this.SelectedItemId
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "ReviveItemNotClick",
            )
          : (BuffItemControl_1.BuffItemControl.RequestUseBuffItem(
              this.SelectedItemId,
              1,
              this.zke,
            ),
            this.CloseMe());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[1, this.k2t]]);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.mIt);
    var i = this.OpenParam;
    (this.zke = i.PlayerId),
      (this.SelectedItemId = i.ChoseId),
      (this.ItemIdMap = new Map());
    for (const t of i.ItemIdList) {
      var e =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
      0 < e && this.ItemIdMap.set(t, e);
    }
    (this.PropScrollView = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(2),
      this.JGe,
    )),
      this.InitPropItem();
  }
  InitPropItem() {
    var i = this.GetScrollViewWithScrollbar(2),
      e = this.ItemIdMap.size;
    if ((i.RootUIComp.SetUIActive(0 < e), 0 !== e)) {
      const s = [];
      let t = 0;
      this.ItemIdMap.forEach((i, e) => {
        s.push([e, i]), this.SelectedItemId === e && (t = s.length - 1);
      }),
        this.PropScrollView.RefreshByData(s);
      i = this.PropScrollView.GetScrollItemList()[t];
      i.SetSelected(!0), this.O2t(i);
    }
  }
  OnBeforeDestroy() {
    this.ItemIdMap && this.ItemIdMap.clear(),
      (this.SelectedItemId = -1),
      (this.zke = -1),
      this.PropScrollView.ClearChildren();
  }
  ConfirmBoxButtonClick() {
    this.CloseMe();
  }
  O2t(i) {
    i &&
      (this.N2t?.SetSelected(!1),
      (this.N2t = i),
      (this.SelectedItemId = i.ItemId),
      (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
        this.SelectedItemId,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        i.AttributesDescription,
      ));
  }
}
exports.ReviveItemView = ReviveItemView;
//# sourceMappingURL=ReviveItemView.js.map
