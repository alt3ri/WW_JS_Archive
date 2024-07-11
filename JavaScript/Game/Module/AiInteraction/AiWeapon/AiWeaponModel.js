"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiWeaponModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  AiWeaponNet_1 = require("./AiWeaponNet");
class AiWeaponModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.lHe = void 0), (this._He = new Map());
  }
  OnInit() {
    var e, t;
    (this.lHe = new AiWeaponNet_1.AiWeaponNet()), this.lHe.RegisterNet();
    for ([e, t] of DataTableUtil_1.DataTableUtil.LoadAllAiWeaponSockets())
      if (e && t) {
        var o = t.AiModelConfig,
          r = new Set();
        for (let e = 0; e < o.Num(); ++e) {
          var i = o.GetKey(e);
          r.add(i);
        }
        this._He.set(e, r);
      }
    return !0;
  }
  OnClear() {
    return this.lHe.UnRegisterNet(), !(this.lHe = void 0);
  }
  GetStaticWeaponConfig(e) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
      2,
      e.toString(),
    );
  }
  GetStaticWeaponModelConfigs(e, t) {
    return DataTableUtil_1.DataTableUtil.LoadAiWeaponSocketConfigs(
      e.toString(),
      t,
    );
  }
  GetWeaponConfigByConfigId(e, t) {
    var t = t.GetComponent(0).GetPbModelConfig(),
      o = this.GetStaticWeaponModelConfigs(e, t.ModelId);
    return (
      o ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            58,
            "Ai改变武器失败,原因Config配置错误",
            ["Char", t.ModelId],
            ["Item config id", e],
          )),
      o
    );
  }
  HasWeaponConfig(e, t) {
    (e = e.GetComponent(0).GetPbEntityInitData()),
      (e = (0, IComponent_1.getComponent)(e.ComponentsData, "WeaponComponent"));
    return (
      !!e &&
      ((t = t.GetComponent(0).GetPbModelConfig()),
      this._He.get(e.WeaponId).has(t.ModelId))
    );
  }
  get Net() {
    return this.lHe;
  }
}
exports.AiWeaponModel = AiWeaponModel;
//# sourceMappingURL=AiWeaponModel.js.map
