"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollViewDelegate = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class ScrollViewDelegate {
  constructor(i) {
    (this.Pe = []),
      (this.RKe = 0),
      (this.INo = []),
      (this.TNo = []),
      (this.oOi = void 0),
      (this.LNo = void 0),
      (this.DNo = !1),
      (this.RNo = -1),
      (this.UNo = void 0),
      (this.oOi = i);
  }
  SetData(i) {
    this.ClearData(),
      (this.Pe = this.Pe.concat(i)),
      (this.RKe = this.Pe.length);
  }
  GetDatas() {
    return this.Pe;
  }
  SetDataProxy(i, t, s = !0) {
    this.ClearData(), (this.LNo = i), (this.RKe = t), (this.DNo = s);
  }
  OnGridsUpdate(i, t, s, e) {
    i >= this.RKe || t >= this.INo.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          25,
          `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ` +
            this.INo.length,
        )
      : (-1 !== this.RNo &&
          (this.RNo < s || this.RNo > e) &&
          (this.UNo = void 0),
        (this.TNo[t] = !0),
        this.RefreshGridProxy(i, t));
  }
  RefreshGridProxy(i, t) {
    var s, e, h;
    i >= this.RKe || t >= this.INo.length
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ScrollViewGrid",
          25,
          `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ` +
            this.INo.length,
        )
      : (s = this.GetGridProxy(t))
        ? ((e = -1 !== i && i === this.RNo) && !this.UNo && (this.UNo = s),
          (h = this.ANo(i, t)),
          (s.GridIndex = i),
          (s.DisplayIndex = t),
          s.Refresh(h, e, i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            25,
            `Proxy获取异常 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ` +
              this.INo.length,
          );
  }
  ANo(i, t) {
    let s = void 0;
    return (
      !(s = this.Pe.length > i ? this.Pe[i] : s) &&
        this.LNo &&
        ((s = this.LNo(i)), this.DNo) &&
        (this.Pe[i] = s),
      s
    );
  }
  TryGetCachedData(i) {
    if (this.Pe.length > i) return this.Pe[i];
  }
  CreateGridProxy(i, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ScrollViewGrid",
        44,
        `CreateProxy displayIndex: ${i}, Proxies.length: ` + this.INo.length,
      );
    var s = this.INo[i];
    return (
      s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("ScrollViewGrid", 25, "Proxy已经存在", [
            "DisplayIndex",
            i,
          ])
        : ((s = this.oOi()).CreateThenShowByActor(t),
          (this.INo[i] = s),
          (this.TNo[i] = !1),
          (s.ScrollViewDelegate = this)),
      s
    );
  }
  async CreateGridProxyAsync(i, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ScrollViewGrid",
        44,
        `CreateProxy displayIndex: ${i}, Proxies.length: ` + this.INo.length,
      );
    var s = this.INo[i];
    return (
      s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            44,
            "Proxy已经存在 displayIndex: ",
            ["displayIndex", i],
          )
        : ((((s = this.oOi()).ScrollViewDelegate = this).INo[i] = s),
          (this.TNo[i] = !1),
          await s.CreateThenShowByActorAsync(t),
          (this.TNo[i] = !0)),
      s
    );
  }
  GetGridProxy(i) {
    if (this.TNo.length < i || !this.TNo[i])
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ScrollViewGrid",
          25,
          "获取Proxy非法，请检查初始动画是否尚未播放完成。displayIndex: " + i,
        );
    else {
      var t = this.INo[i];
      if (t) return t;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScrollViewGrid", 25, "无法获取Proxy", [
          "DisplayIndex",
          i,
        ]);
    }
  }
  ClearGridProxy(i, t) {
    t = this.GetGridProxy(t);
    t && t.Clear();
  }
  SelectGridProxy(i, t, s) {
    this.RNo !== i &&
      (this.DeselectCurrentGridProxy(s),
      (t = this.GetGridProxy(t)) && (t.OnSelected(s), (this.UNo = t)),
      (this.RNo = i));
  }
  DeselectCurrentGridProxy(i) {
    (this.RNo = -1),
      this.UNo && (this.UNo.OnDeselected(i), (this.UNo = void 0));
  }
  ClearSelectInfo() {
    (this.RNo = -1), (this.UNo = void 0);
  }
  GetSelectedProxy() {
    return this.UNo;
  }
  GetSelectedGridIndex() {
    return this.RNo;
  }
  GetDataLength() {
    return this.RKe;
  }
  IsProxyValid(i) {
    return i < this.TNo.length && this.TNo[i];
  }
  ClearData() {
    0 < this.Pe.length && (this.Pe.length = 0), (this.RKe = 0);
  }
  Destroy() {
    this.ClearData(),
      this.INo.forEach((i) => {
        i.ScrollViewDelegate = void 0;
      }),
      (this.INo.length = 0),
      (this.TNo.length = 0),
      (this.oOi = void 0),
      (this.LNo = void 0);
  }
}
exports.ScrollViewDelegate = ScrollViewDelegate;
//# sourceMappingURL=ScrollViewDelegate.js.map
