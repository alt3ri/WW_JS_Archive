"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotMontage = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PlotMontage {
  constructor() {
    this.tj_ = new Set();
  }
  StartPlayMontage(o) {
    var e, t;
    o &&
      o.ActionMontage.Path &&
      "Empty" !== o.ActionMontage.Path &&
      (e =
        0 === o.EntityId
          ? ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity
          : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
              o.EntityId,
            ))?.IsInit &&
      (t = e.Entity.GetComponent(45)) &&
      (t.OnNpcInPlot(!0),
      t.PlayPerformMontage(1, {
        MontagePath: o.ActionMontage.Path,
        IsLoop: !1,
      }),
      this.tj_.add(e),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Plot",
        26,
        "NPC播放蒙太奇",
        ["Id", e.PbDataId],
        ["Montage", o.ActionMontage.Path],
      );
  }
  StopAllMontage() {
    for (const e of this.tj_)
      if (e.Valid) {
        var o = e.Entity.GetComponent(185);
        if (!o) return;
        o.StopPerformMontage(1, { Method: 0 }), o.OnNpcInPlot(!1);
      }
    this.tj_.clear();
  }
}
exports.PlotMontage = PlotMontage;
//# sourceMappingURL=PlotMontage.js.map
