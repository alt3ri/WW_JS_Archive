"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChannelModel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommunityAll_1 = require("../../../Core/Define/ConfigQuery/CommunityAll"),
  CommunityById_1 = require("../../../Core/Define/ConfigQuery/CommunityById"),
  CustomerServiceAll_1 = require("../../../Core/Define/ConfigQuery/CustomerServiceAll"),
  SetAccountAll_1 = require("../../../Core/Define/ConfigQuery/SetAccountAll"),
  SetAccountById_1 = require("../../../Core/Define/ConfigQuery/SetAccountById"),
  SharePlatformAll_1 = require("../../../Core/Define/ConfigQuery/SharePlatformAll"),
  SharePlatformById_1 = require("../../../Core/Define/ConfigQuery/SharePlatformById"),
  ShareRewardById_1 = require("../../../Core/Define/ConfigQuery/ShareRewardById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  LAGUANGE_ALL = "all",
  CHANNEL_ALL = 0,
  PACKAGE_ID_ALL = "all";
class ChannelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.gEt = void 0),
      (this.fEt = void 0),
      (this.pEt = void 0),
      (this.vEt = void 0),
      (this.fIn = !1),
      (this.SharingActionId = 1),
      (this.MEt = () => {
        if (
          ((this.gEt = []),
          (this.fEt = []),
          (this.pEt = []),
          (this.fIn = !1),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk())
        ) {
          var e =
              ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
            r = LanguageSystem_1.LanguageSystem.PackageLanguage,
            t = Number(
              ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId(),
            ),
            o = ModelManager_1.ModelManager.KuroSdkModel.GetSdkPackageId(),
            i =
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "KuroSdk",
                  54,
                  "当前包体信息",
                  ["是否海外", e],
                  ["当前语言码", r],
                  ["当前渠道", t],
                ),
              FeatureRestrictionTemplate_1.FeatureRestrictionTemplate
                .TemplateForPioneerClient);
          if (Info_1.Info.IsMobilePlatform())
            for (const n of SharePlatformAll_1.configSharePlatformAll.GetConfigList(
              e ? 0 : 1,
            ))
              this.EEt(r, n.Language) &&
                this.SEt(t, n.Channel) &&
                this.G4a(o, n.PackageId) &&
                !i.Check() &&
                this.gEt.push(n.Id);
          (this.gEt = this.gEt.sort((e, r) => {
            var t = SharePlatformById_1.configSharePlatformById.GetConfig(e),
              o = SharePlatformById_1.configSharePlatformById.GetConfig(r);
            return t && o && t.Sort !== o.Sort ? t.Sort - o.Sort : e - r;
          })),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("KuroSdk", 28, "开启分享渠道id ", [
                "OpenShareChannel",
                this.gEt,
              ]);
          for (const s of CommunityAll_1.configCommunityAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.EEt(r, s.Language) &&
              this.SEt(t, s.Channel) &&
              this.G4a(o, s.PackageId) &&
              !i.Check() &&
              this.fEt.push(s.Id);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("KuroSdk", 28, "开启库街区id ", [
              "OpenKuroStreetId",
              this.fEt,
            ]);
          for (const h of SetAccountAll_1.configSetAccountAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.EEt(r, h.Language) &&
              this.SEt(t, h.Channel) &&
              this.G4a(o, h.PackageId) &&
              this.pEt.push(h.Id);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("KuroSdk", 28, "开启账号中心id ", [
              "OpenAccountSetting",
              this.pEt,
            ]);
          for (const u of CustomerServiceAll_1.configCustomerServiceAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.EEt(r, u.Language) &&
              this.SEt(t, u.Channel) &&
              this.G4a(o, u.PackageId) &&
              (this.fIn = !0);
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("KuroSdk", 11, "客服开启", ["state", this.fIn]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChannelReset,
            );
        } else
          Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 54, "不可使用SDK");
      });
  }
  OnInit() {
    return (
      (this.gEt = []),
      (this.fEt = []),
      (this.pEt = []),
      (this.vEt = []),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkInitDone,
        this.MEt,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkInitDone,
        this.MEt,
      ),
      !0
    );
  }
  EEt(e, r) {
    return r.includes(LAGUANGE_ALL) || r.includes(e);
  }
  SEt(e, r) {
    return r.includes(CHANNEL_ALL) || r.includes(e);
  }
  G4a(e, r) {
    return !!e && (r.includes(PACKAGE_ID_ALL) || r.includes(e));
  }
  CheckShareChannelOpen(e) {
    return this.yEt(), this.gEt.includes(e);
  }
  CheckKuroStreetOpen() {
    return this.yEt(), 0 < this.fEt.length;
  }
  CheckAccountSettingOpen(e) {
    return this.yEt(), this.pEt.includes(e);
  }
  CheckCustomerServiceOpen() {
    return (
      this.yEt(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 11, "客服是否开启", [
          "IsCustomerServiceOpen",
          this.fIn,
        ]),
      this.fIn
    );
  }
  OpenKuroStreet() {
    2 === Info_1.Info.PlatformType
      ? UE.KuroStaticAndroidLibrary.OpenAppWithUrl(
          "kjq://kuro/home?gameId=3",
          "https://www.kurobbs.com/download.html",
        )
      : 1 === Info_1.Info.PlatformType
        ? UE.KuroStaticiOSLibrary.OpenAppWithUrl(
            "kjq://kuro/home?gameId=3",
            "itms-apps://itunes.apple.com/app/id/1659339393",
          )
        : this.fEt.length &&
          this.IEt(
            CommunityById_1.configCommunityById.GetConfig(this.fEt[0])?.Adress,
          );
  }
  yEt() {
    0 === this.pEt.length && this.MEt();
  }
  ProcessAccountSetting(e) {
    1 === e || 9 === e
      ? ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          13,
        )
      : 8 === e
        ? (ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
            15,
          ),
          ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
            12,
          ))
        : ((2 !== e && 3 !== e && 4 !== e && 6 !== e && 7 !== e) ||
            KuroSdkReport_1.KuroSdkReport.Report(
              new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
            ),
          this.IEt(SetAccountById_1.configSetAccountById.GetConfig(e)?.Adress));
  }
  GetOpenedShareIds() {
    return this.yEt(), this.gEt;
  }
  CouldGetShareReward(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    return 0 < this.gEt.length && !this.vEt.includes(e);
  }
  MarkActionShared(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    this.vEt.push(e);
  }
  IEt(e) {
    e &&
      ((e = e.replace("{0}", LanguageSystem_1.LanguageSystem.PackageLanguage)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 54, "根据渠道打开链接 ", ["formatUrl", e]),
      UE.KismetSystemLibrary.LaunchURL(e));
  }
  GmOpenShareId(e) {
    0 === this.pEt.length && this.pEt.push(5), this.gEt?.push(e);
  }
}
exports.ChannelModel = ChannelModel;
//# sourceMappingURL=ChannelModel.js.map
