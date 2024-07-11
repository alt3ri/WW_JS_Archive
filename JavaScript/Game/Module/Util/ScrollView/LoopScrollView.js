"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoopScrollView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation"),
  ScrollViewDelegate_1 = require("./ScrollViewDelegate"),
  IS_DEBUG = !1;
class OperationParam {
  constructor(t = void 0, i = !1, s = void 0, e = !1) {
    (this.Data = t),
      (this.KeepContentPosition = i),
      (this.CallBack = s),
      (this.PlayGridAnim = e);
  }
}
class LoopScrollView {
  constructor(t, i, s, e = !1) {
    (this.CGo = void 0),
      (this.dqo = void 0),
      (this.Cqo = void 0),
      (this.gGo = []),
      (this.fGo = 0),
      (this.pGo = -1),
      (this.vGo = -1),
      (this.Mqo = void 0),
      (this.MGo = !1),
      (this.pHt = !1),
      (this.gjt = new Queue_1.Queue()),
      (this.SGo = (t, i) => {
        this.dqo.CreateGridProxy(t, i);
      }),
      (this.EGo = (t, i) => {
        t = this.dqo.CreateGridProxyAsync(t, i);
        this.gGo.push(t);
      }),
      (this.yGo = (e, r) => {
        if (!(0 < this.gGo.length || (this.IZt === e && this.Ndi === r))) {
          var h,
            o,
            a,
            n,
            d = this.IZt,
            l = this.Ndi,
            G = this.Dqo,
            p = r - e + 1;
          for (let t = d; t <= l; ++t)
            t < 0 ||
              t >= this.fGo ||
              ((h = t % G),
              (o = t % p),
              t >= e && t <= r && t <= l && h == o) ||
              this.dqo.ClearGridProxy(t, this.IGo(t));
          (this.IZt = e), (this.Ndi = r);
          let i = -1,
            s = -1;
          for (let t = e; t <= r; ++t)
            t < 0 ||
              t >= this.fGo ||
              ((a = t % G),
              (n = t % p),
              0 <= d && t >= d && t <= l && a == n) ||
              (this.TGo(t), IS_DEBUG && (i < 0 && (i = t), (s = t)));
          IS_DEBUG &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LoopScrollView",
              17,
              "更新格子",
              ["起始Index", i],
              ["终止Index", s],
              ["展示中数量", this.Dqo],
            );
        }
      }),
      (this.Sqo = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("LoopScrollView", 25, "LoopScrollView.OnDestroy"),
          this.CGo.OnDestroyCallBack.Unbind(),
          this.CGo.OnGridsUpdate.Unbind(),
          this.CGo.OnGridCreate.Unbind(),
          this.Cqo && this.Cqo.Clear(),
          this.dqo.Destroy();
      }),
      i
        ? (i.GetUIItem().SetUIActive(!1),
          t.SetTickableWhenPaused(!0),
          t.OnDestroyCallBack.Bind(this.Sqo),
          e ? t.OnGridCreate.Bind(this.EGo) : t.OnGridCreate.Bind(this.SGo),
          t.OnGridsUpdate.Bind(this.yGo),
          (this.CGo = t),
          (this.Mqo = i),
          (this.dqo = new ScrollViewDelegate_1.ScrollViewDelegate(s)),
          (this.Cqo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
            this,
          )),
          this.Cqo.RegisterAnimController())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LoopScrollView", 17, "设置格子模板错误，grid为空!");
  }
  get Dqo() {
    return this.CN ? 0 : this.Ndi - this.IZt + 1;
  }
  get IZt() {
    return this.pGo;
  }
  set IZt(t) {
    this.pGo = t;
  }
  get Ndi() {
    return this.vGo;
  }
  set Ndi(t) {
    this.vGo = t;
  }
  get CN() {
    return -1 === this.Ndi && -1 === this.IZt;
  }
  get DataInited() {
    return this.MGo;
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
        this.RefreshByData(
          t.Data,
          t?.KeepContentPosition,
          t.CallBack,
          t.PlayGridAnim,
        ));
  }
  GetDisplayGridNum() {
    return this.Dqo;
  }
  GetPreservedGridNum() {
    return this.CGo ? this.CGo.GridArray.Num() : 0;
  }
  GetDisplayGridStartIndex() {
    return this.IZt;
  }
  GetDisplayGridEndIndex() {
    return this.Ndi;
  }
  GetGridAnimationInterval() {
    return this.CGo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.CGo.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.CGo.SetInAnimation(!0);
  }
  NotifyAnimationEnd() {
    this.CGo.SetInAnimation(!1);
  }
  GetGrid(t) {
    t = this.CGo.GetGrid(t);
    if (t) return t.GetUIItem();
  }
  GetGridByDisplayIndex(t) {
    var i = this.CGo.GridArray.Get(t);
    if (i) return i.GetUIItem();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("ScrollViewGrid", 25, "Grid is NULL!", [
        "DisplayIndex",
        t,
      ]);
  }
  UnsafeGetGridProxy(t, i = !1) {
    var s = this.IGo(t, !0);
    if (-1 !== s) {
      if (!this.Cqo || this.Cqo.IsGridControlValid())
        return this.dqo.GetGridProxy(s);
      i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          25,
          "动画还在播放时非法获取格子, gridIndex: " + t,
        );
    }
  }
  ReloadGrids(t) {
    t !== this.dqo.GetDataLength() && this.yqo(t, !1);
  }
  ReloadProxyData(t, i, s = !0, e = !1) {
    this.dqo.ClearSelectInfo(), this.dqo.SetDataProxy(t, i, s), this.yqo(i, e);
  }
  ReloadData(t, i = !1) {
    t.length === this.dqo.GetDataLength()
      ? (this.UpdateData(t), this.Cqo?.PlayGridAnim(this.Dqo, !0))
      : (this.dqo.ClearSelectInfo(),
        this.dqo.SetData(t),
        this.yqo(t.length, i));
  }
  UpdateData(t) {
    t.length !== this.dqo.GetDataLength()
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          25,
          `UpdateData要求新的数据长度必须跟旧的数据长度相等. 新长度: ${t.length}, 旧长度：` +
            this.dqo.GetDataLength(),
        )
      : (this.dqo.SetData(t), this.RefreshAllGridProxies());
  }
  RefreshAllGridProxies() {
    if (!this.CN)
      for (let t = this.IZt; t <= this.Ndi; ++t) this.RefreshGridProxy(t);
  }
  RefreshGridProxy(t) {
    var i;
    t >= this.IZt &&
      t <= this.Ndi &&
      ((i = this.IGo(t)), this.dqo.RefreshGridProxy(t, i));
  }
  ClearGridProxies() {
    this.dqo.ClearData();
    for (let t = this.IZt; t <= this.Ndi; ++t)
      this.dqo.ClearGridProxy(t, this.IGo(t));
  }
  ClearSelectInfo() {
    this.dqo.ClearSelectInfo();
  }
  TryGetCachedData(t) {
    return this.dqo.TryGetCachedData(t);
  }
  SelectGridProxy(t, i = !1) {
    this.dqo.SelectGridProxy(t, this.IGo(t), i);
  }
  DeselectCurrentGridProxy(t = !1) {
    this.dqo.DeselectCurrentGridProxy(t);
  }
  GetSelectedGridIndex() {
    return this.dqo.GetSelectedGridIndex();
  }
  BindLateUpdate(t) {
    this.CGo.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.CGo.OnLateUpdate.Unbind();
  }
  yqo(t, i) {
    var s;
    this.CGo
      ? (s = this.Mqo)
        ? ((this.IZt = -1),
          (this.Ndi = -1),
          (this.fGo = t),
          this.CGo.RefreshByData(s, t, i),
          (this.MGo = !0),
          this.Cqo && this.Cqo.PlayGridAnim(this.Dqo, !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            17,
            "更新数据错误，TemplateGrid为空!",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LoopScrollView",
          17,
          "更新数据错误，UILoopScrollViewComponent组件为空!",
        );
  }
  RefreshByData(t, i = !1, s, e = !1) {
    var r;
    this.RHt
      ? ((r = new OperationParam(t, i, s)), this.gjt.Push(r))
      : (this.UHt(),
        this.RefreshByDataAsync(t, i, e).finally(() => {
          s?.(), this.O0t();
        }));
  }
  async RefreshByDataAsync(t, i = !1, s = !1) {
    t.length === this.dqo.GetDataLength()
      ? this.UpdateData(t)
      : (this.dqo.ClearSelectInfo(),
        this.dqo.SetData(t),
        await this.LGo(t.length, i)),
      s && this.Cqo && this.Cqo.PlayGridAnim(this.Dqo, !0);
  }
  async LGo(t, i) {
    var s;
    this.CGo
      ? (s = this.Mqo)
        ? ((this.IZt = -1),
          (this.Ndi = -1),
          (this.fGo = t),
          (this.gGo.length = 0),
          this.CGo.RefreshByData(s, t, i),
          await Promise.all(this.gGo),
          0 < this.gGo.length &&
            ((this.gGo.length = 0), this.CGo.RefreshByData(s, t, i)),
          (this.MGo = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            44,
            "更新数据错误，TemplateGrid为空!",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LoopScrollView",
          44,
          "更新数据错误，UILoopScrollViewComponent组件为空!",
        );
  }
  IsGridDisplaying(t) {
    t = this.IGo(t, !1);
    return 0 <= t && t < this.Dqo;
  }
  ScrollToGridIndex(t, i = !0) {
    this.CGo.ScrollToGridIndex(t), i && this.ResetGridController();
  }
  TGo(t) {
    var i = this.IGo(t);
    this.dqo.OnGridsUpdate(t, i, this.IZt, this.Ndi);
  }
  IGo(t, i = !1) {
    return this.IZt < 0 || this.Dqo <= 0
      ? (i &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            17,
            "GetGridDisplayIndex: 未初始化",
            ["this.StartGridIndex", this.IZt],
            ["this.DisplayGridNum", this.Dqo],
          ),
        -1)
      : t < this.IZt || t >= this.IZt + this.Dqo
        ? (i &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LoopScrollView",
              17,
              "GetGridDisplayIndex: 未处于展示中",
              ["gridIndex", t],
              ["this.StartGridIndex", this.IZt],
              [
                "this.StartGridIndex + this.DisplayGridNum",
                this.IZt + this.Dqo,
              ],
            ),
          -1)
        : t % this.Dqo;
  }
  BindOnScrollValueChanged(t) {
    this.CGo.OnScrollValueChange.Bind(t);
  }
  GetGridAndScrollToByJudge(s, e) {
    if (this.DataInited) {
      let t = 0,
        i = !1;
      for (const r of this.dqo.GetDatas()) {
        if (e(s, r)) {
          i = !0;
          break;
        }
        t++;
      }
      return i || (t = 0), this.ScrollToGridIndex(t), this.GetGrid(t);
    }
  }
  ScrollToNextLine(t = !0) {
    this.CGo.ScrollToNextLine(t);
  }
  SetTargetRootComponentActive(t) {
    this.CGo.GetRootComponent().SetUIActive(t);
  }
  ResetGridController() {
    this.Cqo && this.Cqo.PlayGridAnim(this.Dqo, !0);
  }
  GetUiAnimController() {
    return this.CGo?.GetContent()?.GetComponentByClass(
      UE.UIInturnAnimController.StaticClass(),
    );
  }
}
exports.LoopScrollView = LoopScrollView;
//# sourceMappingURL=LoopScrollView.js.map
