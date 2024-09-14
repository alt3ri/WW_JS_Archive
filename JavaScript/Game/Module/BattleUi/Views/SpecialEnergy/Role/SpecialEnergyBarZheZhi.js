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
      (this.Cma = []),
      (this.gma = 0),
      (this.fma = (e, t) => {
        this.pma(), this.RefreshBarPercent();
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
          ? this.Cma.push(r)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Battle", 18, "折枝能量条读取伴生物实体时异常", [
              "creatureDataId",
              t[e],
            ]);
      }
    }
  }
  AddEvents() {
    super.AddEvents();
    for (const t of this.Cma) {
      var e = t.Entity?.GetComponent(190);
      e &&
        (e = e.ListenForTagAddOrRemove(-1285044114, this.fma)) &&
        this.TagTaskList.push(e);
    }
  }
  pma() {
    this.gma = 0;
    for (const e of this.Cma)
      e.Entity?.GetComponent(190)?.HasTag(-1285044114) && this.gma++;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "【能量条】折枝飞鹤数量更新", [
        "",
        this.gma,
      ]);
  }
  OnStart() {
    for (let e = 0; e < this.SlotItemList.length; e++)
      this.SlotItemList[e].SetEffectItemNiagaraParam(
        "Color_Offset",
        extraEnergyEffectParams[e],
      );
    this.pma(), super.OnStart();
  }
  RefreshBarPercent(e = !1) {
    var t = this.PercentMachine.GetCurPercent(),
      r = this.GetKeyEnable();
    for (let e = 0; e < this.SlotItemList.length; e++) {
      var a = this.SlotItemList[e];
      e < this.gma
        ? (a.UpdatePercent(0, !1, !0), a.SetEffectItemVisible(!0))
        : (a.UpdatePercent(t * this.SlotNum - (e - this.gma), r, !0),
          a.SetEffectItemVisible(!1));
    }
    this.KeyItem?.RefreshKeyEnable(r, e);
  }
}
exports.SpecialEnergyBarZheZhi = SpecialEnergyBarZheZhi;
//# sourceMappingURL=SpecialEnergyBarZheZhi.js.map
