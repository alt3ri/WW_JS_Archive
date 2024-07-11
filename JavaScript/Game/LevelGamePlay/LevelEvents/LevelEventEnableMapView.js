"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventDisableMapView = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDisableMapView extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, a) {
    e = Number(e.get("IsOn"));
    isNaN(e)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          17,
          "配置错误！DisableMapView行为的参数应当是数字",
        )
      : e !== 0 && e !== 1
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            17,
            "配置错误！DisableMapView行为的参数代表开关，只能是0或1",
          )
        : (ModelManager_1.ModelManager.WorldMapModel.LevelEventDisableFlag =
            Boolean(e).valueOf());
  }
}
exports.LevelEventDisableMapView = LevelEventDisableMapView;
// # sourceMappingURL=LevelEventEnableMapView.js.map
