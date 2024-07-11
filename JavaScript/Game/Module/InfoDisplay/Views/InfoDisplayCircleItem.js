"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayCircleItem = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../CircleExhibition/AutoAttachExhibitionItem");
const InfoDisplayController_1 = require("../InfoDisplayController");
const FRONT_HIERACHY = 3;
const ANIMAL_SCALE = 0.8;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
class InfoDisplayCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
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
      this.Aqe(),
      this.GetRootItem().SetHierarchyIndex(0);
  }
  OnMoveItem(t) {
    let e;
    var i = this.GetAttachItem().ExhibitionView.GetWidth();
    const s = this.GetRootItem();
    var i = (s.GetAnchorOffsetX() + i / 2) / i;
    const r = s.RelativeScale3D;
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
      : r.X !== this.rsi.X && s.SetUIItemScale(this.rsi);
  }
  SetData(t) {
    this.Pe = t;
  }
  Aqe() {
    this.osi !== "" && this.SetTextureByPath(this.osi, this.GetTexture(1));
  }
  jbe() {
    var t = this.GetAttachItem().ExhibitionView.ItemActor.GetWidth();
    var t = (this.GetRootItem().GetAnchorOffsetX() + t / 2) / t;
    t >= LEFT_RANGE &&
      t <= RIGHT_RANGE &&
      (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
        this.osi,
      ),
      InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
  }
}
exports.InfoDisplayCircleItem = InfoDisplayCircleItem;
// # sourceMappingURL=InfoDisplayCircleItem.js.map
