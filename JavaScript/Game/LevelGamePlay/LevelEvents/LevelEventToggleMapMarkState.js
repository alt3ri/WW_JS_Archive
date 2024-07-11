"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventToggleMapMarkState = void 0);
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleMapMarkState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.tUe = (e) => {
        e === "WorldMapView" &&
          (this.Finish(),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.CloseView,
            this.tUe,
          ));
      });
  }
  ExecuteNew(e, r) {
    const a = e;
    if (a)
      switch (a.Type) {
        case IAction_1.EMapMarkState.Show:
          var t = a;
          if (this.iUe(t.MarkId) && t.IsFocusOnFirstShow) {
            let n = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
              t.MarkId,
            );
            if (n.IsShow && n.NeedFocus) {
              n.NeedFocus = !1;
              n = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(
                t.MarkId,
              );
              if (!n)
                return (
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Map", 50, "缺少MapMark表缺少地图配置", [
                      "MarkId",
                      t.MarkId,
                    ]),
                  void this.Finish()
                );
              t = {
                MarkId: t.MarkId,
                MarkType: n.ObjectType,
                IsNotFocusTween: !0,
              };
              if (
                (UiManager_1.UiManager.OpenView("WorldMapView", t, () => {
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
      ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)
        ?.ShowCondition === -1
    );
  }
}
exports.LevelEventToggleMapMarkState = LevelEventToggleMapMarkState;
// # sourceMappingURL=LevelEventToggleMapMarkState.js.map
