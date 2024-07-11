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
      (this.dqo = void 0),
      (this.Cqo = void 0),
      (this.AnimControllerComponent = void 0),
      (this.gqo = []),
      (this.fqo = []),
      (this.pqo = []),
      (this.vqo = new Map()),
      (this.Mqo = void 0),
      (this.gjt = new Queue_1.Queue()),
      (this.pHt = !1),
      (this.Sqo = () => {
        this.UnBindLateUpdate();
      }),
      (this.eGe = t),
      this.eGe.GetOwner().OnDestroyed.Add(this.Sqo),
      (this.Mqo = e || t.RootUIComp.GetAttachUIChild(0)?.GetOwner()),
      this.Mqo &&
        (this.Mqo.GetUIItem().SetUIActive(!1),
        (this.dqo = new ScrollViewDelegate_1.ScrollViewDelegate(i)),
        (this.Cqo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
          this,
        )),
        this.Cqo.RegisterAnimController());
  }
  get RHt() {
    return this.pHt;
  }
  UHt() {
    this.pHt = !0;
  }
  O0t() {
    var t;
    (this.pHt = !1),
      this.gjt.Empty ||
        ((t = this.gjt.Pop()),
        this.RefreshByData(t.Data, t.CallBack, t.PlayGridAnim));
  }
  GetRootUiItem() {
    return this.eGe?.RootUIComp;
  }
  Tke() {
    return LguiUtil_1.LguiUtil.CopyItem(
      this.Mqo.GetUIItem(),
      this.GetRootUiItem(),
    );
  }
  GetKey(t) {
    if (!(t < 0 || t >= this.pqo.length)) {
      var i = this.pqo[t];
      if (i) {
        var e = this.dqo.GetDatas()[t];
        if (e) return i.GetKey(e, t);
      }
    }
  }
  ClearChildren() {
    for (const i of this.gqo) {
      var t = i.GetOwner();
      t?.IsValid() && t.K2_DestroyActor();
    }
    (this.gqo.length = 0),
      (this.fqo.length = 0),
      (this.pqo.length = 0),
      this.vqo.clear();
  }
  async LoadGrid(i) {
    var e = [];
    for (let t = this.gqo.length; t < i; t++) {
      var s = this.Tke();
      e.push(this.dqo.CreateGridProxyAsync(t, s.GetOwner())), this.gqo.push(s);
    }
    await Promise.all(e);
  }
  RefreshByDataDirectly(t) {
    var i = t.length;
    if (i > this.gqo.length) return !1;
    this.dqo.SetData(t), this.dqo.ClearSelectInfo(), this.vqo.clear();
    for (let t = this.fqo.length; t < i; t++) {
      var e = this.gqo[t];
      e.SetUIActive(!0),
        this.fqo.push(e),
        this.pqo.push(this.dqo.GetGridProxy(t));
    }
    return this.Eqo(), !0;
  }
  RefreshByData(t, i, e = !1) {
    var s;
    this.RHt
      ? ((s = new OperationParam(t, i, e)), this.gjt.Push(s))
      : (this.UHt(),
        this.RefreshByDataAsync(t, e).finally(() => {
          i?.(), this.O0t();
        }));
  }
  async RefreshByDataAsync(t, i = !1) {
    await this.yqo(t),
      i && this.Cqo && this.Cqo.PlayGridAnim(this.GetDisplayGridNum());
  }
  Eqo() {
    if (0 !== this.fqo.length)
      for (let t = 0; t < this.fqo.length; t++) this.Iqo(t);
  }
  Iqo(t) {
    this.dqo.RefreshGridProxy(t, t);
    var i = this.pqo[t];
    this.vqo.set(this.GetKey(t), i);
  }
  async yqo(t) {
    var i = t.length,
      e =
        (this.dqo.SetData(t),
        this.dqo.ClearSelectInfo(),
        this.vqo.clear(),
        this.fqo.length);
    if (i <= e) {
      for (let t = i; t < e; t++) this.gqo[t].SetUIActive(!1);
      (this.fqo.length = i), (this.pqo.length = i), this.Eqo();
    } else if (this.gqo.length >= i) {
      for (let t = e; t < i; t++) {
        var s = this.gqo[t];
        s.SetUIActive(!0),
          this.fqo.push(s),
          this.pqo.push(this.dqo.GetGridProxy(t));
      }
      this.Eqo();
    } else {
      var r = this.gqo.length;
      for (let t = e; t < r; t++) {
        var h = this.gqo[t];
        h.SetUIActive(!0),
          this.fqo.push(h),
          this.pqo.push(this.dqo.GetGridProxy(t));
      }
      this.Eqo(), await this.LoadGrid(i);
      for (let t = r; t < this.gqo.length; t++) {
        var a = this.gqo[t];
        a.SetUIActive(!0),
          this.fqo.push(a),
          this.pqo.push(this.dqo.GetGridProxy(t)),
          this.Iqo(t);
      }
    }
  }
  GetItemByIndex(t) {
    return this.fqo[t];
  }
  GetItemByKey(t) {
    t = this.GetLayoutItemByKey(t);
    return this.fqo[t.GridIndex];
  }
  GetLayoutItemByKey(t) {
    return this.vqo.get(t);
  }
  GetLayoutItemMap() {
    return this.vqo;
  }
  GetLayoutItemList() {
    return this.pqo;
  }
  GetLayoutItemByIndex(t) {
    var i = this.dqo.IsProxyValid(t);
    if (i && !(t >= this.pqo.length)) return this.pqo[t];
  }
  GetDatas() {
    return this.dqo.GetDatas();
  }
  SelectGridProxy(t) {
    this.dqo.SelectGridProxy(t, t, !1);
  }
  DeselectCurrentGridProxy() {
    this.dqo.DeselectCurrentGridProxy(!1);
  }
  GetSelectedGridIndex() {
    return this.dqo.GetSelectedGridIndex();
  }
  GetSelectedProxy() {
    return this.dqo.GetSelectedProxy();
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
    return this.pqo.length;
  }
  GetPreservedGridNum() {
    return this.gqo.length;
  }
  GetDisplayGridStartIndex() {
    return 0;
  }
  GetDisplayGridEndIndex() {
    return this.GetDisplayGridNum() - 1;
  }
  GetGrid(t) {
    return this.fqo[t];
  }
  GetGridByDisplayIndex(t) {
    return this.fqo[t];
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
