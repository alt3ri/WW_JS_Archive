"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformReportClickCustomerService =
    exports.PlatformReportClickAnnouncement =
    exports.PlatformReportClickAccountCenter =
    exports.PlatformReportUploadPsnBillFail =
    exports.PlatformReportUploadPsnBillSuccess =
    exports.PlatformReportUploadPsnBill =
    exports.PlatformReportClosePsnCheckOut =
    exports.PlatformReportOpenPsnCheckOut =
    exports.PlatformReportGetEntitlementLabelListFail =
    exports.PlatformReportGetEntitlementLabelListSuccess =
    exports.PlatformReportGetEntitlementLabelList =
    exports.PlatformReportGetGoodsListFail =
    exports.PlatformReportGetGoodsListSuccess =
    exports.PlatformReportGetGoodsList =
    exports.PlatformReportSdkOffLine =
    exports.PlatformReportUpgradeRole =
    exports.PlatformReportLoginRole =
    exports.PlatformReportCreateRole =
    exports.PlatformReportSdkOfflineSucc =
    exports.PlatformReportLoginFail =
    exports.PlatformReportLoginSuccess =
    exports.PlatformReportClickLogin =
    exports.PlatformReportClickProtocol =
    exports.PlatformReportClickSendCode =
    exports.PlatformReportLoginWindow =
    exports.PlatformReportClickOldAccount =
    exports.PlatformReportCreateNewAccount =
    exports.PlatformReportSelectLogin =
    exports.PlatformReportLogin =
    exports.PlatformReportPsnAccessId =
    exports.PlatformReportGetPsnAuth =
    exports.PlatformReportGetGameLanguage =
    exports.PlatformReportSdkInitFail =
    exports.PlatformReportSdkInitSuccess =
    exports.PlatformReportSdkKeepAlive =
    exports.PlatformReportFirstGetDid =
    exports.PlatformReportGetDidSuccess =
    exports.PlatformReportGetDid =
    exports.PlatformReportAgreementClick =
    exports.PlatformReportAgreementShow =
    exports.PlatformReportTerminateGame =
    exports.PlatformReportLaunchGame =
    exports.PlatformSdkReportBaseData =
      void 0);
const PROJECT_ID = "Aki",
  GLOBALSDKTYPEVALUE = 2,
  UE = require("ue");
class PlatformSdkReportBaseData {
  constructor() {
    (this.event_time_ms = 0),
      (this.event_id = 0),
      (this.event_name = ""),
      (this.event_uuid = ""),
      (this.did = ""),
      (this.language = ""),
      (this.timezone = ""),
      (this.user_id = ""),
      (this.game_id = ""),
      (this.game_name = PROJECT_ID),
      (this.pkg_id = ""),
      (this.pkg_name = ""),
      (this.channel_id = ""),
      (this.channel_name = ""),
      (this.channel_op = ""),
      (this.role_id = ""),
      (this.role_name = ""),
      (this.server_id = ""),
      (this.server_name = ""),
      (this.sdk_version = ""),
      (this.game_version = ""),
      (this.login_id = ""),
      (this.os = "PS5"),
      (this.last_phone_open_ts = ""),
      (this.sdk_type = GLOBALSDKTYPEVALUE),
      (this.psn_access_id = ""),
      (this.puid = 0),
      (this.event_uuid = UE.KismetGuidLibrary.NewGuid().ToString()),
      (this.language = PlatformSdkReportBaseData.csl);
    var t = (new Date().getTimezoneOffset() / 60) * -1;
    (this.timezone = 0 <= t ? "+" + t : "" + t),
      (this.pkg_id = PlatformSdkReportBaseData.msl),
      (this.pkg_name = PlatformSdkReportBaseData.dsl),
      (this.channel_id = PlatformSdkReportBaseData.Csl),
      (this.channel_name = PlatformSdkReportBaseData.gsl),
      (this.channel_op = PlatformSdkReportBaseData.psl),
      (this.role_id = PlatformSdkReportBaseData.fsl),
      (this.role_name = PlatformSdkReportBaseData.vsl),
      (this.server_id = PlatformSdkReportBaseData.Msl),
      (this.server_name = PlatformSdkReportBaseData.Ssl),
      (this.login_id = PlatformSdkReportBaseData.ysl),
      (this.game_version = PlatformSdkReportBaseData.Esl),
      (this.sdk_version = PlatformSdkReportBaseData.Isl),
      (this.did = PlatformSdkReportBaseData.Tsl),
      (this.event_time_ms = Date.now()),
      (this.last_phone_open_ts = PlatformSdkReportBaseData.ldl),
      (this.user_id = PlatformSdkReportBaseData.Lsl),
      (this.game_id = PlatformSdkReportBaseData.hdl),
      (this.psn_access_id = PlatformSdkReportBaseData.Hgl),
      (this.puid = PlatformSdkReportBaseData.g0l);
  }
  GetReportEventName() {
    return this.event_name;
  }
  GetCpReportEventName() {
    return "cp_" + this.event_name;
  }
  GetReportData() {
    return JSON.stringify(this);
  }
  static InitSdkBaseValue(t, e, s, o, r, a, i, l, p, c, n, h, m) {
    (this.msl = t),
      (this.dsl = e),
      (this.Csl = s),
      (this.gsl = o),
      (this.psl = r),
      (this.ysl = i),
      (this.Esl = l),
      (this.Isl = p),
      (this.Tsl = c),
      (this.ldl = n),
      (this.hdl = h),
      (this.Hgl = m),
      this.ChangeLanguage(a);
  }
  static SetCuid(t) {
    this.Lsl = t;
  }
  static SetPuid(t) {
    this.g0l = t;
  }
  static GetPuid() {
    return this.g0l;
  }
  static ChangeLanguage(t) {
    this.csl = t;
  }
  static InitSdkRoleValue(t, e, s, o) {
    (this.fsl = t), (this.vsl = e), (this.Msl = s), (this.Ssl = o);
  }
}
((exports.PlatformSdkReportBaseData = PlatformSdkReportBaseData).msl = ""),
  (PlatformSdkReportBaseData.dsl = ""),
  (PlatformSdkReportBaseData.Csl = ""),
  (PlatformSdkReportBaseData.gsl = ""),
  (PlatformSdkReportBaseData.psl = ""),
  (PlatformSdkReportBaseData.csl = ""),
  (PlatformSdkReportBaseData.vsl = ""),
  (PlatformSdkReportBaseData.Ssl = ""),
  (PlatformSdkReportBaseData.Msl = ""),
  (PlatformSdkReportBaseData.fsl = ""),
  (PlatformSdkReportBaseData.ysl = ""),
  (PlatformSdkReportBaseData.Esl = ""),
  (PlatformSdkReportBaseData.Isl = ""),
  (PlatformSdkReportBaseData.Tsl = ""),
  (PlatformSdkReportBaseData.Lsl = ""),
  (PlatformSdkReportBaseData.ldl = ""),
  (PlatformSdkReportBaseData.hdl = ""),
  (PlatformSdkReportBaseData.Hgl = ""),
  (PlatformSdkReportBaseData.g0l = 0);
class PlatformReportLaunchGame extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60100),
      (this.event_name = "game_launch");
  }
}
exports.PlatformReportLaunchGame = PlatformReportLaunchGame;
class PlatformReportTerminateGame extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60101),
      (this.event_name = "game_terminate");
  }
}
exports.PlatformReportTerminateGame = PlatformReportTerminateGame;
class PlatformReportAgreementShow extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60102),
      (this.event_name = "agreement_show");
  }
}
exports.PlatformReportAgreementShow = PlatformReportAgreementShow;
class PlatformReportAgreementClick extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60103),
      (this.event_name = "agreement_agree");
  }
}
exports.PlatformReportAgreementClick = PlatformReportAgreementClick;
class PlatformReportGetDid extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments), (this.event_id = 60104), (this.event_name = "get_did");
  }
}
exports.PlatformReportGetDid = PlatformReportGetDid;
class PlatformReportGetDidSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60105),
      (this.event_name = "get_didsucc");
  }
}
exports.PlatformReportGetDidSuccess = PlatformReportGetDidSuccess;
class PlatformReportFirstGetDid extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60106),
      (this.event_name = "first_did"),
      (this.first_check_id = "");
  }
}
exports.PlatformReportFirstGetDid = PlatformReportFirstGetDid;
class PlatformReportSdkKeepAlive extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60108),
      (this.event_name = "sdk_keepalive");
  }
}
exports.PlatformReportSdkKeepAlive = PlatformReportSdkKeepAlive;
class PlatformReportSdkInitSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60109),
      (this.event_name = "krsdk_init_succ");
  }
}
exports.PlatformReportSdkInitSuccess = PlatformReportSdkInitSuccess;
class PlatformReportSdkInitFail extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60110),
      (this.event_name = "krsdk_init_fail"),
      (this.code = "");
  }
}
exports.PlatformReportSdkInitFail = PlatformReportSdkInitFail;
class PlatformReportGetGameLanguage extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60112),
      (this.event_name = "get_gamelanguage");
  }
}
exports.PlatformReportGetGameLanguage = PlatformReportGetGameLanguage;
class PlatformReportGetPsnAuth extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60113),
      (this.event_name = "get_psnauth");
  }
}
exports.PlatformReportGetPsnAuth = PlatformReportGetPsnAuth;
class PlatformReportPsnAccessId extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60114),
      (this.event_name = "get_psnaccessid");
  }
}
exports.PlatformReportPsnAccessId = PlatformReportPsnAccessId;
class PlatformReportLogin extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60115),
      (this.event_name = "krsdk_login");
  }
}
exports.PlatformReportLogin = PlatformReportLogin;
class PlatformReportSelectLogin extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60119),
      (this.event_name = "select_login");
  }
}
exports.PlatformReportSelectLogin = PlatformReportSelectLogin;
class PlatformReportCreateNewAccount extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60120),
      (this.event_name = "click_newaccount");
  }
}
exports.PlatformReportCreateNewAccount = PlatformReportCreateNewAccount;
class PlatformReportClickOldAccount extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60124),
      (this.event_name = "click_oldaccount");
  }
}
exports.PlatformReportClickOldAccount = PlatformReportClickOldAccount;
class PlatformReportLoginWindow extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60125),
      (this.event_name = "login_window"),
      (this.login_way = "23");
  }
}
exports.PlatformReportLoginWindow = PlatformReportLoginWindow;
class PlatformReportClickSendCode extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60126),
      (this.event_name = "click_sendcode");
  }
}
exports.PlatformReportClickSendCode = PlatformReportClickSendCode;
class PlatformReportClickProtocol extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60127),
      (this.event_name = "click_protocol");
  }
}
exports.PlatformReportClickProtocol = PlatformReportClickProtocol;
class PlatformReportClickLogin extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60131),
      (this.event_name = "click_login");
  }
}
exports.PlatformReportClickLogin = PlatformReportClickLogin;
class PlatformReportLoginSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60132),
      (this.event_name = "login_succ"),
      (this.account_type = 0),
      (this.isregister = 0);
  }
  static Create(t, e) {
    var s = new PlatformReportLoginSuccess();
    return (s.account_type = t ? 23 : 22), (s.isregister = e ? 1 : 0), s;
  }
}
exports.PlatformReportLoginSuccess = PlatformReportLoginSuccess;
class PlatformReportLoginFail extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60133),
      (this.event_name = "login_fail"),
      (this.code = ""),
      (this.msg = ""),
      (this.account_type = 0);
  }
  static Create(t, e, s) {
    var o = new PlatformReportLoginFail();
    return (o.account_type = t ? 23 : 22), (o.code = e), (o.msg = s), o;
  }
}
exports.PlatformReportLoginFail = PlatformReportLoginFail;
class PlatformReportSdkOfflineSucc extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60138),
      (this.event_name = "game_offline_succ");
  }
}
exports.PlatformReportSdkOfflineSucc = PlatformReportSdkOfflineSucc;
class PlatformReportCreateRole extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60139),
      (this.event_name = "create_role");
  }
}
exports.PlatformReportCreateRole = PlatformReportCreateRole;
class PlatformReportLoginRole extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60140),
      (this.event_name = "login_role"),
      (this.level = "");
  }
}
exports.PlatformReportLoginRole = PlatformReportLoginRole;
class PlatformReportUpgradeRole extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60141),
      (this.event_name = "upgrade_role");
  }
}
exports.PlatformReportUpgradeRole = PlatformReportUpgradeRole;
class PlatformReportSdkOffLine extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60142),
      (this.event_name = "sdkaccount_offline"),
      (this.offline_type = "");
  }
}
exports.PlatformReportSdkOffLine = PlatformReportSdkOffLine;
class PlatformReportGetGoodsList extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60150),
      (this.event_name = "get_goodsidlist"),
      (this.goodsid = ""),
      (this.goodsid_count = 0);
  }
}
exports.PlatformReportGetGoodsList = PlatformReportGetGoodsList;
class PlatformReportGetGoodsListSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60151),
      (this.event_name = "get_goodsidlist_succ"),
      (this.channel_goodsid = ""),
      (this.channel_goodsid_count = 0);
  }
}
exports.PlatformReportGetGoodsListSuccess = PlatformReportGetGoodsListSuccess;
class PlatformReportGetGoodsListFail extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60152),
      (this.event_name = "get_goodsidlist_fail"),
      (this.code = ""),
      (this.msg = "");
  }
}
exports.PlatformReportGetGoodsListFail = PlatformReportGetGoodsListFail;
class PlatformReportGetEntitlementLabelList extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60153),
      (this.event_name = "get_entitlementlabellist");
  }
}
exports.PlatformReportGetEntitlementLabelList =
  PlatformReportGetEntitlementLabelList;
class PlatformReportGetEntitlementLabelListSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60154),
      (this.event_name = "get_entitlementlabellist_succ"),
      (this.channel_goodsid = ""),
      (this.channel_goodsid_count = 0);
  }
}
exports.PlatformReportGetEntitlementLabelListSuccess =
  PlatformReportGetEntitlementLabelListSuccess;
class PlatformReportGetEntitlementLabelListFail extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60155),
      (this.event_name = "get_entitlementlabellist_fail"),
      (this.code = ""),
      (this.msg = "");
  }
}
exports.PlatformReportGetEntitlementLabelListFail =
  PlatformReportGetEntitlementLabelListFail;
class PlatformReportOpenPsnCheckOut extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60156),
      (this.event_name = "open_psncheckout"),
      (this.product_id = ""),
      (this.goodsId = ""),
      (this.psnenvlssuer = "");
  }
}
exports.PlatformReportOpenPsnCheckOut = PlatformReportOpenPsnCheckOut;
class PlatformReportClosePsnCheckOut extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60157),
      (this.event_name = "close_psncheckout"),
      (this.product_id = ""),
      (this.goodsId = ""),
      (this.psnenvlssuer = "");
  }
}
exports.PlatformReportClosePsnCheckOut = PlatformReportClosePsnCheckOut;
class PlatformReportUploadPsnBill extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60160),
      (this.event_name = "upload_psnbill"),
      (this.psn_scene = "");
  }
}
exports.PlatformReportUploadPsnBill = PlatformReportUploadPsnBill;
class PlatformReportUploadPsnBillSuccess extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60161),
      (this.event_name = "upload_psnbill_succ"),
      (this.psn_scene = ""),
      (this.psnenvlssuer = "");
  }
}
exports.PlatformReportUploadPsnBillSuccess = PlatformReportUploadPsnBillSuccess;
class PlatformReportUploadPsnBillFail extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60162),
      (this.event_name = "upload_psnbill_fail"),
      (this.psn_scene = ""),
      (this.psnenvlssuer = ""),
      (this.code = ""),
      (this.msg = "");
  }
}
exports.PlatformReportUploadPsnBillFail = PlatformReportUploadPsnBillFail;
class PlatformReportClickAccountCenter extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60163),
      (this.event_name = "click_accountcenter");
  }
}
exports.PlatformReportClickAccountCenter = PlatformReportClickAccountCenter;
class PlatformReportClickAnnouncement extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60164),
      (this.event_name = "click_announcement");
  }
}
exports.PlatformReportClickAnnouncement = PlatformReportClickAnnouncement;
class PlatformReportClickCustomerService extends PlatformSdkReportBaseData {
  constructor() {
    super(...arguments),
      (this.event_id = 60165),
      (this.event_name = "click_customerservice");
  }
}
exports.PlatformReportClickCustomerService = PlatformReportClickCustomerService;
//# sourceMappingURL=PlatformSdkReportData.js.map
