"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxDetectorMarkItemView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MarkDetectorRangeImageComponent_1 = require("./Components/MarkDetectorRangeImageComponent"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class TreasureBoxDetectorMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e),
      (this.KRi = void 0),
      (this.QRi = void 0),
      (this.XRi = void 0),
      (this.KRi = new UE.Vector());
  }
  async GetDetectorRangeComponentAsync() {
    return (
      this.QRi ||
        (this.QRi =
          new MarkDetectorRangeImageComponent_1.MarkDetectorRangeImageComponent()),
      this.XRi ||
        (this.XRi = this.QRi.CreateThenShowByResourceIdAsync(
          "UiItem_ProbeArea",
          this.RootItem,
          !0,
        )),
      await this.XRi,
      this.QRi
    );
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "TreasureBoxDetectionMaxDistance",
    );
    this.GetDetectorRangeComponentAsync().then((e) => {
      e.GetRootItem().SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector),
        e.RangeImage.SetWidth((t / 100) * 2),
        e.RangeImage.SetHeight((t / 100) * 2),
        e.GetRootItem().SetHierarchyIndex(0),
        this.SetScale(this.Holder.MarkScale);
    });
  }
  SetScale(e) {
    this.KRi.Set(e, e, e),
      this.RootItem.SetWorldScale3D(this.KRi),
      this.GetDetectorRangeComponentAsync().then((e) => {
        this.KRi.Set(
          1 / this.RootItem.RelativeScale3D.X,
          1 / this.RootItem.RelativeScale3D.Y,
          1 / this.RootItem.RelativeScale3D.Z,
        ),
          e.GetRootItem().SetRelativeScale3D(this.KRi);
      });
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(),
      this.QRi?.Destroy(),
      (this.QRi = void 0),
      (this.XRi = void 0);
  }
}
exports.TreasureBoxDetectorMarkItemView = TreasureBoxDetectorMarkItemView;
//# sourceMappingURL=TreasureBoxDetectorMarkItemView.js.map
