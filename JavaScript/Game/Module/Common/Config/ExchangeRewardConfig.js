"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeRewardConfig = void 0);
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById");
const ExchangeRewardById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const ExchangeSharedById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeSharedById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardConfig extends ConfigBase_1.ConfigBase {
  GetExchangeRewardConfig(e) {
    if (e) return ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
  }
  GetExchangeShareConfig(e) {
    if (e) return ExchangeSharedById_1.configExchangeSharedById.GetConfig(e);
  }
  GetExchangeRewardPreviewRewardList(e) {
    if (!e) return [];
    var e = this.GetExchangeRewardConfig(e);
    const r = [];
    if (e) {
      let n;
      let t;
      const i = e.PreviewReward;
      const o = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      let a = void 0;
      if (i.has(o)) a = i.get(o).MapIntInt;
      else
        for (let e = o - 1; e >= 0; e--)
          if (i.has(e)) {
            a = i.get(e).MapIntInt;
            break;
          }
      if (!a) {
        const d = e.RewardId;
        let r = 0;
        if (d.has(o)) r = d.get(o);
        else
          for (let e = o - 1; e >= 0; e--)
            if (d.has(e)) {
              r = d.get(e);
              break;
            }
        r > 0 &&
          (e = DropPackageById_1.configDropPackageById.GetConfig(r)) &&
          (a = e.DropPreview);
      }
      for ([n, t] of a) {
        const g = [{ IncId: 0, ItemId: n }, t];
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
// # sourceMappingURL=ExchangeRewardConfig.js.map
