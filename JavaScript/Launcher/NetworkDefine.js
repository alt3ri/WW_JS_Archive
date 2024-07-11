"use strict";
let ENetworkType, ETsCompileShaderBatchMode;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ETsCompileShaderBatchMode = exports.ENetworkType = void 0),
  (function (e) {
    (e[(e.Unknown = 0)] = "Unknown"),
      (e[(e.None = 1)] = "None"),
      (e[(e.AirplaneMode = 2)] = "AirplaneMode"),
      (e[(e.Cell = 3)] = "Cell"),
      (e[(e.WiFi = 4)] = "WiFi"),
      (e[(e.WiMAX = 5)] = "WiMAX"),
      (e[(e.Bluetooth = 6)] = "Bluetooth"),
      (e[(e.Ethernet = 7)] = "Ethernet");
  })((ENetworkType = exports.ENetworkType || (exports.ENetworkType = {}))),
  (function (e) {
    (e[(e.Background = 0)] = "Background"),
      (e[(e.Fast = 1)] = "Fast"),
      (e[(e.Precompile = 2)] = "Precompile");
  })(
    (ETsCompileShaderBatchMode =
      exports.ETsCompileShaderBatchMode ||
      (exports.ETsCompileShaderBatchMode = {})),
  );
// # sourceMappingURL=NetworkDefine.js.map
