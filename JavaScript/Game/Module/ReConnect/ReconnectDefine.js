"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ellipsis =
    exports.reconnectMapName =
    exports.EBackLoginViewReason =
    exports.ELogoutReason =
    exports.EReconnectProcessStep =
      void 0);
const UE = require("ue");
let EReconnectProcessStep, ELogoutReason, EBackLoginViewReason;
!(function (o) {
  (o[(o.ConvGate = 0)] = "ConvGate"),
    (o[(o.ConvRet = 1)] = "ConvRet"),
    (o[(o.ProtoKeyReq = 2)] = "ProtoKeyReq"),
    (o[(o.ProtoKeyRet = 3)] = "ProtoKeyRet"),
    (o[(o.ReconvReq = 4)] = "ReconvReq"),
    (o[(o.ReconvRet = 5)] = "ReconvRet"),
    (o[(o.ReconvCancel = 6)] = "ReconvCancel"),
    (o[(o.ReconvSuccess = 7)] = "ReconvSuccess"),
    (o[(o.ReconvFail = 8)] = "ReconvFail"),
    (o[(o.Max = 9)] = "Max");
})(
  (EReconnectProcessStep =
    exports.EReconnectProcessStep || (exports.EReconnectProcessStep = {})),
),
  (function (o) {
    (o[(o.GmBackLoginView = 0)] = "GmBackLoginView"),
      (o[(o.LogoutNotify = 1)] = "LogoutNotify"),
      (o[(o.SdkLogoutAccount = 2)] = "SdkLogoutAccount"),
      (o[(o.LoginViewQuit = 3)] = "LoginViewQuit"),
      (o[(o.NetWorkMaskViewBackBtn = 4)] = "NetWorkMaskViewBackBtn"),
      (o[(o.ExitGameConfirmBox = 5)] = "ExitGameConfirmBox");
  })((ELogoutReason = exports.ELogoutReason || (exports.ELogoutReason = {}))),
  (function (o) {
    (o[(o.Logout = 0)] = "Logout"),
      (o[(o.ReconnectMax = 1)] = "ReconnectMax"),
      (o[(o.ReconnectError = 2)] = "ReconnectError");
  })(
    (EBackLoginViewReason =
      exports.EBackLoginViewReason || (exports.EBackLoginViewReason = {})),
  ),
  (exports.reconnectMapName = new UE.FName("/Game/Aki/Map/Launch/Bootstrap")),
  (exports.ellipsis = ["", ".", "..", "..."]);
// # sourceMappingURL=ReconnectDefine.js.map
