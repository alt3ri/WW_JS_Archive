"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomRoleEquipmentData = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class PhantomRoleEquipmentData {
  constructor() {
    (this.zke = 0), (this.O5i = [0, 0, 0, 0, 0]), (this.k5i = void 0);
  }
  Phrase(t) {
    t instanceof Protocol_1.Aki.Protocol.iNs
      ? ((this.zke = t.l3n), (this.O5i = t.c8n))
      : t instanceof Protocol_1.Aki.Protocol.rNs && (this.k5i = t);
  }
  GetRoleId() {
    return this.zke;
  }
  RemoveIncrIdLocal(t) {
    t > 0 && (t = this.O5i.indexOf(t)) >= 0 && (this.O5i[t] = 0);
  }
  GetIncrIdList() {
    return this.O5i;
  }
  GetPropData() {
    return this.k5i;
  }
  CheckPhantomIsMain(t) {
    return this.O5i.length > 0 && this.O5i[0] === t;
  }
  CheckPhantomIsSub(t) {
    return this.O5i.length > 0 && this.O5i[0] !== t && this.O5i.includes(t);
  }
  CheckMonsterIsEquip(r) {
    const e = this.O5i.length;
    for (let t = 0; t < e; t++) {
      const o =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.O5i[t],
        );
      if (o && o.GetMonsterId() === r) return !0;
    }
    return !1;
  }
  GetPhantomIndex(r) {
    const e = this.O5i.length;
    for (let t = 0; t < e; t++) if (this.O5i[t] === r) return t;
    return -1;
  }
  GetIndexPhantomId(t) {
    return this.O5i.length > t ? this.O5i[t] : 0;
  }
  GetSumEquipLevel() {
    let r = 0;
    return (
      this.O5i.forEach((t) => {
        t =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            t,
          );
        t && (r += t.GetPhantomLevel());
      }),
      r
    );
  }
  GetAverageEquipLevel() {
    const t = this.O5i.length;
    return t <= 0 ? 0 : this.GetSumEquipLevel() / t;
  }
  GetPhantomOperationState(t, r) {
    t = this.O5i[t];
    return t === 0 ? 1 : t === r ? 0 : 2;
  }
  GetCombinationActiveNum(t) {
    let r = 0;
    const e = new Array();
    for (const i of t)
      for (const n of this.GetIncrIdList()) {
        const o =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            n,
          );
        !o || i !== o.GetMonsterId() || e.includes(i) || (e.push(i), r++);
      }
    return t.length - r;
  }
  GetPropDetailAttributeList() {
    const t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainViewExtraAttribute",
    );
    const e = this.GetPropShowAttributeList();
    const o = e.length;
    const i = [];
    let n = !1;
    return (
      t.forEach((r) => {
        n = !1;
        for (let t = 0; t < o; t++)
          if (e[t].Id === r) {
            i.push(e[t]), (n = !0);
            break;
          }
        let t;
        n ||
          ((t =
            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
              r,
            )),
          i.push(
            new AttrListScrollData_1.AttrListScrollData(
              r,
              0,
              0,
              t.Priority,
              !1,
              1,
            ),
          ));
      }),
      i
    );
  }
  GetPropShowAttributeList() {
    const r = new Array();
    const e = new Map();
    const o =
      (this.k5i?.hDs.forEach((t) => {
        e.set(t.Ckn, t.gkn);
      }),
      new Map());
    this.k5i?.lDs.forEach((t) => {
      o.set(t.Ckn, t.gkn), e.has(t.Ckn) || e.set(t.Ckn, 0);
    });
    const i = Array.from(e.keys());
    const n = i.length;
    for (let t = 0; t < n; t++) {
      const a =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          i[t],
        );
      r.push(
        new AttrListScrollData_1.AttrListScrollData(
          i[t],
          e.get(i[t]),
          o.get(i[t]) ?? 0,
          a.Priority,
          !1,
          1,
        ),
      );
    }
    return r;
  }
  CheckHasEmpty() {
    return this.O5i && this.O5i.findIndex((t) => t === 0) >= 0;
  }
  GetEquippedNum() {
    return this.O5i ? this.O5i.filter((t) => t > 0).length : 0;
  }
}
exports.PhantomRoleEquipmentData = PhantomRoleEquipmentData;
// # sourceMappingURL=PhantomRoleEquipmentData.js.map
