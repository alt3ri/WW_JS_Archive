"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericLayout = void 0);
const UE = require("ue"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation"),
  LguiUtil_1 = require("../LguiUtil"),
  ScrollViewDelegate_1 = require("../ScrollView/ScrollViewDelegate");
class OperationParam {
  constructor(t = void 0, i = void 0, s = !1) {
    (this.Data = t), (this.CallBack = i), (this.PlayGridAnim = s);
  }
}
class GenericLayout {
  constructor(t, i, s = void 0, e = !1) {
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
      (this.IsRefreshAsync = !1),
      (this.pGo = () => {
        this.UnBindLateUpdate();
      }),
      (this.IsRefreshAsync = e),
      (this.eGe = t),
      this.eGe.GetOwner().OnDestroyed.Add(this.pGo),
      (this.fGo = s || t.RootUIComp.GetAttachUIChild(0)?.GetOwner()),
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
        var s = this.uGo.GetDatas()[t];
        if (s) return i.GetKey(s, t);
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
    var s = [];
    for (let t = this.mGo.length; t < i; t++) {
      var e = this.V2e();
      s.push(this.uGo.CreateGridProxyAsync(t, e.GetOwner())), this.mGo.push(e);
    }
    await Promise.all(s);
  }
  async RefreshByDataDirectly(t) {
    var i = t.length;
    if (i > this.mGo.length) return !1;
    this.uGo.SetData(t), this.uGo.ClearSelectInfo(), this.gGo.clear();
    for (let t = this.dGo.length; t < i; t++) {
      var s = this.mGo[t];
      s.SetUIActive(!0),
        this.dGo.push(s),
        this.CGo.push(this.uGo.GetGridProxy(t));
    }
    return this.IsRefreshAsync ? await this.F6_() : this.N6_(), !0;
  }
  RefreshByData(t, i, s = !1) {
    var e;
    this.Rjt
      ? ((e = new OperationParam(t, i, s)), this.gWt.Push(e))
      : (this.Ujt(),
        this.RefreshByDataAsync(t, s).finally(() => {
          i?.(), this.Jft();
        }));
  }
  async RefreshByDataAsync(t, i = !1, s = t.length) {
    await this.MGo(t, s),
      i && this.cGo && this.cGo.PlayGridAnim(this.GetDisplayGridNum());
  }
  RefreshWithoutDataSync() {
    this.N6_();
  }
  N6_() {
    if (0 !== this.dGo.length)
      for (let t = 0; t < this.dGo.length; t++) this.V6_(t);
  }
  async F6_() {
    var i = this.dGo.length;
    if (0 !== i) {
      var s = new Array(i);
      for (let t = 0; t < i; t++) s[t] = this.j6_(t);
      await Promise.all(s);
    }
  }
  V6_(t) {
    this.uGo.RefreshGridProxy(t, t);
    var i = this.CGo[t];
    this.gGo.set(this.GetKey(t), i);
  }
  async j6_(t) {
    await this.uGo.RefreshGridProxyAsync(t, t);
    var i = this.CGo[t];
    this.gGo.set(this.GetKey(t), i);
  }
  async MGo(t, i) {
    var s = i,
      e =
        (this.uGo.SetData(t),
        this.uGo.ClearSelectInfo(),
        this.gGo.clear(),
        this.dGo.length);
    if (s <= e) {
      for (let t = s; t < e; t++) this.mGo[t].SetUIActive(!1);
      (this.dGo.length = s),
        (this.CGo.length = s),
        this.IsRefreshAsync ? await this.F6_() : this.N6_();
    } else if (this.mGo.length >= s) {
      for (let t = e; t < s; t++) {
        var r = this.mGo[t];
        r.SetUIActive(!0),
          this.dGo.push(r),
          this.CGo.push(this.uGo.GetGridProxy(t));
      }
      this.IsRefreshAsync ? await this.F6_() : this.N6_();
    } else {
      var h = this.mGo.length;
      for (let t = e; t < h; t++) {
        var a = this.mGo[t];
        a.SetUIActive(!0),
          this.dGo.push(a),
          this.CGo.push(this.uGo.GetGridProxy(t));
      }
      this.IsRefreshAsync ? await this.F6_() : this.N6_(),
        await this.LoadGrid(s);
      var n = this.IsRefreshAsync ? [] : void 0;
      for (let t = h; t < this.mGo.length; t++) {
        var o = this.mGo[t];
        o.SetUIActive(!0),
          this.dGo.push(o),
          this.CGo.push(this.uGo.GetGridProxy(t)),
          this.IsRefreshAsync ? n.push(this.j6_(t)) : this.V6_(t);
      }
      this.IsRefreshAsync && n && 0 < n.length && (await Promise.all(n));
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
  SelectGridProxy(t, i = !1) {
    this.uGo.SelectGridProxy(t, t, i);
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
