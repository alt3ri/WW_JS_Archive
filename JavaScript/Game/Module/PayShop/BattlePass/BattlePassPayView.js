"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassPayView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattlePassController_1 = require("./BattlePassController"),
  PLAYSTATIONICONPOSITION = 0,
  CHECKSDKGAP = 500;
class BattlePassPayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Xki = void 0),
      (this.$ki = void 0),
      (this.Yki = void 0),
      (this.Jki = void 0),
      (this.Eki = 0),
      (this.TDe = void 0),
      (this.PNa = void 0),
      (this.zki = () => {
        this.Zki();
      }),
      (this.DSi = () => {
        this.CloseMe();
      }),
      (this.wNa = () => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(
          PLAYSTATIONICONPOSITION,
        );
      }),
      (this.e2i = () => {
        BattlePassController_1.BattlePassController.PayPrimaryBattlePass();
      }),
      (this.t2i = () => {
        BattlePassController_1.BattlePassController.PayHighBattlePass();
      }),
      (this.i2i = () => {
        var e = {
          WeaponDataList:
            ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
          SelectedIndex: 0,
          WeaponObservers: this.OpenParam,
        };
        UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
      }),
      (this.rOe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.RefreshLeftTime = () => {
        var e = TimeUtil_1.TimeUtil.GetServerTime(),
          e = this.Eki - e;
        e < 0 ||
          ((e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(7),
            "Text_GachaRemainingTime_Text",
            e.CountDownText,
          ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIGridLayout],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIGridLayout],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.e2i],
        [6, this.t2i],
        [0, this.DSi],
        [8, this.i2i],
      ]);
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
      this.DSi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.zki,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkPayEnd,
        this.wNa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
      this.DSi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQueryProductInfo,
        this.zki,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkPayEnd,
        this.wNa,
      );
  }
  OnStart() {
    (this.Yki = []),
      (this.Jki = []),
      ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(
        1,
        this.Yki,
      ),
      ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(
        3,
        this.Jki,
      ),
      (this.Xki = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.rOe,
      )),
      (this.$ki = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(4),
        this.rOe,
      )),
      this.Xki.RefreshByData(this.Yki),
      this.$ki.RefreshByData(this.Jki),
      (this.Eki =
        ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime()),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(
        this.RefreshLeftTime,
        CommonDefine_1.MILLIONSECOND_PER_SECOND,
      )),
      this.RefreshLeftTime(),
      this.Zki();
    const t = new Array();
    this.o2i().forEach((e) => {
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e);
      t.push(e.ProductId.toString());
    }),
      ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(
        t,
      ),
      this.BNa(),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(
        PLAYSTATIONICONPOSITION,
      );
  }
  BNa() {
    var e =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (e)
      for (const i of this.o2i()) {
        var t =
            ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(
              i,
            ).ProductId,
          t =
            ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(t);
        if (!t)
          return (
            (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(
              1,
              () => {
                UiManager_1.UiManager.CloseView("BattlePassPayView");
              },
            ),
            (t.IsEscViewTriggerCallBack = !1),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            ),
            this.bNa(),
            !1
          );
      }
    return !0;
  }
  async bNa() {
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      0,
    )) &&
      (this.qNa(),
      (this.PNa = TimerSystem_1.TimerSystem.Forever(() => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetMessageBoxCurrentState(
          (e) => {
            3 === e &&
              (this.qNa(),
              PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().TerminateMessageBox());
          },
        );
      }, CHECKSDKGAP)));
  }
  qNa() {
    this.PNa &&
      (TimerSystem_1.TimerSystem.Remove(this.PNa), (this.PNa = void 0));
  }
  o2i() {
    return [
      ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId(),
      ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId(),
      ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId(),
    ];
  }
  OnBeforeDestroy() {
    (this.Yki.length = 0),
      (this.Yki = void 0),
      (this.Jki.length = 0),
      (this.Jki = void 0),
      (this.Xki = void 0),
      (this.$ki = void 0),
      this.TDe.Remove(),
      (this.TDe = void 0),
      this.qNa(),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().HidePlayStationStoreIcon();
  }
  Zki() {
    var e,
      t = ModelManager_1.ModelManager.BattlePassModel.PayType;
    this.GetItem(9).SetUIActive(t === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid),
      this.GetItem(11).SetUIActive(
        t !== Protocol_1.Aki.Protocol.PNs.Proto_NoPaid,
      ),
      this.GetItem(10).SetUIActive(
        t !== Protocol_1.Aki.Protocol.PNs.Proto_Advanced,
      ),
      this.GetItem(12).SetUIActive(
        t === Protocol_1.Aki.Protocol.PNs.Proto_Advanced,
      ),
      t === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid
        ? ((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId(),
          )?.GetDirectPriceText()),
          this.GetText(2).SetText(e ?? ""),
          (e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId(),
          )?.GetDirectPriceText()),
          this.GetText(5).SetText(e ?? ""))
        : t === Protocol_1.Aki.Protocol.PNs.Proto_Paid &&
          ((e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId(),
          )?.GetDirectPriceText()),
          this.GetText(5).SetText(e ?? ""));
  }
}
exports.BattlePassPayView = BattlePassPayView;
//# sourceMappingURL=BattlePassPayView.js.map
