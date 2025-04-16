"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayMovie = void 0);
const FbMovieBackgroundFadeData_1 = require("./FbMovieBackgroundFadeData");
class FbPlayMovie {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.qdh = !1),
      (this.kdh = void 0),
      (this.Gdh = !1),
      (this.Odh = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayMovie(t);
  }
  get VideoName() {
    return (
      this.qdh ||
        ((this.qdh = !0), (this.kdh = this.FbDataInternal.videoName())),
      this.kdh
    );
  }
  get BackgroundFade() {
    return (
      this.Gdh ||
        ((this.Gdh = !0),
        (this.Odh =
          FbMovieBackgroundFadeData_1.FbMovieBackgroundFadeData.Create(
            this.FbDataInternal.backgroundFade(),
          ))),
      this.Odh
    );
  }
}
exports.FbPlayMovie = FbPlayMovie;
//# sourceMappingURL=FbPlayMovie.js.map
