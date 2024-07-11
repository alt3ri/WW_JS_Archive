"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericLayout = void 0);
const UE = require("ue"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation"),
  LguiUtil_1 = require("../LguiUtil"),
  ScrollViewDelegate_1 = require("../ScrollView/ScrollViewDelegate");
class OperationParam {
  constructor(t = void 0, i = void 0, e = !1) {
    (this.Data = t), (this.CallBack = i), (this.PlayGridAnim = e);
  }
}
class GenericLayout {
  constructor(t, i, e = void 0) {
    (this.eGe = void 0),
      (this.uGo = void 0),
      (this.cGo = void 0),
      (this.AnimControllerComponent = void 0),
      (this.mGo = []),
      (this.dGo = []),
      (this.CGo = []),
      (this.gGo = new Map()),
      (this.fGo = void 0),
      (this.gWt = new Queue_1.Queue()),
      (this.pjt = !1),
      (this.pGo = () => {
        this.UnBindLateUpdate();
      }),
      (this.eGe = t),
      this.eGe.GetOwner().OnDestroyed.Add(this.pGo),
      (this.fGo = e || t.RootUIComp.GetAttachUIChild(0)?.GetOwner()),
      this.fGo &&
        (this.fGo.GetUIItem().SetUIActive(!1),
        (this.uGo = new ScrollViewDelegate_1.ScrollViewDelegate(i)),
        (this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
          this,
        )),
        this.cGo.RegisterAnimController());
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = !0;
  }
  Jft() {
    var t;
    (this.pjt = !1),
      this.gWt.Empty ||
        ((t = this.gWt.Pop()),
        this.RefreshByData(t.Data, t.CallBack, t.PlayGridAnim));
  }
  GetRootUiItem() {
    return this.eGe?.RootUIComp;
  }
  V2e() {
    return LguiUtil_1.LguiUtil.CopyItem(
      this.fGo.GetUIItem(),
      this.GetRootUiItem(),
    );
  }
  GetKey(t) {
    if (!(t < 0 || t >= this.CGo.length)) {
      var i = this.CGo[t];
      if (i) {
        var e = this.uGo.GetDatas()[t];
        if (e) return i.GetKey(e, t);
      }
    }
  }
  ClearChildren() {
    for (const i of this.mGo) {
      var t = i.GetOwner();
      t?.IsValid() && t.K2_DestroyActor();
    }
    (this.mGo.length = 0),
      (this.dGo.length = 0),
      (this.CGo.length = 0),
      this.gGo.clear();
  }
  async LoadGrid(i) {
    var e = [];
    for (let t = this.mGo.length; t < i; t++) {
      var s = this.V2e();
      e.push(this.uGo.CreateGridProxyAsync(t, s.GetOwner())), this.mGo.push(s);
    }
    await Promise.all(e);
  }
  RefreshByDataDirectly(t) {
    var i = t.length;
    if (i > this.mGo.length) return !1;
    this.uGo.SetData(t), this.uGo.ClearSelectInfo(), this.gGo.clear();
    for (let t = this.dGo.length; t < i; t++) {
      var e = this.mGo[t];
      e.SetUIActive(!0),
        this.dGo.push(e),
        this.CGo.push(this.uGo.GetGridProxy(t));
    }
    return this.vGo(), !0;
  }
  RefreshByData(t, i, e = !1) {
    var s;
    this.Rjt
      ? ((s = new OperationParam(t, i, e)), this.gWt.Push(s))
      : (this.Ujt(),
        this.RefreshByDataAsync(t, e).finally(() => {
          i?.(), this.Jft();
        }));
  }
  async RefreshByDataAsync(t, i = !1, e = t.length) {
    await this.MGo(t, e),
      i && this.cGo && this.cGo.PlayGridAnim(this.GetDisplayGridNum());
  }
  vGo() {
    if (0 !== this.dGo.length)
      for (let t = 0; t < this.dGo.length; t++) this.EGo(t);
  }
  EGo(t) {
    this.uGo.RefreshGridProxy(t, t);
    var i = this.CGo[t];
    this.gGo.set(this.GetKey(t), i);
  }
  async MGo(t, i) {
    var e = i,
      s =
        (this.uGo.SetData(t),
        this.uGo.ClearSelectInfo(),
        this.gGo.clear(),
        this.dGo.length);
    if (e <= s) {
      for (let t = e; t < s; t++) this.mGo[t].SetUIActive(!1);
      (this.dGo.length = e), (this.CGo.length = e), this.vGo();
    } else if (this.mGo.length >= e) {
      for (let t = s; t < e; t++) {
        var r = this.mGo[t];
        r.SetUIActive(!0),
          this.dGo.push(r),
          this.CGo.push(this.uGo.GetGridProxy(t));
      }
      this.vGo();
    } else {
      var h = this.mGo.length;
      for (let t = s; t < h; t++) {
        var a = this.mGo[t];
        a.SetUIActive(!0),
          this.dGo.push(a),
          this.CGo.push(this.uGo.GetGridProxy(t));
      }
      this.vGo(), await this.LoadGrid(e);
      for (let t = h; t < this.mGo.length; t++) {
        var n = this.mGo[t];
        n.SetUIActive(!0),
          this.dGo.push(n),
          this.CGo.push(this.uGo.GetGridProxy(t)),
          this.EGo(t);
      }
    }
  }
  GetItemByIndex(t) {
    return this.dGo[t];
  }
  GetItemByKey(t) {
    t = this.GetLayoutItemByKey(t);
    return this.dGo[t.GridIndex];
  }
  GetLayoutItemByKey(t) {
    return this.gGo.get(t);
  }
  GetLayoutItemMap() {
    return this.gGo;
  }
  GetLayoutItemList() {
    return this.CGo;
  }
  GetLayoutItemByIndex(t) {
    var i = this.uGo.IsProxyValid(t);
    if (i && !(t >= this.CGo.length)) return this.CGo[t];
  }
  GetDatas() {
    return this.uGo.GetDatas();
  }
  SelectGridProxy(t) {
    this.uGo.SelectGridProxy(t, t, !1);
  }
  DeselectCurrentGridProxy() {
    this.uGo.DeselectCurrentGridProxy(!1);
  }
  GetSelectedGridIndex() {
    return this.uGo.GetSelectedGridIndex();
  }
  GetSelectedProxy() {
    return this.uGo.GetSelectedProxy();
  }
  BindLateUpdate(t) {
    this.eGe.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.eGe.OnLateUpdate.Unbind();
  }
  SetActive(t) {
    this.eGe?.RootUIComp.SetUIActive(t);
  }
  GetDisplayGridNum() {
    return this.CGo.length;
  }
  GetPreservedGridNum() {
    return this.mGo.length;
  }
  GetDisplayGridStartIndex() {
    return 0;
  }
  GetDisplayGridEndIndex() {
    return this.GetDisplayGridNum() - 1;
  }
  GetGrid(t) {
    return this.dGo[t];
  }
  GetGridByDisplayIndex(t) {
    return this.dGo[t];
  }
  GetGridAnimationInterval() {
    return this.eGe.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.eGe.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.eGe.SetInAnimation(!0);
  }
  NotifyAnimationEnd() {
    this.eGe.SetInAnimation(!1);
  }
  GetUiAnimController() {
    return (
      this.AnimControllerComponent ||
        (this.AnimControllerComponent = this.eGe
          ?.GetOwner()
          .GetComponentByClass(UE.UIInturnAnimController.StaticClass())),
      this.AnimControllerComponent
    );
  }
}
exports.GenericLayout = GenericLayout;
//# sourceMappingURL=GenericLayout.js.map
