"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapQuickNavigateComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapQuickNavigateComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.YNl = (e) =>
        this.NavigateTo(e.MarkId, e.MarkType, e.Focal, e.FocusTween)),
      (this.NavigateTo = (e, t, n = !1, a = !0) => {
        var o = this.GetNavigateMarkIsNeedChangeMap(e, t);
        return void 0 !== o.MapId
          ? (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChangeWorldMap,
              {
                MarkId: e,
                MarkType: t,
                MapId: o.MapId,
                Focal: n,
                FocusTween: a,
                Gravity: o.Gravity,
              },
            ),
            !0)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapFocalMarkItem,
              e,
              t,
              n,
              a,
            ),
            !1);
      });
  }
  get ComponentType() {
    return 7;
  }
  OnEnable() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldMapNavigate,
      this.YNl,
    );
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldMapNavigate,
      this.YNl,
    );
  }
  GetNavigateMarkIsNeedChangeMap(e, t) {
    var n = this.Parent.Map,
      a = n.GetMarkItem(t, e),
      o = a
        ? a.MapId
        : ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, t),
      a = a
        ? a.MarkItemEntity.GamePlay.Gravity
        : ModelManager_1.ModelManager.MapModel.GetMarkMapGravity(e, t),
      e = o !== n.MapId ? o : void 0,
      t =
        (a = ModelManager_1.ModelManager.WorldMapModel.GetFinalWorldMapGravity(
          e ?? n.MapId,
          a,
        )) !== n.MapGravity
          ? a
          : void 0;
    return void 0 !== t ? { MapId: e ?? n.MapId, Gravity: t } : { MapId: e };
  }
}
exports.WorldMapQuickNavigateComponent = WorldMapQuickNavigateComponent;
//# sourceMappingURL=WorldMapQuickNavigateComponent.js.map
