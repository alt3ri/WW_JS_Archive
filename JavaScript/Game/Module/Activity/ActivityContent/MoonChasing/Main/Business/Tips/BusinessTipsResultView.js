"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessTipsResultView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  BusinessTipsCurrencyItem_1 = require("./BusinessTipsCurrencyItem"),
  BusinessTipsInvestModule_1 = require("./BusinessTipsInvestModule"),
  BusinessTipsSettlementModule_1 = require("./BusinessTipsSettlementModule"),
  ANIM_TIME = 2e3;
class BusinessTipsResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.InvestModule = void 0),
      (this.SettlementModule = void 0),
      (this.TimerHandle = void 0),
      (this.CurrencyItem = void 0),
      (this.t2e = () => {
        this.TimerHandle && (this.GAn(), this.loa());
      }),
      (this.zke = () => {
        this.InvestModule?.SetActive(!1),
          this.GetItem(1)?.SetUIActive(!1),
          this.GetItem(6)?.SetUIActive(!0),
          this.VAn("working", 0.1),
          AudioSystem_1.AudioSystem.PostEvent("play_ui_zuiyuejie_loading"),
          this.kwa(),
          this.PlaySequenceAsync("Run").finally(() => {
            this.GetButton(5)?.RootUIComp.SetUIActive(!0), this.HAn();
          });
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.SpineSkeletonAnimationComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.t2e]]);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.Zke(), this.UAr(), this.AAr(), this.Nwa()]),
      this.jta(),
      this.GetButton(5)?.RootUIComp.SetUIActive(!1),
      this.GetItem(6)?.SetUIActive(!1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BusinessInvestResult,
      this.zke,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BusinessInvestResult,
      this.zke,
    );
  }
  OnBeforeDestroy() {
    this.GAn();
  }
  async Zke() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        e.TriggerEventRoleId,
      );
    await this.SetSpineAssetByPath(
      e.SmallSpineAtlas,
      e.SmallSpineSkeletonData,
      this.GetSpine(0),
    ),
      this.GetSpine(0).SetAnimation(0, "idle", !0);
  }
  async Nwa() {
    (this.CurrencyItem =
      new BusinessTipsCurrencyItem_1.BusinessTipsCurrencyItem()),
      await this.CurrencyItem.CreateThenShowByActorAsync(
        this.GetItem(7).GetOwner(),
      );
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    this.CurrencyItem.RefreshTemp(e);
  }
  jta() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        e.TriggerEventRoleId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.InvestDialog);
  }
  async UAr() {
    (this.InvestModule =
      new BusinessTipsInvestModule_1.BusinessTipsInvestModule()),
      await this.InvestModule.CreateThenShowByActorAsync(
        this.GetItem(3).GetOwner(),
      );
  }
  async AAr() {
    (this.SettlementModule =
      new BusinessTipsSettlementModule_1.BusinessTipsSettlementModule()),
      await this.SettlementModule.CreateByActorAsync(
        this.GetItem(4).GetOwner(),
      );
  }
  HAn() {
    this.TimerHandle = TimerSystem_1.TimerSystem.Delay(() => {
      (this.TimerHandle = void 0), this.loa();
    }, ANIM_TIME);
  }
  GAn() {
    this.TimerHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.TimerHandle),
      (this.TimerHandle = void 0));
  }
  loa() {
    AudioSystem_1.AudioSystem.ExecuteAction("play_ui_zuiyuejie_loading", 0);
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        e.TriggerEventRoleId,
      ),
      i = e.IsInvestSuccess ? i.InvestSuccessDialog : i.InvestFailDialog,
      i =
        (this.GetItem(1)?.SetUIActive(!0),
        this.GetItem(6)?.SetUIActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i),
        e.IsInvestSuccess ? "happy" : "fail");
    this.VAn(i, 0.1),
      this.SettlementModule?.SetActive(!0),
      e.IsInvestSuccess
        ? this.PlaySequence("Success", () => {
            this.SettlementModule?.StartCharacterAnim();
          })
        : this.PlaySequence("Fail");
  }
  VAn(e, i) {
    this.GetSpine(0).SetAnimation(0, e, !0)?.SetMixDuration(i);
  }
  kwa() {
    var e =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetResultData(),
      i = e.OriginGold - e.CostGold;
    this.CurrencyItem.PlayReduceTweener(e.OriginGold, i);
  }
}
exports.BusinessTipsResultView = BusinessTipsResultView;
//# sourceMappingURL=BusinessTipsResultView.js.map
