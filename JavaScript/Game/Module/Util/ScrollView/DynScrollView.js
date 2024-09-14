"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicScrollView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
class DynamicScrollView {
  constructor(t, i, s, e) {
    (this.QGo = void 0),
      (this.XGo = void 0),
      (this.$Go = void 0),
      (this.YGo = new Map()),
      (this.Wfa = new Map()),
      (this.r7 = void 0),
      (this.JGo = void 0),
      (this.cGo = void 0),
      (this.zGo = new Map()),
      (this.LateUpdateCallBack = void 0),
      (this.ZGo = new Map()),
      (this.eNo = !1),
      (this.tNo = (i, s) => {
        const e = this.r7[i];
        var t = this.zGo.get(s);
        let h = void 0;
        return (
          t
            ? ((h = t), this.iNo(e, i, s))
            : ((h = this.QGo(e, s.GetUIItem(), i)),
              (t = new Promise((t) => {
                h.Init(s.GetUIItem()).finally(() => {
                  h.Update(e, i), t();
                });
              })),
              this.zGo.set(s, h),
              this.ZGo.set(s, t)),
          this.oNo(h, i),
          (h.SkipDestroyActor = !0),
          this.YGo.set(i, h),
          h.GetUsingItem(e)
        );
      }),
      (this.rNo = (t, i) => {
        this.YGo.delete(t);
        var s = this.Wfa.get(t);
        s && (s(), this.Wfa.delete(t));
      }),
      (this.nNo = () => {
        this.sNo();
      }),
      (this.aNo = (t) => {
        t = this.r7[t];
        return this.$Go.GetItemSize(t);
      }),
      (this.$wi = (t) => {
        this.LateUpdateCallBack?.(t), this.hNo();
      }),
      (this.QGo = e),
      (this.$Go = s),
      i.SetUIParent(t.RootUIComp),
      this.zGo.clear(),
      (this.JGo = i),
      (this.XGo = t),
      this.XGo.OnItemUpdate.Bind(this.tNo),
      this.XGo.OnItemClear.Bind(this.rNo),
      this.XGo.ItemSizeDelegate.Bind(this.aNo),
      this.XGo.OnDestroyCallBack.Bind(this.nNo),
      (this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
        this,
      )),
      this.cGo.RegisterAnimController();
  }
  async Init() {
    await this.$Go.Init(this.JGo);
  }
  GetDisplayGridNum() {
    return this.XGo.DisplayItemArray.Num();
  }
  GetPreservedGridNum() {
    return this.XGo.DisplayItemArray.Num() + this.XGo.IdleItemArray.Num();
  }
  GetDisplayGridStartIndex() {
    var t = (0, puerts_1.$ref)(0);
    return this.XGo.GetItemIndex(0, t), (0, puerts_1.$unref)(t);
  }
  GetDisplayGridEndIndex() {
    var t,
      i = this.XGo.DisplayItemArray.Num() - 1;
    return i < 0
      ? 0
      : ((t = (0, puerts_1.$ref)(0)),
        this.XGo.GetItemIndex(i, t),
        (0, puerts_1.$unref)(t));
  }
  GetGrid(t) {
    return this.XGo.GetItem(t)?.GetUIItem();
  }
  GetGridByDisplayIndex(t) {
    var i = (0, puerts_1.$ref)(0),
      t = (this.XGo.GetItemDisplayIndex(t, i), (0, puerts_1.$unref)(i));
    return this.XGo.DisplayItemArray.Get(t)?.GetUIItem();
  }
  GetGridAnimationInterval() {
    return this.XGo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.XGo.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.XGo.SetInAnimation(!0);
  }
  NotifyAnimationEnd() {
    this.XGo.SetInAnimation(!1);
  }
  RefreshByData(t, i = !1) {
    (this.r7 = t), this.YGo.clear(), this.Wfa.clear();
    var s = this.JGo.GetOwner();
    this.JGo.SetUIActive(!0),
      this.XGo.RefreshByData(s, t.length, i),
      this.JGo.SetUIActive(!1),
      this.XGo.SetInAnimation(!0),
      this.lNo();
  }
  sNo() {
    this.eNo && (this.XGo.OnLateUpdate.Unbind(), (this.eNo = !1));
  }
  _No() {
    this.eNo || (this.XGo.OnLateUpdate.Bind(this.$wi), (this.eNo = !0));
  }
  async iNo(t, i, s) {
    var e = this.ZGo.get(s);
    e && (await e, this.zGo.get(s)?.Update(t, i));
  }
  oNo(t, i) {
    t.SetUiActive(!0);
  }
  GetScrollItemFromIndex(t) {
    t = this.YGo.get(t);
    if (t) return t;
  }
  GetScrollItemCount() {
    return this.YGo.size;
  }
  GetScrollItemItems() {
    return Array.from(this.YGo.values());
  }
  lNo() {
    this.cGo && this.cGo.PlayGridAnim(this.XGo.DisplayItemArray.Num(), !0);
  }
  hNo() {
    this.LateUpdateCallBack || this.sNo();
  }
  BindLateUpdate(t) {
    (this.LateUpdateCallBack = t), this._No();
  }
  UnBindLateUpdate() {
    this.LateUpdateCallBack = void 0;
  }
  AddListenerOnItemClear(t, i) {
    this.YGo.has(t) && this.Wfa.set(t, i);
  }
  ClearChildren() {
    for (const t of this.YGo.values()) t.ClearItem();
    this.YGo.clear(), this.Wfa.clear(), this.cGo?.Clear();
  }
  async ScrollToItemIndex(t, i = !0) {
    await this.uNo(t, i);
  }
  ScrollToBottom(t) {
    this.XGo.ScrollToBottom(
      (0, puerts_1.$ref)(
        new UE.Vector2D(this.XGo.ContentUIItem.RelativeLocation),
      ),
      t,
    );
  }
  async uNo(t, i = !0) {
    await Promise.all(this.ZGo.values()),
      this.XGo.ScrollToItemIndex(t),
      i && this.ResetGridController();
  }
  ResetGridController() {
    this.cGo && this.cGo.PlayGridAnim(this.GetDisplayGridNum(), !0);
  }
  GetUiAnimController() {
    return this.XGo?.GetContent()?.GetComponentByClass(
      UE.UIInturnAnimController.StaticClass(),
    );
  }
}
exports.DynamicScrollView = DynamicScrollView;
//# sourceMappingURL=DynScrollView.js.map
