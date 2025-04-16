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
  constructor(i = void 0, t = !1, s = void 0, e = !1) {
    (this.Data = i),
      (this.KeepContentPosition = t),
      (this.CallBack = s),
      (this.PlayGridAnim = e);
  }
}
class LoopScrollView {
  constructor(i, t, s, e = !1) {
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
      (this.znl = void 0),
      (this.HDa = !1),
      (this.pNo = (i, t) => {
        this.uGo.CreateGridProxy(i, t);
      }),
      (this.vNo = (i, t) => {
        const s = this.uGo.CreateGridProxyAsync(i, t);
        this.HDa
          ? this.mNo.push(s)
          : (this.mNo.push(s),
            s.then(() => {
              var i = this.mNo.indexOf(s);
              this.mNo.splice(i, 1);
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
          for (let i = d; i <= l; ++i)
            i < 0 ||
              i >= this.dNo ||
              ((h = i % G),
              (o = i % p),
              i >= e && i <= r && i <= l && h == o) ||
              this.uGo.ClearGridProxy(i, this.ENo(i));
          (this.Iei = e), (this.NCi = r);
          let t = -1,
            s = -1;
          for (let i = e; i <= r; ++i)
            i < 0 ||
              i >= this.dNo ||
              ((a = i % G),
              (n = i % p),
              0 <= d && i >= d && i <= l && a == n) ||
              (this.SNo(i), IS_DEBUG && (t < 0 && (t = i), (s = i)));
          IS_DEBUG &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LoopScrollView",
              16,
              "更新格子",
              ["起始Index", t],
              ["终止Index", s],
              ["展示中数量", this.IGo],
            );
        }
      }),
      (this.pGo = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("LoopScrollView", 24, "LoopScrollView.OnDestroy"),
          this.cNo.OnDestroyCallBack.Unbind(),
          this.cNo.OnGridsUpdate.Unbind(),
          this.cNo.OnGridCreate.Unbind(),
          this.cGo && this.cGo.Clear(),
          this.uGo.Destroy();
      }),
      t
        ? (t.GetUIItem().SetUIActive(!1),
          i.SetTickableWhenPaused(!0),
          i.OnDestroyCallBack.Bind(this.pGo),
          e ? i.OnGridCreate.Bind(this.vNo) : i.OnGridCreate.Bind(this.pNo),
          i.OnGridsUpdate.Bind(this.MNo),
          (this.cNo = i),
          (this.fGo = t),
          (this.uGo = new ScrollViewDelegate_1.ScrollViewDelegate(s)),
          (this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(
            this,
          )),
          this.cGo.RegisterAnimController())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LoopScrollView", 16, "设置格子模板错误，grid为空!");
  }
  get IGo() {
    return this.CN ? 0 : this.NCi - this.Iei + 1;
  }
  get Iei() {
    return this.CNo;
  }
  set Iei(i) {
    this.CNo = i;
  }
  get NCi() {
    return this.gNo;
  }
  set NCi(i) {
    this.gNo = i;
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
    var i;
    (this.pjt = !1),
      this.gWt.Empty ||
        ((i = this.gWt.Pop()),
        this.RefreshByData(
          i.Data,
          i?.KeepContentPosition,
          i.CallBack,
          i.PlayGridAnim,
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
    this.cNo.SetInAnimation(!1), this.znl?.();
  }
  SetAnimFinishDelegate(i) {
    this.znl = i;
  }
  GetGrid(i) {
    i = this.cNo.GetGrid(i);
    if (i) return i.GetUIItem();
  }
  GetGridByDisplayIndex(i) {
    var t = this.cNo.GridArray.Get(i);
    if (t) return t.GetUIItem();
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("ScrollViewGrid", 24, "Grid is NULL!", [
        "DisplayIndex",
        i,
      ]);
  }
  UnsafeGetGridProxy(i, t = !1) {
    var s = this.ENo(i, !0);
    if (-1 !== s) {
      if (!this.cGo || this.cGo.IsGridControlValid())
        return this.uGo.GetGridProxy(s);
      t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          24,
          "动画还在播放时非法获取格子, gridIndex: " + i,
        );
    }
  }
  ReloadGrids(i) {
    i !== this.uGo.GetDataLength() && this.MGo(i, !1);
  }
  ReloadProxyData(i, t, s = !0, e = !1) {
    this.uGo.ClearSelectInfo(), this.uGo.SetDataProxy(i, t, s), this.MGo(t, e);
  }
  ReloadData(i, t = !1) {
    i.length === this.uGo.GetDataLength()
      ? (this.UpdateData(i), this.cGo?.PlayGridAnim(this.IGo, !0))
      : (this.uGo.ClearSelectInfo(),
        this.uGo.SetData(i),
        this.MGo(i.length, t));
  }
  UpdateData(i) {
    i.length !== this.uGo.GetDataLength()
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ScrollViewGrid",
          24,
          `UpdateData要求新的数据长度必须跟旧的数据长度相等. 新长度: ${i.length}, 旧长度：` +
            this.uGo.GetDataLength(),
        )
      : (this.uGo.SetData(i), this.RefreshAllGridProxies());
  }
  RefreshAllGridProxies() {
    if (!this.CN)
      for (let i = this.Iei; i <= this.NCi; ++i) this.RefreshGridProxy(i);
  }
  RefreshGridProxy(i) {
    var t;
    i >= this.Iei &&
      i <= this.NCi &&
      ((t = this.ENo(i)), this.uGo.RefreshGridProxy(i, t));
  }
  ClearGridProxies() {
    this.uGo.ClearData();
    for (let i = this.Iei; i <= this.NCi; ++i)
      this.uGo.ClearGridProxy(i, this.ENo(i));
  }
  ClearSelectInfo() {
    this.uGo.ClearSelectInfo();
  }
  TryGetCachedData(i) {
    return this.uGo.TryGetCachedData(i);
  }
  SelectGridProxy(i, t = !1) {
    this.uGo.SelectGridProxy(i, this.ENo(i), t);
  }
  DeselectCurrentGridProxy(i = !1) {
    this.uGo.DeselectCurrentGridProxy(i);
  }
  GetSelectedGridIndex() {
    return this.uGo.GetSelectedGridIndex();
  }
  BindLateUpdate(i) {
    this.cNo.OnLateUpdate.Bind(i);
  }
  UnBindLateUpdate() {
    this.cNo.OnLateUpdate.Unbind();
  }
  MGo(i, t) {
    var s;
    this.cNo
      ? (s = this.fGo)
        ? ((this.Iei = -1),
          (this.NCi = -1),
          (this.dNo = i),
          this.cNo.RefreshByData(s, i, t),
          (this.fNo = !0),
          this.cGo && this.cGo.PlayGridAnim(this.IGo, !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            16,
            "更新数据错误，TemplateGrid为空!",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LoopScrollView",
          16,
          "更新数据错误，UILoopScrollViewComponent组件为空!",
        );
  }
  RefreshByData(i, t = !1, s, e = !1) {
    var r;
    this.Rjt
      ? ((r = new OperationParam(i, t, s)), this.gWt.Push(r))
      : (this.Ujt(),
        this.RefreshByDataAsync(i, t, e).finally(() => {
          s?.(), this.Jft();
        }));
  }
  async RefreshByDataAsync(i, t = !1, s = !1) {
    i.length === this.uGo.GetDataLength()
      ? this.UpdateData(i)
      : (this.uGo.ClearSelectInfo(),
        this.uGo.SetData(i),
        await this.yNo(i.length, t)),
      s && this.cGo && this.cGo.PlayGridAnim(this.IGo, !0);
  }
  async yNo(i, t) {
    var s;
    this.cNo
      ? (s = this.fGo)
        ? ((this.Iei = -1),
          (this.NCi = -1),
          (this.dNo = i),
          (this.HDa = !0),
          (this.mNo.length = 0),
          this.cNo.RefreshByData(s, i, t),
          await Promise.all(this.mNo),
          0 < this.mNo.length &&
            ((this.mNo.length = 0), this.cNo.RefreshByData(s, i, t)),
          (this.HDa = !1),
          (this.fNo = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            43,
            "更新数据错误，TemplateGrid为空!",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LoopScrollView",
          43,
          "更新数据错误，UILoopScrollViewComponent组件为空!",
        );
  }
  IsGridDisplaying(i) {
    i = this.ENo(i, !1);
    return 0 <= i && i < this.IGo;
  }
  ScrollToGridIndex(i, t = !0) {
    this.cNo.ScrollToGridIndex(i), t && this.ResetGridController();
  }
  ScrollToGridIndexWithTween(i, t = !0) {
    this.cNo.ScrollToGridIndex(i, !0), t && this.ResetGridController();
  }
  SNo(i) {
    var t = this.ENo(i);
    this.uGo.OnGridsUpdate(i, t, this.Iei, this.NCi);
  }
  ENo(i, t = !1) {
    return this.Iei < 0 || this.IGo <= 0
      ? (t &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LoopScrollView",
            16,
            "GetGridDisplayIndex: 未初始化",
            ["this.StartGridIndex", this.Iei],
            ["this.DisplayGridNum", this.IGo],
          ),
        -1)
      : i < this.Iei || i >= this.Iei + this.IGo
        ? (t &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LoopScrollView",
              16,
              "GetGridDisplayIndex: 未处于展示中",
              ["gridIndex", i],
              ["this.StartGridIndex", this.Iei],
              [
                "this.StartGridIndex + this.DisplayGridNum",
                this.Iei + this.IGo,
              ],
            ),
          -1)
        : i % this.IGo;
  }
  BindOnScrollValueChanged(i) {
    this.cNo.OnScrollValueChange.Bind(i);
  }
  GetGridAndScrollToByJudge(s, e) {
    if (this.DataInited) {
      let i = 0,
        t = !1;
      for (const r of this.uGo.GetDatas()) {
        if (e(s, r)) {
          t = !0;
          break;
        }
        i++;
      }
      return t || (i = 0), this.ScrollToGridIndex(i), this.GetGrid(i);
    }
  }
  ScrollToNextLine(i = !0) {
    this.cNo.ScrollToNextLine(i);
  }
  SetTargetRootComponentActive(i) {
    this.cNo.GetRootComponent().SetUIActive(i);
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
