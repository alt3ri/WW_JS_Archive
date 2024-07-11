"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseBuffItemRoleData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const TEN_THOUSANDTH_RATIO = 1e4;
class UseBuffItemRoleData {
  constructor(t, e, r, i, s, o, u, a) {
    (this.X0t = 0),
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
    this.X0t = t;
  }
  AddUseItemCount() {
    ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.UseItemConfigId,
    ) <= this.X0t || this.X0t++;
  }
  ReduceUseItemCount() {
    this.X0t <= 1 || this.X0t--;
  }
  get UseItemCount() {
    return this.X0t;
  }
  GetUseItemMaxCount() {
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = t.GetItemCountByConfigId(this.UseItemConfigId),
      t = t
        .GetItemDataBaseByConfigId(this.UseItemConfigId)[0]
        .GetUseCountLimit();
    return 0 < t ? Math.min(e, t) : e;
  }
  IsMaxItemCount() {
    return this.X0t >= this.GetUseItemMaxCount();
  }
  IsMinItemCount() {
    return this.X0t <= 1;
  }
  GetPreviewAttribute() {
    var t = this.GetAddAttribute();
    return Math.min(t + this.CurrentAttribute, this.MaxAttribute);
  }
  GetPreviewAttributeNoLimit() {
    return this.GetAddAttribute() + this.CurrentAttribute;
  }
  GetAddAttribute() {
    var t = this.$0t(this.UseItemConfigId, this.Entity) * this.X0t;
    return Math.floor(t);
  }
  GetEntityId() {
    return this.Entity ? this.Entity.Id : -1;
  }
  $0t(e, r) {
    e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemBuffConfig(e);
    if (e) {
      let t = 0;
      for (const i of e) t += this.Y0t(i, r);
      return t;
    }
  }
  Y0t(t, e) {
    let r = 0;
    var i = ConfigManager_1.ConfigManager.BuffItemConfig,
      s = t.ExtraEffectParameters,
      o = t.ExtraEffectID;
    if (0 === o)
      for (const g of t.RoutineExpirationEffects) {
        var u = i.GetBuffConfig(e.Id, g);
        r += this.Y0t(u, e);
      }
    else if (4 === o)
      for (const I of s) {
        var a,
          n,
          h = BigInt(I),
          f = i.GetDamageConfig(e.Id, h);
        f
          ? ((a = this.J0t(e, f.RelatedProperty)),
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
    else if (101 === o) {
      if (s.length < 2) return r;
      var o = e.GetComponent(158),
        _ = Number(s[0]) / TEN_THOUSANDTH_RATIO,
        o = o.GetCurrentValue(EAttributeId.e5n);
      r += _ * o + Number(s[1]);
    }
    return r;
  }
  J0t(t, e) {
    return t.GetComponent(158).GetCurrentValue(e);
  }
}
exports.UseBuffItemRoleData = UseBuffItemRoleData;
//# sourceMappingURL=UseBuffItemRoleData.js.map
