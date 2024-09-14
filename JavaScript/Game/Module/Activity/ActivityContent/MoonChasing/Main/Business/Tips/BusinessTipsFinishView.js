"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsFinishView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  GlobalData_1 = require("../../../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../../Ui/Common/PopupCaptionItem"),
  UiViewData_1 = require("../../../../../../../Ui/Define/UiViewData"),
  LevelSequencePlayer_1 = require("../../../../../../Common/LevelSequencePlayer"),
  BusinessDefine_1 = require("../BusinessDefine"),
  CharacterItemWithLine_1 = require("../Common/Character/CharacterItemWithLine"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule"),
  MoonChasingPopularityUpData_1 = require("../Model/MoonChasingPopularityUpData"),
  TWEEN_TIME = 1;
class RewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.ItemId = i),
      (this.psa = 0),
      (this.ZLa = 0),
      (this.qte = 0),
      (this.CurrentValueDelegate = void 0),
      (this.ExpTweener = void 0),
      (this.$pt = void 0),
      (this.Msa = (i) => {
        this.GetText(1)?.SetText(i.toString());
      }),
      (this.eDa = () => {
        this.KillExpTweener(),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_2"),
          this.$pt
            .PlaySequenceAsync("Add", new CustomPromise_1.CustomPromise())
            .finally(() => {
              this.IsDestroyOrDestroying ||
                ((this.ExpTweener = UE.LTweenBPLibrary.IntTo(
                  GlobalData_1.GlobalData.World,
                  this.CurrentValueDelegate,
                  this.ZLa,
                  this.qte,
                  TWEEN_TIME,
                )),
                this.ExpTweener.OnCompleteCallBack.Bind(this.Esa));
            });
      }),
      (this.Esa = () => {
        this.KillExpTweener(),
          this.GetText(3)?.SetUIActive(!0),
          this.GetText(2)?.SetUIActive(!1),
          this.$pt?.PlayLevelSequenceByName("Addition02");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      await this.SetItemIconAsync(this.GetTexture(0), this.ItemId);
  }
  OnStart() {
    this.GetText(1)?.SetUIActive(!0),
      this.GetText(2)?.SetUIActive(!1),
      this.GetText(3)?.SetUIActive(!1),
      this.Tsa(!1),
      (this.CurrentValueDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.Msa,
      ));
  }
  OnBeforeDestroy() {
    this.KillExpTweener(),
      (0, puerts_1.releaseManualReleaseDelegate)(this.Msa),
      (this.CurrentValueDelegate = void 0),
      this.$pt?.Clear();
  }
  KillExpTweener() {
    this.ExpTweener && (this.ExpTweener.Kill(), (this.ExpTweener = void 0));
  }
  ysa() {
    this.GetText(1)?.SetText(this.psa.toString()),
      this.GetText(3)?.SetText(this.qte.toString());
  }
  async ShowAddValue() {
    this.GetText(2)?.SetUIActive(!0),
      this.GetText(2)?.SetText("+" + this.ZLa),
      await this.OCa();
  }
  async OCa() {
    await this.$pt.PlaySequenceAsync(
      "Addition01",
      new CustomPromise_1.CustomPromise(),
    ),
      this.IsDestroyOrDestroying ||
        (this.qte === this.ZLa
          ? ((this.ExpTweener = UE.LTweenBPLibrary.IntTo(
              GlobalData_1.GlobalData.World,
              this.CurrentValueDelegate,
              this.psa,
              this.qte,
              TWEEN_TIME,
            )),
            this.ExpTweener.OnCompleteCallBack.Bind(this.Esa))
          : ((this.ExpTweener = UE.LTweenBPLibrary.IntTo(
              GlobalData_1.GlobalData.World,
              this.CurrentValueDelegate,
              this.psa,
              this.ZLa,
              TWEEN_TIME,
            )),
            this.ExpTweener.OnCompleteCallBack.Bind(this.eDa)));
  }
  Tsa(i) {
    this.GetItem(4)?.SetUIActive(i),
      i &&
        ((i =
          ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData()),
        this.GetText(5)?.SetText(i.Ratio + "%"));
  }
  UpdateItem(i, e, t) {
    (this.qte = i), (this.ZLa = e), this.ysa(), this.Tsa(t);
  }
}
class BusinessTipsFinishView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CharacterListModule = void 0),
      (this.FirstReward = void 0),
      (this.SecondReward = void 0),
      (this.CaptionItem = void 0),
      (this.TDe = void 0),
      (this.dke = () => new CharacterItemWithLine_1.CharacterItemWithLine()),
      (this.Mke = () => {
        var i =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
          e = ModelManager_1.ModelManager.MoonChasingModel.GetPopularityValue(),
          t =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId(),
          s = i.LastPopularity < e ? "Moonfiesta_Title1" : "Moonfiesta_Title2",
          t = new MoonChasingPopularityUpData_1.MoonChasingPopularityUpData(
            t,
            i.LastPopularity,
            e,
            i.GetRoleDialog(),
            s,
          );
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTipsPopularityUpView(
          t,
        );
      }),
      (this.pwa = (i, e) => {
        "New01" === e &&
          ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData()
            .IsBest &&
          AudioSystem_1.AudioSystem.PostEvent("play_ui_zhuiyuejie_positive");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [5, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.Mke]]);
  }
  async U3e() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7));
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId();
    await this.CaptionItem.SetCurrencyItemList([i, e]);
  }
  Wpa() {
    var i;
    ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData()
      .EvaluationLevel < BusinessDefine_1.SPECIAL_LEVEL &&
      (((i = new UiViewData_1.UiViewData()).StartSequenceName = "Start01"),
      this.UiViewSequence?.SetSequenceName(i));
  }
  async OnBeforeStartAsync() {
    this.RootActor?.OnSequencePlayEvent.Bind(this.pwa),
      this.Wpa(),
      this.GetButton(6)?.RootUIComp.SetUIActive(!1),
      (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
        this.dke,
      ));
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId(),
      i =
        ((this.FirstReward = new RewardItem(i)),
        (this.SecondReward = new RewardItem(e)),
        await Promise.all([
          this.CharacterListModule.CreateThenShowByActorAsync(
            this.GetItem(5).GetOwner(),
          ),
          this.FirstReward.CreateThenShowByActorAsync(
            this.GetItem(3).GetOwner(),
          ),
          this.SecondReward.CreateThenShowByActorAsync(
            this.GetItem(4).GetOwner(),
          ),
          this.U3e(),
        ]),
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData()),
      e =
        (await this.CharacterListModule.RefreshByDataAsync(
          i.GetResultCharacterList(),
        ),
        this.FirstReward.UpdateItem(
          i.Gold,
          i.BaseGold,
          i.IsTriggerEvent && i.IsInvestSuccess,
        ),
        this.SecondReward.UpdateItem(i.Wish, i.BaseWish, !1),
        this.GetItem(1)?.SetUIActive(!i.IsBest),
        this.GetItem(2)?.SetUIActive(i.IsBest),
        ConfigManager_1.ConfigManager.BusinessConfig.GetEvaluateByLevel(
          i.EvaluationLevel,
        ));
    await this.SetTextureAsync(e.Icon, this.GetTexture(0));
  }
  OnAfterPlayStartSequence() {
    AudioSystem_1.AudioSystem.PostEvent("play_ui_figure_up_end"),
      this.FirstReward?.ShowAddValue(),
      this.SecondReward?.ShowAddValue().finally(() => {
        this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
          (this.TDe = void 0),
            this.GetButton(6)?.RootUIComp.SetUIActive(!0),
            this.UiViewSequence?.PlaySequencePurely("AtnStart");
        }, 1e3 * TWEEN_TIME);
      });
  }
  OnBeforeDestroy() {
    this.RootActor?.OnSequencePlayEvent.Unbind(), this.GAn();
  }
  GAn() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
}
exports.BusinessTipsFinishView = BusinessTipsFinishView;
//# sourceMappingURL=BusinessTipsFinishView.js.map
