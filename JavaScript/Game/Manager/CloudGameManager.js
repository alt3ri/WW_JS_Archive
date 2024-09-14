"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloudGameManager = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../Core/Common/Log");
class CloudGameManager {
  static get IsCloudGame() {
    return CloudGameManager.lXi;
  }
  static Init() {
    var e;
    (CloudGameManager.lXi =
      ue_1.KismetSystemLibrary.GetCommandLine()?.includes("-CloudGame") ?? !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("CloudGame", 17, "初始化云游戏平台类型", [
          "IsCloudGame",
          CloudGameManager.IsCloudGame,
        ]),
      CloudGameManager.IsCloudGame &&
        ((e = new ue_1.KuroCloudGameWrapper()),
        (CloudGameManager.KuroCloudGameWrapper =
          e).CloudGameOnReceiveDataDelegate.Bind(CloudGameManager.bBn),
        e.CloudGameOnReceiveDataWithKeyDelegate.Bind(CloudGameManager.qBn));
  }
  static BindFunction(e, a) {
    CloudGameManager.GBn.set(e, a);
  }
  static SendData(e) {
    ue_1.KuroCloudGameWrapper.SendDataToPipeBinary(e);
  }
}
((exports.CloudGameManager = CloudGameManager).lXi = !1),
  (CloudGameManager.KuroCloudGameWrapper = void 0),
  (CloudGameManager.GBn = new Map()),
  (CloudGameManager.bBn = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CloudGame", 17, "OnReceiveData:", ["key", e]);
    var a = CloudGameManager.GBn.get(e);
    a
      ? a(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("CloudGame", 17, "OnReceiveData: 函数未绑定", [
          "key",
          e,
        ]);
  }),
  (CloudGameManager.qBn = (e, a) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CloudGame",
        17,
        "OnReceiveDataWithKey:",
        ["key", e],
        ["data", a],
      );
    var o = CloudGameManager.GBn.get(e);
    o
      ? o(a)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "CloudGame",
          17,
          "OnReceiveDataWithKey: 函数未绑定",
          ["key", e],
          ["data", a],
        );
  });
//# sourceMappingURL=CloudGameManager.js.map
