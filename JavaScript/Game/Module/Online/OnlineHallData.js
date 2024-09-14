"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OtherScenePlayerData =
    exports.WorldTeamRoleInfo =
    exports.WorldTeamPlayerFightInfo =
    exports.OnlineTeamData =
    exports.OnlineApplyData =
    exports.OnlineHallData =
      void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PersonalDefine_1 = require("../Personal/Model/PersonalDefine");
class OnlineHallData {
  constructor(t) {
    (this.CardUnlockList = []), (this.OGi = 0);
    for (const e of (this.kGi = t).SSs)
      this.CardUnlockList.push(
        new PersonalDefine_1.PersonalCardData(e, !0, !0),
      );
  }
  SetApplyTime(t) {
    t <= 0 || (this.OGi = t);
  }
  get ApplyTimeLeftTime() {
    return this.OGi - TimeUtil_1.TimeUtil.GetServerTime();
  }
  get PlayerId() {
    return this.kGi.W5n;
  }
  get HeadId() {
    return this.kGi.dSs;
  }
  get Level() {
    return this.kGi.F6n;
  }
  get PlayerCount() {
    return this.kGi.vSs;
  }
  get WorldLevel() {
    return this.kGi.cSs;
  }
  get Name() {
    return this.kGi.H8n;
  }
  get PlayerName() {
    return this.kGi.H8n;
  }
  get Signature() {
    return this.kGi.zVn;
  }
  get PlayerCard() {
    return this.kGi.ESs;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  get PlayerOriginWorldLevel() {
    return this.kGi.uSs;
  }
  get PlayerLastOfflineTime() {
    return MathUtils_1.MathUtils.LongToNumber(this.kGi.fSs);
  }
  get PlayerPsAccountId() {
    return this.kGi.hwa;
  }
  GetIfCanShowInHallList(t = void 0) {
    return !t || void 0 === t.get(this.PlayerPsAccountId);
  }
}
exports.OnlineHallData = OnlineHallData;
class OnlineApplyData {
  constructor(t, e, r, s, i, n) {
    (this.PlayStationOnlineId = ""),
      (this.FGi = t),
      (this.VGi = e),
      (this.OGi = r),
      (this.HGi = s),
      (this.jGi = i),
      (this.PlayStationOnlineId = n);
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
  constructor(t, e, r, s, i, n, o, a) {
    (this.CardUnlockList = []),
      (this.WGi = 0),
      (this.FGi = t),
      (this.VGi = e),
      (this.jGi = r),
      (this.HGi = s),
      (this.KGi = i),
      (this.PlayerNumber = n),
      (this.kGi = o),
      (this.QGi = Protocol_1.Aki.Protocol.r7s.Proto_GREAT);
    for (const h of o.SSs)
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
  set HeadId(t) {
    this.HGi = t;
  }
  get Level() {
    return this.jGi;
  }
  set Level(t) {
    this.jGi = t;
  }
  get Name() {
    return this.GetFormationName();
  }
  set Name(t) {
    this.FGi = t;
  }
  get PlayerName() {
    return this.GetFormationName();
  }
  GetFormationName() {
    if (
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
    ) {
      var t = this.PlayerDetails.Vxa;
      if (void 0 !== t && "" !== t) return t;
    }
    return this.FGi;
  }
  get Signature() {
    return this.KGi;
  }
  set Signature(t) {
    this.KGi = t;
  }
  get PlayerNumber() {
    return this.WGi;
  }
  set PlayerNumber(t) {
    this.WGi = t;
  }
  get IsSelf() {
    return (
      this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
    );
  }
  get PingState() {
    return this.QGi;
  }
  set PingState(t) {
    this.QGi = t;
  }
  get PlayerDetails() {
    return this.kGi;
  }
  set PlayerDetails(t) {
    this.kGi = t;
  }
  GetIfCanShowInHallList(t = void 0) {
    return !t || void 0 === t.get(this.kGi.hwa);
  }
}
exports.OnlineTeamData = OnlineTeamData;
class WorldTeamPlayerFightInfo {
  constructor(t, e, r, s) {
    (this.FGi = t), (this.VGi = e), (this.XGi = s), (this.$Gi = r);
  }
  get PlayerId() {
    return this.VGi;
  }
  get CurRoleId() {
    return this.$Gi;
  }
  set CurRoleId(t) {
    this.$Gi = t;
  }
  get RoleInfos() {
    return this.XGi;
  }
  set RoleInfos(t) {
    this.XGi = t;
  }
  GetRoleInfoByConfigId(t) {
    for (const e of this.XGi) if (e.RoleId === t) return e;
  }
  get Name() {
    return this.FGi;
  }
  set Name(t) {
    this.FGi = t;
  }
  get IsSelf() {
    return (
      this.PlayerId === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
    );
  }
  GetIsDiffRoleList(t) {
    if (t.length !== this.XGi.length) return !0;
    for (const e of t) {
      let t = !1;
      for (const r of this.XGi) e.Q6n === r.RoleId && (t = !0);
      if (!t) return !0;
    }
    return !1;
  }
  GetRoleLength() {
    return this.XGi.length;
  }
}
exports.WorldTeamPlayerFightInfo = WorldTeamPlayerFightInfo;
class WorldTeamRoleInfo {
  constructor(t, e) {
    (this.YGi = 0),
      (this.RoleCurHp = 1),
      (this.RoleMaxHp = 1),
      (this.JGi = t),
      (this.zGi = e);
  }
  get RoleId() {
    return this.JGi;
  }
  set RoleId(t) {
    this.JGi = t;
  }
  get RoleLevel() {
    return this.zGi;
  }
  set RoleLevel(t) {
    this.zGi = t;
  }
  get RoleIndex() {
    return this.YGi;
  }
  set RoleIndex(t) {
    this.YGi = t;
  }
}
exports.WorldTeamRoleInfo = WorldTeamRoleInfo;
class OtherScenePlayerData {
  constructor(t, e, r) {
    (this.PlayerId = 0),
      (this.MapId = 0),
      (this.Location = void 0),
      (this.PlayerId = t),
      (this.MapId = e),
      (this.Location = Vector_1.Vector.Create(r));
  }
  SetLocation(t) {
    this.Location?.Set(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
  }
}
exports.OtherScenePlayerData = OtherScenePlayerData;
//# sourceMappingURL=OnlineHallData.js.map
