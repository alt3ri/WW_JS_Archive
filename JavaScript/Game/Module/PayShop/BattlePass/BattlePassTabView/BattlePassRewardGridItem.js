"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassRewardGridItem =
    exports.BattlePassRewardItem =
    exports.BattlePassRewardData =
      void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  BattlePassController_1 = require("./../BattlePassController"),
  BattlePassSmallGridItem_1 = require("./BattlePassSmallGridItem");
class BattlePassRewardData {
  constructor(t) {
    (this.FreeRewardItem = []),
      (this.PayRewardItem = []),
      (this.Level = 0),
      (this.Level = t);
  }
  IsThisType(t) {
    for (const s of this.FreeRewardItem) if (s.ItemType === t) return !0;
    for (const e of this.PayRewardItem) if (e.ItemType === t) return !0;
    return !1;
  }
  GetItemCount(t, s) {
    if (t === Protocol_1.Aki.Protocol.ENs.Proto_Free) {
      const e = this.GetFreeRewardItem(s);
      return e.Item[1];
    }
    const e = this.GetPayRewardItem(s);
    return e.Item[1];
  }
  GetFreeRewardItem(t) {
    for (const s of this.FreeRewardItem) if (s.Item[0].ItemId === t) return s;
  }
  GetPayRewardItem(t) {
    for (const s of this.PayRewardItem) if (s.Item[0].ItemId === t) return s;
  }
}
exports.BattlePassRewardData = BattlePassRewardData;
class BattlePassRewardItem {
  constructor(t, s, e = 0) {
    (this.Item = void 0),
      (this.ItemType = void 0),
      (this.Item = [{ IncId: 0, ItemId: t }, s]),
      (this.ItemType = e);
  }
}
exports.BattlePassRewardItem = BattlePassRewardItem;
class BattlePassRewardGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.m2i = []),
      (this.$Tt = void 0),
      (this.d2i = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.$Tt.FreeRewardItem[0].ItemType,
          t,
          Protocol_1.Aki.Protocol.ENs.Proto_Free,
        );
      }),
      (this.C2i = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.$Tt.PayRewardItem[0].ItemType,
          t,
          Protocol_1.Aki.Protocol.ENs.Proto_Pay,
        );
      }),
      (this.g2i = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.$Tt.PayRewardItem[1].ItemType,
          t,
          Protocol_1.Aki.Protocol.ENs.Proto_Pay,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  jbe(t, s, e) {
    1 === t
      ? BattlePassController_1.BattlePassController.RequestTakeBattlePassReward(
          e,
          this.$Tt.Level,
          s,
          this.GridIndex,
        )
      : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          s,
        );
  }
  OnStart() {
    var t = new BattlePassSmallGridItem_1.BattlePassSmallGridItem(),
      t =
        (t.Initialize(this.GetItem(1).GetOwner()),
        t.BindOnExtendToggleClicked(this.d2i),
        this.m2i.push(t),
        new BattlePassSmallGridItem_1.BattlePassSmallGridItem()),
      t =
        (t.Initialize(this.GetItem(2).GetOwner()),
        t.BindOnExtendToggleClicked(this.C2i),
        this.m2i.push(t),
        new BattlePassSmallGridItem_1.BattlePassSmallGridItem());
    t.Initialize(this.GetItem(3).GetOwner()),
      t.BindOnExtendToggleClicked(this.g2i),
      this.m2i.push(t);
  }
  f2i(t, s, e) {
    t.SetReceivedVisible(2 === s),
      t.SetLockVisible(0 === s),
      t.SetReceivableVisible(1 === s);
  }
  Refresh(t, s, e) {
    if (
      ((this.$Tt = t),
      this.GetText(0).SetText(t.Level.toString()),
      1 === t.FreeRewardItem.length)
    ) {
      const e = 0;
      var r = this.m2i[0];
      r.SetActive(!0),
        r.Refresh(t.FreeRewardItem[0].Item),
        this.f2i(r, t.FreeRewardItem[0].ItemType, 0);
    } else this.m2i[0].SetActive(!1);
    var i;
    2 === t.PayRewardItem.length
      ? ((r = this.m2i[1]),
        (i = this.m2i[2]),
        r.SetActive(!0),
        i.SetActive(!0),
        r.Refresh(t.PayRewardItem[0].Item),
        i.Refresh(t.PayRewardItem[1].Item),
        this.f2i(r, t.PayRewardItem[0].ItemType, 1),
        this.f2i(i, t.PayRewardItem[1].ItemType, 2))
      : 1 === t.PayRewardItem.length
        ? (this.m2i[1].SetActive(!0),
          this.m2i[2].SetActive(!1),
          this.m2i[1].Refresh(t.PayRewardItem[0].Item),
          this.f2i(this.m2i[1], t.PayRewardItem[0].ItemType, 1))
        : (this.m2i[1].SetActive(!1), this.m2i[2].SetActive(!1));
  }
}
exports.BattlePassRewardGridItem = BattlePassRewardGridItem;
//# sourceMappingURL=BattlePassRewardGridItem.js.map
