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
    (this.cNo = void 0),
      (this.uGo = void 0),
      (this.cGo = void 0),
      (this.mNo = []),
      (this.dNo = 0),
      (this.CNo = -1),
      (this.gNo = -1),
      (this.fGo = void 0),
      (this.fNo = !1),
      (this.pjt = !1),
      (this.gWt = new Queue_1.Queue()),
      (this.pIa = !1),
      (this.pNo = (t, i) => {
        this.uGo.CreateGridProxy(t, i);
      }),
      (this.vNo = (t, i) => {
        const s = this.uGo.CreateGridProxyAsync(t, i);
        this.pIa
          ? this.mNo.push(s)
          : (this.mNo.push(s),
            s.then(() => {
              var t = this.mNo.indexOf(s);
              this.mNo.splice(t, 1);
            }));
      }),
      (this.MNo = (e, r) => {
        if (!(0 < this.mNo.length || (this.Iei === e && this.NCi === r))) {
          var h,
            o,
            a,
            n,
            d = this.Iei,
            l = this.NCi,
            G = this.IGo,
            p = r - e + 1;
          for (let t = d; t <= l; ++t)
            t < 0 ||
              t >= this.dNo ||
              ((h = t % G),
              (o = t % p),
              t >= e && t <= r && t <= l && h == o) ||
              this.uGo.ClearGridProxy(t, this.ENo(t));
          (this.Iei = e), (this.NCi = r);
          let i = -1,
            s = -1;
          for (let t = e; t <= r; ++t)
            t < 0 ||
              t >= this.dNo ||
              ((a = t % G),
              (n = t % p),
              0 <= d && t >= d && t <= l && a == n) ||
              (this.SNo(t), IS_DEBUG && (i < 0 && (i = t), (s = t)));
          IS_DEBUG &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LoopScrollView",
              17,
              "更新格子",
              ["起始Index", i],
              ["终止Index", s],
              ["展示中数量", this.IGo],
            );
        }
      }),
      (this.pGo = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("LoopScrollView", 25, "LoopScrollView.OnDestroy"),
          this.cNo.OnDestroyCallBack.Unbind(),
          this.cNo.OnGridsUpdate.Unbind(),
          this.cNo.OnGridCreate.Unbind(),
          this.cGo && this.cGo.Clear(),
          this.uGo.Destroy();
      }),
      i
        ? (i.GetUIItem().SetUIActive(!1),
          t.SetTickableWhenPaused(!0),
          t.OnDestroyCallBack.Bind(this.pGo),
          e ? t.OnGridCreate.Bind(this.vNo) : t.OnGridCreate.Bind(this.pNo),
          t.OnGridsUpdate.Bind(this.MNo),
          (this.cNo = t),
          (this.fGo = i),
          (this.uGo = new ScrollViewDelegate_1.ScrollViewDelegate(s)),
          (this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
            this,
          )),
          this.cGo.RegisterAnimController())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LoopScrollView", 17, "设置格子模板错误，grid为空!");
  }
  get IGo() {
    return this.CN ? 0 : this.NCi - this.Iei + 1;
  }
  get Iei() {
    return this.CNo;
  }
  set Iei(t) {
    this.CNo = t;
  }
  get NCi() {
    return this.gNo;
  }
  set NCi(t) {
    this.gNo = t;
  }
  get CN() {
    return -1 === this.NCi && -1 === this.Iei;
  }
  get DataInited() {
    return this.fNo;
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
        this.RefreshByData(
          t.Data,
          t?.KeepContentPosition,
          t.CallBack,
          t.PlayGridAnim,
        ));
  }
  GetDisplayGridNum() {
    return this.IGo;
  }
  GetPreservedGridNum() {
    return this.cNo ? this.cNo.GridArray.Num() : 0;
  }
  GetDisplayGridStartIndex() {
    return this.Iei;
  }
  GetDisplayGridEndIndex() {
    return this.NCi;
  }
  GetGridAnimationInterval() {
    return this.cNo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.cNo.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.cNo.SetInAnimation(!0);
  }
  NotifyAnimationEnd() {
    this.cNo.SetInAnimation(!1);
  }
  GetGrid(t) {
    t = this.cNo.GetGrid(t);
    if (t) return t.GetUIItem();
  }
  GetGridByDisplayIndex(t) {
    var i = this.cNo.GridArray.Get(t);
    if (i) return i.GetUIItem();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("ScrollViewGrid", 25, "Grid is NULL!", [
        "DisplayIndex",
        t,
      ]);
  }
  UnsafeGetGridProxy(t, i = !1) {
    var s = this.ENo(t, !0);
    if (-1 !== s) {
      if (!this.cGo || this.cGo.IsGridControlValid())
        return this.uGo.GetGridProxy(s);
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
    t !== this.uGo.GetDataLength() && this.MGo(t, !1);
  }
  ReloadProxyData(t, i, s = !0, e = !1) {
    this.uGo.ClearSelectInfo(), this.uGo.SetDataProxy(t, i, s), this.MGo(i, e);
  }
  ReloadData(t, i = !1) {
    t.length === this.uGo.GetDataLength()
      ? (this.UpdateData(t), this.cGo?.PlayGridAnim(this.IGo, !0))
      : (this.uGo.ClearSelectInfo(),
        this.uGo.SetData(t),
        this.MGo(t.length, i));
  }
  UpdateData(t) {
    t.length !== this.uGo.GetDataLength()
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          25,
          `UpdateData要求新的数据长度必须跟旧的数据长度相等. 新长度: ${t.length}, 旧长度：` +
            this.uGo.GetDataLength(),
        )
      : (this.uGo.SetData(t), this.RefreshAllGridProxies());
  }
  RefreshAllGridProxies() {
    if (!this.CN)
      for (let t = this.Iei; t <= this.NCi; ++t) this.RefreshGridProxy(t);
  }
  RefreshGridProxy(t) {
    var i;
    t >= this.Iei &&
      t <= this.NCi &&
      ((i = this.ENo(t)), this.uGo.RefreshGridProxy(t, i));
  }
  ClearGridProxies() {
    this.uGo.ClearData();
    for (let t = this.Iei; t <= this.NCi; ++t)
      this.uGo.ClearGridProxy(t, this.ENo(t));
  }
  ClearSelectInfo() {
    this.uGo.ClearSelectInfo();
  }
  TryGetCachedData(t) {
    return this.uGo.TryGetCachedData(t);
  }
  SelectGridProxy(t, i = !1) {
    this.uGo.SelectGridProxy(t, this.ENo(t), i);
  }
  DeselectCurrentGridProxy(t = !1) {
    this.uGo.DeselectCurrentGridProxy(t);
  }
  GetSelectedGridIndex() {
    return this.uGo.GetSelectedGridIndex();
  }
  BindLateUpdate(t) {
    this.cNo.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.cNo.OnLateUpdate.Unbind();
  }
  MGo(t, i) {
    var s;
    this.cNo
      ? (s = this.fGo)
        ? ((this.Iei = -1),
          (this.NCi = -1),
          (this.dNo = t),
          this.cNo.RefreshByData(s, t, i),
          (this.fNo = !0),
          this.cGo && this.cGo.PlayGridAnim(this.IGo, !0))
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
    this.Rjt
      ? ((r = new OperationParam(t, i, s)), this.gWt.Push(r))
      : (this.Ujt(),
        this.RefreshByDataAsync(t, i, e).finally(() => {
          s?.(), this.Jft();
        }));
  }
  async RefreshByDataAsync(t, i = !1, s = !1) {
    t.length === this.uGo.GetDataLength()
      ? this.UpdateData(t)
      : (this.uGo.ClearSelectInfo(),
        this.uGo.SetData(t),
        await this.yNo(t.length, i)),
      s && this.cGo && this.cGo.PlayGridAnim(this.IGo, !0);
  }
  async yNo(t, i) {
    var s;
    this.cNo
      ? (s = this.fGo)
        ? ((this.Iei = -1),
          (this.NCi = -1),
          (this.dNo = t),
          (this.pIa = !0),
          (this.mNo.length = 0),
          this.cNo.RefreshByData(s, t, i),
          await Promise.all(this.mNo),
          0 < this.mNo.length &&
            ((this.mNo.length = 0), this.cNo.RefreshByData(s, t, i)),
          (this.pIa = !1),
          (this.fNo = !0))
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
    t = this.ENo(t, !1);
    return 0 <= t && t < this.IGo;
  }
  ScrollToGridIndex(t, i = !0) {
    this.cNo.ScrollToGridIndex(t), i && this.ResetGridController();
  }
  SNo(t) {
    var i = this.ENo(t);
    this.uGo.OnGridsUpdate(t, i, this.Iei, this.NCi);
  }
  ENo(t, i = !1) {
    return this.Iei < 0 || this.IGo <= 0
      ? (i &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            17,
            "GetGridDisplayIndex: 未初始化",
            ["this.StartGridIndex", this.Iei],
            ["this.DisplayGridNum", this.IGo],
          ),
        -1)
      : t < this.Iei || t >= this.Iei + this.IGo
        ? (i &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LoopScrollView",
              17,
              "GetGridDisplayIndex: 未处于展示中",
              ["gridIndex", t],
              ["this.StartGridIndex", this.Iei],
              [
                "this.StartGridIndex + this.DisplayGridNum",
                this.Iei + this.IGo,
              ],
            ),
          -1)
        : t % this.IGo;
  }
  BindOnScrollValueChanged(t) {
    this.cNo.OnScrollValueChange.Bind(t);
  }
  GetGridAndScrollToByJudge(s, e) {
    if (this.DataInited) {
      let t = 0,
        i = !1;
      for (const r of this.uGo.GetDatas()) {
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
    this.cNo.ScrollToNextLine(t);
  }
  SetTargetRootComponentActive(t) {
    this.cNo.GetRootComponent().SetUIActive(t);
  }
  ResetGridController() {
    this.cGo && this.cGo.PlayGridAnim(this.IGo, !0);
  }
  GetUiAnimController() {
    return this.cNo
      ?.GetContent()
      ?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
  }
}
exports.LoopScrollView = LoopScrollView;
//# sourceMappingURL=LoopScrollView.js.map
