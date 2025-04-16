"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepChoiceList = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CiacconaGalStepChoiceItem_1 = require("./CiacconaGalStepChoiceItem");
class CiacconaGalStepChoiceList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Ibc = []),
      (this.Pbc = void 0),
      (this.Tbc = void 0),
      (this.bbc = () => {
        return new CiacconaGalStepChoiceItem_1.CiacconaGalStepChoiceItem();
      }),
      (this.AOe = () => {
        this.Pbc && this.Refresh(this.Pbc);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Tbc = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.bbc,
    )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaChapterDataUpdate,
        this.AOe,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCiacconaChapterDataUpdate,
      this.AOe,
    );
  }
  Refresh(e) {
    this.Pbc = e;
    let t = !(this.Ibc = []);
    for (const s of e.ChoiceIds) {
      var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(s);
      this.Ibc.push(i), i.NeedInspiration && (t = !0);
    }
    t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCiacconaAvgInspirationChoiceShow,
        !0,
      ),
      this.Tbc.RefreshByData(this.Ibc);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length && "FirstChoice" === e[0] && 1 < this.Ibc.length) {
      e = this.Tbc?.GetGridByDisplayIndex(0);
      if (e) return [e, e];
    }
  }
}
exports.CiacconaGalStepChoiceList = CiacconaGalStepChoiceList;
//# sourceMappingURL=CiacconaGalStepChoiceList.js.map
