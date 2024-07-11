"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseBuffItemRoleData = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const TEN_THOUSANDTH_RATIO = 1e4;
class UseBuffItemRoleData {
  constructor(t, e, r, i, s, o, u, a) {
    (this.qgt = 0),
      (this.RoleName = t),
      (this.Position = e),
      (this.RoleConfigId = r),
      (this.RoleLevel = i),
      (this.CurrentAttribute = s),
      (this.MaxAttribute = o),
      (this.UseItemConfigId = u),
      (this.Entity = a);
  }
  SetCurrentAttribute(t) {
    this.CurrentAttribute = t;
  }
  SetUseItemCount(t) {
    this.qgt = t;
  }
  AddUseItemCount() {
    ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.UseItemConfigId,
    ) <= this.qgt || this.qgt++;
  }
  ReduceUseItemCount() {
    this.qgt <= 1 || this.qgt--;
  }
  get UseItemCount() {
    return this.qgt;
  }
  GetUseItemMaxCount() {
    var t = ModelManager_1.ModelManager.InventoryModel;
    const e = t.GetItemCountByConfigId(this.UseItemConfigId);
    var t = t
      .GetItemDataBaseByConfigId(this.UseItemConfigId)[0]
      .GetUseCountLimit();
    return t > 0 ? Math.min(e, t) : e;
  }
  IsMaxItemCount() {
    return this.qgt >= this.GetUseItemMaxCount();
  }
  IsMinItemCount() {
    return this.qgt <= 1;
  }
  GetPreviewAttribute() {
    const t = this.GetAddAttribute();
    return Math.min(t + this.CurrentAttribute, this.MaxAttribute);
  }
  GetPreviewAttributeNoLimit() {
    return this.GetAddAttribute() + this.CurrentAttribute;
  }
  GetAddAttribute() {
    const t = this.Ggt(this.UseItemConfigId, this.Entity) * this.qgt;
    return Math.floor(t);
  }
  GetEntityId() {
    return this.Entity ? this.Entity.Id : -1;
  }
  Ggt(e, r) {
    e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemBuffConfig(e);
    if (e) {
      let t = 0;
      for (const i of e) t += this.Ngt(i, r);
      return t;
    }
  }
  Ngt(t, e) {
    let r = 0;
    const i = ConfigManager_1.ConfigManager.BuffItemConfig;
    const s = t.ExtraEffectParameters;
    var o = t.ExtraEffectID;
    if (o === 0)
      for (const g of t.RoutineExpirationEffects) {
        const u = i.GetBuffConfig(e.Id, g);
        r += this.Ngt(u, e);
      }
    else if (o === 4)
      for (const I of s) {
        var a;
        var n;
        const h = BigInt(I);
        let f = i.GetDamageConfig(e.Id, h);
        f
          ? ((a = this.Ogt(e, f.RelatedProperty)),
            void 0 === (n = f.CureBaseValue[0])
              ? Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "BuffItem",
                  8,
                  "计算Buff道具治疗生命数值时，结算表对应行的CureBaseValue为空",
                  ["Buff配置", t],
                )
              : (f = f.RateLv[0])
                ? ((f = f / TEN_THOUSANDTH_RATIO), (r += n + a * f))
                : (r += n))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "BuffItem",
              8,
              "计算Buff道具治疗生命数值时，找不到结算表对应配置",
              ["结算表Id", h],
              ["Buff配置", t],
            );
      }
    else if (o === 101) {
      if (s.length < 2) return r;
      var o = e.GetComponent(156);
      const _ = Number(s[0]) / TEN_THOUSANDTH_RATIO;
      var o = o.GetCurrentValue(EAttributeId.Tkn);
      r += _ * o + Number(s[1]);
    }
    return r;
  }
  Ogt(t, e) {
    return t.GetComponent(156).GetCurrentValue(e);
  }
}
exports.UseBuffItemRoleData = UseBuffItemRoleData;
// # sourceMappingURL=UseBuffItemRoleData.js.map
