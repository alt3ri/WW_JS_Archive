"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const SECONDS_PER_DAY = 86400;
const red = new UE.Color(255, 0, 0, 255);
const soldOutColor = UE.Color.FromHex("FFFFFFFF");
const coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
class ShopItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.ItemInfo = void 0),
      (this.j7e = () => {
        (ModelManager_1.ModelManager.ShopModel.OpenItemInfo = this.ItemInfo),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenItemInfo);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIText],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.j7e]]);
  }
  UpdateItem(t) {
    let i;
    t &&
      (this.RootItem.SetAsLastHierarchy(),
      (this.ItemInfo = t),
      this.SetItemIcon(this.GetTexture(2), this.ItemInfo.ItemId),
      this.SetItemQualityIcon(this.GetSprite(3), this.ItemInfo.ItemId),
      this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.ItemId),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(5),
        "ShowCount",
        t.StackSize,
      ),
      (i = this.ItemInfo.ItemInfo),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name),
      this.SetItemIcon(this.GetTexture(6), t.GetMoneyId()),
      t.IsAffordable() || this.GetText(7).SetColor(coinNotEnoughColor),
      this.GetText(7).SetText(t.GetDefaultPrice().toString()),
      this.GetText(8).SetText(`<s>${this.ItemInfo.GetOriginalPrice()}</s>`),
      this.GetText(8).SetUIActive(this.ItemInfo.GetOriginalPrice() !== -1),
      this.UpdateLockState(),
      this.UpdateLimitTime());
  }
  UpdateLockState() {
    const t = this.ItemInfo.IsInteractive();
    this.GetItem(12).SetUIActive(!t),
      this.GetItem(11).SetAlpha(t ? 1 : 0.5),
      this.GetItem(13).SetUIActive(!this.ItemInfo.IsUnlocked()),
      this.GetText(9).SetUIActive(this.ItemInfo.BuyLimit !== -1),
      this.ItemInfo.BuyLimit !== -1 &&
        (this.GetText(9).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(9),
          "ShopItemLimitCount",
          this.ItemInfo.BuyLimit - this.ItemInfo.BoughtCount,
          this.ItemInfo.BuyLimit,
        )),
      this.ItemInfo.IsUnlocked()
        ? this.ItemInfo.IsSoldOut()
          ? (this.GetText(15).SetColor(soldOutColor),
            this.GetText(15).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(15),
              "ShopItemSoldOut",
            ))
          : this.ItemInfo.IsOutOfDate() &&
            (LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(15),
              "ShopItemTimeout",
            ),
            this.GetText(15).SetColor(red),
            this.GetText(15).SetUIActive(!0))
        : (this.GetText(15).SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(14),
            this.ItemInfo.LockInfo,
          ));
  }
  UpdateLimitTime() {
    let t, i;
    this.ItemInfo.EndTime !== 0 &&
      ((i = this.ItemInfo.EndTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()),
      (t = Math.trunc(i / SECONDS_PER_DAY)) > 0
        ? LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(10),
            "ShopItemLimitTime1",
            t,
          )
        : t === 0 &&
          ((t = Math.trunc(i / 3600)),
          (i = Math.trunc(i / 60) % 60),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(10),
            "ShopItemLimitTime2",
            t,
            i,
          ))),
      this.GetText(10).SetUIActive(this.ItemInfo.InSaleTime());
  }
  Tick() {
    this.UpdateLockState(), this.UpdateLimitTime();
  }
}
exports.ShopItem = ShopItem;
// # sourceMappingURL=ShopItem.js.map
