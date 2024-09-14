"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInstance = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ResonanceDataInfo_1 = require("../../RoleData/Module/DataInfo/ResonanceDataInfo"),
  SkillNodeDataInfo_1 = require("../../RoleData/Module/DataInfo/SkillNodeDataInfo"),
  RoleSkillData_1 = require("../../RoleData/Module/RoleSkillData"),
  RoleDataBase_1 = require("../../RoleData/RoleDataBase");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
class RoleInstance extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e), (this.CreateTime = 0);
  }
  IsTrialRole() {
    return !1;
  }
  SetRoleName(e) {
    var t;
    StringUtils_1.StringUtils.IsEmpty(e)
      ? ((t = this.GetRoleConfig()),
        (this.Name = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
          t.Name,
        )))
      : (this.Name = e);
  }
  GetName(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id, e)
      ? ModelManager_1.ModelManager.FunctionModel.GetPlayerName()
      : this.GetRoleRealName();
  }
  GetRoleRealName() {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
      this.GetRoleConfig().Name,
    );
  }
  GetSkillInfoLevel(e) {
    return this.GetSkillData().GetReferencedSkillLevel(
      e,
      RoleSkillData_1.ERoleSkillReferenceType.SkillInfo,
    );
  }
  GetRoleId() {
    return this.Id;
  }
  GetRoleCreateTime() {
    return this.CreateTime;
  }
  RefreshSkillInfo(e, t) {
    var a = this.GetSkillData(),
      a =
        (a.SetSkillLevel(e, t),
        a.SetSkillReferenceMapBySkillId(e),
        new Protocol_1.Aki.Protocol.e5s());
    (a.Z4n = e),
      (a.e5n = t),
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.RoleSkillLevelUp,
        this.GetRoleId(),
        a,
      );
  }
  RefreshRoleAttr(e, t) {
    var a = this.GetAttributeData(),
      o = a.GetOldRoleBaseAttr();
    a.ClearRoleBaseAttr();
    for (const n of e) a.SetRoleBaseAttr(n.Z4n, n.e5n), o.set(n.Z4n, n.e5n);
    var r = a.GetOldRoleAddAttr();
    a.ClearRoleAddAttr();
    for (const i of t) a.SetRoleAddAttr(i.Z4n, i.e5n), r.set(i.Z4n, i.e5n);
    e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    0 !== e &&
      0 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          .ShareAttri &&
      (o.delete(EAttributeId.Proto_Life), r.delete(EAttributeId.Proto_Life)),
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.RoleRefreshAttribute,
        o,
        r,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleRefreshAttribute,
        o,
        r,
      );
  }
  RefreshRoleInfo(t) {
    this.SetRoleName(t.H8n), (this.CreateTime = t.aws);
    var e = this.GetLevelData(),
      a =
        (e.SetLevel(t.F6n),
        e.SetExp(t.U8n),
        e.SetBreachLevel(t.txs),
        this.GetSkillData());
    for (const l of t.axs)
      a.SetSkillLevel(l.Z4n, l.e5n), a.SetSkillReferenceMapBySkillId(l.Z4n);
    var o = this.GetPhantomData();
    for (const s of t.hxs) o.RefreshPhantom(s.Z4n, s.e5n);
    var r = t.dxs.length,
      n = [];
    for (let e = 0; e < r; e++) {
      var i = t.dxs[e];
      n.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(i.qHn, i.WHn, i.r5n));
    }
    a.SetSkillNodeStateData(n), this.RefreshRoleAttr(t.bws, t.Bws);
    for (const f of t._xs) this.RefreshResonance(f);
    this.GetResonanceData().SetResonantChainGroupIndex(t.mxs);
  }
  RefreshResonance(e) {
    var t = this.GetResonanceData(),
      e = new ResonanceDataInfo_1.ResonanceDataInfo(e.nxs, e.Sps, e.sxs);
    t.SetResonance(e);
  }
  CanChangeName() {
    return (
      !ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(this.Id) ||
      !ConfigManager_1.ConfigManager.PlayerInfoConfig.GetIsUseAccountName()
    );
  }
  IsOnlineRole() {
    return !1;
  }
  GetIsNew() {
    return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
      this.Id,
    );
  }
  TryRemoveNewFlag() {
    ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
      this.Id,
    ) &&
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
        this.Id,
      );
  }
}
exports.RoleInstance = RoleInstance;
//# sourceMappingURL=RoleInstance.js.map
