"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputKeyUtils = void 0);
const Info_1 = require("../../Core/Common/Info"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../Manager/ConfigManager");
class InputKeyUtils {
  static GetGamepadKeyIconPath(e) {
    e =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(e);
    return e
      ? Info_1.Info.IsPsGamepad()
        ? e.PsKeyIconPath
        : Info_1.Info.IsBackBoneGamepad()
          ? e.BackBoneKeyIconPath
          : e.KeyIconPath
      : "";
  }
  static GetGamepadKeyIconPathByType(e, a) {
    e =
      ConfigManager_1.ConfigManager.InputSettingsConfig.GetGamepadKeyConfig(e);
    return e
      ? 3 === a || 4 === a
        ? e.PsKeyIconPath
        : 6 === a
          ? e.BackBoneKeyIconPath
          : 2 === a
            ? e.KeyIconPath
            : ""
      : "";
  }
  static GetLastGamepadEnum() {
    return (
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.LastGamepadEnum,
      ) ?? 2
    );
  }
}
exports.InputKeyUtils = InputKeyUtils;
//# sourceMappingURL=InputKeyUtils.js.map
