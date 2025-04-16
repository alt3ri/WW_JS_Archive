"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MovieBackgroundFadeData = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MovieBackgroundFadeData {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(a, t) {
    return (this.bb_pos = a), (this.bb = t), this;
  }
  static getRootAsMovieBackgroundFadeData(a, t) {
    return (t || new MovieBackgroundFadeData()).__init(
      a.readInt32(a.position()) + a.position(),
      a,
    );
  }
  static getSizePrefixedRootAsMovieBackgroundFadeData(a, t) {
    return (
      a.setPosition(a.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (t || new MovieBackgroundFadeData()).__init(
        a.readInt32(a.position()) + a.position(),
        a,
      )
    );
  }
  fadeInBackgroundType(a) {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  fadeOutBackgroundType(a) {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.__string(this.bb_pos + t, a) : void 0;
  }
  static startMovieBackgroundFadeData(a) {
    a.startObject(2);
  }
  static addFadeInBackgroundType(a, t) {
    a.addFieldOffset(0, t, 0);
  }
  static addFadeOutBackgroundType(a, t) {
    a.addFieldOffset(1, t, 0);
  }
  static endMovieBackgroundFadeData(a) {
    return a.endObject();
  }
  static createMovieBackgroundFadeData(a, t, e) {
    return (
      MovieBackgroundFadeData.startMovieBackgroundFadeData(a),
      MovieBackgroundFadeData.addFadeInBackgroundType(a, t),
      MovieBackgroundFadeData.addFadeOutBackgroundType(a, e),
      MovieBackgroundFadeData.endMovieBackgroundFadeData(a)
    );
  }
}
exports.MovieBackgroundFadeData = MovieBackgroundFadeData;
//# sourceMappingURL=movie-background-fade-data.js.map
