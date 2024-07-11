"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeRewardModel = exports.POWER_DISCOUNT_HELP_ID = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ExchangeRewardData_1 = require("./ExchangeRewardData");
exports.POWER_DISCOUNT_HELP_ID = 26;
class ExchangeRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.FQ = new Map()), (this.bsi = new Map());
  }
  OnInit() {
    return !0;
  }
  Phrase(e) {
    this.FQ.clear(), this.bsi.clear();
    for (const r of Object.keys(e.JRs)) {
      const a = new ExchangeRewardData_1.ExchangeShareData();
      a.Phrase(Number.parseInt(r), e.JRs[r]), this.bsi.set(a.GetId(), a);
    }
    for (const t of Object.keys(e.zRs)) {
      const n = new ExchangeRewardData_1.ExchangeRewardData();
      n.Phrase(Number.parseInt(t), e.zRs[t]), this.FQ.set(n.GetId(), n);
    }
  }
  OnExchangeRewardNotify(e) {
    let a = this.FQ.get(e.ZRs);
    a ||
      ((a = new ExchangeRewardData_1.ExchangeRewardData()),
      this.FQ.set(e.ZRs, a)),
      a.Phrase(e.ZRs, e.I5n);
  }
  OnShareInfoNotify(a) {
    for (const r of Object.keys(a.eDs)) {
      const n = Number.parseInt(r);
      let e = this.bsi.get(n);
      e ||
        ((e = new ExchangeRewardData_1.ExchangeShareData()),
        this.bsi.set(n, e)),
        e.Phrase(n, a.eDs[r]);
    }
  }
  GetInstanceDungeonIfCanExchange(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId;
    if (!e) return !0;
    const a =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
    let n = 0;
    let r = 0;
    return (
      (r = (
        a
          ? ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
                a,
              )),
            this.bsi.get(a))
          : ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
                e,
              )),
            this.FQ.get(e))
      )?.GetCount()),
      !(n && r && r >= n)
    );
  }
  GetRewardIfCanExchange(e) {
    const a =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
    let n = 0;
    let r = 0;
    return (
      (r = (
        a
          ? ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
                a,
              )),
            this.bsi.get(a))
          : ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
                e,
              )),
            this.FQ.get(e))
      )?.GetCount()),
      !(n && r && r >= n)
    );
  }
  GetExchangeRewardShareCount(e) {
    return this.bsi.get(e)?.GetCount() ?? 0;
  }
  GetExchangeNormalConsume(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId;
    if (e) {
      let a;
      let n;
      const r = [];
      for ([
        a,
        n,
      ] of ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeCost(
        e,
      )) {
        const t = [{ IncId: 0, ItemId: a }, n];
        r.push(t);
      }
      return r;
    }
  }
  IsFinishInstance(e) {
    let a;
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
        e,
      );
    return (
      !!e &&
      ((a =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardMaxCount(
          e,
        )),
      (e = this.FQ.get(e)?.GetCount()),
      !!(a && e && a <= e))
    );
  }
}
exports.ExchangeRewardModel = ExchangeRewardModel;
// # sourceMappingURL=ExchangeRewardModel.js.map
