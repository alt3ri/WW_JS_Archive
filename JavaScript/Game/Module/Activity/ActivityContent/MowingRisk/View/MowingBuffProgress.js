"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffProgress = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  MowingBuffIntroduce_1 = require("./MowingBuffIntroduce"),
  MowingBuffUnit_1 = require("./MowingBuffUnit");
class BuffNodeTweenData {
  constructor(i, e) {
    (this.Percentage = i), (this.BuffNodeItem = e);
  }
}
class MowingBuffProgress extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.f9a = []),
      (this.u9a = void 0),
      (this.ujr = void 0),
      (this.Delegate = void 0),
      (this.Tweener = void 0),
      (this.T6_ = !1),
      (this.b6_ = 0),
      (this.L6_ = 0),
      (this.w6_ = new Queue_1.Queue()),
      (this.OAn = (i) => {
        var e;
        this.GetSprite(1).SetFillAmount(i),
          0 !== this.w6_.Size &&
            (e = this.w6_.Front) &&
            i >= e.Percentage &&
            (e.BuffNodeItem.PlayUnlockSequence(), this.w6_.Pop());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var i = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await i.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.u9a = i),
      this.GetItem(3)?.SetUIActive(!1),
      this.GetItem(4)?.SetUIActive(!1),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn));
  }
  async gDo(i) {
    var e = i % 2 == 0 ? 3 : 4,
      e = LguiUtil_1.LguiUtil.CopyItem(
        this.GetItem(e),
        this.GetHorizontalLayout(2).RootUIComp,
      ),
      s = new MowingBuffUnit_1.MowingBuffUnit();
    await (this.f9a[i] = s).CreateThenShowByActorAsync(e.GetOwner());
  }
  RefreshByCustomData(i) {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "MowingBuffProgress.RefreshByCustomDataAsync",
      async () => {
        await this.RefreshByCustomDataAsync(i);
      },
    );
    this.RunAsyncTask(e);
  }
  async RefreshByCustomDataAsync(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      e.CountTextId,
      ...e.CountTextArgs,
    );
    var i,
      s,
      t = e.SuperBuffList;
    if (this.f9a.length < t.length) {
      var r = [];
      for (let i = this.f9a.length; i < t.length; i++) r.push(this.gDo(i));
      await Promise.all(r);
    }
    for ([i, s] of this.f9a.entries())
      t.length > i ? s.RefreshByCustomData(t[i]) : s.SetUiActive(!1);
    this.u9a.RefreshByCustomData(e.IntroduceData);
    var a = ModelManager_1.ModelManager.MowingRiskModel,
      h = a.GetProgressPanelBasicBuffCountRecord(),
      n = e.CurBasicBuffCount;
    if (h === n)
      (this.T6_ = !1), this.GetSprite(1).SetFillAmount(e.ProgressPercentage);
    else {
      a.RecordProgressPanelBasicBuffCount(n);
      var o = a.GetProgressOverallPercentage(e.ArtifactId, h),
        u = e.ProgressPercentage;
      if (MathUtils_1.MathUtils.IsNearlyEqual(o, u))
        (this.T6_ = !1), this.GetSprite(1).SetFillAmount(e.ProgressPercentage);
      else {
        this.R6_(),
          this.GetSprite(1).SetFillAmount(o),
          (this.T6_ = !0),
          (this.b6_ = o),
          (this.L6_ = u),
          this.w6_.Clear();
        for (let i = 0; i < t.length; i++) {
          var f,
            U = t[i].ThresholdCount;
          h < U &&
            U <= n &&
            ((U = a.GetProgressOverallPercentage(e.ArtifactId, U)),
            (f = this.f9a[i]),
            (U = new BuffNodeTweenData(U, f)),
            f.UpdateUnlockState(!1),
            this.w6_.Push(U));
        }
      }
    }
  }
  async PlayStartSequenceAsync() {
    await this.ujr.LitePlayAsync("Start", !0);
  }
  async PlayProgressTween() {
    if (this.T6_) {
      const i = new CustomPromise_1.CustomPromise();
      this.R6_(),
        (this.Tweener = UE.LTweenBPLibrary.FloatTo(
          this.RootItem,
          this.Delegate,
          this.b6_,
          this.L6_,
          0.2,
        )),
        this.Tweener?.OnCompleteCallBack.Bind(() => {
          i.SetResult(!0);
        }),
        await i.Promise;
    }
  }
  R6_() {
    this.Tweener && this.Tweener.IsValid() && this.Tweener.Kill(),
      (this.Tweener = void 0);
  }
  OnBeforeDestroy() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.OAn), this.R6_();
  }
}
exports.MowingBuffProgress = MowingBuffProgress;
//# sourceMappingURL=MowingBuffProgress.js.map
