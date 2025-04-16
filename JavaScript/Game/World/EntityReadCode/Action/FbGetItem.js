"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGetItem = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbItemData_1 = require("./FbItemData"),
  UnionItemGetUiConfigHelper_1 = require("./UnionItemGetUiConfigHelper");
class FbGetItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tuh = !1),
      (this.iuh = void 0),
      (this.ruh = !1),
      (this.ouh = void 0),
      (this.nuh = !1),
      (this.suh = void 0);
  }
  static Create(t) {
    if (t) return new FbGetItem(t);
  }
  get Items() {
    if (!this.tuh) {
      (this.tuh = !0), (this.iuh = new Array());
      var i = this.FbDataInternal.itemsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.items(t, new fb_action_1.ItemData());
          this.iuh.push(FbItemData_1.FbItemData.Create(e));
        }
    }
    return this.iuh;
  }
  get UiType() {
    return (
      this.ruh || ((this.ruh = !0), (this.ouh = this.FbDataInternal.uiType())),
      this.ouh
    );
  }
  get UiConfig() {
    var t, i;
    return (
      !this.nuh &&
        ((this.nuh = !0),
        (t = this.FbDataInternal.uiConfigType()),
        (i =
          UnionItemGetUiConfigHelper_1.UnionItemGetUiConfigHelper.GetUnionItemGetUiConfigObject(
            t,
          ))) &&
        (this.suh =
          UnionItemGetUiConfigHelper_1.UnionItemGetUiConfigHelper.ReadUnionItemGetUiConfig(
            t,
            this.FbDataInternal.uiConfig(i),
          )),
      this.suh
    );
  }
}
exports.FbGetItem = FbGetItem;
//# sourceMappingURL=FbGetItem.js.map
