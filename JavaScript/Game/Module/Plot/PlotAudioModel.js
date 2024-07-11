"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotAudioModel = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PlotAudioModel extends ModelBase_1.ModelBase {
  static GetExternalSourcesMediaName(e) {
    let a = "";
    return (
      e[0] &&
        (a =
          0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
            ? "_F"
            : "_M"),
      `${LanguageSystem_1.LanguageSystem.PackageAudio}_${e[1]}${a}.wem`
    );
  }
  static GetAudioMouthAnimName(e) {
    let a = "";
    e[0] &&
      (a =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? "_F"
          : "_M");
    var t = LanguageSystem_1.LanguageSystem.PackageAudio,
      e = t + "_" + e[1] + a;
    return `/Game/Aki/Sequence/SequenceAnim/VoiceMouth/${t}/${e}.` + e;
  }
  static GetExternalSourcesMediaNameForEditor(e) {
    let a = "";
    return (
      e[0] && (a = e[2] ? "_M" : "_F"),
      `${LanguageSystem_1.LanguageSystem.PackageAudio}_${e[1]}${a}.wem`
    );
  }
}
exports.PlotAudioModel = PlotAudioModel;
//# sourceMappingURL=PlotAudioModel.js.map
