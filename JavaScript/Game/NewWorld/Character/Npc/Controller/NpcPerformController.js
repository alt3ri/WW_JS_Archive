"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class NpcPerformController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(17134, this.SetPerformStateNotify),
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
      Net_1.Net.UnRegister(17134),
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
            27,
            "[ForceNpcDither] 强制设置NPC在显示范围内",
            ["PbDataId", r],
            ["reason", t],
          ),
        this.ForceNpcDitherVisibleMap.has(r)
          ? this.ForceNpcDitherVisibleMap.get(r).add(t)
          : (this.ForceNpcDitherVisibleMap.set(r, new Set([t])),
            (e =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))
              ?.IsInit &&
              (e = e.Entity.GetComponent(171)) &&
              ((e.IsForceInShowRange = !0), e.TrySetNpcDither(!0))))
      : this.ForceNpcDitherVisibleMap.has(r) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            27,
            "[ForceNpcDither] 取消强制设置NPC在显示范围内",
            ["PbDataId", r],
            ["reason", t],
          ),
        (e = this.ForceNpcDitherVisibleMap.get(r)).delete(t),
        0 < e.size ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("NPC", 27, "[ForceNpcDither] NPC恢复显示范围处理", [
              "PbDataId",
              r,
            ]),
          this.ForceNpcDitherVisibleMap.delete(r),
          (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r))
            ?.IsInit &&
            (e = t.Entity.GetComponent(171)) &&
            ((r = t.Entity.GetComponent(1)),
            (e.IsForceInShowRange = !1),
            e.GetNpcShowRange() <
              Vector_1.Vector.Dist(
                r.ActorLocationProxy,
                Global_1.Global.BaseCharacter.CharacterActorComponent
                  .ActorLocationProxy,
              )) &&
            e.TrySetNpcDither(!1)));
  }
}
(exports.NpcPerformController = NpcPerformController),
  ((_a = NpcPerformController).ForceNpcDitherVisibleMap = new Map()),
  (NpcPerformController.SetPerformStateNotify = (e) => {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      MathUtils_1.MathUtils.LongToNumber(e.F4n),
    );
    r?.Entity?.IsInit &&
      r.Entity.GetComponent(172).PerformGroupController.SwitchPerformState(
        e.Y4n,
      );
  }),
  (NpcPerformController.OnTrackMark = (e) => {
    5 === e.TrackSource &&
      (e = e.TrackTarget) &&
      _a.ForceSetNpcDitherVisible(!0, e, 0);
  }),
  (NpcPerformController.OnUnTrackMark = (e) => {
    5 === e.TrackSource &&
      (e = e.TrackTarget) &&
      _a.ForceSetNpcDitherVisible(!1, e, 0);
  });
//# sourceMappingURL=NpcPerformController.js.map
