"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const VideoCaptionByCgName_1 = require("../../../Core/Define/ConfigQuery/VideoCaptionByCgName");
const VideoDataByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoDataByCgNameAndGirlOrBoy");
const VideoSoundByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoSoundByCgNameAndGirlOrBoy");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class VideoConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetVideoData(e) {
    let o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    o === 2 && (o = 0);
    const r =
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
    const o =
      VideoCaptionByCgName_1.configVideoCaptionByCgName.GetConfigList(e);
    return o && o.length !== 0
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
    if (!r || r.length === 0) {
      let e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      e === 2 && (e = 0),
        (r =
          VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(
            o,
            e,
          ));
    }
    return r && r.length !== 0
      ? r
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Video", 39, "找不到cg字幕配置！", ["名称", o]),
        []);
  }
}
exports.VideoConfig = VideoConfig;
// # sourceMappingURL=VideoConfig.js.map
