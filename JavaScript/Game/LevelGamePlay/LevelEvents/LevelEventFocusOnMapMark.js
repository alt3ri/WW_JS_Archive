"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFocusOnMapMark = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WorldMapController_1 = require("../../Module/WorldMap/WorldMapController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFocusOnMapMark extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    var a = e;
    if (a)
      switch (a.MapMarkType.Type) {
        case IAction_1.EMapMarkType.Custom:
          this.vu_(a.MapMarkType);
          break;
        case IAction_1.EMapMarkType.Quest:
          this.yu_(a.MapMarkType);
          break;
        default:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              63,
              "[LevelEventFocusOnMapMark]未定义类型",
              ["MapMarkType", a.MapMarkType.Type],
            ),
            this.Finish();
      }
    else this.Finish();
  }
  vu_(e) {
    var e = e.MarkId,
      r = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(e);
    void 0 === r
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          63,
          "[LevelEventFocusOnMapMark]HandleCustomMapFocus->找不到对应的标记配置",
          ["markId", e],
        )
      : ((e = { MarkId: e, MarkType: r.ObjectType }),
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
          2,
          !1,
          e,
        )),
      this.Finish();
  }
  yu_(e) {
    const r = e.QuestId;
    var e = ModelManager_1.ModelManager.MapModel.GetMarkByQuestId(r);
    void 0 === e
      ? WorldMapController_1.WorldMapController.StartListenChildQuestNodeStatusChangedAndOpenWorldMap(
          r,
        )
      : ((e = { MarkId: e.MarkId, MarkType: e.MarkType }),
        ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
          2,
          !1,
          e,
          () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.WorldMapOpenedForQuestMapFocus,
              r,
            );
          },
        )),
      this.Finish();
  }
}
exports.LevelEventFocusOnMapMark = LevelEventFocusOnMapMark;
//# sourceMappingURL=LevelEventFocusOnMapMark.js.map
