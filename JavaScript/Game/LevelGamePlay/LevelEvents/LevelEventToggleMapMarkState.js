"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventToggleMapMarkState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleMapMarkState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.tUe = (e) => {
        "WorldMapView" === e &&
          (this.Finish(),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.tUe,
          ));
      });
  }
  ExecuteNew(e, r) {
    var a = e;
    if (a)
      switch (a.Type) {
        case IAction_1.EMapMarkState.Show:
          var n = a;
          if (this.iUe(n.MarkId) && n.IsFocusOnFirstShow) {
            var t = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
              n.MarkId,
            );
            if (t.IsShow && t.NeedFocus) {
              t.NeedFocus = !1;
              t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
                n.MarkId,
              );
              if (!t)
                return (
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Map", 49, "缺少MapMark表缺少地图配置", [
                      "MarkId",
                      n.MarkId,
                    ]),
                  void this.Finish()
                );
              n = {
                MarkId: n.MarkId,
                MarkType: t.ObjectType,
                IsNotFocusTween: !0,
              };
              if (
                (UiManager_1.UiManager.OpenView("WorldMapView", n, () => {
                  ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                    0,
                  ),
                    this.IsAsync ||
                      EventSystem_1.EventSystem.Add(
                        EventDefine_1.EEventName.CloseView,
                        this.tUe,
                      );
                }),
                !this.IsAsync)
              )
                return;
            }
          }
          break;
        case IAction_1.EMapMarkState.Hide:
          this.iUe(a.MarkId);
      }
    this.Finish();
  }
  iUe(e) {
    return (
      -1 ===
      ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)?.ShowCondition
    );
  }
}
exports.LevelEventToggleMapMarkState = LevelEventToggleMapMarkState;
//# sourceMappingURL=LevelEventToggleMapMarkState.js.map
