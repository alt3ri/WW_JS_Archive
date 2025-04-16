"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreDetailItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapExploreDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.XOl = void 0),
      (this.lml = (e) => {
        1 === e &&
          (this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          ),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Map", 69, "Click ExploreItem", [
            "ExploreType",
            this.XOl.ExploreType,
          ]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [4, UE.UIText],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.lml]]);
  }
  Refresh(e, t, s) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Map",
        69,
        this.constructor.name,
        ["AreaId", e.AreaId],
        ["ExploreType", e.ExploreType],
        ["ExploreProgressId", e.ExploreProgressId],
        ["ConfigId", e.ConfigId],
        ["IsSelected", t],
        ["GridIndex", s],
      );
    var s = e.IsUnlocked(),
      i = this.GetText(4),
      r = this.GetText(3),
      s =
        ((this.XOl = e),
        this.GetItem(1)?.SetUIActive(!s),
        this.GetSprite(2)?.SetUIActive(s),
        r.SetUIActive(s),
        s
          ? (this.SetSpriteByPath(e.Icon, this.GetSprite(2), !1),
            i.ShowTextNew(e.GetNameId()),
            e.IsPercent()
              ? r.SetText(Math.floor(e.GetProgress()).toString() + "%")
              : r.SetText(e.GetCurrentCount() + "/" + e.GetTotalCount()),
            (s = e.IsCompleted()),
            i.SetChangeColor(s, i.changeColor),
            r.SetChangeColor(s, r.changeColor))
          : (i.ShowTextNew(e.LockDescId), i.SetChangeColor(!1, i.changeColor)),
        t ? 1 : 0);
    this.GetExtendToggle(0)?.SetToggleState(s);
  }
  OnSelected() {
    this.GetExtendToggle(0)?.SetToggleState(1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MapExploreDetailItemClick,
        this.XOl,
      );
  }
  OnDeselected(e) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  GetBtnRootItem() {
    return this.GetExtendToggle(0).RootUIComp;
  }
}
exports.MapExploreDetailItem = MapExploreDetailItem;
//# sourceMappingURL=MapExploreDetailItem.js.map
