"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericScrollView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GenericLayoutNew_1 = require("../Layout/GenericLayoutNew");
class GenericScrollView {
  constructor(t, e, i = void 0) {
    (this.cNo = void 0),
      (this.Sui = void 0),
      (this.cNo = t),
      (this.Sui = new GenericLayoutNew_1.GenericLayoutNew(
        this.cNo
          .GetContent()
          .GetComponentByClass(UE.UILayoutBase.StaticClass()),
        e,
        i,
      )),
      this.Sui.SetScrollView(t);
  }
  get TempOriginalItem() {
    return this.Sui?.TempOriginalItem;
  }
  get IsExpand() {
    return this.cNo.Horizontal
      ? this.cNo.RootUIComp.Width < this.cNo.ContentUIItem.Width
      : this.cNo.RootUIComp.Height < this.cNo.ContentUIItem.Height;
  }
  get ContentItem() {
    return this.cNo.ContentUIItem;
  }
  get ScrollWidth() {
    return this.cNo.RootUIComp.Width;
  }
  RefreshByData(t, e = void 0) {
    this.Sui.RebuildLayoutByDataNew(t, e);
  }
  ClearChildren() {
    this.Sui.ClearChildren(), this.cNo.OnScrollValueChange.Unbind();
  }
  SetHorizontalScrollEnable(t) {
    this.cNo.SetHorizontal(t);
  }
  SetVerticalScrollEnable(t) {
    this.cNo.SetVertical(t);
  }
  GetItemByIndex(t) {
    return this.Sui.GetItemByIndex(t);
  }
  GetScrollItemByKey(t) {
    return this.Sui.GetLayoutItemByKey(t);
  }
  GetScrollItemMap() {
    return this.Sui.GetLayoutItemMap();
  }
  GetScrollItemList() {
    return this.Sui.GetLayoutItemList();
  }
  ScrollTo(t) {
    this.cNo.ScrollTo(t);
  }
  ScrollToLeft(t) {
    t = this.Sui.GetLayoutItemByKey(t);
    this.cNo.ScrollToLeft(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t.GetRootItem(),
    );
  }
  ScrollToRight(t) {
    t = this.Sui.GetLayoutItemByKey(t);
    this.cNo.ScrollToRight(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t.GetRootItem(),
    );
  }
  ScrollToTop(t) {
    t = this.Sui.GetLayoutItemByKey(t);
    this.cNo.ScrollToTop(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t.GetRootItem(),
    );
  }
  ScrollToBottom(t) {
    t = this.Sui.GetLayoutItemByKey(t);
    this.cNo.ScrollToBottom(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t.GetRootItem(),
    );
  }
  SetActive(t) {
    this.cNo.RootUIComp.SetUIActive(t);
  }
  BindScrollValueChange(t) {
    this.cNo.OnScrollValueChange.Bind(t);
  }
  BindLateUpdate(t) {
    this.Sui.BindLateUpdate(t);
  }
  UnBindLateUpdate() {
    this.Sui.UnBindLateUpdate();
  }
  GetGenericLayout() {
    return this.Sui;
  }
}
exports.GenericScrollView = GenericScrollView;
//# sourceMappingURL=GenericScrollView.js.map
