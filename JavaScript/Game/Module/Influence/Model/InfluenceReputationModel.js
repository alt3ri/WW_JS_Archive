"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceReputationModel = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
const InfluenceInstance_1 = require("./InfluenceInstance");
class InfluenceReputationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Xri = new Map()), (this.$ri = new Set());
  }
  SetInfluenceInfoList(e) {
    for (const t of e) {
      const n = this.Xri.get(t.w5n);
      n
        ? (n.SetRelation(t.$Rs), n.SetReceiveReward(t.b5n))
        : this.Xri.set(
            t.w5n,
            new InfluenceInstance_1.InfluenceInstance(t.w5n, t.b5n, t.$Rs),
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotInfluence,
          t.w5n,
        );
    }
  }
  UpdateInfluenceRewardIndex(e, n) {
    const t = this.Xri.get(e);
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
    return this.Xri.get(e);
  }
  GetCanReceiveReward(e) {
    if (e !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID) {
      const n =
        ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(e);
      var e =
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
    let n = 0;
    let t = 0;
    for (const o of ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      e,
    ).ReputationItem) {
      n += o.Item2;
      const r =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          o.Item1,
        );
      t += MathUtils_1.MathUtils.Clamp(r, 0, o.Item2);
    }
    return { Current: t, Max: n };
  }
  SetUnLockCountry(t) {
    for (let e = 0, n = t.length; e < n; e++) this.$ri.add(t[e]);
  }
  GetUnLockCountry() {
    return Array.from(this.$ri);
  }
  IsCountryUnLock(e) {
    return this.$ri.has(e);
  }
  FilterUnLockInfluence(t, r) {
    const o = [];
    for (let e = 0, n = t.length; e < n; ++e) {
      var a;
      var i;
      const u = t[e];
      u !== InfluenceReputationDefine_1.RAMDOM_INFLUENCE_ID &&
        this.Xri.has(u) &&
        ((a =
          ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceTitle(u)),
        (i = new RegExp(r, "i")),
        a.search(i) < 0 || o.push(u));
    }
    return o;
  }
  FilterUnLockInfluenceList(e, n) {
    let t;
    const r = { HasResult: !1, InfluenceList: [] };
    for (const o of e)
      o !== InfluenceReputationDefine_1.RAMDOM_COUNTRY_ID &&
        ((t =
          ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(o)),
        (t = this.FilterUnLockInfluence(t.Influences, n)),
        r.InfluenceList.push([o, t]),
        (r.HasResult = r.HasResult || t.length > 0));
    return r;
  }
  RedDotInfluenceRewardCondition(e) {
    const n = this.GetCanReceiveReward(e);
    return (
      !!n &&
      !n.IsAllReceived &&
      this.GetReputationProgress(e).Current >= n.Reward.Item1
    );
  }
  HasRedDotExcludeCurrentCountry(e) {
    for (const n of this.$ri)
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
// # sourceMappingURL=InfluenceReputationModel.js.map
