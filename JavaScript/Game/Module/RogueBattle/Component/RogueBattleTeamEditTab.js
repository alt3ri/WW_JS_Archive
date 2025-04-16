"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTeamEditTab = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
class RogueBattleTeamEditTab extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.Bke = (t) => {
        1 === t && this.SelectedCallBack(this.GridIndex);
      }),
      (this.RefreshTransition = () => {
        var t = this.GetUiExtendToggleSpriteTransition(3);
        t && t.SetAllStateSprite(this.GetSprite(0).GetSprite());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIExtendToggleSpriteTransition],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Bke]]);
  }
  OnStart() {
    super.OnStart(),
      this.GetTabToggle().SetToggleState(0, !1),
      this.GetItem(2).SetUIActive(!1);
  }
  OnRefresh(t, e, s) {
    this.UpdateTabIcon(t.Data.GetIcon());
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(
      t,
      this.GetSprite(0),
      !1,
      void 0,
      this.RefreshTransition,
    );
  }
  OnSetToggleState(t, e) {
    this.GetTabToggle().SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.RogueBattleTeamEditTab = RogueBattleTeamEditTab;
//# sourceMappingURL=RogueBattleTeamEditTab.js.map
