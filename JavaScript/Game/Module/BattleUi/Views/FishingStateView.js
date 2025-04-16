"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingStateView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
  FishingHpItem_1 = require("./FishingHpItem");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class FishingStateView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.osn = void 0),
      (this.x5e = []),
      (this.hXe = (t, i, e) => {
        this.bNe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.InitChildType(25), this.GetItem(1).SetUIActive(!1);
    var t = ModelManager_1.ModelManager.FishingModel.GetShipData();
    (this.osn = t.GetEntityHandle()?.Entity?.GetComponent(170)),
      this.Ore(),
      this.bNe();
  }
  Reset() {
    this.kre(), (this.osn = void 0), super.Reset();
  }
  Ore() {
    this.osn &&
      (this.osn.AddListener(EAttributeId.Proto_Life, this.hXe),
      this.osn.AddListener(EAttributeId.l5n, this.hXe));
  }
  kre() {
    this.osn &&
      (this.osn.RemoveListener(EAttributeId.Proto_Life, this.hXe),
      this.osn.RemoveListener(EAttributeId.l5n, this.hXe));
  }
  bNe() {
    if (this.osn) {
      var i = this.osn?.GetCurrentValue(EAttributeId.l5n) ?? 0,
        e = this.osn?.GetCurrentValue(EAttributeId.Proto_Life) ?? 0;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "捕鱼船血量变化",
          ["curHp", e],
          ["maxHp", i],
        );
      for (let t = this.x5e.length; t < i; t++) this.qF_();
      for (let t = 0; t < this.x5e.length; t++)
        t < i
          ? (this.x5e[t].SetUiActive(!0), this.x5e[t].SetHpVisible(t < e))
          : this.x5e[t].SetUiActive(!1);
    }
  }
  qF_() {
    var t = this.GetItem(0),
      i = this.GetItem(1);
    let e = void 0;
    e =
      0 === this.x5e.length
        ? i.GetOwner()
        : LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), t);
    i = new FishingHpItem_1.FishingHpItem();
    i.CreateThenShowByActorAsync(e), this.x5e.push(i);
  }
}
exports.FishingStateView = FishingStateView;
//# sourceMappingURL=FishingStateView.js.map
