"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoCircleExhibitionView = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachExhibitionView_1 = require("./AutoAttachExhibitionView");
const FLOATDURABLENUM = 0.01;
class NoCircleExhibitionView extends AutoAttachExhibitionView_1.AutoAttachExhibitionView {
  CreateItems(t, i, e, s, h) {
    (this.CurrentDirection = h || 0), super.CreateItems(t, i, e, s, h);
  }
  ReloadView(t, i) {
    let e;
    const s =
      (this.DataLength = t) > this.ShowItemNum ? this.ShowItemNum + 1 : t;
    for (let t = 0; t < this.Items.length; t++) this.Items[t].SetActive(!1);
    for (let t = 0; t < s; t++)
      t >= this.Items.length &&
        ((e = LguiUtil_1.LguiUtil.DuplicateActor(
          this.CreateSourceActor,
          this.ItemActor,
        )),
        ((e = this.CreateItemFunction(e, t, this.ShowItemNum)).InitGap =
          this.Gap),
        this.Items.push(e)),
        this.Items[t].SetActive(!0);
    this.SetData(i),
      this.InitItems(),
      this.ForceUnSelectItems(),
      this.AttachToIndex(0, 0);
  }
  MoveItems(t) {
    if (t === 0) this.qEt();
    else {
      const i = this.ReCalculateOffset(t);
      if (Math.abs(i) === 0 && this.VelocityMoveState) this.CurrentVelocity = 0;
      else if (this.GEt(i))
        for (let t = 0; t < this.Items.length; t++) {
          const e = this.Items[t];
          const s =
            (e.MoveItem(i),
            e.ShowItemIndex >= 0 && e.ShowItemIndex < this.DataLength);
          e.SetActive(s),
            e.ShowItemIndex === this.CurrentShowItemIndex &&
              !e.GetSelectState() &&
              s &&
              (e.Select(), (this.CurrentSelectState = !0));
        }
    }
  }
  qEt() {
    if (!this.CurrentSelectState)
      for (let t = 0; t < this.Items.length; t++) {
        const i = this.Items[t];
        const e = i.ShowItemIndex >= 0 && i.ShowItemIndex < this.DataLength;
        i.ShowItemIndex === this.CurrentShowItemIndex &&
          !i.GetSelectState() &&
          e &&
          (i.Select(), (this.CurrentSelectState = !0));
      }
  }
  ReCalculateOffset(t) {
    return this.AWe(t);
  }
  AWe(t) {
    let i = t > 0 ? 0 : this.DataLength - 1;
    this.CurrentDirection !== 0 && (i = t > 0 ? this.DataLength - 1 : 0);
    const e = this.GetShowIndexItem(i);
    if (!e) return t;
    let s = e.GetItemPositionX();
    let h =
      (this.CurrentDirection !== 0 && (s = e.GetItemPositionY()),
      (s = -FLOATDURABLENUM < s && s < FLOATDURABLENUM ? 0 : s) + t);
    if ((this.CurrentDirection !== 0 && (h = s - t), t > 0)) {
      if (h < 0) return t;
    } else if (h > 0) return t;
    return this.BWe(t, s);
  }
  BWe(t, i) {
    let e = 0;
    let s = 0;
    t > 0 ? i < 0 && (s = 0 - i) : i > 0 && (s = 0 - i);
    var h = t - (e = 0 + s);
    var r = this.bWe(t, i);
    var h = e + h * r;
    var r = i + h;
    return (e =
      t > 0
        ? r >= this.BoundDistance
          ? s > 0
            ? s + this.BoundDistance
            : this.BoundDistance - i
          : h
        : r <= -1 * this.BoundDistance
          ? s < 0
            ? s + -1 * this.BoundDistance
            : -1 * (this.BoundDistance + i)
          : h);
  }
  bWe(t, i) {
    if (this.BoundDistance <= 0) return 0;
    let e = 1;
    return (
      (e =
        (e =
          (t > 0 && i >= 0) || (t < 0 && i <= 0)
            ? Math.abs(i) / this.BoundDistance
            : e) > 1
          ? 1
          : e),
      MathUtils_1.MathUtils.Lerp(1, 0, e)
    );
  }
  FindAutoAttachItem() {
    return this.RWe();
  }
  RWe() {
    let e = void 0;
    let s = 1e7;
    for (let i = 0; i < this.Items.length; i++) {
      let t = 0;
      t =
        this.CurrentDirection === 0
          ? Math.abs(this.Items[i].GetItemPositionX())
          : Math.abs(this.Items[i].GetItemPositionY());
      const h =
        this.Items[i].ShowItemIndex >= 0 &&
        this.Items[i].ShowItemIndex < this.DataLength;
      t < s && h && ((e = this.Items[i]), (s = t));
    }
    return (
      void 0 === e &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("UiCommon", 28, "找不到可附着物体，拿第一个做保底"),
        (e = this.Items[0])),
      e
    );
  }
  AttachItem(t) {
    let i = 0;
    const e = this.FindNearestMiddleItem().ShowItemIndex;
    return (
      (i =
        t > 0
          ? e + t < this.DataLength
            ? e + t
            : this.DataLength - 1
          : e + t > 0
            ? e + t
            : 0),
      this.GetShowIndexItem(i)
    );
  }
  GEt(t) {
    return this.CurrentDirection === 0 ? this.NEt(t) : this.OEt(t);
  }
  NEt(i) {
    let e = void 0;
    for (let t = 0; t < this.Items.length - 1; t++)
      if (this.Items[t].ShowItemIndex === 0) {
        e = this.Items[t];
        break;
      }
    if (e && i > 0) {
      const t = e.GetItemPositionX() + i;
      if (
        (this.ItemSizeX + this.Gap) * Math.ceil((this.ShowItemNum + 1) / 2) <
        t
      )
        return !1;
    } else if (i < 0)
      for (let t = 0; t < this.Items.length; t++)
        if (this.Items[t].ShowItemIndex === this.DataLength - 1)
          if (
            this.Items[t].GetItemPositionX() + i <
            -(this.ItemSizeX + this.Gap) * Math.ceil(this.ShowItemNum / 2)
          )
            return !1;
    return !0;
  }
  OEt(t) {
    return !0;
  }
}
exports.NoCircleExhibitionView = NoCircleExhibitionView;
// # sourceMappingURL=NoCircleExhibitionView.js.map
