"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaShowItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  MapAreaOnlyShowItem_1 = require("./MapAreaOnlyShowItem");
class MapAreaShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.xOl = void 0),
      (this.i4i = void 0),
      (this.kOl = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Map", 69, "click area", ["id", this.xOl.AreaId]),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MapAreaShowClickArea,
            this.xOl.AreaId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [3, UE.UIText],
      [2, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kOl]]);
  }
  async OnBeforeStartAsync() {
    (this.i4i = new MapAreaOnlyShowItem_1.MapAreaOnlyShowItem()),
      await this.i4i.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {}
  Refresh(e, t, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Map",
        69,
        this.constructor.name,
        ["AreaId", e.AreaId],
        [
          "AreaName",
          ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(
            e.GetNameId(),
          ),
        ],
        ["GIndex", r],
      );
    var i = this.GetText(2);
    (this.xOl = e),
      this.GetText(3)?.ShowTextNew(e.GetNameId()),
      i.SetText(e.GetProgress() + "%"),
      i.SetChangeColor(e.IsReachMaxProgress, i.changeColor),
      this.GOl(),
      this.i4i?.Refresh(e.GetIconPercentDataAreaShow(), r),
      e.SaveLocalIconPercentAreaShow();
  }
  GOl() {
    var e = this.xOl.HasCanTakeStageReward();
    this.GetItem(4)?.SetUIActive(e);
  }
  OnBeforeDestroy() {}
}
exports.MapAreaShowItem = MapAreaShowItem;
//# sourceMappingURL=MapAreaShowItem.js.map
