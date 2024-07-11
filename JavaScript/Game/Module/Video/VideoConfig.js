"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  VideoCaptionByCgName_1 = require("../../../Core/Define/ConfigQuery/VideoCaptionByCgName"),
  VideoDataByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoDataByCgNameAndGirlOrBoy"),
  VideoSoundByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoSoundByCgNameAndGirlOrBoy"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class VideoConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetVideoData(e) {
    let o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    2 === o && (o = 0);
    var r =
      VideoDataByCgNameAndGirlOrBoy_1.configVideoDataByCgNameAndGirlOrBoy.GetConfig(
        e,
        o,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Video", 39, "找不到cg视频配置！", ["名称", e])),
      r
    );
  }
  GetVideoCaptions(e) {
    var o = VideoCaptionByCgName_1.configVideoCaptionByCgName.GetConfigList(e);
    return o && 0 !== o.length
      ? o
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Video", 39, "找不到cg字幕配置！", ["名称", e]),
        []);
  }
  GetVideoCaptionText(e) {
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.CaptionText);
    return ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e);
  }
  GetVideoSounds(o) {
    let r =
      VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(
        o,
        2,
      );
    if (!r || 0 === r.length) {
      let e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      2 === e && (e = 0),
        (r =
          VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(
            o,
            e,
          ));
    }
    return r && 0 !== r.length
      ? r
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Video", 39, "找不到cg字幕配置！", ["名称", o]),
        []);
  }
}
exports.VideoConfig = VideoConfig;
//# sourceMappingURL=VideoConfig.js.map
