"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerTipsItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiResourceManager_1 = require("../../../Ui/LguiResourceManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  PayShopItem_1 = require("../../PayShop/PayShopTab/TabItem/PayShopItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  GAP = 1e3;
class PowerTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.i4i = void 0),
      (this.Xbe = void 0),
      (this.$8i = void 0),
      (this.ZXs = void 0),
      (this.eYs = void 0),
      (this.tYs = void 0),
      (this.SPe = void 0),
      (this.iYs = () => {
        this.tYs?.();
      }),
      (this.dde = () => {
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnPowerChanged,
          this.A6e,
        );
      }),
      (this.Cde = () => {
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnPowerChanged,
          this.A6e,
        );
      }),
      (this.A6e = () => {
        this.mGe(), this.WXs();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.iYs]]);
  }
  SetBackBackCallBack(e) {
    this.tYs = e;
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Energy_Title"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Energy_Text"),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var e = this.GetItem(2);
    this.i4i.GetRootItem().SetUIParent(e), this.dde();
  }
  OnBeforeShow() {
    this.PlayStartSequence();
  }
  PlayStartSequence() {
    this.SPe?.PlaySequencePurely("Start");
  }
  async PlayCloseSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  async OnCreateAsync() {
    return new Promise((i) => {
      LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
        "UiItem_ShopItem",
        void 0,
        (e) => {
          (this.i4i = new PayShopItem_1.PayShopItem()),
            this.i4i.CreateThenShowByActor(e),
            i();
        },
      );
    });
  }
  RefreshByData(e) {
    (this.$8i = e),
      (this.eYs =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.$8i.ItemId,
        )),
      (this.ZXs = ModelManager_1.ModelManager.PowerModel.GetPowerDataById(
        this.$8i.ItemId,
      )),
      this.i4i.HideExchangePopViewElement(),
      this.i4i.Refresh(e.ConvertToPayShopGoods(), !1, 0),
      (this.Xbe = TimerSystem_1.TimerSystem.Forever(() => {
        this.q7e();
      }, GAP)),
      this.Og();
  }
  Og() {
    this.mGe(), this.Pqe(), this.kra(), this.WXs();
  }
  WXs() {
    var e = this.ZXs.GetPowerRecoveryMode();
    2 === e
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "PowerMax")
      : 1 === e
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "PowerStopRecovery",
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "PowerNextRecovery",
            this.ZXs.GetNextTimerRecoverText(),
          );
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "Energy_Number",
      this.ZXs.GetCurrentPower(),
      this.ZXs.GetPowerLimit(),
    );
  }
  Pqe() {
    var e = this.eYs.AttributesDescription;
    this.GetText(3).ShowTextNew(e);
  }
  kra() {
    var e = this.eYs.BgDescription;
    e && this.GetText(8).ShowTextNew(e);
  }
  u3e() {
    this.WXs();
  }
  q7e() {
    this.u3e();
  }
  OnBeforeDestroy() {
    this.Cde(),
      this.Xbe &&
        (TimerSystem_1.TimerSystem.Remove(this.Xbe), (this.Xbe = void 0));
  }
}
exports.PowerTipsItem = PowerTipsItem;
//# sourceMappingURL=PowerTipsItem.js.map
