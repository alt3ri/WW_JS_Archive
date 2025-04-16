"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeRewardConfig = void 0);
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById"),
  ExchangeRewardById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeRewardById"),
  ExchangeSharedById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeSharedById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardConfig extends ConfigBase_1.ConfigBase {
  GetExchangeRewardConfig(e) {
    if (e) return ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
  }
  GetExchangeShareConfig(e) {
    if (e) return ExchangeSharedById_1.configExchangeSharedById.GetConfig(e);
  }
  GetExchangeRewardPreviewRewardList(e, n) {
    if (!e) return [];
    var e = this.GetExchangeRewardConfig(e),
      r = [];
    if (e) {
      var t,
        i,
        o = e.PreviewReward,
        n = n || ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      let a = void 0;
      if (o.has(n)) a = o.get(n).MapIntInt;
      else
        for (let e = n - 1; 0 <= e; e--)
          if (o.has(e)) {
            a = o.get(e).MapIntInt;
            break;
          }
      if (!a) {
        var d = e.RewardId;
        let r = 0;
        if (d.has(n)) r = d.get(n);
        else
          for (let e = n - 1; 0 <= e; e--)
            if (d.has(e)) {
              r = d.get(e);
              break;
            }
        0 < r &&
          (e = DropPackageById_1.configDropPackageById.GetConfig(r)) &&
          (a = e.DropPreview);
      }
      for ([t, i] of a) {
        var g = [{ IncId: 0, ItemId: t }, i];
        r.push(g);
      }
    }
    return r;
  }
  GetExchangeRewardMaxCount(e) {
    return this.GetExchangeRewardConfig(e).MaxCount;
  }
  GetShareMaxCount(e) {
    return this.GetExchangeShareConfig(e).MaxCount;
  }
  GetShareCost(e) {
    return this.GetExchangeShareConfig(e).Cost;
  }
  GetExchangeCost(e) {
    return this.GetExchangeRewardConfig(e)?.Cost;
  }
  GetExchangeShareId(e) {
    return this.GetExchangeRewardConfig(e)?.SharedId;
  }
}
exports.ExchangeRewardConfig = ExchangeRewardConfig;
//# sourceMappingURL=ExchangeRewardConfig.js.map
