"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceReputationModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InfluenceReputationDefine_1 = require("../InfluenceReputationDefine"),
  InfluenceInstance_1 = require("./InfluenceInstance");
class InfluenceReputationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Xni = new Map()), (this.$ni = new Set());
  }
  SetInfluenceInfoList(e) {
    for (const t of e) {
      var n = this.Xni.get(t.d9n);
      n
        ? (n.SetRelation(t.hws), n.SetReceiveReward(t.C9n))
        : this.Xni.set(
            t.d9n,
            new InfluenceInstance_1.InfluenceInstance(t.d9n, t.C9n, t.hws),
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotInfluence,
          t.d9n,
        );
    }
  }
  UpdateInfluenceRewardIndex(e, n) {
    var t = this.Xni.get(e);
    return t
      ? (t.SetReceiveReward(n), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InfluenceReputation",
            11,
            "奖励获取有问题,当前客户端没有该势力数据",
            ["Id", e],
          ),
        !1);
  }
  GetInfluenceInstance(e) {
    return this.Xni.get(e);
  }
  GetCanReceiveReward(e) {
    if (e !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID) {
      var n =
          ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(e),
        e =
          ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
            e,
          );
      if (e)
        return n.ReputationReward.length === e.RewardIndex + 1
          ? { IsAllReceived: !0, Reward: n.ReputationReward[e.RewardIndex] }
          : {
              IsAllReceived: !1,
              Reward: n.ReputationReward[e.RewardIndex + 1],
            };
    }
  }
  GetRewardList(e) {
    e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    return Array.from(e.DropPreview);
  }
  GetReputationProgress(e) {
    let n = 0,
      t = 0;
    for (const o of ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      e,
    ).ReputationItem) {
      n += o.Item2;
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        o.Item1,
      );
      t += MathUtils_1.MathUtils.Clamp(r, 0, o.Item2);
    }
    return { Current: t, Max: n };
  }
  SetUnLockCountry(t) {
    for (let e = 0, n = t.length; e < n; e++) this.$ni.add(t[e]);
  }
  GetUnLockCountry() {
    return Array.from(this.$ni);
  }
  IsCountryUnLock(e) {
    return this.$ni.has(e);
  }
  FilterUnLockInfluence(t, r) {
    var o = [];
    for (let e = 0, n = t.length; e < n; ++e) {
      var a,
        i,
        u = t[e];
      u !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID &&
        this.Xni.has(u) &&
        ((a =
          ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceTitle(u)),
        (i = new RegExp(r, "i")),
        a.search(i) < 0 || o.push(u));
    }
    return o;
  }
  FilterUnLockInfluenceList(e, n) {
    var t,
      r = { HasResult: !1, InfluenceList: [] };
    for (const o of e)
      o !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID &&
        ((t =
          ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(o)),
        (t = this.FilterUnLockInfluence(t.Influences, n)),
        r.InfluenceList.push([o, t]),
        (r.HasResult = r.HasResult || 0 < t.length));
    return r;
  }
  RedDotInfluenceRewardCondition(e) {
    var n = this.GetCanReceiveReward(e);
    return (
      !!n &&
      !n.IsAllReceived &&
      this.GetReputationProgress(e).Current >= n.Reward.Item1
    );
  }
  HasRedDotExcludeCurrentCountry(e) {
    for (const n of this.$ni)
      if (n !== e) if (this.HasRedDotInCurrentCountry(n)) return !0;
    return !1;
  }
  HasRedDotInCurrentCountry(e) {
    for (const n of ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(
      e,
    ).Influences)
      if (this.RedDotInfluenceRewardCondition(n)) return !0;
    return !1;
  }
}
exports.InfluenceReputationModel = InfluenceReputationModel;
//# sourceMappingURL=InfluenceReputationModel.js.map
