"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryUiLayoutB = void 0);
const ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class WorldMapSecondaryUiLayoutB extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.LeftConfirmBtn = void 0),
      (this.RightConfirmBtn = void 0),
      (this.MiddleCenterBtn = void 0),
      (this.OnLeftConfirmBtnClick = () => {}),
      (this.OnRightConfirmBtnClick = () => {}),
      (this.OnMiddleCenterBtnClick = () => {}),
      (this.OnDelBtnClick = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB),
      (this.BtnBindInfo = [[10, this.OnDelBtnClick]]);
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.LeftConfirmBtn = new ButtonAndTextItem_1.ButtonAndTextItem(
        this.GetItem(7),
      )),
      this.LeftConfirmBtn.BindCallback(this.OnLeftConfirmBtnClick),
      (this.RightConfirmBtn = new ButtonAndTextItem_1.ButtonAndTextItem(
        this.GetItem(8),
      )),
      this.RightConfirmBtn.BindCallback(this.OnRightConfirmBtnClick),
      (this.MiddleCenterBtn = new ButtonItem_1.ButtonItem(
        this.GetButton(12).RootUIComp,
      )),
      this.MiddleCenterBtn.SetFunction(this.OnMiddleCenterBtnClick),
      this.SetDelBtnActive(!1);
  }
  OnBeforeDestroy() {
    this.LeftConfirmBtn.Destroy(),
      this.RightConfirmBtn.Destroy(),
      this.MiddleCenterBtn.Destroy();
  }
  SetDelBtnActive(t) {
    this.GetButton(10).RootUIComp.SetUIActive(t);
  }
  SetDelBtnSelfInteractive(t) {
    this.GetButton(10).SetSelfInteractive(t);
  }
}
exports.WorldMapSecondaryUiLayoutB = WorldMapSecondaryUiLayoutB;
//# sourceMappingURL=WorldMapSecondaryUiLayoutB.js.map
