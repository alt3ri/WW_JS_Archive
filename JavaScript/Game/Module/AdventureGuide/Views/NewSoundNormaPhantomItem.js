"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewSoundNormaPhantomItem = void 0);
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class NewSoundNormaPhantomItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {}
}
exports.NewSoundNormaPhantomItem = NewSoundNormaPhantomItem;
// # sourceMappingURL=NewSoundNormaPhantomItem.js.map
