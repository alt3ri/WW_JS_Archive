"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopRechargeItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PayItemController_1 = require("../../../PayItem/PayItemController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
  PayShopItemBase_1 = require("./PayShopItemBase");
class PayShopRechargeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.g3i = void 0),
      (this.Y3i = !1),
      (this.J3i = 0),
      (this.z3i = !1),
      (this.Z3i = 0),
      (this.jbe = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 点击充值", [
            "Id",
            this.Pe.PayItemId,
          ]),
          PayItemController_1.PayItemController.SdkPay(this.Pe.PayItemId);
      }),
      (this.USe = (t) => {
        t.PayItemId === this.Pe.PayItemId &&
          ((this.Pe.CanSpecialBonus = !1),
          this.Refresh(this.Pe, !1, 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Shop",
            11,
            "PayShop:ShopItem 充值成功,道具到账",
            ["订单号", t.OrderId],
            ["道具id", t.ItemId],
            ["道具数量", t.ItemCount],
          );
      }),
      (this.R3i = () => {
        this.Pe && (this.e4i(), this.t4i());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.jbe]]);
  }
  SetRaycastState(t) {
    this.RootItem.SetRaycastTarget(t),
      this.g3i.GetRootItem().SetRaycastTarget(t);
  }
  SetDownPriceShowState(t) {
    this.g3i.SetDownPriceShowState(t);
  }
  OnStart() {
    (this.g3i = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0))),
      this.g3i.Init(),
      (this.Y3i = this.GetItem(1).bIsUIActive),
      (this.z3i = this.GetItem(3).bIsUIActive),
      this.dde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.R3i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DiscountShopTimerRefresh,
      this.R3i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  OnBeforeDestroy() {
    this.Cde();
  }
  Refresh(t, e, i) {
    t instanceof PayShopGoods_1.PayShopGoods ||
      ((this.Pe = t),
      this.g3i.Refresh(
        ModelManager_1.ModelManager.PayItemModel.ConvertPayItemDataToPayShopItemBaseSt(
          t,
        ),
        e,
        i,
      ),
      this.e4i(),
      this.t4i());
  }
  e4i() {
    let t = !1,
      e = 0;
    0 < this.Pe.BonusItemCount &&
      !this.Pe.CanSpecialBonus &&
      ((t = !0), (e = this.Pe.BonusItemCount)),
      this.Y3i !== t && ((this.Y3i = t), this.GetItem(1).SetUIActive(t)),
      this.J3i !== e &&
        ((this.J3i = e),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(2),
          "DefaultBonus",
          this.Pe.BonusItemCount,
        ));
  }
  t4i() {
    let t = !1,
      e = 0;
    this.Pe.CanSpecialBonus && ((t = !0), (e = this.Pe.SpecialBonusItemCount)),
      this.z3i !== t && ((this.z3i = t), this.GetItem(3).SetUIActive(t)),
      this.Z3i !== e &&
        ((this.Z3i = e),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(4),
          "FirstBonus2",
          this.Pe.SpecialBonusItemCount,
        ));
  }
}
exports.PayShopRechargeItem = PayShopRechargeItem;
//# sourceMappingURL=PayShopRechargeItem.js.map
