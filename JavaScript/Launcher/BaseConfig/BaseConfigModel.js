"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.parseClientEntryJson =
    exports.EntryJson =
    exports.BaseConfigModel =
      void 0);
class BaseConfigModel {}
((exports.BaseConfigModel = BaseConfigModel).BaseConfig = new Map()),
  (BaseConfigModel.PublicConfigLoaded = !1),
  (BaseConfigModel.ParamsConfig = new Map()),
  (BaseConfigModel.ParamsConfigInited = !1),
  (BaseConfigModel.EntryJson = void 0),
  (BaseConfigModel.IsGray = void 0),
  (BaseConfigModel.GrayBoxConfigMap = new Map()),
  (BaseConfigModel.BoxResultMap = new Map());
class EntryJson {
  constructor(i, s) {
    (this.CdnUrl = void 0),
      (this.SpeedRatio = -0),
      (this.PriceRatio = -0),
      (this.NoticUrl = ""),
      (this.NoticeUrl = ""),
      (this.LoginServers = void 0),
      (this.PrivateServers = void 0),
      (this.GmOpen = !1),
      (this.AsyncCheck = !1),
      (this.GARUrl = ""),
      (this.TDCfg = void 0),
      (this.LogReport = void 0),
      (this.LoginServerAdditionData = void 0),
      (this.PackageUpdateUrl = void 0),
      (this.PackageUpdateDescUrl = void 0),
      (this.IosAuditFirstDownloadTip = !1),
      (this.MixUri = ""),
      (this.ResUri = ""),
      (this.GachaUrl = void 0),
      (this.GrayBox = void 0),
      (this.CdnUrl = (s && s.CdnUrl ? s : i).CdnUrl),
      (this.SpeedRatio =
        s && void 0 !== s.SpeedRatio ? s.SpeedRatio : (i.SpeedRatio ?? 0)),
      (this.PriceRatio =
        s && void 0 !== s.PriceRatio ? s.PriceRatio : (i.PriceRatio ?? 0)),
      (this.NoticUrl =
        s && void 0 !== s.NoticUrl ? s.NoticUrl : (i.NoticUrl ?? "")),
      (this.NoticeUrl =
        s && void 0 !== s.NoticeUrl
          ? s.NoticeUrl
          : (i.NoticeUrl ?? this.NoticUrl)),
      (this.LoginServers = (s && s.LoginServers ? s : i).LoginServers),
      (this.PrivateServers = (s && s.PrivateServers ? s : i).PrivateServers),
      (this.GmOpen = s && void 0 !== s.GmOpen ? s.GmOpen : (i.GmOpen ?? !1)),
      (this.AsyncCheck =
        s && void 0 !== s.AsyncCheck ? s.AsyncCheck : (i.AsyncCheck ?? !1)),
      (this.GARUrl = s && void 0 !== s.GARUrl ? s.GARUrl : (i.GARUrl ?? "")),
      (this.TDCfg = (s && s.TDCfg ? s : i).TDCfg),
      (this.LogReport = (s && s.LogReport ? s : i).LogReport),
      (this.LoginServerAdditionData = (
        s && s.LoginServerAdditionData ? s : i
      ).LoginServerAdditionData),
      (this.IosAuditFirstDownloadTip =
        s && void 0 !== s.IosAuditFirstDownloadTip
          ? s.IosAuditFirstDownloadTip
          : (i.IosAuditFirstDownloadTip ?? !1)),
      (this.MixUri = s && void 0 !== s.MixUri ? s.MixUri : (i.MixUri ?? "")),
      (this.ResUri = s && void 0 !== s.ResUri ? s.ResUri : (i.ResUri ?? "")),
      (this.GachaUrl = (s && s.GachaUrl ? s : i).GachaUrl),
      (this.PackageUpdateUrl = (
        s && s.PackageUpdateUrl ? s : i
      ).PackageUpdateUrl),
      (this.PackageUpdateDescUrl = (
        s && s.PackageUpdateDescUrl ? s : i
      ).PackageUpdateDescUrl),
      (this.GrayBox = (s && s.GrayBox ? s : i).GrayBox);
  }
}
function parseGrayBox(i) {}
function parseClientEntryJson(t, i) {
  let o = void 0,
    e = void 0;
  Object.entries(i).forEach((i) => {
    var s = i[0],
      i = i[1];
    "default" === s ? (o = i) : s === t && (e = i);
  });
  i = new EntryJson(o, e);
  parseGrayBox((BaseConfigModel.EntryJson = i).GrayBox);
}
(exports.EntryJson = EntryJson),
  (exports.parseClientEntryJson = parseClientEntryJson);
//# sourceMappingURL=BaseConfigModel.js.map
