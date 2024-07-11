"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemExchangeModel =
    exports.ExchangeSimulation =
    exports.ExchangeInfo =
      void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemExchangeDefine_1 = require("./ItemExchangeDefine");
class ExchangeInfo {
  constructor() {
    (this.ConsumeCount = 0), (this.GainCount = 0);
  }
}
exports.ExchangeInfo = ExchangeInfo;
class ExchangeSimulation {
  constructor() {
    (this.ExChangeTime = 0), (this.ExChangeCount = 0), (this.ConsumeCount = 0);
  }
}
exports.ExchangeSimulation = ExchangeSimulation;
class ItemExchangeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.DCi = void 0);
  }
  OnInit() {
    return (this.DCi = new Map()), !0;
  }
  OnClear() {
    return !(this.DCi = void 0);
  }
  InitItemExchangeTimeInfo(e) {
    for (const t of e) this.DCi.set(t.G3n, t);
  }
  GetExchangeInfo(e) {
    return (
      this.DCi.get(e) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ItemExchange",
            9,
            "前后端版本可能不一致, 当前兑换的道具并没有后端配置!",
            ["itemId", e],
          )),
      this.DCi.get(e)
    );
  }
  GetExChangeTime(e) {
    return this.DCi.get(e)?.S5n ?? 0;
  }
  AddExchangeTime(e, t) {
    e = this.DCi.get(e);
    e && ((e.E5n += t), (e.S5n += t));
  }
  CalculateConsume(i, e = 0, s = 0, h = !1) {
    let g = e;
    s > 0 && (g = ItemExchangeDefine_1.MAX_COUNT);
    const c =
      ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(i);
    if (c && !(c.length <= 0)) {
      let t = 0;
      const x = c.length - 1;
      const f = this.GetExChangeTime(i) + 1;
      let r = 0;
      for (let e = x; e >= 0; e--) {
        const u = c[e];
        if (f >= u.Times) {
          t = e;
          const i = u.Consume.keys().next()?.value;
          r =
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              i,
            );
          break;
        }
      }
      const l = this.RCi(i);
      let a = 0;
      let n = 0;
      let o = 0;
      for (; t <= x; ) {
        const M = c[t];
        let m = t < x ? c[t + 1] : void 0;
        let e = Math.ceil((g - n) / M.GainCount);
        m && ((m = m.Times - M.Times), (e = Math.min(e, m))),
          (e = s > 0 && e + a > s ? s - a : e) + a > l && (e = l - a);
        m = M.Consume.values().next()?.value;
        if (
          (!h && o + e * m > r && (e = Math.floor((r - o) / m)),
          (o += e * m),
          (a += e),
          (n += e * M.GainCount) >= g || (s > 0 && a >= s) || a >= l || o >= r)
        )
          break;
        t++;
      }
      e = new ExchangeSimulation();
      return (
        (e.ExChangeTime = a), (e.ExChangeCount = n), (e.ConsumeCount = o), e
      );
    }
  }
  RCi(e) {
    var e = this.GetExchangeInfo(e);
    const t = e.JDs > 0 ? e.JDs - e.E5n : ItemExchangeDefine_1.MAX_COUNT;
    var e = e.YDs > 0 ? e.YDs - e.S5n : ItemExchangeDefine_1.MAX_COUNT;
    return Math.min(t, e);
  }
  GetCurExchangeInfo(e, t = 0) {
    const r = new ExchangeInfo();
    const a =
      ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(e);
    if (a) {
      const n = this.GetExChangeTime(e) + t + 1;
      for (const i of a) {
        if (n < i.Times) break;
        for (const [, o] of i.Consume)
          (r.ConsumeCount = o), (r.GainCount = i.GainCount);
      }
    }
    return r;
  }
  CheckIsMaxExChangeTime(e, t = 0) {
    e = this.GetExchangeInfo(e);
    return (
      (e.JDs > 0 && e.E5n + t >= e.JDs) || (e.YDs > 0 && e.S5n + t >= e.YDs)
    );
  }
  GetMaxExChangeTime(e) {
    const t = this.RCi(e);
    return this.CalculateConsume(e, 0, t)?.ExChangeTime ?? 0;
  }
}
exports.ItemExchangeModel = ItemExchangeModel;
// # sourceMappingURL=ItemExchangeModel.js.map
