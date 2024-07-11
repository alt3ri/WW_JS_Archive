"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayImgView = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class InfoDisplayImgView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.Jvt]]);
  }
  OnStart() {
    this.Og();
  }
  Og() {
    var e =
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
//# sourceMappingURL=InfoDisplayImgView.js.map
