"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChannelModel = void 0);
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const CommunityAll_1 = require("../../../Core/Define/ConfigQuery/CommunityAll");
const CommunityById_1 = require("../../../Core/Define/ConfigQuery/CommunityById");
const CustomerServiceAll_1 = require("../../../Core/Define/ConfigQuery/CustomerServiceAll");
const SetAccountAll_1 = require("../../../Core/Define/ConfigQuery/SetAccountAll");
const SetAccountById_1 = require("../../../Core/Define/ConfigQuery/SetAccountById");
const SharePlatformAll_1 = require("../../../Core/Define/ConfigQuery/SharePlatformAll");
const ShareRewardById_1 = require("../../../Core/Define/ConfigQuery/ShareRewardById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
const LAGUANGE_ALL = "all";
const CHANNEL_ALL = 0;
class ChannelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.rMt = void 0),
      (this.nMt = void 0),
      (this.sMt = void 0),
      (this.aMt = void 0),
      (this.eyn = !1),
      (this.SharingActionId = 1),
      (this.hMt = () => {
        if (
          ((this.rMt = []),
          (this.nMt = []),
          (this.sMt = []),
          (this.eyn = !1),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk())
        ) {
          const e =
            ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk();
          const r = LanguageSystem_1.LanguageSystem.PackageLanguage;
          const t = Number(
            ControllerHolder_1.ControllerHolder.KuroSdkController.GetChannelId(),
          );
          const o =
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
          if (
            ModelManager_1.ModelManager.PlatformModel.PlatformType === 2 ||
            ModelManager_1.ModelManager.PlatformModel.PlatformType === 1
          )
            for (const i of SharePlatformAll_1.configSharePlatformAll.GetConfigList(
              e ? 0 : 1,
            ))
              this.lMt(r, i.Language) &&
                this._Mt(t, i.Channel) &&
                !o.Check() &&
                (this.rMt.push(i.Id), Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info("KuroSdk", 54, "开启分享渠道id ", [
                  "config.Id",
                  i.Id,
                ]);
          for (const n of CommunityAll_1.configCommunityAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.lMt(r, n.Language) &&
              this._Mt(t, n.Channel) &&
              !o.Check() &&
              (this.nMt.push(n.Id), Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info("KuroSdk", 54, "开启库街区id ", [
                "config.Id",
                n.Id,
              ]);
          for (const s of SetAccountAll_1.configSetAccountAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.lMt(r, s.Language) &&
              this._Mt(t, s.Channel) &&
              (this.sMt.push(s.Id), Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info("KuroSdk", 54, "开启账号中心id ", [
                "config.Id",
                s.Id,
              ]);
          for (const u of CustomerServiceAll_1.configCustomerServiceAll.GetConfigList(
            e ? 0 : 1,
          ))
            this.lMt(r, u.Language) &&
              this._Mt(t, u.Channel) &&
              ((this.eyn = !0), Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info("KuroSdk", 11, "客服开启", ["config", u]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChannelReset);
        } else
          Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 54, "不可使用SDK");
      });
  }
  OnInit() {
    return (
      (this.rMt = []),
      (this.nMt = []),
      (this.sMt = []),
      (this.aMt = []),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkInitDone,
        this.hMt,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkInitDone,
        this.hMt,
      ),
      !0
    );
  }
  lMt(e, r) {
    return r.includes(LAGUANGE_ALL) || r.includes(e);
  }
  _Mt(e, r) {
    return r.includes(CHANNEL_ALL) || r.includes(e);
  }
  CheckShareChannelOpen(e) {
    return this.uMt(), this.rMt.includes(e);
  }
  CheckKuroStreetOpen() {
    return this.uMt(), this.nMt.length > 0;
  }
  CheckAccountSettingOpen(e) {
    return this.uMt(), this.sMt.includes(e);
  }
  CheckCustomerServiceOpen() {
    return (
      this.uMt(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 11, "客服是否开启", [
          "IsCustomerServiceOpen",
          this.eyn,
        ]),
      this.eyn
    );
  }
  OpenKuroStreet() {
    ModelManager_1.ModelManager.PlatformModel.SourcePlatformType === 2
      ? UE.KuroStaticAndroidLibrary.OpenAppWithUrl(
          "kjq://kuro/home?gameId=3",
          "https://www.kurobbs.com/download.html",
        )
      : ModelManager_1.ModelManager.PlatformModel.SourcePlatformType === 1
        ? UE.KuroStaticiOSLibrary.OpenAppWithUrl(
            "kjq://kuro/home?gameId=3",
            "itms-apps://itunes.apple.com/app/id/1659339393",
          )
        : this.nMt.length &&
          this.cMt(
            CommunityById_1.configCommunityById.GetConfig(this.nMt[0])?.Adress,
          );
  }
  uMt() {
    this.sMt.length === 0 && this.hMt();
  }
  ProcessAccountSetting(e) {
    e === 1 || e === 9
      ? ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          13,
        )
      : e === 8
        ? (ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
            15,
          ),
          ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
            12,
          ))
        : ((e !== 2 && e !== 3 && e !== 4 && e !== 6 && e !== 7) ||
            KuroSdkReport_1.KuroSdkReport.Report(
              new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
            ),
          this.cMt(SetAccountById_1.configSetAccountById.GetConfig(e)?.Adress));
  }
  GetOpenedShareIds() {
    return this.uMt(), this.rMt;
  }
  CouldGetShareReward(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    return this.rMt.length > 0 && !this.aMt.includes(e);
  }
  MarkActionShared(e) {
    e = ShareRewardById_1.configShareRewardById.GetConfig(e).ShareType;
    this.aMt.push(e);
  }
  cMt(e) {
    e &&
      ((e = e.replace("{0}", LanguageSystem_1.LanguageSystem.PackageLanguage)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 54, "根据渠道打开链接 ", ["formatUrl", e]),
      UE.KismetSystemLibrary.LaunchURL(e));
  }
  GmOpenShareId(e) {
    this.sMt.length === 0 && this.sMt.push(5), this.rMt?.push(e);
  }
}
exports.ChannelModel = ChannelModel;
// # sourceMappingURL=ChannelModel.js.map
