"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayCircleItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  FRONT_HIERACHY = 3,
  ANIMAL_SCALE = 0.8,
  LEFT_RANGE = 0.4,
  MIDDLE_RANGE = 0.5,
  RIGHT_RANGE = 0.6;
class InfoDisplayCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.rai = ""),
      (this.nai = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE));
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
    (this.rai = this.Pe[this.GetShowItemIndex()]),
      this.Aqe(),
      this.GetRootItem().SetHierarchyIndex(0);
  }
  OnMoveItem(t) {
    var e,
      i = this.GetAttachItem().ExhibitionView.GetWidth(),
      s = this.GetRootItem(),
      i = (s.GetAnchorOffsetX() + i / 2) / i,
      r = s.RelativeScale3D;
    let h = 0;
    i >= LEFT_RANGE && i <= RIGHT_RANGE
      ? (i >= LEFT_RANGE && i <= MIDDLE_RANGE
          ? ((h = i - LEFT_RANGE),
            (e = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, 10 * h)),
            (e = new UE.Vector(e, e, e)),
            s.SetUIItemScale(e))
          : ((h = i - MIDDLE_RANGE),
            (e = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, 10 * h)),
            (i = new UE.Vector(e, e, e)),
            s.SetUIItemScale(i)),
        this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY))
      : r.X !== this.nai.X && s.SetUIItemScale(this.nai);
  }
  SetData(t) {
    this.Pe = t;
  }
  Aqe() {
    "" !== this.rai && this.SetTextureByPath(this.rai, this.GetTexture(1));
  }
  jbe() {
    var t = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth(),
      t = (this.GetRootItem().GetAnchorOffsetX() + t / 2) / t;
    t >= LEFT_RANGE &&
      t <= RIGHT_RANGE &&
      (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
        this.rai,
      ),
      InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
  }
}
exports.InfoDisplayCircleItem = InfoDisplayCircleItem;
//# sourceMappingURL=InfoDisplayCircleItem.js.map
