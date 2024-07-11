"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericLayoutNew = void 0);
const UE = require("ue"),
  UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction"),
  InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation"),
  LguiUtil_1 = require("../LguiUtil");
class GenericLayoutNew {
  constructor(t, i, e = void 0) {
    (this.cGo = void 0),
      (this.Kqo = void 0),
      (this.xqe = void 0),
      (this.SGo = []),
      (this.yGo = []),
      (this.bxo = void 0),
      (this.AQ = new Map()),
      (this.x5e = new Array()),
      (this.Qqo = void 0),
      (this.IGo = 0),
      (this.vK = !1),
      (this.TGo = void 0),
      (this.P7t = !0),
      (this.LGo = !0),
      (this.Kqo = t),
      (this.Qqo = i),
      this.DGo(e),
      (this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
        this,
      )),
      this.cGo.RegisterAnimController();
  }
  get TempOriginalItem() {
    return this.bxo;
  }
  RGo() {
    for (const t of this.AQ.values())
      t instanceof UiComponentsAction_1.UiComponentsAction && t?.Destroy();
    this.AQ.clear(), (this.x5e = []);
  }
  DGo(i) {
    if (!this.bxo) {
      let t = void 0;
      (t = void 0 === i ? this.GetItemByIndex(0) : i).SetUIActive(!1),
        t.SetUIParent(this.UGo()),
        (this.bxo = t),
        (this.TGo = t.displayName);
    }
  }
  SetScrollView(t) {
    (this.xqe = t), (this.LGo = !1), this.cGo?.RegisterAnimController();
  }
  PreLoadCopyItem(i) {
    for (let t = 0; t < i; ++t) this.AGo().SetUIActive(!1);
  }
  GetRootUiItem() {
    return this.Kqo.RootUIComp;
  }
  UGo() {
    return this.GetRootUiItem().GetParentAsUIItem();
  }
  PGo() {
    var t = this.SGo.pop();
    t && (t.SetUIActive(!1), this.yGo.push(t));
  }
  AGo() {
    var t = LguiUtil_1.LguiUtil.CopyItem(this.bxo, this.GetRootUiItem());
    return this.SGo.push(t), t;
  }
  xGo() {
    var t = this.yGo.pop();
    t ? (t.SetUIActive(!0), this.SGo.push(t)) : this.AGo().SetUIActive(!0);
  }
  wGo() {
    this.bxo &&
      (this.bxo.SetUIActive(!0),
      this.bxo.SetUIParent(this.GetRootUiItem()),
      (this.bxo = void 0));
  }
  ht() {
    for (let t = 0, i = this.yGo.length; t < i; ++t)
      this.yGo[t].GetOwner().K2_DestroyActor();
    for (let t = 0, i = this.SGo.length; t < i; ++t)
      this.SGo[t].GetOwner().K2_DestroyActor();
    (this.yGo.length = 0), (this.SGo.length = 0), this.ClearGridController();
  }
  ClearGridController() {
    this.cGo && (this.cGo.Clear(), (this.cGo = void 0));
  }
  SetNeedAnim(t) {
    this.P7t = t;
  }
  RebuildLayoutByDataNew(i, t = void 0) {
    this.DGo(void 0), this.RGo();
    var e = i ? i.length : 0,
      s = t || e,
      r = this.SGo.length;
    if (((this.IGo = s), (this.vK = !1), s < this.SGo.length)) {
      for (let t = 0; t < s; ++t) this.SGo[t].SetUIActive(!0);
      for (let t = s; t < r; ++t) this.PGo();
    } else if (s > this.SGo.length) {
      for (let t = 0; t < r; ++t) this.SGo[t].SetUIActive(!0);
      for (let t = 0; t < s - r; ++t) this.xGo();
    }
    let h = 0;
    for (let t = 0; t < s; ++t) {
      this.SGo[t].SetDisplayName(this.TGo + "_" + t);
      var n = t < e ? i[t] : void 0,
        n = this.Qqo?.(n, this.SGo[t], h);
      n && (this.AQ.set(n.Key, n.Value), this.x5e.push(n.Value), h++);
    }
    this.cGo && this.P7t && this.cGo.PlayGridAnim(this.IGo);
  }
  GetItemByIndex(t) {
    if (this.Kqo) {
      var i = this.GetRootUiItem().GetAttachUIChildren();
      if (t < i.Num()) return i.Get(t);
    }
  }
  GetLayoutItemByKey(t) {
    return this.AQ.get(t);
  }
  GetLayoutItemMap() {
    return this.AQ;
  }
  GetLayoutItemList() {
    return this.x5e;
  }
  GetLayoutItemByIndex(t) {
    return this.x5e[t];
  }
  ClearChildren() {
    this.vK ||
      ((this.vK = !0),
      this.Kqo.OnLateUpdate.Unbind(),
      this.RGo(),
      this.ht(),
      this.wGo());
  }
  SetActive(t) {
    this.Kqo.RootUIComp.SetUIActive(t);
  }
  GetDisplayGridNum() {
    return this.IGo;
  }
  GetPreservedGridNum() {
    return this.SGo.length;
  }
  GetDisplayGridStartIndex() {
    return 0;
  }
  GetDisplayGridEndIndex() {
    return this.GetDisplayGridNum() - 1;
  }
  GetGridAnimationInterval() {
    return this.Kqo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.Kqo.GetGridAnimationStartTime();
  }
  GetGrid(t) {
    return this.GetItemByIndex(t % this.GetDisplayGridNum());
  }
  GetGridByDisplayIndex(t) {
    return this.GetItemByIndex(t);
  }
  BindLateUpdate(t) {
    this.Kqo.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.Kqo.OnLateUpdate.Unbind();
  }
  NotifyAnimationStart() {
    this.Kqo.SetInAnimation(!0);
  }
  NotifyAnimationEnd() {
    this.Kqo.SetInAnimation(!1);
  }
  GetUiAnimController() {
    return this.LGo
      ? this.Kqo?.GetOwner().GetComponentByClass(
          UE.UIInturnAnimController.StaticClass(),
        )
      : this.xqe
          ?.GetContent()
          ?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
  }
}
exports.GenericLayoutNew = GenericLayoutNew;
//# sourceMappingURL=GenericLayoutNew.js.map
