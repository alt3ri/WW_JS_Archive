"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayNoCircleItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  FRONT_HIERACHY = 1,
  ANIMAL_SCALE = 0.8,
  LEFT_RANGE = 0.4,
  MIDDLE_RANGE = 0.5,
  RIGHT_RANGE = 0.6;
class InfoDisplayNoCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.osi = ""),
      (this.rsi = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
    ];
    this.BtnBindInfo = [
      [
        0,
        () => {
          this.jbe();
        },
      ],
    ];
  }
  RefreshItem() {
    (this.osi = this.Pe[this.GetShowItemIndex()]),
      this.osi && (this.Aqe(), this.GetRootItem().SetHierarchyIndex(0));
  }
  SetData(t) {
    this.Pe = t;
  }
  Aqe() {
    "" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
  }
  OnMoveItem(t) {
    var i,
      e = this.GetRootItem(),
      s = this.GetAttachItem().ExhibitionView.GetWidth(),
      s = (e.GetAnchorOffsetX() + s / 2) / s,
      r = e.RelativeScale3D;
    let h = 0;
    s >= LEFT_RANGE && s <= RIGHT_RANGE
      ? (s >= LEFT_RANGE && s <= MIDDLE_RANGE
          ? ((h = s - LEFT_RANGE),
            (i = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, 10 * h)),
            (i = new UE.Vector(i, i, i)),
            e.SetUIItemScale(i))
          : ((h = s - MIDDLE_RANGE),
            (i = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, 10 * h)),
            (s = new UE.Vector(i, i, i)),
            e.SetUIItemScale(s)),
        this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY))
      : r.X !== this.rsi.X && e.SetUIItemScale(this.rsi);
  }
  jbe() {
    var t = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth(),
      t = (this.GetRootItem().GetAnchorOffsetX() + t / 2) / t;
    t >= LEFT_RANGE &&
      t <= RIGHT_RANGE &&
      (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
        this.osi,
      ),
      InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
  }
}
exports.InfoDisplayNoCircleItem = InfoDisplayNoCircleItem;
//# sourceMappingURL=InfoDisplayNoCircleItem.js.map
