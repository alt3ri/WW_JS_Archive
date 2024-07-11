"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoCircleAttachView = void 0);
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachBaseView_1 = require("./AutoAttachBaseView");
const FLOATDURABLENUM = 0.01;
class NoCircleAttachView extends AutoAttachBaseView_1.AutoAttachBaseView {
  constructor() {
    super(...arguments),
      (this.LWe = void 0),
      (this.U1e = void 0),
      (this.DWe = !1);
  }
  SetIfNeedFakeItem(t) {
    this.DWe = t;
  }
  SetControllerItem(t) {
    (this.ControllerItem = t),
      (this.ControllerWidth = t.GetWidth()),
      (this.ControllerHeight = t.GetHeight());
  }
  FindAutoAttachItem() {
    return this.RWe();
  }
  RWe() {
    let i = void 0;
    let s = 1e7;
    const e = this.Items.length;
    for (let t = 0; t < e; t++) {
      const h = Math.abs(this.Items[t].GetCurrentPosition());
      const r =
        this.Items[t].GetCurrentShowItemIndex() >= 0 &&
        this.Items[t].GetCurrentShowItemIndex() < this.DataLength;
      h < s && r && ((i = this.Items[t]), (s = h));
    }
    return (
      void 0 === i &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("UiCommon", 28, "找不到可附着物体，拿第一个做保底"),
        (i = this.Items[0])),
      i
    );
  }
  UWe() {
    if (void 0 === this.LWe) {
      let i = 0;
      for (let t = 0; t < 1; t += FLOATDURABLENUM) {
        const s = this.GetCurveValue(this.BoundaryCurve, t);
        i += FLOATDURABLENUM * s * this.MoveBoundary;
      }
      this.LWe = i;
    }
    return this.LWe;
  }
  RecalculateMoveOffset(t) {
    t = this.AWe(t);
    if (this.AttachDirection === 0) {
      if (!this.PWe(t)) return 0;
    } else if (!this.xWe(t)) return 0;
    return t;
  }
  wWe(t) {
    const i = this.FindNearestMiddleItem();
    const s = i.GetCurrentPosition();
    let e = 0;
    return (e =
      t > 0
        ? this.GetCurrentMoveDirection() === 0
          ? i.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + s
          : (this.DataLength - 1 - i.GetCurrentShowItemIndex()) *
              (this.GetItemSize() + this.Gap) *
              -1 +
            s
        : this.GetCurrentMoveDirection() === 0
          ? (this.DataLength - 1 - i.GetCurrentShowItemIndex()) *
              (this.GetItemSize() + this.Gap) *
              -1 +
            s
          : i.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + s);
  }
  AWe(t) {
    let i = t > 0 ? 0 : this.DataLength - 1;
    this.AttachDirection !== 0 && (i = t > 0 ? this.DataLength - 1 : 0);
    let s;
    const e = this.GetShowIndexItem(i);
    if (!e) return (s = this.wWe(t)), Math.abs(s) < Math.abs(t) ? s : t;
    let h = e.GetCurrentPosition();
    let r = (h = -FLOATDURABLENUM < h && h < FLOATDURABLENUM ? 0 : h) + t;
    if ((this.AttachDirection !== 0 && (r = h - t), t > 0)) {
      if (r < 0) return t;
    } else if (r > 0) return t;
    return this.BWe(t, h);
  }
  BWe(t, i) {
    let s = 0;
    let e = 0;
    t > 0 ? i < 0 && (e = 0 - i) : i > 0 && (e = 0 - i);
    var h = t - (s = 0 + e);
    var r = this.bWe(t, i);
    var h = s + h * r;
    var r = i + h;
    return (s =
      t > 0
        ? r >= this.qWe()
          ? e > 0
            ? e + this.qWe()
            : this.qWe() - i
          : h
        : r <= -1 * this.qWe()
          ? e < 0
            ? e + -1 * this.qWe()
            : -1 * (this.qWe() + i)
          : h);
  }
  qWe() {
    if (void 0 === this.U1e) {
      let i = 0;
      for (let t = 0; t < this.MoveBoundary; t += 1) {
        const s = this.bWe(1, t);
        i += +s;
      }
      this.U1e = i;
    }
    return this.U1e;
  }
  bWe(t, i) {
    return this.UWe() <= 0
      ? 0
      : ((i = Math.abs(i) / this.UWe()),
        this.GetCurveValue(this.BoundaryCurve, (i = i > 1 ? 1 : i)));
  }
  PWe(i) {
    let s = void 0;
    const e = this.Items.length;
    for (let t = 0; t < e - 1; t++)
      if (this.Items[t].GetCurrentShowItemIndex() === 0) {
        s = this.Items[t];
        break;
      }
    if (s && i > 0) {
      const t = s.GetCurrentPosition() + i;
      if (
        (this.GetItemSize() + this.Gap) *
          Math.ceil((this.ShowItemNum + 1) / 2) <
        t
      )
        return !1;
    } else if (i < 0)
      for (let t = 0; t < e; t++)
        if (this.Items[t].GetCurrentShowItemIndex() === this.DataLength - 1)
          if (
            this.Items[t].GetCurrentPosition() + i <
            -(this.GetItemSize() + this.Gap) * Math.ceil(this.ShowItemNum / 2)
          )
            return !1;
    return !0;
  }
  xWe(i) {
    let s = void 0;
    const e = this.Items.length;
    for (let t = 0; t < e - 1; t++)
      if (this.Items[t].GetCurrentShowItemIndex() === 0) {
        s = this.Items[t];
        break;
      }
    if (i > 0) {
      for (let t = 0; t < e; t++)
        if (this.Items[t].GetCurrentShowItemIndex() === this.DataLength - 1) {
          const h = this.Items[t].GetCurrentPosition() + i;
          if (0 - this.Items[t].GetCurrentPosition() + this.UWe() < h)
            return !1;
        }
    } else if (s && i < 0) {
      const t = s.GetCurrentPosition() + i;
      const r = s.GetCurrentPosition() + this.UWe();
      if (Math.abs(t) > Math.abs(r)) return !1;
    }
    return !0;
  }
  FindNextDirectionItem(t) {
    let i = 0;
    const s = this.FindNearestMiddleItem().GetCurrentShowItemIndex();
    return (
      (i =
        t > 0
          ? s + t < this.DataLength
            ? s + t
            : this.DataLength - 1
          : s + t > 0
            ? s + t
            : 0),
      this.GetShowIndexItem(i)
    );
  }
  ReloadItems(t, i) {
    let s;
    const e = t > this.ShowItemNum || this.DWe ? this.ShowItemNum + 1 : t;
    for (let t = 0; t < this.Items.length; t++) this.Items[t].SetUiActive(!1);
    for (let t = 0; t < e; t++)
      t >= this.Items.length &&
        ((s = LguiUtil_1.LguiUtil.DuplicateActor(
          this.SourceActor,
          this.ControllerItem,
        )),
        (s = this.CreateItemFunction(s, t, this.ShowItemNum)).SetSourceView(
          this,
        ),
        this.Items.push(s)),
        this.Items[t].SetIfNeedShowFakeItem(this.DWe),
        this.Items[t].SetItemIndex(t),
        this.Items[t].SetUiActive(!0),
        this.Items[t].SetData(i),
        this.Items[t].InitItem();
    this.RefreshItems(), this.ForceUnSelectItems(), this.AttachToIndex(0, !0);
  }
  GetIfCircle() {
    return !1;
  }
}
exports.NoCircleAttachView = NoCircleAttachView;
// # sourceMappingURL=NoCircleAttachView.js.map
