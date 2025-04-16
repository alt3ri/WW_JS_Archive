"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlySkinModel = void 0);
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FlySkinDefine_1 = require("./FlySkinDefine");
class FlySkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.yGc = new Set()),
      (this.VBc = new Map()),
      (this.jBc = new Map());
  }
  OnClear() {
    return (
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
      ),
      !0
    );
  }
  UpdateFlySkinEquipDataList(e) {
    this.VBc.clear(), this.jBc.clear(), this.yGc.clear();
    for (const o of e) {
      var n = o.Z7n,
        i = o.C5n,
        t =
          (this.uNc(n),
          ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n)),
        r = t.SkinType;
      for (const a of i) this.HBc(a, n, r);
    }
  }
  AddUnlockSkinId(e) {
    0 < e && (this.uNc(e), this.dNc(e));
  }
  uNc(e) {
    0 < e && this.yGc.add(e);
  }
  CheckSkinIsUnlock(e) {
    return 0 === e || this.yGc.has(e);
  }
  GetFlySkinItemCount(e) {
    return this.CheckSkinIsUnlock(e) ? 1 : 0;
  }
  EquipFlySkin(e, n) {
    var i, t;
    n <= 0 ||
      ((i =
        ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType),
      (t = this.GetRoleEquipFlySkinId(e, i)) !== n &&
        (this.$Bc(e, t, i),
        this.HBc(e, n, i),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRoleFlySkinChange,
          e,
          i,
          t,
          n,
        )));
  }
  UnLoadRoleFlySkinBySkinId(e, n) {
    var i =
      ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(n).SkinType;
    this.$Bc(e, n, i) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleFlySkinChange,
        e,
        i,
        n,
        0,
      );
  }
  UnLoadRoleFlySkinBySkinType(e, n) {
    var i = this.jBc.get(e);
    i &&
      (i = i.SkinEquipMap.get(n)) &&
      this.$Bc(e, i, n) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleFlySkinChange,
        e,
        n,
        i,
        0,
      );
  }
  HBc(e, n, i) {
    let t = this.VBc.get(n),
      r = (t ? t.push(e) : ((t = [e]), this.VBc.set(n, t)), this.jBc.get(e));
    r ||
      (((r = new FlySkinDefine_1.RoleFlySkinEquipData()).RoleDataId = e),
      this.jBc.set(e, r)),
      r.SkinEquipMap.set(i, n),
      r.SkinEquipSet.add(n);
  }
  $Bc(n, e, i) {
    var t,
      r,
      o = this.VBc.get(e);
    return (
      !!o &&
      -1 !== (t = o.findIndex((e) => e === n)) &&
      !!(r = this.jBc.get(n)) &&
      (o.splice(t, 1), r.SkinEquipMap.delete(i), r.SkinEquipSet.delete(e), !0)
    );
  }
  GetRoleEquipFlySkinId(e, n) {
    e = this.jBc.get(e);
    return e ? (e.SkinEquipMap.get(n) ?? 0) : 0;
  }
  CheckAllRoleEquipFlySkin(e, n) {
    for (const i of ModelManager_1.ModelManager.RoleModel.GetOfficialRoleList())
      if (e !== this.GetRoleEquipFlySkinId(i.GetDataId(), n)) return !1;
    return !0;
  }
  CheckRoleEquipFlySkin(e, n, i) {
    return this.GetRoleEquipFlySkinId(e, i) === n;
  }
  GetRoleEquipParaglidingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 1);
  }
  GetRoleEquipSoarWingSkinId(e) {
    return this.GetRoleEquipFlySkinId(e, 0);
  }
  dNc(e) {
    return (
      0 !== e &&
      !ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
        e,
      ) &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
        e,
      ),
      !0)
    );
  }
  CheckFlySkinHasRedDotBySkinType(e) {
    for (const n of ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(
      e,
    ))
      if (
        this.CheckSkinIsUnlock(n.Id) &&
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.FlySkinRedDot,
          n.Id,
        )
      )
        return !0;
    return !1;
  }
  CheckFlySkinHasRedDot() {
    return (
      this.CheckFlySkinHasRedDotBySkinType(1) ||
      this.CheckFlySkinHasRedDotBySkinType(0)
    );
  }
}
exports.FlySkinModel = FlySkinModel;
//# sourceMappingURL=FlySkinModel.js.map
