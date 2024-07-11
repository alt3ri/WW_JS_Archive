"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayNoCircleAttachItem = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const InfoDisplayController_1 = require("../InfoDisplayController");
const FRONT_HIERACHY = 1;
const ANIMAL_SCALE = 0.8;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
class InfoDisplayNoCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.osi = ""),
      (this.rsi = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE));
  }
  OnSelect() {}
  OnUnSelect() {}
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
  Aqe() {
    this.osi !== "" && this.SetTextureByPath(this.osi, this.GetTexture(1));
  }
  OnMoveItem() {
    let t;
    let e = this.GetCurrentMovePercentage();
    const i = this.RootItem.RelativeScale3D;
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
  jbe() {
    const t = this.GetCurrentMovePercentage();
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
exports.InfoDisplayNoCircleAttachItem = InfoDisplayNoCircleAttachItem;
// # sourceMappingURL=InfoDisplayNoCircleAttachItem.js.map
