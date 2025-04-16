"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarZheZhi = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot"),
  SpecialEnergyBarZheZhiSlotItem_1 = require("./SpecialEnergyBarZheZhiSlotItem"),
  SUMMON_NUM = 3,
  extraEnergyEffectParams = [0.1, 0.3, 0.6];
class SpecialEnergyBarZheZhi extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments),
      (this.wca = []),
      (this.Bca = 0),
      (this.bca = (e, t) => {
        this.qca(), this.RefreshBarPercent();
      });
  }
  async InitSlotItem(e) {
    var t =
      new SpecialEnergyBarZheZhiSlotItem_1.SpecialEnergyBarZheZhiSlotItem();
    await t.CreateThenShowByActorAsync(e.GetOwner()), this.SlotItemList.push(t);
  }
  OnInitData() {
    super.OnInitData();
    var e = this.RoleData?.CreatureDataComponent;
    if (e) {
      var t = e.CustomServerEntityIds;
      for (let e = 0; e < SUMMON_NUM && !(e > t.length - 1); e++) {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e]);
        r?.IsInit
          ? this.wca.push(r)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 17, "折枝能量条读取伴生物实体时异常", [
              "creatureDataId",
              t[e],
            ]);
      }
    }
  }
  AddEvents() {
    super.AddEvents();
    for (const t of this.wca) {
      var e = t.Entity?.GetComponent(203);
      e &&
        (e = e.ListenForTagAddOrRemove(-1285044114, this.bca)) &&
        this.TagTaskList.push(e);
    }
  }
  qca() {
    this.Bca = 0;
    for (const e of this.wca)
      e.Entity?.GetComponent(203)?.HasTag(-1285044114) && this.Bca++;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "【能量条】折枝飞鹤数量更新", [
        "",
        this.Bca,
      ]);
  }
  OnStart() {
    for (let e = 0; e < this.SlotItemList.length; e++)
      this.SlotItemList[e].SetEffectItemNiagaraParam(
        "Color_Offset",
        extraEnergyEffectParams[e],
      );
    this.qca(), super.OnStart();
  }
  RefreshBarPercent(e = !1) {
    var t = this.PercentMachine.GetCurPercent(),
      r = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var a = this.SlotItemList[e];
      e < this.Bca
        ? (a.UpdatePercent(0, !1, !0), a.SetEffectItemVisible(!0))
        : (a.UpdatePercent(t * this.SlotNum - (e - this.Bca), r, !0),
          a.SetEffectItemVisible(!1));
    }
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarZheZhi = SpecialEnergyBarZheZhi;
//# sourceMappingURL=SpecialEnergyBarZheZhi.js.map
