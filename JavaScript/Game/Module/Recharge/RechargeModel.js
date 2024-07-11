"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RechargeModel = exports.RechargeInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RechargeInfo {
  constructor() {
    (this.PayId = 0), (this.Amount = ""), (this.ProductId = "");
  }
  Init(e, r, t) {
    (this.PayId = e), (this.Amount = r), (this.ProductId = t);
  }
}
exports.RechargeInfo = RechargeInfo;
class RechargeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.tso = new Map());
  }
  SetRechargeInfo(e, r, t) {
    let o = this.tso.get(e);
    (o = o || new RechargeInfo()).Init(e, this.iso(r), t), this.tso.set(e, o);
  }
  GetPayIdAmount(e) {
    var r = this.tso.get(e);
    return r
      ? r.Amount
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 28, "获取PayId的服务器价格失败", ["id", e]),
        "0");
  }
  iso(e) {
    var r,
      t = parseFloat(e);
    return !isNaN(t) &&
      (-1 === (r = (e = t.toString()).indexOf(".")) ||
        (-1 !== r && e.length - r - 1 == 1))
      ? t.toFixed(2)
      : e;
  }
  GetPayIdProductId(e) {
    var r = this.tso.get(e);
    return r
      ? r.ProductId
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Shop", 28, "获取PayId的商品名称价格失败", ["id", e]),
        "");
  }
}
exports.RechargeModel = RechargeModel;
//# sourceMappingURL=RechargeModel.js.map
