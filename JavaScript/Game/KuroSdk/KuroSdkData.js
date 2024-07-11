"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroSdkControllerTool =
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
    exports.QueryProductInfoParamAndroid =
    exports.RoleInfoWindows =
    exports.AndroidSdkPayRole =
    exports.RoleInfoSdk =
    exports.SdkPayObject =
    exports.PayInfoWindowsGlobal =
    exports.PayInfoWindows =
    exports.PayInfoIosGlobal =
    exports.PayInfoMacIos =
    exports.PayInfoAndroid =
    exports.OpenWebViewParamWindows =
    exports.OpenSdkUrlWndParamWindows =
    exports.OpenSdkUrlWndParam =
    exports.OpenPostWebViewParam =
    exports.OpenCustomerServiceParamWindows =
    exports.OpenCustomerServiceParamIos =
    exports.OpenCustomerServiceParamAndroid =
    exports.InitializePostWebViewParam =
      void 0);
const Info_1 = require("../../Core/Common/Info"),
  Json_1 = require("../../Core/Common/Json"),
  Log_1 = require("../../Core/Common/Log"),
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
      (this.RoleId = 0),
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
class OpenCustomerServiceParamWindows extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.islogin = !1), (this.from = 0);
  }
}
exports.OpenCustomerServiceParamWindows = OpenCustomerServiceParamWindows;
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
class PayInfoIosGlobal extends (exports.PayInfoMacIos = PayInfoMacIos) {
  constructor() {
    super(...arguments), (this.ExtraParams = "");
  }
}
exports.PayInfoIosGlobal = PayInfoIosGlobal;
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
    var s = ModelManager_1.ModelManager.LoginModel,
      t = new RoleInfoSdk(),
      s =
        ((t.RoleId = this.ISe()),
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
        Json_1.Json.Stringify(t) ?? "");
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", s]),
      s
    );
  }
  static ISe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
      : ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
        ? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
        : "";
  }
  static GetRoleInfo() {
    var s = ModelManager_1.ModelManager.FunctionModel,
      t = ModelManager_1.ModelManager.LoginModel,
      o = new RoleInfoSdk(),
      s =
        ((o.RoleId = this.ISe()),
        (o.RoleName = s.GetPlayerName() ? s.GetPlayerName() : ""),
        (o.ServerId = t.GetServerId() ? t.GetServerId() : ""),
        (o.ServerName = t.GetServerName() ? t.GetServerName() : ""),
        (o.RoleLevel = s.GetPlayerLevel()
          ? s.GetPlayerLevel().toString()
          : "1"),
        (o.VipLevel = "0"),
        (o.PartyName = " "),
        (o.RoleCreateTime = ""),
        (o.BalanceLevelOne = s.GetPlayerCashCoin()),
        (o.BalanceLevelTwo = "0"),
        (o.SumPay = "0"),
        (o.gameName = "AKI"),
        (o.gameVersion = "0.0.0"),
        (o.RoleAvatar = ""),
        (o.ChannelUserId = t.GetSdkLoginConfig()?.Uid
          ? t.GetSdkLoginConfig().Uid.toString()
          : "0"),
        (o.GameUserId = t.GetSdkLoginConfig()?.UserName
          ? t.GetSdkLoginConfig().UserName.toString()
          : "0"),
        Json_1.Json.Stringify(o) ?? "");
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", s]),
      s
    );
  }
  static GetPaymentInfo(s, t) {
    var o;
    return 4 === Info_1.Info.PlatformType || 1 === Info_1.Info.PlatformType
      ? (((o = new PayInfoMacIos()).RoleId = t.roleId.toString()),
        (o.RoleName = t.roleName.toString()),
        (o.ServerId = t.serverId.toString()),
        (o.ServerName = t.serverName.toString()),
        (o.CpOrder = s.cpOrderId.toString()),
        (o.CallbackUrl = s.callbackUrl.toString()),
        (o.GamePropID = s.product_id.toString()),
        (o.GoodsName = s.goodsName.toString()),
        (o.GoodsDesc = s.goodsDesc.toString()),
        (o.Price = s.price.toString()),
        (o.GoodsCurrency = ""),
        Json_1.Json.Stringify(o) ?? "")
      : (((o = new SdkPayObject()).RoleInfo = t),
        (o.OrderInfo = s),
        (t = Json_1.Json.Stringify(o)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", t]),
        t ?? "");
  }
  static GetSdkPayProduct(s, t, o, e, r) {
    var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString(),
      i = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(s);
    return {
      product_id:
        ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(s),
      cpOrderId: t,
      price: i,
      goodsName: o,
      goodsDesc: e,
      extraParams: n,
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
    var o = new OpenSdkUrlWndParam(),
      s = ((o.title = s), (o.wndUrl = t), Json_1.Json.Stringify(o));
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", s ?? ""]),
      s
    );
  }
}
exports.KuroSdkControllerTool = KuroSdkControllerTool;
//# sourceMappingURL=KuroSdkData.js.map
