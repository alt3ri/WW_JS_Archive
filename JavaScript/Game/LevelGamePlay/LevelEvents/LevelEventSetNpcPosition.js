"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetNpcPosition = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetNpcPosition extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      const t = e;
      const r = new UE.Vector(0, 0, 0);
      const n = new UE.Rotator(0, 0, 0);
      for (const v of t.EntityData) {
        let i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          v.EntityId,
        );
        if (!i)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                27,
                "通过事件设置NPC坐标时找不到实体：pbDataId: " + v.EntityId,
              ),
            void this.Failure()
          );
        i = i.Entity.GetComponent(3);
        void 0 !== v.Pos.X &&
          void 0 !== v.Pos.Y &&
          void 0 !== v.Pos.Z &&
          (r.Set(v.Pos.X, v.Pos.Y, v.Pos.Z),
          t.IsCenterPosition ||
            (r.Z += i.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
          i.SetActorLocation(
            r,
            "关卡事件{LevelEventSetNpcPosition}.设置NPC的位置",
            !1,
          )),
          void 0 !== v.Pos.A &&
            ((n.Yaw = v.Pos.A),
            i.SetInputRotator(n),
            i.SetActorRotation(
              n,
              "关卡事件{LevelEventSetNpcPosition}.设置NPC的朝向",
              !1,
            ));
      }
    }
  }
}
exports.LevelEventSetNpcPosition = LevelEventSetNpcPosition;
// # sourceMappingURL=LevelEventSetNpcPosition.js.map
