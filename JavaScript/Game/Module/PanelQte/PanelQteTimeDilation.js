"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteTimeDilation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MAX_TIME_SCALE_TIME = 20,
  TIME_SCALE_PRIORITY = 100;
class PanelQteTimeDilation {
  constructor() {
    (this.ROi = 0), (this.UOi = 0), (this.sDe = void 0), (this.Hhn = 0);
  }
  Init() {
    (this.ROi = 1), (this.UOi = 1);
  }
  Clear() {}
  Start(t) {
    (this.ROi = t.Config.WorldTimeDilation),
      1 <= this.ROi || this.ROi < 0
        ? (this.ROi = 1)
        : ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("PanelQte", 18, "联机下界面QTE只时停自己"),
            (this.UOi = this.ROi),
            (this.ROi = 1),
            (this.sDe =
              ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity),
            this.sDe?.IsInit &&
              (t = this.sDe.Entity.GetComponent(110)) &&
              (this.Hhn = t.SetTimeScale(
                TIME_SCALE_PRIORITY,
                this.UOi,
                void 0,
                MAX_TIME_SCALE_TIME,
                7,
              )))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("PanelQte", 18, "界面QTE时停开始"),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
              this.ROi,
            ));
  }
  Stop() {
    var t;
    1 !== this.ROi &&
      ((this.ROi = 1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("PanelQte", 18, "界面QTE时停结束"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
        this.ROi,
      )),
      1 !== this.UOi &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("PanelQte", 18, "联机下界面QTE时停结束"),
        (this.UOi = 1),
        this.sDe?.IsInit &&
          0 < this.Hhn &&
          (t = this.sDe.Entity.GetComponent(110)) &&
          t.RemoveTimeScale(this.Hhn),
        (this.sDe = void 0),
        (this.Hhn = 0));
  }
  GetWorldTimeDilation() {
    return this.ROi;
  }
  GetEntityTimeDilation() {
    return this.UOi;
  }
}
exports.PanelQteTimeDilation = PanelQteTimeDilation;
//# sourceMappingURL=PanelQteTimeDilation.js.map
