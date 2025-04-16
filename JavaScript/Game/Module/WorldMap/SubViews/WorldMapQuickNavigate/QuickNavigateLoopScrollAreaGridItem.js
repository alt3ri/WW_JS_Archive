"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateLoopScrollAreaGridItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapUtil_1 = require("../../../Map/MapUtil"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapDefine_1 = require("../../WorldMapDefine");
class QuickNavigateLoopScrollAreaGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.kqe = () => {
        this.Ilh(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WorldMapSecondNavigateSelect,
            this.GridIndex,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
      [4, UE.UIHorizontalLayout],
      [5, UE.UISprite],
      [6, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[3, this.kqe]]);
  }
  OnStart() {
    (this.GetExtendToggle(3).bLockStateOnSelect = !1),
      this.GetSprite(5).SetUIActive(!1),
      this.GetSprite(6).SetUIActive(!1);
  }
  Refresh(e, t, i) {
    var r = (this.Pe = e).AreaNavigateInfo.AreaId,
      a = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r),
      a =
        (this.UYa(a.Title),
        (1 !== e.RefreshType && 2 !== e.RefreshType && 4 !== e.RefreshType) ||
          this.Ilh(),
        MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId());
    a === r
      ? ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_IconCommonPlayer",
        )),
        this.GetSprite(0).SetUIActive(!0),
        this.SetSpriteByPath(e, this.GetSprite(0), !1))
      : ((a = ModelManager_1.ModelManager.ExploreProgressModel.TrackTaskAreaId),
        this.GetSprite(0).SetUIActive(a === r),
        a === r &&
          ((e =
            ModelManager_1.ModelManager.ExploreProgressModel.TrackTaskIconPath),
          this.SetSpriteByPath(e, this.GetSprite(0), !1)));
    const s =
      ModelManager_1.ModelManager.ExploreProgressModel.GetOnlinePlayerIndexListByAreaId(
        r,
      );
    [5, 6].forEach((e) => {
      var t = s.pop(),
        e = this.GetSprite(e),
        i = void 0 !== t;
      e.SetUIActive(i),
        i &&
          ((i = WorldMapDefine_1.onlinePlayerIconPathList2[t - 1]),
          (t =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i)),
          this.SetSpriteByPath(t, e, !1));
    });
  }
  UYa(e) {
    var t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  Ilh() {
    var e = this.GetExtendToggle(3);
    this.Pe.IsSelected ? e.SetToggleState(1) : e.SetToggleState(0);
  }
}
exports.QuickNavigateLoopScrollAreaGridItem =
  QuickNavigateLoopScrollAreaGridItem;
//# sourceMappingURL=QuickNavigateLoopScrollAreaGridItem.js.map
