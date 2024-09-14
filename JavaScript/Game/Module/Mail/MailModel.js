"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MailInstance_1 = require("./MailInstance"),
  MailAttachmentData_1 = require("./Views/MailAttachmentData"),
  ID_SHOW_LENGTH = 3;
class MailModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kQ = new Map()),
      (this.wyi = []),
      (this.Byi = ""),
      (this.byi = new Set()),
      (this.qyi = new Map()),
      (this.LastTimeShowNewMailTipsTime = 0),
      (this.Gyi = []),
      (this.Nyi = void 0),
      (this.MailSort = (e, t) => {
        return e.GetWasScanned() !== t.GetWasScanned()
          ? e.GetWasScanned()
            ? 1
            : -1
          : e.GetAttachmentStatus() !== t.GetAttachmentStatus()
            ? e.GetAttachmentStatus() < t.GetAttachmentStatus()
              ? 1
              : -1
            : e.GetMailLevel() !== t.GetMailLevel()
              ? e.GetMailLevel() < t.GetMailLevel()
                ? 1
                : -1
              : e.GetReceiveTime() === t.GetReceiveTime() ||
                  e.GetReceiveTime() < t.GetReceiveTime()
                ? 1
                : -1;
      });
  }
  Oyi(e) {
    if (e.GetWasScanned() && 2 !== e.GetAttachmentStatus()) {
      if (!this.byi.has(e.Id))
        return void EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchUnfinishedFlag,
        );
      this.byi.delete(e.Id);
    } else {
      if (this.byi.has(e.Id))
        return void EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchUnfinishedFlag,
        );
      this.byi.add(e.Id);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SwitchUnfinishedFlag,
    );
  }
  GetRedDotCouldLightOn() {
    return (
      0 < this.byi.size &&
      ModelManager_1.ModelManager.MailModel.CheckOpenCondition()
    );
  }
  UnScannedRedPoint() {
    if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) return !1;
    let e = !1;
    if (0 < this.kQ.size)
      for (const t of this.kQ.values())
        if (!t.GetWasScanned()) {
          e = !0;
          break;
        }
    return e;
  }
  GetRedDotImportant() {
    if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) return !1;
    let e = !1;
    if (0 < this.byi.size)
      for (const t of this.byi.values())
        if (2 === this.GetMailInstanceById(t).GetMailLevel()) {
          e = !0;
          break;
        }
    return e;
  }
  GetLastPickedAttachments() {
    var e = [];
    for (const i of this.Gyi) {
      var t = [{ IncId: 0, ItemId: i.GetItemId() }, i.GetCount()];
      e.push(t);
    }
    return e;
  }
  SetLastPickedAttachments(e, t) {
    this.ClearLastPickedAttachments();
    const i = new Map();
    for (const r of Object.keys(e)) {
      var a = this.GetMailInstanceById(r);
      a.GetAttachmentInfo().forEach((e) => {
        var t = i.get(e.s5n),
          t = e.m9n + (t ?? 0);
        i.set(e.s5n, t);
      }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Mail", 28, "邮件数据：领取邮件奖励", ["key", r]),
        this.SetMailStatusByStatusCode(e[r], a);
    }
    i.forEach((e, t) => {
      this.Gyi.push(new MailAttachmentData_1.MailAttachmentData(t, e, !0));
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PickingAttachment,
        t,
      );
  }
  ClearLastPickedAttachments() {
    this.Gyi = [];
  }
  GetCurrentSelectMailId() {
    return this.Byi;
  }
  SetCurrentSelectMailId(e) {
    this.Byi = e;
  }
  OpenWebBrowser(e) {
    e && "" !== e && UE.KismetSystemLibrary.LaunchURL(e);
  }
  ReloadMailList() {
    (this.wyi.length = 0),
      this.kQ.forEach((e) => {
        this.wyi.push(e);
      }),
      this.wyi.sort(this.MailSort);
  }
  GetMailList() {
    return this.wyi;
  }
  kyi(e) {
    this.kQ.set(e.Id, e);
  }
  DeleteMail(e) {
    this.GetMailInstanceById(e) &&
      (this.byi.has(e) &&
        (this.byi.delete(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchUnfinishedFlag,
        )),
      this.kQ.delete(e),
      this.ReloadMailList());
  }
  GetMailListLength() {
    return this.kQ.size;
  }
  GetMailInstanceById(e) {
    return this.kQ.get(e);
  }
  AddMail(e, t = !0) {
    this.kQ.size >= this.GetMailCapacity() &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Mail", 28, "后端新增邮件时超出容量！"),
      this.Fyi(e),
      t && this.ReloadMailList();
  }
  OnMailInfoSynced(e) {
    for (const i of e.sbs) {
      ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
      var t = new Protocol_1.Aki.Protocol.L5s(i);
      this.AddMail(t, !1);
    }
    this.ReloadMailList();
  }
  GetMailCapacity() {
    var e;
    return (
      this.Nyi ||
      ((e = ConfigManager_1.ConfigManager.MailConfig.GetMailSize())
        ? ((this.Nyi = e), this.Nyi)
        : 0)
    );
  }
  Vyi(e) {
    (e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond)),
      (e = TimeUtil_1.TimeUtil.DateFormat4(e));
    let t = 1;
    return (
      this.qyi.has(e) && ((t = this.qyi.get(e)), t++),
      this.qyi.set(e, t),
      " " + e + " " + this.Hyi(t, ID_SHOW_LENGTH)
    );
  }
  Hyi(e, t) {
    return (Array(t).join("0") + (e % Math.pow(10, t))).slice(-t);
  }
  Fyi(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Mail", 28, "邮件数据：创建邮件 ", [
        "mailInformation.Proto_Id",
        e.s5n,
      ]);
    var t = e.Y4n,
      i = new MailInstance_1.MailData(),
      a =
        (ObjectUtils_1.ObjectUtils.CopyValue(e, i),
        (i.Id = e.s5n),
        (i.ConfigId = e.v9n),
        e.Zxs);
    (i.Time = a.low),
      (i.Level = e.F6n),
      (i.Title = e.tbs),
      i.SetText(e.P8n),
      (i.Sender = e.ibs),
      (i.ValidTime = e.rbs),
      (i.FinishValidTime = e.obs),
      (i.AttachmentInfos = e.nbs),
      (i.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.ebs)),
      this.jyi(i),
      this.kyi(i),
      this.SetMailStatusByStatusCode(t, i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件数据：创建邮件成功： ",
          ["newMail.Id", i.Id],
          ["title", i.Title],
        );
  }
  IfNeedShowNewMail() {
    var e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      ) ?? new Map();
    for (const t of this.kQ)
      if (t[1].GetIfShowNewMail() && !e.get(t[0])) return !0;
    return !1;
  }
  SaveShowNewMailMap() {
    var e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      ) ?? new Map();
    for (const t of this.kQ) e.set(t[0], !0);
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      e,
    );
  }
  RefreshLocalNewMailMap() {
    var e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      ) ?? new Map();
    for (const t of e) this.kQ.has(t[0]) || e.delete(t[0]);
    for (const i of this.kQ)
      i[1].GetIfShowNewMail() && !e.get(i[0]) && e.set(i[0], !1);
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      e,
    );
  }
  jyi(e) {
    var t;
    (4 !== e.ConfigId && 6 !== e.ConfigId) ||
      ((t = this.Vyi(e.Time)), (e.Title = e.Title + t));
  }
  SetMailStatusByStatusCode(e, t) {
    var i = 1 & e,
      e = 2 & e;
    let a = 0;
    0 === t.AttachmentInfos.length
      ? (a = 0)
      : 0 < t.AttachmentInfos.length && (a = e ? 1 : 2),
      t.SetWasScanned(i),
      t.SetAttachmentStatus(a),
      this.Oyi(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件数据：邮件状态改变",
          ["SetMailStatusByStatusCode:", a],
          ["id:", t.Id],
          ["scanned:", i],
          ["taken:", e],
          ["this.UnFinishedMailSet.length", this.byi?.size],
        );
  }
  CheckOpenCondition() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10020);
  }
  GetMailFilterConfigData(e) {
    return ConfigManager_1.ConfigManager.MailConfig.GetMailFilterConfigById(e);
  }
  GetImportantMails(e) {
    return (e ?? this.GetMailList()).filter((e) => 2 === e.GetMailLevel());
  }
  GetUnScanMails(e) {
    return (e ?? this.GetMailList()).filter((e) => !e.GetWasScanned());
  }
}
exports.MailModel = MailModel;
//# sourceMappingURL=MailModel.js.map
