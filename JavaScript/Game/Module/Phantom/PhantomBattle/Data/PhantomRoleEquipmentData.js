"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomRoleEquipmentData = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class PhantomRoleEquipmentData {
  constructor() {
    (this.dFe = 0), (this.NVi = [0, 0, 0, 0, 0]), (this.OVi = void 0);
  }
  Phrase(t) {
    t instanceof Protocol_1.Aki.Protocol.j5s
      ? ((this.dFe = t.O6n), (this.NVi = t.W7n))
      : t instanceof Protocol_1.Aki.Protocol.W5s && (this.OVi = t);
  }
  GetRoleId() {
    return this.dFe;
  }
  RemoveIncrIdLocal(t) {
    0 < t && 0 <= (t = this.NVi.indexOf(t)) && (this.NVi[t] = 0);
  }
  GetIncrIdList() {
    return this.NVi;
  }
  GetPropData() {
    return this.OVi;
  }
  CheckPhantomIsMain(t) {
    return 0 < this.NVi.length && this.NVi[0] === t;
  }
  CheckPhantomIsSub(t) {
    return 0 < this.NVi.length && this.NVi[0] !== t && this.NVi.includes(t);
  }
  CheckMonsterIsEquip(r) {
    var e = this.NVi.length;
    for (let t = 0; t < e; t++) {
      var o =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.NVi[t],
        );
      if (o && o.GetMonsterId() === r) return !0;
    }
    return !1;
  }
  GetPhantomIndex(r) {
    var e = this.NVi.length;
    for (let t = 0; t < e; t++) if (this.NVi[t] === r) return t;
    return -1;
  }
  GetIndexPhantomId(t) {
    return this.NVi.length > t ? this.NVi[t] : 0;
  }
  GetSumEquipLevel() {
    let r = 0;
    return (
      this.NVi.forEach((t) => {
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
    var t = this.NVi.length;
    return t <= 0 ? 0 : this.GetSumEquipLevel() / t;
  }
  GetPhantomOperationState(t, r) {
    t = this.NVi[t];
    return 0 === t ? 1 : t === r ? 0 : 2;
  }
  GetCombinationActiveNum(t) {
    let r = 0;
    var e = new Array();
    for (const i of t)
      for (const n of this.GetIncrIdList()) {
        var o =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            n,
          );
        !o || i !== o.GetMonsterId() || e.includes(i) || (e.push(i), r++);
      }
    return t.length - r;
  }
  GetPropDetailAttributeList() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainViewExtraAttribute",
    );
    const e = this.GetPropShowAttributeList(),
      o = e.length,
      i = [];
    let n = !1;
    return (
      t.forEach((r) => {
        n = !1;
        for (let t = 0; t < o; t++)
          if (e[t].Id === r) {
            i.push(e[t]), (n = !0);
            break;
          }
        var t;
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
    var r = new Array();
    const e = new Map(),
      o =
        (this.OVi?.Rws.forEach((t) => {
          e.set(t.j4n, t.W4n);
        }),
        new Map());
    this.OVi?.Dws.forEach((t) => {
      o.set(t.j4n, t.W4n), e.has(t.j4n) || e.set(t.j4n, 0);
    });
    var i = Array.from(e.keys()),
      n = i.length;
    for (let t = 0; t < n; t++) {
      var a =
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
    return this.NVi && 0 <= this.NVi.findIndex((t) => 0 === t);
  }
  GetEquippedNum() {
    return this.NVi ? this.NVi.filter((t) => 0 < t).length : 0;
  }
}
exports.PhantomRoleEquipmentData = PhantomRoleEquipmentData;
//# sourceMappingURL=PhantomRoleEquipmentData.js.map
