"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassRewardGridItem =
    exports.BattlePassRewardItem =
    exports.BattlePassRewardData =
      void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  BattlePassController_1 = require("./../BattlePassController"),
  BattlePassSmallGridItem_1 = require("./BattlePassSmallGridItem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
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
    if (t === Protocol_1.Aki.Protocol.b2s.Proto_Free) {
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
      (this.cki = []),
      (this.jIt = void 0),
      (this.mki = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.jIt.FreeRewardItem[0].ItemType,
          t,
          Protocol_1.Aki.Protocol.b2s.Proto_Free,
        );
      }),
      (this.dki = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.jIt.PayRewardItem[0].ItemType,
          t,
          Protocol_1.Aki.Protocol.b2s.Proto_Pay,
        );
      }),
      (this.Cki = (t) => {
        t = t.Data[0].ItemId;
        this.jbe(
          this.jIt.PayRewardItem[1].ItemType,
          t,
          Protocol_1.Aki.Protocol.b2s.Proto_Pay,
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
          this.jIt.Level,
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
        t.BindOnExtendToggleClicked(this.mki),
        this.cki.push(t),
        new BattlePassSmallGridItem_1.BattlePassSmallGridItem()),
      t =
        (t.Initialize(this.GetItem(2).GetOwner()),
        t.BindOnExtendToggleClicked(this.dki),
        this.cki.push(t),
        new BattlePassSmallGridItem_1.BattlePassSmallGridItem());
    t.Initialize(this.GetItem(3).GetOwner()),
      t.BindOnExtendToggleClicked(this.Cki),
      this.cki.push(t);
  }
  gki(t, s, e) {
    t.SetReceivedVisible(2 === s),
      t.SetLockVisible(0 === s),
      t.SetReceivableVisible(1 === s);
  }
  Refresh(t, s, e) {
    if (
      ((this.jIt = t),
      this.GetText(0).SetText(t.Level.toString()),
      1 === t.FreeRewardItem.length)
    ) {
      const e = 0;
      var r = this.cki[0];
      r.SetActive(!0),
        r.Refresh(t.FreeRewardItem[0].Item),
        this.gki(r, t.FreeRewardItem[0].ItemType, 0);
    } else this.cki[0].SetActive(!1);
    var i;
    2 === t.PayRewardItem.length
      ? ((r = this.cki[1]),
        (i = this.cki[2]),
        r.SetActive(!0),
        i.SetActive(!0),
        r.Refresh(t.PayRewardItem[0].Item),
        i.Refresh(t.PayRewardItem[1].Item),
        this.gki(r, t.PayRewardItem[0].ItemType, 1),
        this.gki(i, t.PayRewardItem[1].ItemType, 2))
      : 1 === t.PayRewardItem.length
        ? (this.cki[1].SetActive(!0),
          this.cki[2].SetActive(!1),
          this.cki[1].Refresh(t.PayRewardItem[0].Item),
          this.gki(this.cki[1], t.PayRewardItem[0].ItemType, 1))
        : (this.cki[1].SetActive(!1), this.cki[2].SetActive(!1));
  }
}
exports.BattlePassRewardGridItem = BattlePassRewardGridItem;
//# sourceMappingURL=BattlePassRewardGridItem.js.map
