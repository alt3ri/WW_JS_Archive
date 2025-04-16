"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPointGroupByLayer = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbParkourPointLayerConfig_1 = require("./FbParkourPointLayerConfig"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPointGroupByLayer {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._9h = !1),
      (this.c9h = void 0),
      (this.F9h = !1),
      (this.N9h = void 0);
  }
  static Create(t) {
    if (t) return new FbPointGroupByLayer(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Space() {
    return (
      this._9h ||
        ((this._9h = !0),
        (this.c9h = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.space(),
        ))),
      this.c9h
    );
  }
  get Layers() {
    if (!this.F9h) {
      (this.F9h = !0), (this.N9h = new Array());
      var r = this.FbDataInternal.layersLength();
      if (r)
        for (let t = 0; t < r; ++t) {
          var i = this.FbDataInternal.layers(
            t,
            new fb_component_1.ParkourPointLayerConfig(),
          );
          this.N9h.push(
            FbParkourPointLayerConfig_1.FbParkourPointLayerConfig.Create(i),
          );
        }
    }
    return this.N9h;
  }
}
exports.FbPointGroupByLayer = FbPointGroupByLayer;
//# sourceMappingURL=FbPointGroupByLayer.js.map
