"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VideoConfig = exports.VideoSubtitle = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  VideoCaptionByCgName_1 = require("../../../Core/Define/ConfigQuery/VideoCaptionByCgName"),
  VideoDataByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoDataByCgNameAndGirlOrBoy"),
  VideoSoundByCgNameAndGirlOrBoy_1 = require("../../../Core/Define/ConfigQuery/VideoSoundByCgNameAndGirlOrBoy"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ModelManager_1 = require("../../Manager/ModelManager");
class VideoSubtitle {
  constructor(e, o, i, r) {
    (this.ShowMoment = e),
      (this.Duration = o),
      (this.CaptionText = i),
      (this.CaptionId = r);
  }
}
exports.VideoSubtitle = VideoSubtitle;
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
    var i =
      VideoDataByCgNameAndGirlOrBoy_1.configVideoDataByCgNameAndGirlOrBoy.GetConfig(
        e,
        o,
      );
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Video", 39, "找不到cg视频配置！", ["名称", e])),
      i
    );
  }
  GetVideoCaptions(e, o) {
    var i = VideoCaptionByCgName_1.configVideoCaptionByCgName.GetConfigList(e);
    if (!i || 0 === i.length)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Video", 39, "找不到cg字幕配置！", ["名称", e]),
        []
      );
    const r = [];
    switch (o) {
      case "en":
        i.forEach((e) => {
          0 !== e.DurationEn &&
            r.push(
              new VideoSubtitle(
                e.ShowMomentEn,
                e.DurationEn,
                e.CaptionText,
                e.CaptionId,
              ),
            );
        });
        break;
      case "ja":
        i.forEach((e) => {
          0 !== e.DurationJa &&
            r.push(
              new VideoSubtitle(
                e.ShowMomentJa,
                e.DurationJa,
                e.CaptionText,
                e.CaptionId,
              ),
            );
        });
        break;
      case "ko":
        i.forEach((e) => {
          0 !== e.DurationKo &&
            r.push(
              new VideoSubtitle(
                e.ShowMomentKo,
                e.DurationKo,
                e.CaptionText,
                e.CaptionId,
              ),
            );
        });
    }
    return 0 < r.length ? r : i;
  }
  GetVideoCaptionText(e) {
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.CaptionText);
    return ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e);
  }
  GetVideoSounds(o) {
    let i =
      VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(
        o,
        2,
      );
    if (!i || 0 === i.length) {
      let e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      2 === e && (e = 0),
        (i =
          VideoSoundByCgNameAndGirlOrBoy_1.configVideoSoundByCgNameAndGirlOrBoy.GetConfigList(
            o,
            e,
          ));
    }
    return i && 0 !== i.length
      ? i
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Video", 39, "找不到cg字幕配置！", ["名称", o]),
        []);
  }
}
exports.VideoConfig = VideoConfig;
//# sourceMappingURL=VideoConfig.js.map
