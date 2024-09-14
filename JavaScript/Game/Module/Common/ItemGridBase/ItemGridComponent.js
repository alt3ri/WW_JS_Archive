"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridComponent = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sit = void 0),
      (this.NPt = void 0),
      (this.OPt = void 0),
      (this.kPt = !1),
      (this.FPt = !1),
      (this.VPt = void 0);
  }
  Initialize(t) {
    this.kPt ||
      ((this.sit = t),
      (this.NPt = this.GetResourceId()),
      this.OnInitialize(),
      (this.kPt = !0));
  }
  async Load() {
    return (
      (this.VPt = new CustomPromise_1.CustomPromise()),
      await this.CreateThenShowByResourceIdAsync(this.NPt, this.sit),
      this.VPt.SetResult(this),
      this
    );
  }
  async GetAsync() {
    return this.IsCreating ? this.VPt.Promise : this;
  }
  OnStartImplement() {
    (this.FPt = !0),
      this.OnActivate(),
      void 0 !== this.OPt && this.OnRefresh(this.OPt);
  }
  Refresh(t) {
    (this.OPt = t), this.InAsyncLoading() || this.OnRefresh(t);
  }
  OnBeforeDestroyImplement() {
    this.FPt && this.OnDeactivate(),
      (this.FPt = !1),
      (this.kPt = !1),
      (this.OPt = void 0);
  }
  OnInitialize() {}
  OnActivate() {}
  OnDeactivate() {}
  OnRefresh(t) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Inventory", 8, "没有实现 OnRefresh", [
        "ComponentName",
        this.constructor.name,
      ]);
  }
  GetResourceId() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Inventory", 8, "没有实现 GetResourceId", [
        "ComponentName",
        this.constructor.name,
      ]);
  }
  GetLayoutLevel() {
    return 0;
  }
  SetActive(t) {
    (t && this.IsShowOrShowing) || super.SetActive(t);
  }
  SetHierarchyIndex(t) {
    this.RootItem.GetHierarchyIndex() !== t &&
      this.RootItem.SetHierarchyIndex(t);
  }
}
exports.ItemGridComponent = ItemGridComponent;
//# sourceMappingURL=ItemGridComponent.js.map
