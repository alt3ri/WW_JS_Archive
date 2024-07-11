"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInstance = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ResonanceDataInfo_1 = require("../../RoleData/Module/DataInfo/ResonanceDataInfo");
const SkillNodeDataInfo_1 = require("../../RoleData/Module/DataInfo/SkillNodeDataInfo");
const RoleSkillData_1 = require("../../RoleData/Module/RoleSkillData");
const RoleDataBase_1 = require("../../RoleData/RoleDataBase");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
class RoleInstance extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e), (this.CreateTime = 0);
  }
  IsTrialRole() {
    return !1;
  }
  SetRoleName(e) {
    let t;
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
    var a = this.GetSkillData();
    var a =
      (a.SetSkillLevel(e, t),
      a.SetSkillReferenceMapBySkillId(e),
      new Protocol_1.Aki.Protocol.oNs());
    (a.Ckn = e),
      (a.gkn = t),
      EventSystem_1.EventSystem.EmitWithTarget(
        this,
        EventDefine_1.EEventName.RoleSkillLevelUp,
        this.GetRoleId(),
        a,
      );
  }
  RefreshRoleAttr(e, t) {
    const a = this.GetAttributeData();
    const o = a.GetOldRoleBaseAttr();
    a.ClearRoleBaseAttr();
    for (const n of e) a.SetRoleBaseAttr(n.Ckn, n.gkn), o.set(n.Ckn, n.gkn);
    const r = a.GetOldRoleAddAttr();
    a.ClearRoleAddAttr();
    for (const i of t) a.SetRoleAddAttr(i.Ckn, i.gkn), r.set(i.Ckn, i.gkn);
    e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    e !== 0 &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        .ShareAttri === 0 &&
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
    this.SetRoleName(t.e4n), (this.CreateTime = t.BRs);
    const e = this.GetLevelData();
    const a =
      (e.SetLevel(t.r3n),
      e.SetExp(t.k3n),
      e.SetBreachLevel(t.ADs),
      this.GetSkillData());
    for (const l of t.BDs)
      a.SetSkillLevel(l.Ckn, l.gkn), a.SetSkillReferenceMapBySkillId(l.Ckn);
    const o = this.GetPhantomData();
    for (const s of t.qDs) o.RefreshPhantom(s.Ckn, s.gkn);
    const r = t.FDs.length;
    const n = [];
    for (let e = 0; e < r; e++) {
      const i = t.FDs[e];
      n.push(new SkillNodeDataInfo_1.SkillNodeDataInfo(i.$8n, i.rVn, i.vkn));
    }
    a.SetSkillNodeStateData(n), this.RefreshRoleAttr(t.hDs, t.lDs);
    for (const f of t.ODs) this.RefreshResonance(f);
    this.GetResonanceData().SetResonantChainGroupIndex(t.VDs);
  }
  RefreshResonance(e) {
    const t = this.GetResonanceData();
    var e = new ResonanceDataInfo_1.ResonanceDataInfo(e.xDs, e.zCs, e.bDs);
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
// # sourceMappingURL=RoleInstance.js.map
