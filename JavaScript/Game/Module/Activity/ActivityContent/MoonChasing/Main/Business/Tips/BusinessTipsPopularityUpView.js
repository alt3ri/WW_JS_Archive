"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsPopularityUpView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  UiViewData_1 = require("../../../../../../../Ui/Define/UiViewData"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  TWEEN_TIME = 2;
class BusinessTipsPopularityUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ExpTweener = void 0),
      (this.Delegate = void 0),
      (this.ofa = void 0),
      (this.PopularityValue = 0),
      (this.P1a = 0),
      (this.Oko = 0),
      (this.w1a = void 0),
      (this.B1a = void 0),
      (this.b1a = void 0),
      (this.Mke = () => {
        this.CloseMe();
      }),
      (this.OAn = (i) => {
        this.b1a.SetFillAmount(i / this.PopularityValue),
          this.B1a.SetText(
            "<color=#ffd52b>" + i + "</color>/" + this.PopularityValue,
          );
      }),
      (this.q1a = (i, t) => {
        this.gzi(),
          t >= this.P1a ||
            (this.G1a(i, t + 1),
            AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_levelup"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.SpineSkeletonAnimationComponent],
      [12, UE.UIItem],
      [13, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[4, this.Mke]]);
  }
  Wpa() {
    var i;
    this.ofa.LastPopularity >= this.ofa.CurrentPopularity &&
      (((i = new UiViewData_1.UiViewData()).StartSequenceName = "Start01"),
      this.UiViewSequence?.SetSequenceName(i));
  }
  async OnBeforeStartAsync() {
    var i, t;
    (this.ofa = this.OpenParam),
      void 0 === this.ofa
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MoonChasing",
            59,
            "BusinessTipsPopularityUpView无效输入",
          )
        : (this.Wpa(),
          (this.b1a = this.GetSprite(8)),
          (this.w1a = this.GetSprite(7)),
          (this.B1a = this.GetText(6)),
          (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
          (i =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
              this.ofa.CurrentPopularity,
            )),
          (t =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
              this.ofa.LastPopularity,
            )),
          (this.PopularityValue = t.PopularityValue),
          (this.P1a = i.Id - t.Id + 1),
          await Promise.all([this.ooa(1 < this.P1a), this.noa(1 < this.P1a)]),
          this.soa(),
          this.aoa(1 < this.P1a),
          this.XNi(),
          this.hoa(),
          this.GetButton(4)?.RootUIComp.SetUIActive(!1));
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence?.PlaySequencePurely("PopStart");
    var i = this.ofa.CurrentPopularity,
      t = this.ofa.LastPopularity,
      i = i - t;
    this.Qpa(), 0 < i && this.O1a(t);
  }
  OnBeforeDestroy() {
    this.Delegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.OAn),
      (this.Delegate = void 0)),
      this.gzi(),
      AudioSystem_1.AudioSystem.ExecuteAction("play_ui_figure_up_2s", 0);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(!1);
  }
  async ooa(i) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.ofa.RoleId,
      ),
      t =
        (await this.SetSpineAssetByPath(
          t.SmallSpineAtlas,
          t.SmallSpineSkeletonData,
          this.GetSpine(11),
        ),
        i ? "happy" : "idle");
    this.GetSpine(11).SetAnimation(0, t, !0);
  }
  async noa(i) {
    (i = i ? "EntrustTipsBgBigSuccess" : "EntrustTipsBgNoPromotion"),
      (i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i));
    await this.SetTextureAsync(i, this.GetTexture(13));
  }
  soa() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.ofa.DialogName);
  }
  aoa(i) {
    this.GetItem(9)?.SetUIActive(i),
      this.GetItem(10)?.SetUIActive(!i),
      this.GetItem(12)?.SetUIActive(i);
  }
  XNi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.ofa.Title);
  }
  hoa() {
    var i =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCurrentPopularityConfig(),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          i.PopularityRating,
        ),
        this.ofa.CurrentPopularity),
      t = this.ofa.LastPopularity,
      i = i - t;
    this.GetText(5)?.SetUIActive(0 < i),
      0 < i && this.GetText(5)?.SetText("+" + i),
      this.GetSprite(8)?.SetFillAmount(t / this.PopularityValue),
      this.w1a.SetFillAmount(t / this.PopularityValue),
      this.B1a.SetText(
        "<color=#ffd52b>" + t + "</color>/" + this.PopularityValue,
      );
  }
  O1a(i) {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_2s"),
      (this.Oko = TWEEN_TIME / this.P1a),
      this.G1a(i, 1);
  }
  G1a(i, t) {
    var s =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
        i,
      );
    if (((this.PopularityValue = s.PopularityValue), this.P1a > t))
      this.w1a.SetFillAmount(1),
        (this.ExpTweener = UE.LTweenBPLibrary.IntTo(
          GlobalData_1.GlobalData.World,
          this.Delegate,
          i,
          this.PopularityValue,
          this.Oko,
        )),
        this.ExpTweener?.OnCompleteCallBack.Bind(() => {
          this.q1a(this.PopularityValue, t);
        });
    else {
      const e =
        ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
      this.w1a.SetFillAmount(e / this.PopularityValue),
        (this.ExpTweener = UE.LTweenBPLibrary.IntTo(
          GlobalData_1.GlobalData.World,
          this.Delegate,
          i,
          e,
          this.Oko,
        )),
        this.ExpTweener?.OnCompleteCallBack.Bind(() => {
          this.q1a(e, t);
        });
    }
  }
  gzi() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  Qpa() {
    this.GetButton(4)?.RootUIComp.SetUIActive(!0),
      this.UiViewSequence?.PlaySequencePurely("BtnStart");
  }
}
exports.BusinessTipsPopularityUpView = BusinessTipsPopularityUpView;
//# sourceMappingURL=BusinessTipsPopularityUpView.js.map
