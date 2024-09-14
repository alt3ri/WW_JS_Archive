"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateItemPanelA = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PreloadConfigStatementPart2_1 = require("../../../../Preload/PreloadConfigStatementPart2"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateItemPanelA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.hKa = void 0),
      (this.kqe = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
          this.hKa,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  RefreshByData(e) {
    var t = (this.hKa = e).CountryId,
      t = PreloadConfigStatementPart2_1.configCountryById.GetConfig(t),
      i = this.GetText(1),
      i = (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.Title), this.GetTexture(2)),
      t = (this.SetTextureByPath(t.Logo, i), this.hKa.HasState);
    4 === this.hKa.RefreshType &&
      ((i = this.GetExtendToggle(0)),
      e.IsSelected ? i.SetToggleState(1) : i.SetToggleState(0),
      (i.bLockStateOnSelect = !t)),
      this.GetItem(3).SetUIActive(t);
  }
}
exports.QuickNavigateItemPanelA = QuickNavigateItemPanelA;
//# sourceMappingURL=QuickNavigateItemPanelA.js.map
