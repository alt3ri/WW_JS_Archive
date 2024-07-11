"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldTeamRoleInfo =
    exports.WorldTeamPlayerFightInfo =
    exports.OnlineTeamData =
    exports.OnlineApplyData =
    exports.OnlineHallData =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class OnlineHallData {
  constructor(e) {
    (this.CardUnlockList = []), (this.OGi = 0);
    for (const t of (this.kGi = e).mSs)
      this.CardUnlockList.push(
        new PersonalDefine_1.PersonalCardData(t, !0, !0),
      );
  }
  SetApplyTime(e) {
    e <= 0 || (this.OGi = e);
  }
  get ApplyTimeLeftTime() {
    return this.OGi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get PlayerId() {
    return this.kGi.q5n;
  }
  get HeadId() {
    return this.kGi.sSs;
  }
  get Level() {
    return this.kGi.P6n;
  }
  get PlayerCount() {
    return this.kGi.uSs;
  }
  get WorldLevel() {
    return this.kGi.nSs;
  }
  get Name() {
    return this.kGi.w8n;
  }
  get PlayerName() {
    return this.kGi.w8n;
  }
  get Signature() {
    return this.kGi.HVn;
  }
  get PlayerCard() {
    return this.kGi.CSs;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  get PlayerOriginWorldLevel() {
    return this.kGi.oSs;
  }
  get PlayerLastOfflineTime() {
    return MathUtils_1.MathUtils.LongToNumber(this.kGi._Ss);
  }
}
exports.OnlineHallData = OnlineHallData;
class OnlineApplyData {
  constructor(e, t, r, s, i) {
    (this.FGi = e),
      (this.VGi = t),
      (this.OGi = r),
      (this.HGi = s),
      (this.jGi = i);
  }
  get ApplyTimeLeftTime() {
    return (
      Number(MathUtils_1.MathUtils.LongToBigInt(this.OGi)) -
      TimeUtil_1.TimeUtil.GetServerTime()
    );
  }
  get PlayerId() {
    return this.VGi;
  }
  get RefuseTimestamp() {
    return this.OGi;
  }
  get Level() {
    return this.jGi;
  }
  get Name() {
    return this.FGi;
  }
  get HeadId() {
    return this.HGi;
  }
}
exports.OnlineApplyData = OnlineApplyData;
class OnlineTeamData {
  constructor(e, t, r, s, i, n, l, o) {
    (this.CardUnlockList = []),
      (this.WGi = 0),
      (this.FGi = e),
      (this.VGi = t),
      (this.jGi = r),
      (this.HGi = s),
      (this.KGi = i),
      (this.PlayerNumber = n),
      (this.kGi = l),
      (this.QGi = Protocol_1.Aki.Protocol.Y8s.Proto_GREAT);
    for (const h of l.mSs)
      this.CardUnlockList.push(
        new PersonalDefine_1.PersonalCardData(h, !0, !0),
      );
  }
  get PlayerId() {
    return this.VGi;
  }
  get HeadId() {
    return this.HGi;
  }
  set HeadId(e) {
    this.HGi = e;
  }
  get Level() {
    return this.jGi;
  }
  set Level(e) {
    this.jGi = e;
  }
  get Name() {
    return this.FGi;
  }
  set Name(e) {
    this.FGi = e;
  }
  get PlayerName() {
    return this.FGi;
  }
  get Signature() {
    return this.KGi;
  }
  set Signature(e) {
    this.KGi = e;
  }
  get PlayerNumber() {
    return this.WGi;
  }
  set PlayerNumber(e) {
    this.WGi = e;
  }
  get IsSelf() {
    return (
      this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
    );
  }
  get PingState() {
    return this.QGi;
  }
  set PingState(e) {
    this.QGi = e;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  set PlayerDetails(e) {
    this.kGi = e;
  }
}
exports.OnlineTeamData = OnlineTeamData;
class WorldTeamPlayerFightInfo {
  constructor(e, t, r, s) {
    (this.FGi = e), (this.VGi = t), (this.XGi = s), (this.$Gi = r);
  }
  get PlayerId() {
    return this.VGi;
  }
  get CurRoleId() {
    return this.$Gi;
  }
  set CurRoleId(e) {
    this.$Gi = e;
  }
  get RoleInfos() {
    return this.XGi;
  }
  set RoleInfos(e) {
    this.XGi = e;
  }
  GetRoleInfoByConfigId(e) {
    for (const t of this.XGi) if (t.RoleId === e) return t;
  }
  get Name() {
    return this.FGi;
  }
  set Name(e) {
    this.FGi = e;
  }
  get IsSelf() {
    return (
      this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
    );
  }
  GetIsDiffRoleList(e) {
    if (e.length !== this.XGi.length) return !0;
    for (const t of e) {
      let e = !1;
      for (const r of this.XGi) t.O6n === r.RoleId && (e = !0);
      if (!e) return !0;
    }
    return !1;
  }
  GetRoleLength() {
    return this.XGi.length;
  }
}
exports.WorldTeamPlayerFightInfo = WorldTeamPlayerFightInfo;
class WorldTeamRoleInfo {
  constructor(e, t) {
    (this.YGi = 0),
      (this.RoleCurHp = 1),
      (this.RoleMaxHp = 1),
      (this.JGi = e),
      (this.zGi = t);
  }
  get RoleId() {
    return this.JGi;
  }
  set RoleId(e) {
    this.JGi = e;
  }
  get RoleLevel() {
    return this.zGi;
  }
  set RoleLevel(e) {
    this.zGi = e;
  }
  get RoleIndex() {
    return this.YGi;
  }
  set RoleIndex(e) {
    this.YGi = e;
  }
}
exports.WorldTeamRoleInfo = WorldTeamRoleInfo;
//# sourceMappingURL=OnlineHallData.js.map
