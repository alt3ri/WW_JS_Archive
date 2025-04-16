"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateItemPanelA = void 0);
const UE = require("ue"),
  CountryById_1 = require("../../../../../Core/Define/ConfigQuery/CountryById"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateItemPanelA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RYa = void 0),
      (this.kqe = () => {
        this.Ilh(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapFirstNavigateSelect,
            this.RYa,
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
    var e = (this.RYa = e).CountryId,
      e = CountryById_1.configCountryById.GetConfig(e),
      t = this.GetText(1),
      t = (LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title), this.GetTexture(2)),
      e = (this.SetTextureByPath(e.Logo, t), this.RYa.HasState);
    4 === this.RYa.RefreshType && this.Ilh(), this.GetItem(3).SetUIActive(e);
  }
  Ilh() {
    var e = this.GetExtendToggle(0);
    this.RYa.IsSelected ? e.SetToggleState(1) : e.SetToggleState(0);
  }
}
exports.QuickNavigateItemPanelA = QuickNavigateItemPanelA;
//# sourceMappingURL=QuickNavigateItemPanelA.js.map
