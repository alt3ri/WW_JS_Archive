"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayImgView = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class InfoDisplayImgView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Opt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.Opt]]);
  }
  OnStart() {
    this.Og();
  }
  Og() {
    const e =
      ModelManager_1.ModelManager.InfoDisplayModel.CurrentCurrentInformationTexture();
    const r = this.GetTexture(0);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, s) => {
      e.IsValid() &&
        r.IsValid() &&
        (r.SetTexture(e),
        r.SetHeight(e.GetTextureSizeY()),
        r.SetWidth(e.GetTextureSizeX()));
    });
  }
}
exports.InfoDisplayImgView = InfoDisplayImgView;
// # sourceMappingURL=InfoDisplayImgView.js.map
