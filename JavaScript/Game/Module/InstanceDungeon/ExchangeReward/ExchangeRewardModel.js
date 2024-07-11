"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExchangeRewardModel = exports.POWER_DISCOUNT_HELP_ID = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ExchangeRewardData_1 = require("./ExchangeRewardData");
exports.POWER_DISCOUNT_HELP_ID = 26;
class ExchangeRewardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.FQ = new Map()), (this.bai = new Map());
  }
  OnInit() {
    return !0;
  }
  Phrase(e) {
    this.FQ.clear(), this.bai.clear();
    for (const r of Object.keys(e.gws)) {
      var a = new ExchangeRewardData_1.ExchangeShareData();
      a.Phrase(Number.parseInt(r), e.gws[r]), this.bai.set(a.GetId(), a);
    }
    for (const t of Object.keys(e.fws)) {
      var n = new ExchangeRewardData_1.ExchangeRewardData();
      n.Phrase(Number.parseInt(t), e.fws[t]), this.FQ.set(n.GetId(), n);
    }
  }
  OnExchangeRewardNotify(e) {
    let a = this.FQ.get(e.vws);
    a ||
      ((a = new ExchangeRewardData_1.ExchangeRewardData()),
      this.FQ.set(e.vws, a)),
      a.Phrase(e.vws, e.o9n);
  }
  OnShareInfoNotify(a) {
    for (const r of Object.keys(a.pws)) {
      var n = Number.parseInt(r);
      let e = this.bai.get(n);
      e ||
        ((e = new ExchangeRewardData_1.ExchangeShareData()),
        this.bai.set(n, e)),
        e.Phrase(n, a.pws[r]);
    }
  }
  GetInstanceDungeonIfCanExchange(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId;
    if (!e) return !0;
    var a =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
    let n = 0,
      r = 0;
    return (
      (r = (
        a
          ? ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
                a,
              )),
            this.bai.get(a))
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
    var a =
      ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareId(e);
    let n = 0,
      r = 0;
    return (
      (r = (
        a
          ? ((n =
              ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(
                a,
              )),
            this.bai.get(a))
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
    return this.bai.get(e)?.GetCount() ?? 0;
  }
  GetExchangeNormalConsume(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).RewardId;
    if (e) {
      var a,
        n,
        r = [];
      for ([
        a,
        n,
      ] of ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeCost(
        e,
      )) {
        var t = [{ IncId: 0, ItemId: a }, n];
        r.push(t);
      }
      return r;
    }
  }
  IsFinishInstance(e) {
    var a,
      e =
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
//# sourceMappingURL=ExchangeRewardModel.js.map
