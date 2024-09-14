"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailData = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
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
      (this.ReadTime = 0),
      (this.pyi = 0),
      (this.vyi = 0),
      (this.Myi = ""),
      (this.Eyi = ""),
      (this.Syi = 0),
      (this.yyi = ""),
      (this.Iyi = 0),
      (this.Tyi = ""),
      (this.Lyi = ""),
      (this.Dyi = ""),
      (this.Ryi = !1),
      (this.Uyi = !1),
      (this.Ayi = !1),
      (this.Pyi = ""),
      (this.vjs = !0),
      (this.xja = !1);
  }
  GetAttachmentStatus() {
    return this.pyi;
  }
  SetAttachmentStatus(t) {
    (this.pyi = t),
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
    return 1 === this.vyi;
  }
  SetWasScanned(t) {
    (this.vyi = 1 === t ? t : 0),
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
    (this.Myi = t[0]), 1 < t.length && this.xyi(t[1]);
  }
  xyi(t) {
    (this.yyi = "FFFFFFFF"),
      (this.Syi = 0),
      (this.Iyi = 0),
      (this.Dyi = ""),
      (this.Ryi = !1),
      (this.Tyi = ""),
      (this.Eyi = "");
    var e = t.split(",");
    for (let t = 0; t < e.length; t++)
      e[t].includes("iconId=")
        ? (this.Syi = Number(e[t].replace("iconId=", "")))
        : e[t].includes("color=#")
          ? (this.yyi = e[t].replace("color=#", ""))
          : e[t].includes("jumpId=")
            ? (this.Iyi = Number(e[t].replace("jumpId=", "")))
            : e[t].includes("url=")
              ? (this.Dyi = e[t].replace("url=", ""))
              : e[t].includes("showNewMail")
                ? (this.Uyi = !0)
                : e[t].includes("useDefaultBrowser")
                  ? (this.Ayi = !0)
                  : e[t].includes("isWenjuanxing=")
                    ? (this.Ryi =
                        1 === Number(e[t].replace("isWenjuanxing=", "")))
                    : e[t].includes("wenjuanId=")
                      ? (this.Tyi = e[t].replace("wenjuanId=", ""))
                      : e[t].includes("wenjuanTitle=")
                        ? (this.Lyi = e[t].replace("wenjuanTitle=", ""))
                        : e[t].includes("subTitle=")
                          ? (this.Lyi = e[t].replace("subTitle=", ""))
                          : e[t].includes("wenjuanPass=")
                            ? (this.Pyi = e[t].replace("wenjuanPass=", ""))
                            : e[t].includes("is_orientation=")
                              ? (this.vjs =
                                  "landscape" ===
                                  e[t].replace("is_orientation=", ""))
                              : e[t].includes("needPlayerInfo")
                                ? (this.xja = !0)
                                : (this.Eyi = this.Eyi.concat(e[t]));
  }
  GetIfLandscape() {
    return this.vjs;
  }
  GetUseDefaultBrowser() {
    return this.Ayi;
  }
  GetIfShowNewMail() {
    return this.Uyi;
  }
  GetText() {
    return this.Myi;
  }
  GetSubText() {
    return this.Eyi;
  }
  GetQuestionPass() {
    return this.Pyi;
  }
  GetSubTextIconId() {
    return this.Syi;
  }
  GetSubTextColor() {
    return this.yyi;
  }
  IsQuestionMail() {
    return this.Ryi;
  }
  GetQuestionUrl() {
    var t = ModelManager_1.ModelManager.LoginModel,
      e =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "mail_question_key",
        ),
      e =
        this.Tyi +
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
      `${this.Dyi}?sojumpparm=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()};${t.GetServerId()?.toString()}&parmsign=${e}&langv=` +
      i
    );
  }
  GetSubUrl() {
    let t = this.Dyi;
    var e, i, s, r, a, n, h;
    return (
      this.xja &&
        ((h =
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "mail_question_key",
          )),
        (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
        (i = ModelManager_1.ModelManager.FunctionModel.GetPlayerName()),
        (s = ModelManager_1.ModelManager.LoginModel.GetServerId()),
        (n =
          (r = ModelManager_1.ModelManager.LoginModel?.GetSdkLoginConfig())
            ?.Token ?? ""),
        (r = r?.Uid ?? ""),
        (a = TimeUtil_1.TimeUtil.GetServerTime()),
        (h =
          e + `;${s};${(n = UE.KuroStaticLibrary.Base64Encode(n))};${a};` + h),
        (h = UE.KuroStaticLibrary.HashStringWithSHA1(h)),
        (t =
          t +
          `?playerId=${e}&playerName=${i}&serverId=${s}&token=${n}&timestamp=${a}&sign=${h}&playerUid=` +
          r)),
      t
    );
  }
  GetSubTitle() {
    return this.Lyi;
  }
  GetSubContentJumpId() {
    return this.Iyi;
  }
  GetSender() {
    return this.Sender;
  }
  GetAttachmentInfo() {
    return this.AttachmentInfos;
  }
  GetOriginalDeadlineTimeStamp() {
    return this.GetReceiveTime() + this.ValidTime;
  }
  GetFinishedDeadlineTimeStamp() {
    return 0 < this.ReadTime
      ? this.ReadTime + this.FinishValidTime
      : this.GetOriginalDeadlineTimeStamp();
  }
}
exports.MailData = MailData;
//# sourceMappingURL=MailInstance.js.map
