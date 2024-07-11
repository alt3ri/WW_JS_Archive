"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessMainView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../../../Common/Button/ButtonItem"),
  PopularityModule_1 = require("../PopularityModule"),
  BusinessSkipItem_1 = require("./BusinessSkipItem"),
  BusinessViewController_1 = require("./BusinessViewController"),
  DelegationDetailsModule_1 = require("./Delegation/DelegationDetailsModule"),
  DelegationNonDetailsModule_1 = require("./Delegation/DelegationNonDetailsModule");
class BusinessMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Details = void 0),
      (this.CaptionItem = void 0),
      (this.eke = void 0),
      (this.NonDetailsList = []),
      (this.SkipItem = void 0),
      (this.FWs = void 0),
      (this.MCa = void 0),
      (this.gIa = !1),
      (this.zGn = new BusinessViewController_1.BusinessViewController()),
      (this.fIa = () => {
        ModelManager_1.ModelManager.MoonChasingBusinessModel.IsUnlockRoleIdEmpty() &&
          this.gIa &&
          ((this.gIa = !0), this.UiViewSequence?.PlaySequence("Refresh"));
      }),
      (this.$Oe = (e) => {
        "MoonChasingUnlockRoleView" === e &&
          this.gIa &&
          ((this.gIa = !0), this.UiViewSequence?.PlaySequence("Refresh"));
      }),
      (this.rke = () => {
        this.zGn.BackToState(0);
      }),
      (this.Rra = () => {
        this.xra();
      }),
      (this.Ina = () => {
        (this.gIa = !0), this.yXs(), this.eke.RefreshPopularity();
      }),
      (this.wTa = () => {
        var t =
          ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationDataList();
        for (let e = 0; e < this.NonDetailsList.length; e++) {
          var i = this.NonDetailsList[e];
          e < t.length && i.RefreshConsume();
        }
      }),
      (this.SkipToMainView = () => {
        this.yXs(),
          this.GetItem(7)?.SetUIActive(!0),
          this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon3"),
          this.UiViewSequence?.PlaySequenceAsync(
            "SwitchOut",
            new CustomPromise_1.CustomPromise(),
            !0,
          ).finally(() => {
            this.Details?.SetActive(!1);
          });
      }),
      (this.SkipToDelegationDetails = (...e) => {
        e = e[0];
        this.Wga(e).finally(void 0),
          this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon7"),
          this.UiViewSequence?.PlaySequenceAsync(
            "SwitchIn",
            new CustomPromise_1.CustomPromise(),
            !0,
          ).finally(() => {
            this.GetItem(7)?.SetUIActive(!1);
          });
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  async ERn() {
    (this.eke = new PopularityModule_1.PopularityModule()),
      await this.eke.CreateByActorAsync(this.GetItem(9).GetOwner()),
      this.AddChild(this.eke);
  }
  async U3e() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(2),
    )),
      this.CaptionItem.SetCloseCallBack(this.zGn.BackToLastState),
      this.CaptionItem.SetHelpCallBack(this.zGn.OpenHelpView);
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetPowerItemId(),
      t = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    await Promise.all([
      this.CaptionItem.SetTitleIconByResourceId("SP_ChasingMoonIcon3"),
      this.CaptionItem.SetCurrencyItemList([e, t]),
    ]);
  }
  async IXs(e) {
    var t = new DelegationNonDetailsModule_1.DelegationNonDetailsModule();
    t.RegisterViewController(this.zGn),
      await t.CreateThenShowByActorAsync(e.GetOwner()),
      this.NonDetailsList.push(t);
  }
  async Pra() {
    (this.SkipItem = new BusinessSkipItem_1.BusinessSkipItem()),
      this.SkipItem.RegisterViewController(this.zGn),
      await this.SkipItem.CreateByActorAsync(this.GetItem(10).GetOwner());
  }
  async Qga() {
    (this.Details = new DelegationDetailsModule_1.DelegationDetailsModule()),
      await this.Details.CreateByResourceIdAsync(
        "UiItem_EntrustQuest",
        this.GetItem(8),
      );
  }
  SCa() {
    (this.FWs = new ButtonItem_1.ButtonItem(this.GetItem(0))),
      this.FWs.SetFunction(this.zGn.SkipToBuild),
      (this.MCa = new ButtonItem_1.ButtonItem(this.GetItem(1))),
      this.MCa.SetFunction(this.zGn.SkipToHelper);
  }
  async TXs() {
    await Promise.all([
      this.IXs(this.GetItem(3)),
      this.IXs(this.GetItem(4)),
      this.IXs(this.GetItem(5)),
      this.IXs(this.GetItem(6)),
    ]),
      this.yXs();
  }
  yXs() {
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationDataList();
    for (let e = 0; e < this.NonDetailsList.length; e++) {
      var i = this.NonDetailsList[e];
      e < t.length ? i.Refresh(t[e]) : i.SetActive(!1);
    }
  }
  async OnBeforeStartAsync() {
    this.zGn.RegisterView(this),
      await Promise.all([
        this.ERn(),
        this.U3e(),
        this.TXs(),
        this.Pra(),
        this.Qga(),
      ]),
      this.SCa();
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.zGn.BeforeShowAsync();
  }
  OnBeforeShow() {
    this.zGn.Show(), this.RefreshRedDot();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenTipsTravelView,
      this.rke,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnlockMoonChasingData,
        this.Rra,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshDelegate,
        this.Ina,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BusinessInvestResult,
        this.wTa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ConditionUnlockRole,
        this.fIa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Oe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenTipsTravelView,
      this.rke,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnlockMoonChasingData,
        this.Rra,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshDelegate,
        this.Ina,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BusinessInvestResult,
        this.wTa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ConditionUnlockRole,
        this.fIa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Oe,
      );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return !(e.length < 1) && "Delegation" === e[0]
      ? this.Details?.GetGuideUiItemAndUiItemForShowEx(e)
      : void 0;
  }
  async Wga(e) {
    e =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetDelegationData(e);
    this.Details.SetDelegationData(e), await this.Details.ShowAsync();
  }
  xra() {
    void 0 ===
    ModelManager_1.ModelManager.MoonChasingModel?.GetFirstUnlockData()
      ? this.SkipItem.SetActive(!1)
      : (this.SkipItem.SetActive(!0), this.SkipItem.Refresh());
  }
  async BeforeShowAsync(e) {
    e || (await this.Details.RefreshAsync());
  }
  Refresh() {
    this.xra();
  }
  RefreshRedDot() {
    this.FWs.BindRedDot("MoonChasingBuilding"),
      this.MCa.BindRedDot("MoonChasingRole");
  }
  SwitchShowViewSequence(e) {
    this.UiViewSequence.ShowSequenceName = e ? "ShowView" : "ShowView01";
  }
}
exports.BusinessMainView = BusinessMainView;
//# sourceMappingURL=BusinessMainView.js.map
