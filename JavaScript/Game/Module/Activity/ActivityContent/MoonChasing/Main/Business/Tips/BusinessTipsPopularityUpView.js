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
      (this.pCa = void 0),
      (this.PopularityValue = 0),
      (this.xaa = 0),
      (this.Oko = 0),
      (this.Paa = void 0),
      (this.waa = void 0),
      (this.Baa = void 0),
      (this.Mke = () => {
        this.CloseMe();
      }),
      (this.OAn = (i) => {
        this.Baa.SetFillAmount(i / this.PopularityValue),
          this.waa.SetText(
            "<color=#ffd52b>" + i + "</color>/" + this.PopularityValue,
          );
      }),
      (this.baa = (i, t) => {
        this.gzi(),
          t >= this.xaa ||
            (this.qaa(i, t + 1),
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
  Jga() {
    var i;
    this.pCa.LastPopularity >= this.pCa.CurrentPopularity &&
      (((i = new UiViewData_1.UiViewData()).StartSequenceName = "Start01"),
      this.UiViewSequence?.SetSequenceName(i));
  }
  async OnBeforeStartAsync() {
    var i, t;
    (this.pCa = this.OpenParam),
      void 0 === this.pCa
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "MoonChasing",
            59,
            "BusinessTipsPopularityUpView无效输入",
          )
        : (this.Jga(),
          (this.Baa = this.GetSprite(8)),
          (this.Paa = this.GetSprite(7)),
          (this.waa = this.GetText(6)),
          (this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)),
          (i =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
              this.pCa.CurrentPopularity,
            )),
          (t =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
              this.pCa.LastPopularity,
            )),
          (this.PopularityValue = t.PopularityValue),
          (this.xaa = i.Id - t.Id + 1),
          await Promise.all([this.Nta(1 < this.xaa), this.kta(1 < this.xaa)]),
          this.Fta(),
          this.Vta(1 < this.xaa),
          this.XNi(),
          this.Hta(),
          this.GetButton(4)?.RootUIComp.SetUIActive(!1));
  }
  OnAfterPlayStartSequence() {
    this.UiViewSequence?.PlaySequencePurely("PopStart");
    var i = this.pCa.CurrentPopularity,
      t = this.pCa.LastPopularity,
      i = i - t;
    this.zga(), 0 < i && this.Gaa(t);
  }
  OnBeforeDestroy() {
    this.Delegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.OAn),
      (this.Delegate = void 0)),
      this.gzi();
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.MoonChasingBusinessModel.SetIsInDelegate(!1);
  }
  async Nta(i) {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.pCa.RoleId,
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
  async kta(i) {
    (i = i ? "EntrustTipsBgBigSuccess" : "EntrustTipsBgNoPromotion"),
      (i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i));
    await this.SetTextureAsync(i, this.GetTexture(13));
  }
  Fta() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.pCa.DialogName);
  }
  Vta(i) {
    this.GetItem(9)?.SetUIActive(i),
      this.GetItem(10)?.SetUIActive(!i),
      this.GetItem(12)?.SetUIActive(i);
  }
  XNi() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.pCa.Title);
  }
  Hta() {
    var i =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCurrentPopularityConfig(),
      i =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          i.PopularityRating,
        ),
        this.pCa.CurrentPopularity),
      t = this.pCa.LastPopularity,
      i = i - t;
    this.GetText(5)?.SetUIActive(0 < i),
      0 < i && this.GetText(5)?.SetText("+" + i),
      this.GetSprite(8)?.SetFillAmount(t / this.PopularityValue),
      this.Paa.SetFillAmount(t / this.PopularityValue),
      this.waa.SetText(
        "<color=#ffd52b>" + t + "</color>/" + this.PopularityValue,
      );
  }
  Gaa(i) {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_2s"),
      (this.Oko = TWEEN_TIME / this.xaa),
      this.qaa(i, 1);
  }
  qaa(i, t) {
    var s =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(
        i,
      );
    if (((this.PopularityValue = s.PopularityValue), this.xaa > t))
      this.Paa.SetFillAmount(1),
        (this.ExpTweener = UE.LTweenBPLibrary.IntTo(
          GlobalData_1.GlobalData.World,
          this.Delegate,
          i,
          this.PopularityValue,
          this.Oko,
        )),
        this.ExpTweener?.OnCompleteCallBack.Bind(() => {
          this.baa(this.PopularityValue, t);
        });
    else {
      const e =
        ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue();
      this.Paa.SetFillAmount(e / this.PopularityValue),
        (this.ExpTweener = UE.LTweenBPLibrary.IntTo(
          GlobalData_1.GlobalData.World,
          this.Delegate,
          i,
          e,
          this.Oko,
        )),
        this.ExpTweener?.OnCompleteCallBack.Bind(() => {
          this.baa(e, t);
        });
    }
  }
  gzi() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  zga() {
    this.GetButton(4)?.RootUIComp.SetUIActive(!0),
      this.UiViewSequence?.PlaySequencePurely("BtnStart");
  }
}
exports.BusinessTipsPopularityUpView = BusinessTipsPopularityUpView;
//# sourceMappingURL=BusinessTipsPopularityUpView.js.map
