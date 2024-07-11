"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailModel = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const MailInstance_1 = require("./MailInstance");
const MailAttachmentData_1 = require("./Views/MailAttachmentData");
const ID_SHOW_LENGTH = 3;
class MailModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kQ = new Map()),
      (this.wEi = []),
      (this.BEi = ""),
      (this.bEi = new Set()),
      (this.qEi = new Map()),
      (this.LastTimeShowNewMailTipsTime = 0),
      (this.GEi = []),
      (this.NEi = void 0),
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
  OEi(e) {
    if (e.GetWasScanned() && e.GetAttachmentStatus() !== 2) {
      if (!this.bEi.has(e.Id))
        return void EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchUnfinishedFlag,
        );
      this.bEi.delete(e.Id);
    } else {
      if (this.bEi.has(e.Id))
        return void EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchUnfinishedFlag,
        );
      this.bEi.add(e.Id);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.SwitchUnfinishedFlag,
    );
  }
  GetRedDotCouldLightOn() {
    return (
      this.bEi.size > 0 &&
      ModelManager_1.ModelManager.MailModel.CheckOpenCondition()
    );
  }
  UnScannedRedPoint() {
    if (!ModelManager_1.ModelManager.MailModel.CheckOpenCondition()) return !1;
    let e = !1;
    if (this.kQ.size > 0)
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
    if (this.bEi.size > 0)
      for (const t of this.bEi.values())
        if (this.GetMailInstanceById(t).GetMailLevel() === 2) {
          e = !0;
          break;
        }
    return e;
  }
  GetLastPickedAttachments() {
    const e = [];
    for (const i of this.GEi) {
      const t = [{ IncId: 0, ItemId: i.GetItemId() }, i.GetCount()];
      e.push(t);
    }
    return e;
  }
  SetLastPickedAttachments(e, t) {
    this.ClearLastPickedAttachments();
    const i = new Map();
    for (const r of Object.keys(e)) {
      const a = this.GetMailInstanceById(r);
      a.GetAttachmentInfo().forEach((e) => {
        var t = i.get(e.Ekn);
        var t = e.I5n + (t ?? 0);
        i.set(e.Ekn, t);
      }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Mail", 28, "邮件数据：领取邮件奖励", ["key", r]),
        this.SetMailStatusByStatusCode(e[r], a);
    }
    i.forEach((e, t) => {
      this.GEi.push(new MailAttachmentData_1.MailAttachmentData(t, e, !0));
    }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PickingAttachment,
        t,
      );
  }
  ClearLastPickedAttachments() {
    this.GEi = [];
  }
  GetCurrentSelectMailId() {
    return this.BEi;
  }
  SetCurrentSelectMailId(e) {
    this.BEi = e;
  }
  OpenWebBrowser(e) {
    e && e !== "" && UE.KismetSystemLibrary.LaunchURL(e);
  }
  ReloadMailList() {
    (this.wEi.length = 0),
      this.kQ.forEach((e) => {
        this.wEi.push(e);
      }),
      this.wEi.sort(this.MailSort);
  }
  GetMailList() {
    return this.wEi;
  }
  kEi(e) {
    this.kQ.set(e.Id, e);
  }
  DeleteMail(e) {
    this.GetMailInstanceById(e) &&
      (this.bEi.has(e) &&
        (this.bEi.delete(e),
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
      this.FEi(e),
      t && this.ReloadMailList();
  }
  OnMailInfoSynced(e) {
    for (const i of e.bAs) {
      ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
      const t = new Protocol_1.Aki.Protocol.PNs(i);
      this.AddMail(t, !1);
    }
    this.ReloadMailList();
  }
  GetMailCapacity() {
    let e;
    return (
      this.NEi ||
      ((e = ConfigManager_1.ConfigManager.MailConfig.GetMailSize())
        ? ((this.NEi = e), this.NEi)
        : 0)
    );
  }
  VEi(e) {
    (e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond)),
      (e = TimeUtil_1.TimeUtil.DateFormat4(e));
    let t = 1;
    return (
      this.qEi.has(e) && ((t = this.qEi.get(e)), t++),
      this.qEi.set(e, t),
      " " + e + " " + this.HEi(t, ID_SHOW_LENGTH)
    );
  }
  HEi(e, t) {
    return (Array(t).join("0") + (e % Math.pow(10, t))).slice(-t);
  }
  FEi(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Mail", 28, "邮件数据：创建邮件 ", [
        "mailInformation.Proto_Id",
        e.Ekn,
      ]);
    const t = e.ckn;
    const i = new MailInstance_1.MailData();
    const a =
      (ObjectUtils_1.ObjectUtils.CopyValue(e, i),
      (i.Id = e.Ekn),
      (i.ConfigId = e.R5n),
      e.RAs);
    (i.Time = a.low),
      (i.Level = e.r3n),
      (i.Title = e.AAs),
      i.SetText(e.H3n),
      (i.Sender = e.PAs),
      (i.ValidTime = e.UAs),
      (i.FinishValidTime = e.wAs),
      (i.AttachmentInfos = e.xAs),
      (i.OriginalDeadlineTimeStamp = a.low + e.UAs),
      (i.FinishedDeadlineTimeStamp =
        MathUtils_1.MathUtils.LongToNumber(e.RAs) > 0 ? e.wAs + a.low : 0),
      this.jEi(i),
      this.kEi(i),
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
    const e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.HasShowNewMailTipsMap,
      ) ?? new Map();
    for (const t of this.kQ)
      if (t[1].GetIfShowNewMail() && !e.get(t[0])) return !0;
    return !1;
  }
  SaveShowNewMailMap() {
    const e =
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
    const e =
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
  jEi(e) {
    let t;
    (e.ConfigId !== 4 && e.ConfigId !== 6) ||
      ((t = this.VEi(e.Time)), (e.Title = e.Title + t));
  }
  SetMailStatusByStatusCode(e, t) {
    const i = 1 & e;
    var e = 2 & e;
    let a = 0;
    t.AttachmentInfos.length === 0
      ? (a = 0)
      : t.AttachmentInfos.length > 0 && (a = e ? 1 : 2),
      t.SetWasScanned(i),
      t.SetAttachmentStatus(a),
      i == 1 && t.UpdateValidTimeWhenReadMail(),
      this.OEi(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件数据：邮件状态改变",
          ["SetMailStatusByStatusCode:", a],
          ["id:", t.Id],
          ["scanned:", i],
          ["taken:", e],
          ["this.UnFinishedMailSet.length", this.bEi?.size],
        );
  }
  CheckOpenCondition() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10020);
  }
  GetMailFilterConfigData(e) {
    return ConfigManager_1.ConfigManager.MailConfig.GetMailFilterConfigById(e);
  }
  GetImportantMails(e) {
    return (e ?? this.GetMailList()).filter((e) => e.GetMailLevel() === 2);
  }
  GetUnScanMails(e) {
    return (e ?? this.GetMailList()).filter((e) => !e.GetWasScanned());
  }
}
exports.MailModel = MailModel;
// # sourceMappingURL=MailModel.js.map
