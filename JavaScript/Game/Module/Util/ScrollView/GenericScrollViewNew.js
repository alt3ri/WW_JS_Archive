"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericScrollViewNew = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GenericLayout_1 = require("../Layout/GenericLayout");
class GenericScrollViewNew {
  constructor(t, e, i = void 0) {
    (this.cNo = void 0),
      (this.Sui = void 0),
      (this.cNo = t),
      (this.Sui = new GenericLayout_1.GenericLayout(
        this.cNo
          .GetContent()
          .GetComponentByClass(UE.UILayoutBase.StaticClass()),
        e,
        i,
      )),
      (this.Sui.AnimControllerComponent = t
        ?.GetOwner()
        .GetComponentByClass(UE.UIInturnAnimController.StaticClass()));
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
    return this.cNo.RootUIComp.Width ?? 0;
  }
  RefreshByData(t, e, i = !1) {
    this.Sui.RefreshByData(t, e, i);
  }
  async RefreshByDataAsync(t, e = !1) {
    await this.Sui.RefreshByDataAsync(t, e);
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
  GetScrollItemByIndex(t) {
    return this.Sui.GetLayoutItemByIndex(t);
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
    t = this.Sui.GetItemByKey(t);
    this.cNo.ScrollToLeft(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t,
    );
  }
  ScrollToRight(t) {
    t = this.Sui.GetItemByKey(t);
    this.cNo.ScrollToRight(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t,
    );
  }
  ScrollToTop(t) {
    t = this.Sui.GetItemByKey(t);
    this.cNo.ScrollToTop(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t,
    );
  }
  ScrollToBottom(t) {
    t = this.Sui.GetItemByKey(t);
    this.cNo.ScrollToBottom(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.cNo.ContentUIItem.RelativeLocation),
      ),
      t,
    );
  }
  SetActive(t) {
    this.cNo.RootUIComp.SetUIActive(t);
  }
  BindScrollValueChange(t) {
    this.cNo.OnScrollValueChange.Bind(t);
  }
  UnBindScrollValueChange() {
    this.cNo.OnScrollValueChange.Unbind();
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
exports.GenericScrollViewNew = GenericScrollViewNew;
//# sourceMappingURL=GenericScrollViewNew.js.map
