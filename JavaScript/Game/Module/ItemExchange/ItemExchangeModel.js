"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemExchangeModel =
    exports.ExchangeSimulation =
    exports.ExchangeInfo =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemExchangeDefine_1 = require("./ItemExchangeDefine");
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
    super(...arguments), (this.Dgi = void 0);
  }
  OnInit() {
    return (this.Dgi = new Map()), !0;
  }
  OnClear() {
    return !(this.Dgi = void 0);
  }
  InitItemExchangeTimeInfo(e) {
    for (const t of e) this.Dgi.set(t.f8n, t);
  }
  GetExchangeInfo(e) {
    return (
      this.Dgi.get(e) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ItemExchange",
            9,
            "前后端版本可能不一致, 当前兑换的道具并没有后端配置!",
            ["itemId", e],
          )),
      this.Dgi.get(e)
    );
  }
  GetExChangeTime(e) {
    return this.Dgi.get(e)?.t9n ?? 0;
  }
  AddExchangeTime(e, t) {
    e = this.Dgi.get(e);
    e && ((e.i9n += t), (e.t9n += t));
  }
  CalculateConsume(i, e = 0, s = 0, h = !1) {
    let g = e;
    0 < s && (g = ItemExchangeDefine_1.MAX_COUNT);
    var c =
      ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(i);
    if (c && !(c.length <= 0)) {
      let t = 0;
      var x = c.length - 1,
        f = this.GetExChangeTime(i) + 1;
      let r = 0;
      for (let e = x; 0 <= e; e--) {
        var u = c[e];
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
      var l = this.Rgi(i);
      let a = 0,
        n = 0,
        o = 0;
      for (; t <= x; ) {
        var M = c[t],
          m = t < x ? c[t + 1] : void 0;
        let e = Math.ceil((g - n) / M.GainCount);
        m && ((m = m.Times - M.Times), (e = Math.min(e, m))),
          (e = 0 < s && e + a > s ? s - a : e) + a > l && (e = l - a);
        m = M.Consume.values().next()?.value;
        if (
          (!h && o + e * m > r && (e = Math.floor((r - o) / m)),
          (o += e * m),
          (a += e),
          (n += e * M.GainCount) >= g || (0 < s && a >= s) || a >= l || o >= r)
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
  Rgi(e) {
    var e = this.GetExchangeInfo(e),
      t = 0 < e.gxs ? e.gxs - e.i9n : ItemExchangeDefine_1.MAX_COUNT,
      e = 0 < e.Cxs ? e.Cxs - e.t9n : ItemExchangeDefine_1.MAX_COUNT;
    return Math.min(t, e);
  }
  GetCurExchangeInfo(e, t = 0) {
    var r = new ExchangeInfo(),
      a =
        ConfigManager_1.ConfigManager.ItemExchangeConfig.GetExChangeConfigList(
          e,
        );
    if (a) {
      var n = this.GetExChangeTime(e) + t + 1;
      for (const i of a) {
        if (n < i.Times) break;
        for (var [, o] of i.Consume)
          (r.ConsumeCount = o), (r.GainCount = i.GainCount);
      }
    }
    return r;
  }
  CheckIsMaxExChangeTime(e, t = 0) {
    e = this.GetExchangeInfo(e);
    return (
      (0 < e.gxs && e.i9n + t >= e.gxs) || (0 < e.Cxs && e.t9n + t >= e.Cxs)
    );
  }
  GetMaxExChangeTime(e) {
    var t = this.Rgi(e);
    return this.CalculateConsume(e, 0, t)?.ExChangeTime ?? 0;
  }
}
exports.ItemExchangeModel = ItemExchangeModel;
//# sourceMappingURL=ItemExchangeModel.js.map
