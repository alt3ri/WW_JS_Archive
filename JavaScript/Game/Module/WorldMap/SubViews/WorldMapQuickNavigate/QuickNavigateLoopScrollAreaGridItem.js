"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateLoopScrollAreaGridItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ExploreProgressDefine_1 = require("../../../ExploreProgress/ExploreProgressDefine"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class QuickNavigateLoopScrollAreaGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.kqe = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
          this.GridIndex,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[3, this.kqe]]);
  }
  Refresh(e, r, t) {
    var i = e.AreaNavigateInfo.AreaId,
      s = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i),
      e =
        (this._Ka(s.Title),
        (1 !== e.RefreshType && 2 !== e.RefreshType && 4 !== e.RefreshType) ||
          ((s = this.GetExtendToggle(3)),
          e.IsSelected ? s.SetToggleState(1) : s.SetToggleState(0)),
        MapUtil_1.MapUtil.GetWorldMapAreaId(
          ExploreProgressDefine_1.AREA_LEVEL,
        )),
      s = e === i;
    this.GetItem(0).SetUIActive(s);
  }
  _Ka(e) {
    var r = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, e);
  }
}
exports.QuickNavigateLoopScrollAreaGridItem =
  QuickNavigateLoopScrollAreaGridItem;
//# sourceMappingURL=QuickNavigateLoopScrollAreaGridItem.js.map
