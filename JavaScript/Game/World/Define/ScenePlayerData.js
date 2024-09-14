"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScenePlayerData = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TIME_INTERVAL = 1e3;
class ScenePlayerData {
  constructor(e) {
    (this.j8 = 0),
      (this.UAe = void 0),
      (this.bvr = !1),
      (this.qvr = void 0),
      (this.j8 = e),
      (this.UAe = Vector_1.Vector.Create());
  }
  Clear() {
    (this.j8 = 0),
      (this.UAe = void 0),
      this.qvr && TimerSystem_1.TimerSystem.Remove(this.qvr);
  }
  SetTimerStart() {
    this.qvr ||
      (this.qvr = TimerSystem_1.TimerSystem.Forever(() => {
        this.SetLocation();
      }, TIME_INTERVAL));
  }
  GetPlayerId() {
    return this.j8;
  }
  SetRemoteSceneLoading(e) {
    this.bvr = e;
  }
  IsRemoteSceneLoading() {
    return this.bvr;
  }
  SetLocation() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(
      this.j8,
    )
      ?.GetCurrentGroup()
      ?.GetCurrentRole()?.CreatureDataId;
    e &&
      ((e =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          e,
        )?.Entity?.GetComponent(3)?.ActorLocationProxy)
        ? ((this.UAe.X = e.X),
          (this.UAe.Y = e.Y),
          (this.UAe.Z = e.Z),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScenePlayerLocationChanged,
            this.j8,
            this.UAe,
          ))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
            this.j8,
            !1,
          ));
  }
  GetLocation() {
    return ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === this.j8
      ? Global_1.Global.BaseCharacter
        ? Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorLocationProxy
        : void 0
      : this.UAe;
  }
}
exports.ScenePlayerData = ScenePlayerData;
//# sourceMappingURL=ScenePlayerData.js.map
