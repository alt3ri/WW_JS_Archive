"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentInfoList = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class PopupComponentInfoList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ItemLayout = void 0),
      (this.ro1 = () => {
        return new InfoItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.ItemLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.ro1,
    );
  }
  SetTextByTextId(e, ...t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, t);
  }
  Refresh(e) {
    if (0 === e.OccupiedEffectIdList.length) this.SetActive(!1);
    else {
      var t = e.IsExplore,
        i =
          (this.SetTextByTextId(
            t ? "RogueRes_Block_Captured_Buff" : "RogueRes_Block_Capture_Buff",
          ),
          []);
      for (const o of e.OccupiedEffectIdList) {
        var r,
          s =
            ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectById(o);
        s &&
          (r =
            ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectTagById(
              s.Tag,
            )) &&
          ((s = r.IsRatio ? s.DescIntParam + "%" : s.DescIntParam.toString()),
          (r = { TitleId: r.Text, Value: s, ValueChangeColor: t }),
          i.push(r));
      }
      this.ItemLayout.RefreshByData(i);
    }
  }
}
exports.PopupComponentInfoList = PopupComponentInfoList;
class InfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    var r = this.GetText(0),
      s = this.GetText(1);
    s.SetChangeColor(e.ValueChangeColor, s.changeColor),
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.TitleId),
      s.SetText(e.Value);
  }
}
//# sourceMappingURL=PopupComponentInfoList.js.map
