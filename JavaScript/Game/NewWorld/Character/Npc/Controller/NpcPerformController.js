"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TypeCheckUtil_1 = require("../../../../Common/TypeCheckUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PerformAction_1 = require("../../Common/Component/Performance/PerformAction");
class NpcPerformController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(29146, this.SetPerformStateNotify),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMark,
        this.OnTrackMark,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UnTrackMark,
        this.OnUnTrackMark,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      Net_1.Net.UnRegister(29146),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMark,
        this.OnTrackMark,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UnTrackMark,
        this.OnUnTrackMark,
      ),
      !0
    );
  }
  static ForceSetNpcDitherVisible(e, r, t) {
    e
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            26,
            "[ForceNpcDither] 强制设置NPC在显示范围内",
            ["PbDataId", r],
            ["reason", t],
          ),
        this.ForceNpcDitherVisibleMap.has(r)
          ? this.ForceNpcDitherVisibleMap.get(r).add(t)
          : (this.ForceNpcDitherVisibleMap.set(r, new Set([t])),
            (e =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))
              ?.IsInit && e.Entity.GetComponent(184)?.SetForceInShowRange(!0)))
      : this.ForceNpcDitherVisibleMap.has(r) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            26,
            "[ForceNpcDither] 取消强制设置NPC在显示范围内",
            ["PbDataId", r],
            ["reason", t],
          ),
        (e = this.ForceNpcDitherVisibleMap.get(r)).delete(t),
        0 < e.size ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("NPC", 26, "[ForceNpcDither] NPC恢复显示范围处理", [
              "PbDataId",
              r,
            ]),
          this.ForceNpcDitherVisibleMap.delete(r),
          (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))
            ?.IsInit && t.Entity.GetComponent(184)?.SetForceInShowRange(!1)));
  }
  static OnLeaveLevel() {
    return PerformAction_1.PerformActionPool.Clear(), !0;
  }
}
(exports.NpcPerformController = NpcPerformController),
  ((_a = NpcPerformController).ForceNpcDitherVisibleMap = new Map()),
  (NpcPerformController.SetPerformStateNotify = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    r?.Entity?.IsInit &&
      r.Entity.GetComponent(185).PerformGroupController.SwitchPerformState(
        e.Y4n,
      );
  }),
  (NpcPerformController.OnTrackMark = (e) => {
    (0, TypeCheckUtil_1.isNumber)(e.TrackTarget) &&
      (e = e.TrackTarget) &&
      _a.ForceSetNpcDitherVisible(!0, e, 0);
  }),
  (NpcPerformController.OnUnTrackMark = (e) => {
    e = e.TrackTarget;
    e && _a.ForceSetNpcDitherVisible(!1, e, 0);
  });
//# sourceMappingURL=NpcPerformController.js.map
