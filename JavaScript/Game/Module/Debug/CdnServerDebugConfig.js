"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdnServerDebugConfig = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TestModuleBridge_1 = require("../../Bridge/TestModuleBridge");
const PublicUtil_1 = require("../../Common/PublicUtil");
class CdnServerDebugConfig {
  constructor() {
    (this.aFt = !1),
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
        (t) => {
          t && t.CdnServerAddress
            ? (this.hFt = t.CdnServerAddress)
            : (this.aFt = !1);
        },
      );
  }
  TryGetMarqueeDebugUrl(t) {
    return this.aFt
      ? PublicUtil_1.PublicUtil.GetMarqueeUrl2(
          PublicUtil_1.PublicUtil.GetGameId(),
          this.hFt.MarqueeServerId,
        )
      : t;
  }
  TryGetGachaDetailDebugUrl(t, e, i) {
    return this.aFt
      ? StringUtils_1.StringUtils.Format(
          t,
          this.hFt?.GachaDetailServerAddressPrefix,
          this.hFt?.GachaDetailServerId,
        )
      : StringUtils_1.StringUtils.Format(t, e, i);
  }
  TryGetGachaRecordDebugUrl(t, e, i) {
    return this.aFt
      ? StringUtils_1.StringUtils.Format(
          t,
          this.hFt?.GachaRecordServerAddressPrefix,
          this.hFt?.GachaRecordServerId,
        )
      : StringUtils_1.StringUtils.Format(t, e, i);
  }
  TryGetGachaInfoDebugUrl(t, e, i) {
    return this.aFt
      ? StringUtils_1.StringUtils.Format(
          t,
          this.hFt?.GachaInfoServerPrefixAddress,
          this.hFt?.GachaInfoServerId,
        )
      : StringUtils_1.StringUtils.Format(t, e, i);
  }
  TryGetNoticeServerPrefixAddress(t) {
    return this.aFt ? this.hFt?.NoticeServerPrefixAddress : t;
  }
}
(exports.CdnServerDebugConfig = CdnServerDebugConfig).Singleton =
  new CdnServerDebugConfig();
// # sourceMappingURL=CdnServerDebugConfig.js.map
