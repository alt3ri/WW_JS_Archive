"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoticeReadData =
    exports.NoticeContentData =
    exports.NoticeData =
    exports.PostWebViewEntryPointData =
    exports.KuroSdkControllerTool =
    exports.AndroidGlobalProductContentPriceData =
    exports.GlobalProductContentData =
    exports.GlobalProductData =
    exports.SdkAgreementLinkData =
    exports.AndroidSdkAgreementData =
    exports.GameWindowStateData =
    exports.ShareData =
    exports.SetFontParamWindows =
    exports.SetFontParamAndroid =
    exports.QueryProductInfoParamWindows =
    exports.CloudSDKPayResult =
    exports.QueryProductInfoParamAndroid =
    exports.RoleInfoWindows =
    exports.AndroidSdkPayRole =
    exports.RoleInfoSdk =
    exports.SdkPayObject =
    exports.PayInfoWindowsGlobal =
    exports.PayInfoWindows =
    exports.PayInfoMacIosGlobal =
    exports.PayInfoCloudIos =
    exports.PayInfoMacIos =
    exports.PayInfoAndroid =
    exports.OpenWebViewParamWindows =
    exports.OpenSdkUrlWndParamWindows =
    exports.OpenSdkUrlWndParam =
    exports.OpenPostWebViewParam =
    exports.OpenWebViewParamCloudGame =
    exports.OpenCustomerServiceParamWindows =
    exports.OpenCustomerServiceParamMac =
    exports.OpenCustomerServiceParamIos =
    exports.OpenCustomerServiceParamAndroid =
    exports.InitializePostWebViewParam =
      void 0);
const Info_1 = require("../../Core/Common/Info"),
  Json_1 = require("../../Core/Common/Json"),
  Log_1 = require("../../Core/Common/Log"),
  CloudGameManager_1 = require("../Manager/CloudGameManager"),
  ModelManager_1 = require("../Manager/ModelManager");
class InitializePostWebViewParam extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.language = ""),
      (this.cdn = []),
      (this.serverId = "");
  }
}
exports.InitializePostWebViewParam = InitializePostWebViewParam;
class OpenCustomerServiceParamAndroid extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.IsLogin = ""),
      (this.FromLogin = ""),
      (this.RoleId = ""),
      (this.ServerId = ""),
      (this.IsLandscape = "");
  }
}
exports.OpenCustomerServiceParamAndroid = OpenCustomerServiceParamAndroid;
class OpenCustomerServiceParamIos extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.islogin = 0),
      (this.from = 0),
      (this.RoleId = ""),
      (this.RoleName = ""),
      (this.ServerId = ""),
      (this.ServerName = ""),
      (this.RoleLevel = 0),
      (this.VipLevel = 0),
      (this.PartyName = ""),
      (this.RoleCreateTime = 0),
      (this.BalanceLevelOne = 0),
      (this.BalanceLevelTwo = 0),
      (this.SumPay = 0);
  }
}
exports.OpenCustomerServiceParamIos = OpenCustomerServiceParamIos;
class OpenCustomerServiceParamMac extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.islogin = 0), (this.from = 0);
  }
}
exports.OpenCustomerServiceParamMac = OpenCustomerServiceParamMac;
class OpenCustomerServiceParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.islogin = !1),
      (this.from = 0),
      (this.roleId = "");
  }
}
exports.OpenCustomerServiceParamWindows = OpenCustomerServiceParamWindows;
class OpenWebViewParamCloudGame extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.title = ""),
      (this.url = ""),
      (this.isLandscape = !1),
      (this.transparent = !1),
      (this.webAccelerated = !1);
  }
}
exports.OpenWebViewParamCloudGame = OpenWebViewParamCloudGame;
class OpenPostWebViewParam extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.playerId = ""),
      (this.playerLevel = ""),
      (this.language = ""),
      (this.extend = ""),
      (this.gameOrientation = ""),
      (this.type = "");
  }
}
exports.OpenPostWebViewParam = OpenPostWebViewParam;
class OpenSdkUrlWndParam extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.title = ""), (this.wndUrl = "");
  }
}
exports.OpenSdkUrlWndParam = OpenSdkUrlWndParam;
class OpenSdkUrlWndParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.title = ""), (this.url = "");
  }
}
exports.OpenSdkUrlWndParamWindows = OpenSdkUrlWndParamWindows;
class OpenWebViewParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.title = ""),
      (this.url = ""),
      (this.transparent = !1),
      (this.titlebar = !1),
      (this.innerbrowser = !1),
      (this.webAccelerated = !1);
  }
}
exports.OpenWebViewParamWindows = OpenWebViewParamWindows;
class PayInfoAndroid extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.cpOrderId = ""),
      (this.callbackUrl = ""),
      (this.product_id = ""),
      (this.goodsName = ""),
      (this.goodsDesc = ""),
      (this.currency = ""),
      (this.extraParams = "");
  }
}
exports.PayInfoAndroid = PayInfoAndroid;
class PayInfoMacIos extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.RoleId = ""),
      (this.RoleName = ""),
      (this.ServerId = ""),
      (this.ServerName = ""),
      (this.CpOrder = ""),
      (this.CallbackUrl = ""),
      (this.GamePropID = ""),
      (this.GoodsName = ""),
      (this.GoodsDesc = ""),
      (this.Price = ""),
      (this.GoodsCurrency = "");
  }
}
exports.PayInfoMacIos = PayInfoMacIos;
class PayInfoCloudIos {
  constructor() {
    (this.RoleId = ""),
      (this.RoleName = ""),
      (this.ServerId = ""),
      (this.ServerName = ""),
      (this.CpOrder = "");
  }
}
exports.PayInfoCloudIos = PayInfoCloudIos;
class PayInfoMacIosGlobal extends PayInfoMacIos {
  constructor() {
    super(...arguments), (this.ExtraParams = "");
  }
}
exports.PayInfoMacIosGlobal = PayInfoMacIosGlobal;
class PayInfoWindowsBase extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.roleId = ""),
      (this.roleName = ""),
      (this.serverId = ""),
      (this.serverName = ""),
      (this.callbackUrl = ""),
      (this.goodsDesc = "");
  }
}
class PayInfoWindows extends PayInfoWindowsBase {
  constructor() {
    super(...arguments),
      (this.cpOrderId = ""),
      (this.product_id = ""),
      (this.goodsName = ""),
      (this.currency = ""),
      (this.extraParams = "");
  }
}
exports.PayInfoWindows = PayInfoWindows;
class PayInfoWindowsGlobal extends PayInfoWindowsBase {
  constructor() {
    super(...arguments),
      (this.cpOrder = ""),
      (this.goodsId = ""),
      (this.productName = ""),
      (this.currencyType = ""),
      (this.customMsg = ""),
      (this.price = "");
  }
}
exports.PayInfoWindowsGlobal = PayInfoWindowsGlobal;
class SdkPayObject extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.OrderInfo = void 0), (this.RoleInfo = void 0);
  }
}
exports.SdkPayObject = SdkPayObject;
class RoleInfoSdk extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.RoleId = ""),
      (this.RoleName = ""),
      (this.ServerId = ""),
      (this.ServerName = ""),
      (this.RoleLevel = ""),
      (this.VipLevel = ""),
      (this.PartyName = ""),
      (this.RoleCreateTime = ""),
      (this.BalanceLevelOne = ""),
      (this.BalanceLevelTwo = ""),
      (this.SumPay = ""),
      (this.gameName = ""),
      (this.gameVersion = ""),
      (this.RoleAvatar = ""),
      (this.ChannelUserId = ""),
      (this.GameUserId = "");
  }
}
exports.RoleInfoSdk = RoleInfoSdk;
class AndroidSdkPayRole extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.serverId = ""),
      (this.serverName = ""),
      (this.roleId = ""),
      (this.roleName = ""),
      (this.roleLevel = ""),
      (this.vipLevel = ""),
      (this.setBalanceLevelOne = ""),
      (this.setBalanceLevelTwo = ""),
      (this.partyName = "");
  }
}
exports.AndroidSdkPayRole = AndroidSdkPayRole;
class RoleInfoWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.roleId = ""),
      (this.roleName = ""),
      (this.serverId = ""),
      (this.serverName = ""),
      (this.roleLevel = ""),
      (this.vipLevel = ""),
      (this.partyName = ""),
      (this.roleCreateTime = ""),
      (this.setBalanceLevelOne = ""),
      (this.setBalanceLevelTwo = ""),
      (this.setSumPay = "");
  }
}
exports.RoleInfoWindows = RoleInfoWindows;
class QueryProductInfoParamAndroid extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.GoodIdList = ""), (this.ChannelId = "");
  }
}
exports.QueryProductInfoParamAndroid = QueryProductInfoParamAndroid;
class CloudSDKPayResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.paymentType = 0),
      (this.sdkOrderId = ""),
      (this.cpOrderId = ""),
      (this.msg = ""),
      (this.extraParams = "");
  }
}
exports.CloudSDKPayResult = CloudSDKPayResult;
class QueryProductInfoParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.goodsIds = ""), (this.payChannel = "");
  }
}
exports.QueryProductInfoParamWindows = QueryProductInfoParamWindows;
class SetFontParamAndroid extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.fontType = ""), (this.fontPath = "");
  }
}
exports.SetFontParamAndroid = SetFontParamAndroid;
class SetFontParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.name = ""), (this.path = "");
  }
}
exports.SetFontParamWindows = SetFontParamWindows;
class ShareData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.platform = ""),
      (this.title = ""),
      (this.text = ""),
      (this.topicId = ""),
      (this.topicName = "");
  }
}
exports.ShareData = ShareData;
class GameWindowStateData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.status = void 0);
  }
}
exports.GameWindowStateData = GameWindowStateData;
class AndroidSdkAgreementData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.init = void 0),
      (this.gameInit = void 0),
      (this.privacy = void 0),
      (this.certGuarIdcard = void 0),
      (this.login = void 0),
      (this.version = 0),
      (this.content = ""),
      (this.certIdcard = void 0);
  }
}
exports.AndroidSdkAgreementData = AndroidSdkAgreementData;
class SdkAgreementLinkData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.link = ""), (this.title = "");
  }
}
exports.SdkAgreementLinkData = SdkAgreementLinkData;
class GlobalProductData {
  constructor() {
    (this.code = 0), (this.message = ""), (this.data = void 0);
  }
}
exports.GlobalProductData = GlobalProductData;
class GlobalProductContentData {
  constructor() {
    (this.local = ""),
      (this.coin = ""),
      (this.price = void 0),
      (this.PriceItem = void 0);
  }
}
exports.GlobalProductContentData = GlobalProductContentData;
class AndroidGlobalProductContentPriceData {
  constructor() {
    (this.key = 0), (this.value = 0);
  }
}
exports.AndroidGlobalProductContentPriceData =
  AndroidGlobalProductContentPriceData;
class KuroSdkControllerTool {
  static GetCreateRoleInfo() {
    var s = this.GetCreateRoleInfoData(),
      s = Json_1.Json.Stringify(s) ?? "";
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "SdkGetRoleInfo", ["data", s]),
      s
    );
  }
  static GetCreateRoleInfoData() {
    var s = ModelManager_1.ModelManager.LoginModel,
      t = new RoleInfoSdk();
    return (
      (t.RoleId = this.ISe()),
      (t.RoleName = s.GetPlayerName() ? s.GetPlayerName() : ""),
      (t.ServerId = s.GetServerId() ? s.GetServerId() : ""),
      (t.ServerName = s.GetServerName() ? s.GetServerName() : ""),
      (t.RoleLevel = "1"),
      (t.VipLevel = "0"),
      (t.PartyName = " "),
      (t.RoleCreateTime = s.GetCreatePlayerTime()
        ? s.GetCreatePlayerTime()
        : ""),
      (t.BalanceLevelOne = "0"),
      (t.BalanceLevelTwo = "0"),
      (t.SumPay = "0"),
      (t.gameName = "AKI"),
      (t.gameVersion = "0.0.0"),
      (t.RoleAvatar = ""),
      (t.ChannelUserId = s.GetSdkLoginConfig()?.Uid
        ? s.GetSdkLoginConfig().Uid.toString()
        : "0"),
      (t.GameUserId = s.GetSdkLoginConfig()?.UserName
        ? s.GetSdkLoginConfig().UserName.toString()
        : "0"),
      t
    );
  }
  static ISe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
      : ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
        ? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
        : "";
  }
  static GetRoleInfoData() {
    var s = ModelManager_1.ModelManager.FunctionModel,
      t = ModelManager_1.ModelManager.LoginModel,
      e = new RoleInfoSdk();
    return (
      (e.RoleId = this.ISe()),
      (e.RoleName = s.GetPlayerName() ? s.GetPlayerName() : ""),
      (e.ServerId = t.GetServerId() ? t.GetServerId() : ""),
      (e.ServerName = t.GetServerName() ? t.GetServerName() : ""),
      (e.RoleLevel = s.GetPlayerLevel() ? s.GetPlayerLevel().toString() : "1"),
      (e.VipLevel = "0"),
      (e.PartyName = " "),
      (e.RoleCreateTime = ""),
      (e.BalanceLevelOne = s.GetPlayerCashCoin()),
      (e.BalanceLevelTwo = "0"),
      (e.SumPay = "0"),
      (e.gameName = "AKI"),
      (e.gameVersion = "0.0.0"),
      (e.RoleAvatar = ""),
      (e.ChannelUserId = t.GetSdkLoginConfig()?.Uid
        ? t.GetSdkLoginConfig().Uid.toString()
        : "0"),
      (e.GameUserId = t.GetSdkLoginConfig()?.UserName
        ? t.GetSdkLoginConfig().UserName.toString()
        : "0"),
      e
    );
  }
  static GetRoleInfo() {
    var s = this.GetRoleInfoData(),
      s = Json_1.Json.Stringify(s) ?? "";
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "SdkGetRoleInfo", ["data", s]),
      s
    );
  }
  static GetPaymentInfo(s, t) {
    var e;
    return 4 === Info_1.Info.PlatformType ||
      1 === Info_1.Info.PlatformType ||
      CloudGameManager_1.CloudGameManager.IsCloudGame
      ? (((e = new PayInfoMacIos()).RoleId = t.roleId.toString()),
        (e.RoleName = t.roleName.toString()),
        (e.ServerId = t.serverId.toString()),
        (e.ServerName = t.serverName.toString()),
        (e.CpOrder = s.cpOrderId.toString()),
        (e.CallbackUrl = s.callbackUrl.toString()),
        (e.GamePropID = s.product_id.toString()),
        (e.GoodsName = s.goodsName.toString()),
        (e.GoodsDesc = s.goodsDesc.toString()),
        (e.Price = s.price.toString()),
        (e.GoodsCurrency = ""),
        Json_1.Json.Stringify(e) ?? "")
      : (((e = new SdkPayObject()).RoleInfo = t),
        (e.OrderInfo = s),
        (t = Json_1.Json.Stringify(e)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 27, "SdkJson", ["sdkJson", t]),
        t ?? "");
  }
  static GetSdkPayProduct(s, t, e, o, r) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString(),
      a = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(s);
    return {
      product_id:
        ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(s),
      cpOrderId: t,
      price: a,
      goodsName: e,
      goodsDesc: o,
      extraParams: i,
      callbackUrl: r,
      currency: "",
    };
  }
  static GetSdkPayRoleInfo() {
    var s = ModelManager_1.ModelManager.FunctionModel,
      t = ModelManager_1.ModelManager.LoginModel;
    return {
      roleId: this.ISe(),
      roleName: s.GetPlayerName() ? s.GetPlayerName() : "",
      roleLevel: s.GetPlayerLevel() ? s.GetPlayerLevel().toString() : "1",
      serverId: t.GetServerId() ? t.GetServerId() : "",
      serverName: t.GetServerName() ? t.GetServerName() : "",
      vipLevel: "0",
      partyName: " ",
      setBalanceLevelOne: 0,
      setBalanceLevelTwo: 0,
    };
  }
  static GetSdkOpenUrlWndInfo(s, t) {
    var e = new OpenSdkUrlWndParam(),
      s = ((e.title = s), (e.wndUrl = t), Json_1.Json.Stringify(e));
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 27, "SdkJson", ["sdkJson", s ?? ""]),
      s
    );
  }
}
exports.KuroSdkControllerTool = KuroSdkControllerTool;
class PostWebViewEntryPointData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.h5AppUrl = []),
      (this.contentUrl = []),
      (this.apiUrl = "");
  }
}
exports.PostWebViewEntryPointData = PostWebViewEntryPointData;
class NoticeData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.game = []), (this.activity = []);
  }
}
exports.NoticeData = NoticeData;
class NoticeContentData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.id = ""),
      (this.red = 0),
      (this.platform = []),
      (this.channel = []),
      (this.whiteList = []),
      (this.startTimeMs = 0),
      (this.endTimeMs = 0),
      (this.permanent = 0);
  }
}
exports.NoticeContentData = NoticeContentData;
class NoticeReadData extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.code = 0), (this.message = ""), (this.data = []);
  }
}
exports.NoticeReadData = NoticeReadData;
//# sourceMappingURL=KuroSdkData.js.map
