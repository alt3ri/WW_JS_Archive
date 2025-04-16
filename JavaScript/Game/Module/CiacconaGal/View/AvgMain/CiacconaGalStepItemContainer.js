"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepItemContainer = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  CiacconaGalStepChoiceList_1 = require("./CiacconaGalStepChoiceList"),
  CiacconaGalStepChosenItem_1 = require("./CiacconaGalStepChosenItem"),
  CiacconaGalStepSubEndingItem_1 = require("./CiacconaGalStepSubEndingItem"),
  CiacconaGalStepTextItem_1 = require("./CiacconaGalStepTextItem");
class CiacconaGalStepItemContainer extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Lbc = void 0),
      (this.wbc = void 0),
      (this.Rbc = void 0),
      (this.Abc = void 0),
      (this.Pbc = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    (this.Lbc = new CiacconaGalStepChosenItem_1.CiacconaGalStepChosenItem()),
      t.push(this.Lbc.CreateByActorAsync(this.GetItem(0).GetOwner())),
      (this.wbc = new CiacconaGalStepTextItem_1.CiacconaGalStepTextItem()),
      t.push(this.wbc.CreateByActorAsync(this.GetItem(1).GetOwner())),
      (this.Rbc =
        new CiacconaGalStepSubEndingItem_1.CiacconaGalStepSubEndingItem()),
      t.push(this.Rbc.CreateByActorAsync(this.GetItem(2).GetOwner())),
      (this.Abc = new CiacconaGalStepChoiceList_1.CiacconaGalStepChoiceList()),
      t.push(this.Abc.CreateByActorAsync(this.GetItem(3).GetOwner())),
      await Promise.all(t);
  }
  Refresh(t, e, i) {
    var r;
    (this.Pbc = t),
      this.Lbc.SetActive(this.xbc()),
      this.wbc.SetActive(this.Dbc()),
      this.Rbc.SetActive(this.Ubc()),
      this.Abc.SetActive(this.Bbc()),
      this.xbc() &&
        ((r = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(
          t.ChosenId,
        )),
        this.Lbc.Refresh(r)),
      this.Dbc() && this.wbc.Refresh(t),
      this.Ubc() &&
        ((r = ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(
          t.SubEndingId,
        )),
        this.Rbc.Refresh(r)),
      this.Bbc() && this.Abc.Refresh(t);
  }
  xbc() {
    return (
      2 === this.Pbc.Type &&
      this.Pbc.Id !==
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
          .CurHandlingStepId
    );
  }
  Dbc() {
    return this.Pbc.HasText;
  }
  Ubc() {
    return (
      3 === this.Pbc.Type &&
      5 ===
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState()
    );
  }
  Bbc() {
    var t =
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.GetCurState();
    return (
      2 === this.Pbc.Type &&
      this.Pbc.Id ===
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
          .CurHandlingStepId &&
      (4 === t || 8 === t)
    );
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length) {
      var e,
        i = t[0];
      if ("ChoicesSelect" === i && 1 < this.Pbc.ChoiceIds.length)
        if (this.Bbc()) return [(e = this.GetItem(3)), e];
      return "FirstChoice" === i && this.Bbc()
        ? this.Abc?.GetGuideUiItemAndUiItemForShowEx(t)
        : void 0;
    }
  }
}
exports.CiacconaGalStepItemContainer = CiacconaGalStepItemContainer;
//# sourceMappingURL=CiacconaGalStepItemContainer.js.map
