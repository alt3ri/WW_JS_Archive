"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExpTweenComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GlobalData_1 = require("../../../GlobalData"),
  UiLayer_1 = require("../../../Ui/UiLayer");
class ExpTweenComponent {
  constructor(t, i, s, h, e = void 0) {
    (this.TweenFinishFunction = e),
      (this.ExpTweener = void 0),
      (this.TweenTime = 1),
      (this.StartCount = 1),
      (this.FinalFillAmount = 0),
      (this.PreviewExpTweener = void 0),
      (this.PreviewTweenTime = 0.5),
      (this.PreviewFinalFillAmount = 0),
      (this.CurrentLevel = 0),
      (this.ArrivedLevel = 0),
      (this.TargetLevel = 0),
      (this.InCurrent = !1),
      (this.qTt = void 0),
      (this.GTt = void 0),
      (this.PlayFillAmount = (t) => {
        this.SetCurrentFillAmount(t);
      }),
      (this.PlayPreviewFillAmount = (t) => {
        this.InCurrent
          ? this.SetAddFillAmount(t)
          : (this.SetNextFillAmount(t),
            1 !== this.AddSprite.GetFillAmount() && this.SetAddFillAmount(1));
      }),
      (this.AddSprite = i),
      (this.CurrentSprite = t),
      (this.NextSprite = s),
      (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(
        this.PlayFillAmount,
      )),
      (this.PreviewDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.PlayPreviewFillAmount,
      ));
  }
  PlayTween(t, i, s) {
    var h = 1 === t ? this.CurrentSprite.GetFillAmount() : 0,
      e = t === i ? this.FinalFillAmount : 1;
    t === i && this.AddSprite.SetFillAmount(e),
      UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !0),
      (this.ExpTweener = UE.LTweenBPLibrary.FloatTo(
        GlobalData_1.GlobalData.World,
        this.Delegate,
        h,
        e,
        s,
      )),
      this.ExpTweener.OnCompleteCallBack.Bind(() => {
        this.TweenCompleteCallBack(t, i, s);
      });
  }
  TweenCompleteCallBack(t, i, s) {
    this.KillExpTweener(),
      this.GTt && this.GTt(t === i),
      t < i
        ? this.PlayTween(t + 1, i, s)
        : (UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !1),
          this.TweenFinishFunction && this.TweenFinishFunction());
  }
  KillExpTweener() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  PlayPreviewTween(t, i, s, h) {
    (this.PreviewExpTweener = UE.LTweenBPLibrary.FloatTo(
      GlobalData_1.GlobalData.World,
      this.PreviewDelegate,
      t,
      i,
      s,
    )),
      this.PreviewExpTweener.OnCompleteCallBack.Bind(() => {
        this.PreviewTweenCompleteCallBack(s, h);
      });
  }
  PreviewTweenCompleteCallBack(t, i) {
    this.KillPreviewExpTweener(),
      i ? this.PreviewTweenPlayAgainState(t) : this.PreviewTweenStopState();
  }
  PreviewTweenStopState() {
    1 === this.PreviewFinalFillAmount
      ? (this.SetCurrentSpriteActive(!1),
        this.SetNextSpriteActive(!0),
        this.SetNextFillAmount(this.PreviewFinalFillAmount))
      : this.TargetLevel === this.CurrentLevel &&
        (this.SetCurrentSpriteActive(!0),
        this.SetAddFillAmount(this.PreviewFinalFillAmount),
        this.SetNextSpriteActive(!1));
  }
  PreviewTweenPlayAgainState(t) {
    this.ArrivedLevel > this.TargetLevel
      ? ((this.InCurrent = this.TargetLevel === this.CurrentLevel),
        this.InCurrent &&
          (this.SetCurrentSpriteActive(!0), this.SetNextSpriteActive(!1)),
        this.PlayPreviewTween(1, this.PreviewFinalFillAmount, t, !1))
      : this.ArrivedLevel < this.TargetLevel &&
        ((this.InCurrent = !1),
        this.SetCurrentSpriteActive(!1),
        this.SetNextSpriteActive(!0),
        this.PlayPreviewTween(0, this.PreviewFinalFillAmount, t, !1));
  }
  KillPreviewExpTweener(t = !1) {
    this.PreviewExpTweener?.Kill(),
      (this.PreviewExpTweener = void 0),
      t && this.PreviewTweenStopState();
  }
  BindPlayCompleteCallBack(t) {
    this.GTt = t;
  }
  BindPlayCurrentFillAmountCallback(t) {
    this.qTt = t;
  }
  SetCurrentFillAmount(t) {
    this.CurrentSprite.SetFillAmount(t), this.qTt && this.qTt(t);
  }
  SetNextFillAmount(t) {
    this.NextSprite.SetFillAmount(t);
  }
  SetAddFillAmount(t) {
    this.AddSprite.SetFillAmount(t);
  }
  SetCurrentSpriteActive(t) {
    this.CurrentSprite.SetUIActive(t);
  }
  SetNextSpriteActive(t) {
    this.NextSprite.SetUIActive(t);
  }
  PlayExpTween(t, i) {
    this.SetCurrentSpriteActive(!0),
      this.SetNextSpriteActive(!1),
      this.AddSprite.SetFillAmount(0),
      (this.FinalFillAmount = i);
    i = this.TweenTime / t;
    this.PlayTween(this.StartCount, t, i);
  }
  PlayPreviewExpTween(t, i, s, h, e) {
    this.KillPreviewExpTweener(!0), (this.PreviewFinalFillAmount = e);
    var o = (i !== t ? this.NextSprite : this.AddSprite).GetFillAmount();
    let r = void 0;
    (r = s < i && i !== h ? 0 : i < s || s === h ? 1 : e),
      (this.InCurrent = i === t),
      (this.CurrentLevel = t),
      (this.ArrivedLevel = i),
      (this.TargetLevel = s);
    (e =
      this.ArrivedLevel !== this.TargetLevel &&
      this.ArrivedLevel !== h &&
      this.TargetLevel !== h),
      (t = e ? this.PreviewTweenTime / 2 : this.PreviewTweenTime);
    this.PlayPreviewTween(o, r, t, e);
  }
  Destroy() {
    UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", !1),
      (0, puerts_1.releaseManualReleaseDelegate)(this.PlayFillAmount),
      (0, puerts_1.releaseManualReleaseDelegate)(this.PlayPreviewFillAmount),
      (this.Delegate = void 0),
      (this.PreviewDelegate = void 0),
      this.KillExpTweener(),
      this.KillPreviewExpTweener(),
      (this.CurrentSprite = void 0),
      (this.AddSprite = void 0),
      (this.NextSprite = void 0);
  }
}
exports.ExpTweenComponent = ExpTweenComponent;
//# sourceMappingURL=ExpTweenComponent.js.map
