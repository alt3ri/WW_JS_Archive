"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PowerConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const PowerDefines_1 = require("./PowerDefines");
class PowerConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.hio = new Array()), (this.lio = new Set());
  }
  get PowerItemInfoList() {
    return this.hio;
  }
  OnInit() {
    const e = this._io();
    const r = new Array();
    for (const i of e.keys()) {
      const o = ItemInfoById_1.configItemInfoById.GetConfig(i);
      o && r.push(o);
    }
    for (const s of r) {
      const n = new PowerDefines_1.PowerItemInfo(s.Id);
      (n.ItemName = s.Name),
        (n.IsHideWhenZero = Boolean(e.get(n.ItemId))),
        this.hio.push(n);
    }
    const t = Array.from(e.keys());
    return (
      this.hio.sort((e, r) => {
        return t.indexOf(e.ItemId) - t.indexOf(r.ItemId);
      }),
      !0
    );
  }
  GetPowerItemInfos(e) {
    for (const r of this.hio) if (r.ItemId === e) return r;
  }
  _io() {
    const e = new Map();
    for (const n of CommonParamById_1.configCommonParamById
      .GetStringConfig("energy_sort")
      .split(",")) {
      var r = n.split(":");
      const o = Number(r[0]);
      var r = Number(r[1]);
      e.set(o, r);
    }
    return e;
  }
  GetPowerNaturalLimit() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "renew_energy_limit",
      ) ?? 0
    );
  }
  GetPowerChargeLimit() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "charge_energy_limit",
      ) ?? 0
    );
  }
  GetPowerIncreaseSpan() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "renew_energy_timespan",
    );
  }
  GetPowerShopIds() {
    if (this.lio.size === 0)
      for (const r in PowerDefines_1.EPowerShopType) {
        const e = Number(r);
        if (isNaN(e)) break;
        this.lio.add(e);
      }
    return this.lio;
  }
}
exports.PowerConfig = PowerConfig;
// # sourceMappingURL=PowerConfig.js.map
