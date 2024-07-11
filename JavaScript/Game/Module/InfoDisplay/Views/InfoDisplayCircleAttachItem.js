"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayCircleAttachItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  FRONT_HIERACHY = 3,
  ANIMAL_SCALE = 0.8,
  LEFT_RANGE = 0.4,
  MIDDLE_RANGE = 0.5,
  RIGHT_RANGE = 0.6;
class InfoDisplayCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
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
  OnRefreshItem(t) {
    (this.osi = t), this.Aqe(), this.GetRootItem().SetHierarchyIndex(0);
  }
  OnMoveItem() {
    var t,
      e = this.GetCurrentMovePercentage(),
      i = this.RootItem.RelativeScale3D;
    let s = 0;
    e >= LEFT_RANGE && e <= RIGHT_RANGE
      ? (e >= LEFT_RANGE && e <= MIDDLE_RANGE
          ? ((s = e - LEFT_RANGE),
            (t = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, 10 * s)),
            (t = new UE.Vector(t, t, t)),
            this.RootItem.SetUIItemScale(t))
          : ((s = e - MIDDLE_RANGE),
            (t = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, 10 * s)),
            (e = new UE.Vector(t, t, t)),
            this.RootItem.SetUIItemScale(e)),
        this.GetRootItem().SetHierarchyIndex(FRONT_HIERACHY))
      : i.X !== this.rsi.X && this.RootItem.SetUIItemScale(this.rsi);
  }
  Aqe() {
    "" !== this.osi && this.SetTextureByPath(this.osi, this.GetTexture(1));
  }
  OnSelect() {}
  OnUnSelect() {}
  jbe() {
    var t = this.GetCurrentMovePercentage();
    t >= LEFT_RANGE && t <= RIGHT_RANGE
      ? (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
          this.osi,
        ),
        InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView())
      : EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ClickDisplayItem,
          this,
        );
  }
}
exports.InfoDisplayCircleAttachItem = InfoDisplayCircleAttachItem;
//# sourceMappingURL=InfoDisplayCircleAttachItem.js.map
