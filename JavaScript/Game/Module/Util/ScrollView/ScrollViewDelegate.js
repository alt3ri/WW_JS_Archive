"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScrollViewDelegate = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class ScrollViewDelegate {
  constructor(i) {
    (this.Pe = []),
      (this.gWe = 0),
      (this.DGo = []),
      (this.RGo = []),
      (this.oNi = void 0),
      (this.UGo = void 0),
      (this.AGo = !1),
      (this.PGo = -1),
      (this.xGo = void 0),
      (this.oNi = i);
  }
  SetData(i) {
    this.ClearData(),
      (this.Pe = this.Pe.concat(i)),
      (this.gWe = this.Pe.length);
  }
  GetDatas() {
    return this.Pe;
  }
  SetDataProxy(i, t, s = !0) {
    this.ClearData(), (this.UGo = i), (this.gWe = t), (this.AGo = s);
  }
  OnGridsUpdate(i, t, s, e) {
    i >= this.gWe || t >= this.DGo.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          25,
          `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
            this.DGo.length,
        )
      : (-1 !== this.PGo &&
          (this.PGo < s || this.PGo > e) &&
          (this.xGo = void 0),
        (this.RGo[t] = !0),
        this.RefreshGridProxy(i, t));
  }
  RefreshGridProxy(i, t) {
    var s, e, h;
    i >= this.gWe || t >= this.DGo.length
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ScrollViewGrid",
          25,
          `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
            this.DGo.length,
        )
      : (s = this.GetGridProxy(t))
        ? ((e = -1 !== i && i === this.PGo) && !this.xGo && (this.xGo = s),
          (h = this.wGo(i, t)),
          (s.GridIndex = i),
          (s.DisplayIndex = t),
          s.Refresh(h, e, i))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            25,
            `Proxy获取异常 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.gWe} Proxies.length: ` +
              this.DGo.length,
          );
  }
  wGo(i, t) {
    let s = void 0;
    return (
      !(s = this.Pe.length > i ? this.Pe[i] : s) &&
        this.UGo &&
        ((s = this.UGo(i)), this.AGo) &&
        (this.Pe[i] = s),
      s
    );
  }
  TryGetCachedData(i) {
    if (this.Pe.length > i) return this.Pe[i];
  }
  CreateGridProxy(i, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "ScrollViewGrid",
        25,
        `CreateProxy displayIndex: ${i}, Proxies.length: ` + this.DGo.length,
      );
    var s = this.DGo[i];
    return (
      s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("ScrollViewGrid", 25, "Proxy已经存在", [
            "DisplayIndex",
            i,
          ])
        : ((s = this.oNi()).CreateThenShowByActor(t),
          (this.DGo[i] = s),
          (this.RGo[i] = !1),
          (s.ScrollViewDelegate = this)),
      s
    );
  }
  async CreateGridProxyAsync(i, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "ScrollViewGrid",
        44,
        `CreateProxy displayIndex: ${i}, Proxies.length: ` + this.DGo.length,
      );
    var s = this.DGo[i];
    return (
      s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScrollViewGrid",
            44,
            "Proxy已经存在 displayIndex: ",
            ["displayIndex", i],
          )
        : ((((s = this.oNi()).ScrollViewDelegate = this).DGo[i] = s),
          (this.RGo[i] = !1),
          await s.CreateThenShowByActorAsync(t),
          (this.RGo[i] = !0)),
      s
    );
  }
  GetGridProxy(i) {
    if (this.RGo.length < i || !this.RGo[i])
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ScrollViewGrid",
          25,
          "获取Proxy非法，请检查初始动画是否尚未播放完成。displayIndex: " + i,
        );
    else {
      var t = this.DGo[i];
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
    this.PGo !== i &&
      (this.DeselectCurrentGridProxy(s),
      (t = this.GetGridProxy(t)) && (t.OnSelected(s), (this.xGo = t)),
      (this.PGo = i));
  }
  DeselectCurrentGridProxy(i) {
    (this.PGo = -1),
      this.xGo && (this.xGo.OnDeselected(i), (this.xGo = void 0));
  }
  ClearSelectInfo() {
    (this.PGo = -1), (this.xGo = void 0);
  }
  GetSelectedProxy() {
    return this.xGo;
  }
  GetSelectedGridIndex() {
    return this.PGo;
  }
  GetDataLength() {
    return this.gWe;
  }
  IsProxyValid(i) {
    return i < this.RGo.length && this.RGo[i];
  }
  ClearData() {
    0 < this.Pe.length && (this.Pe.length = 0), (this.gWe = 0);
  }
  Destroy() {
    this.ClearData(),
      this.DGo.forEach((i) => {
        i.ScrollViewDelegate = void 0;
      }),
      (this.DGo.length = 0),
      (this.RGo.length = 0),
      (this.oNi = void 0),
      (this.UGo = void 0);
  }
}
exports.ScrollViewDelegate = ScrollViewDelegate;
//# sourceMappingURL=ScrollViewDelegate.js.map
