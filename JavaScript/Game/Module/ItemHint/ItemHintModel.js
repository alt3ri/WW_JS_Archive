"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemHintModel =
    exports.ItemRewardData =
    exports.MainInterfaceData =
    exports.InsideInterfaceData =
    exports.InterfaceDataUnit =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ItemHintDefines_1 = require("./Data/ItemHintDefines"),
  HIGH_QUALITY = 4;
class InterfaceDataUnit {
  constructor(t) {
    (this.Index = 0),
      (this.Mode = 0),
      (this.WaitList = new Array()),
      (this.Index = t);
  }
  GetMaxCount() {
    let t = 1;
    return (
      0 === this.Mode
        ? (t = ConfigManager_1.ConfigManager.RewardConfig.GetLowModeCount())
        : 1 === this.Mode &&
          (t = ConfigManager_1.ConfigManager.RewardConfig.GetFastModeCount()),
      t
    );
  }
  GetAddItemTime() {
    let t = 0;
    return (
      0 === this.Mode
        ? (t =
            ConfigManager_1.ConfigManager.RewardConfig.GetLowModeNextAddItemTime())
        : 1 === this.Mode &&
          (t =
            ConfigManager_1.ConfigManager.RewardConfig.GetFastModeNextAddItemTime()),
      t
    );
  }
}
exports.InterfaceDataUnit = InterfaceDataUnit;
class InsideInterfaceData {
  constructor() {
    (this.Kei = 0), (this.Fgi = void 0), (this.Vgi = new Array());
  }
  Clear() {
    (this.Kei = 0), (this.Vgi = new Array());
  }
  IsEmpty() {
    return !this.Fgi || this.Fgi.WaitList.length <= 0;
  }
  ShiftFirstData() {
    if (this.Fgi) return this.Fgi.WaitList.shift();
  }
  GetMaxCount() {
    return this.Fgi
      ? this.Fgi.GetMaxCount()
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("ItemHint", 9, "里列表当前单元无效!"),
        0);
  }
  GetAddItemTime() {
    return this.Fgi
      ? this.Fgi.GetAddItemTime()
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("ItemHint", 9, "里列表当前单元无效!"),
        0);
  }
  PostBattleViewOpen() {
    this.Hgi(), this.jgi();
  }
  Hgi() {
    this.Kei++;
  }
  jgi() {
    for (const t of this.Vgi) t.Mode = 1;
  }
  ShiftFirstUnit() {
    this.Fgi
      ? (0 < this.Fgi.WaitList.length &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ItemHint",
            9,
            "里列表关闭时, 还有数据在队列中未开始播放!",
          ),
        this.Vgi.shift(),
        (this.Fgi = void 0),
        this.Wgi())
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("ItemHint", 11, "里列表关闭时没有数据可以拿");
  }
  InsertItemRewardInfo(t) {
    var e = this.Kgi();
    for (const s of t) {
      var r,
        i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          s.J4n,
        );
      i &&
        i.ShowInBag &&
        (((r = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = s.o9n),
        (r.ItemId = s.J4n),
        (r.Quality = i.QualityId),
        e.WaitList.push(r));
    }
    this.Wgi();
  }
  Wgi() {
    !this.Fgi && 0 < this.Vgi.length && (this.Fgi = this.Vgi[0]);
  }
  Kgi() {
    for (const t of this.Vgi) if (t.Index === this.Kei) return t;
    const t = new InterfaceDataUnit(this.Kei);
    return this.Vgi.push(t), t;
  }
}
exports.InsideInterfaceData = InsideInterfaceData;
class MainInterfaceData {
  constructor() {
    this.WaitList = new Array();
  }
  InsertItemRewardInfo(t) {
    for (const i of t) {
      var e,
        r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          i.J4n,
        );
      r &&
        r.ShowInBag &&
        (((e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = i.o9n),
        (e.ItemId = i.J4n),
        (e.Quality = r.QualityId),
        this.WaitList.push(e));
    }
    this.WaitList.sort((t, e) => e.Quality - t.Quality);
  }
  AddItemRewardInfo(t) {
    this.WaitList.push(t);
  }
  SortWaitList() {
    this.WaitList.sort((t, e) => e.Quality - t.Quality);
  }
  Clear() {}
}
exports.MainInterfaceData = MainInterfaceData;
class ItemRewardData {
  constructor() {
    this.ItemReward = void 0;
  }
}
exports.ItemRewardData = ItemRewardData;
class ItemHintModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Qgi = new MainInterfaceData()),
      (this.Xgi = new MainInterfaceData()),
      (this.$gi = new Array()),
      (this.Ygi = new Array()),
      (this.Jgi = !1);
  }
  get Visibility() {
    return this.Jgi;
  }
  set Visibility(t) {
    this.Jgi = t;
  }
  OnInit() {
    return (this.Jgi = !0);
  }
  OnClear() {
    return this.Qgi.Clear(), this.Xgi.Clear(), (this.$gi = new Array()), !0;
  }
  AddItemRewardList(t) {
    var e = new ItemRewardData();
    (e.ItemReward = t), this.$gi.push(e);
  }
  AddAchievementItemRewardList(t) {
    var e = new ItemRewardData();
    (e.ItemReward = t), this.Ygi.push(e);
  }
  AddItemRewardTest() {
    var t = Protocol_1.Aki.Protocol.nns.create(),
      e = Protocol_1.Aki.Protocol.V5s.create(),
      e =
        ((e.o9n = 1),
        (e.f8n = 21010014),
        (e.q9n = 3),
        t.U9n.push(e),
        new ItemRewardData());
    (e.ItemReward = t), this.$gi.push(e);
  }
  ShiftItemRewardListFirst() {
    return this.$gi.shift();
  }
  ShiftAchievementItemRewardListFirst() {
    return this.Ygi.shift();
  }
  PeekItemRewardListFirst() {
    return this.$gi[0];
  }
  CleanItemRewardList() {
    this.$gi = new Array();
  }
  get IsItemRewardListEmpty() {
    return this.$gi.length <= 0;
  }
  get IsAchievementItemRewardListEmpty() {
    return this.Ygi.length <= 0;
  }
  MainInterfaceInsertItemRewardInfo(t) {
    for (const i of t) {
      var e,
        r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          i.J4n,
        );
      r &&
        r.ShowInBag &&
        (((e = new ItemHintDefines_1.ItemRewardInfo()).ItemCount = i.o9n),
        (e.ItemId = i.J4n),
        (e.Quality = r.QualityId),
        (9 === r.ItemType || e.Quality >= HIGH_QUALITY
          ? this.Xgi
          : this.Qgi
        ).AddItemRewardInfo(e));
    }
    this.Qgi.SortWaitList(), this.Xgi.SortWaitList();
  }
  get IsMainInterfaceDataEmpty() {
    return this.Qgi.WaitList.length <= 0;
  }
  get IsPriorInterfaceDataEmpty() {
    return this.Xgi.WaitList.length <= 0;
  }
  ShiftMainInterfaceData() {
    return this.Qgi.WaitList.shift();
  }
  ShiftPriorInterfaceData() {
    return this.Xgi.WaitList.shift();
  }
}
exports.ItemHintModel = ItemHintModel;
//# sourceMappingURL=ItemHintModel.js.map
