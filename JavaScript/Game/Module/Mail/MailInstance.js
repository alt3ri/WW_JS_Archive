"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailData = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ScrollViewDataBase_1 = require("../Util/ScrollView/ScrollViewDataBase");
class MailData extends ScrollViewDataBase_1.ScrollViewDataBase {
  constructor() {
    super(...arguments),
      (this.Id = "0"),
      (this.ConfigId = 0),
      (this.Time = 0),
      (this.FinishTime = 0),
      (this.Level = 1),
      (this.Title = ""),
      (this.Content = ""),
      (this.Sender = ""),
      (this.ValidTime = 0),
      (this.FinishValidTime = 0),
      (this.AttachmentInfos = []),
      (this.OriginalDeadlineTimeStamp = 0),
      (this.FinishedDeadlineTimeStamp = 0),
      (this.pEi = 0),
      (this.vEi = 0),
      (this.MEi = ""),
      (this.SEi = ""),
      (this.EEi = 0),
      (this.yEi = ""),
      (this.IEi = 0),
      (this.TEi = ""),
      (this.LEi = ""),
      (this.DEi = ""),
      (this.REi = !1),
      (this.UEi = !1),
      (this.AEi = !1),
      (this.PEi = "");
  }
  UpdateValidTimeWhenReadMail() {
    0 !== this.FinishTime
      ? (this.FinishedDeadlineTimeStamp =
          this.FinishValidTime + this.FinishTime)
      : (this.FinishedDeadlineTimeStamp =
          Date.parse(new Date().toString()) / 1e3 + this.FinishValidTime),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Mail", 28, "邮件详情：邮件完成", ["this.Id", this.Id]);
  }
  GetAttachmentStatus() {
    return this.pEi;
  }
  SetAttachmentStatus(t) {
    (this.pEi = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件详情：设置附件领取状态",
          ["MailId", this.Id],
          ["attachmentStatus", t],
        );
  }
  GetWasScanned() {
    return 1 === this.vEi;
  }
  SetWasScanned(t) {
    (this.vEi = 1 === t ? t : 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件详情：设置阅读状态",
          ["MailId", this.Id],
          ["scanned", t],
        );
  }
  GetReceiveTime() {
    return this.Time;
  }
  GetMailLevel() {
    return this.Level;
  }
  GetTitle() {
    return this.Title;
  }
  SetText(t) {
    t = (this.Content = t).split("@&&");
    (this.MEi = t[0]), 1 < t.length && this.xEi(t[1]);
  }
  xEi(t) {
    (this.yEi = "FFFFFFFF"),
      (this.EEi = 0),
      (this.IEi = 0),
      (this.DEi = ""),
      (this.REi = !1),
      (this.TEi = ""),
      (this.SEi = "");
    var e = t.split(",");
    for (let t = 0; t < e.length; t++)
      e[t].includes("iconId=")
        ? (this.EEi = Number(e[t].replace("iconId=", "")))
        : e[t].includes("color=#")
          ? (this.yEi = e[t].replace("color=#", ""))
          : e[t].includes("jumpId=")
            ? (this.IEi = Number(e[t].replace("jumpId=", "")))
            : e[t].includes("url=")
              ? (this.DEi = e[t].replace("url=", ""))
              : e[t].includes("showNewMail")
                ? (this.UEi = !0)
                : e[t].includes("useDefaultBrowser")
                  ? (this.AEi = !0)
                  : e[t].includes("isWenjuanxing=")
                    ? (this.REi =
                        1 === Number(e[t].replace("isWenjuanxing=", "")))
                    : e[t].includes("wenjuanId=")
                      ? (this.TEi = e[t].replace("wenjuanId=", ""))
                      : e[t].includes("wenjuanTitle=")
                        ? (this.LEi = e[t].replace("wenjuanTitle=", ""))
                        : e[t].includes("subTitle=")
                          ? (this.LEi = e[t].replace("subTitle=", ""))
                          : e[t].includes("wenjuanPass=")
                            ? (this.PEi = e[t].replace("wenjuanPass=", ""))
                            : (this.SEi = this.SEi.concat(e[t]));
  }
  GetUseDefaultBrowser() {
    return this.AEi;
  }
  GetIfShowNewMail() {
    return this.UEi;
  }
  GetText() {
    return this.MEi;
  }
  GetSubText() {
    return this.SEi;
  }
  GetQuestionPass() {
    return this.PEi;
  }
  GetSubTextIconId() {
    return this.EEi;
  }
  GetSubTextColor() {
    return this.yEi;
  }
  IsQuestionMail() {
    return this.REi;
  }
  GetQuestionUrl() {
    var t = ModelManager_1.ModelManager.LoginModel,
      e =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "mail_question_key",
        ),
      e =
        this.TEi +
        ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() +
        ";" +
        t.GetServerId()?.toString() +
        e,
      e = UE.KuroStaticLibrary.HashStringWithSHA1(e),
      i =
        ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).QuestionnaireId;
    return (
      `${this.DEi}?sojumpparm=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()};${t.GetServerId()?.toString()}&parmsign=${e}&langv=` +
      i
    );
  }
  GetSubUrl() {
    return this.DEi;
  }
  GetSubTitle() {
    return this.LEi;
  }
  GetSubContentJumpId() {
    return this.IEi;
  }
  GetSender() {
    return this.Sender;
  }
  GetAttachmentInfo() {
    return this.AttachmentInfos;
  }
  GetOriginalDeadlineTimeStamp() {
    return this.OriginalDeadlineTimeStamp;
  }
  GetFinishedDeadlineTimeStamp() {
    return this.FinishedDeadlineTimeStamp;
  }
}
exports.MailData = MailData;
//# sourceMappingURL=MailInstance.js.map
