"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSpawnEffect = void 0);
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSpawnEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(t, e) {
    if (t) {
      const l = t;
      let e = void 0;
      let a = void 0;
      let r = void 0;
      switch (l.Pos2.Type) {
        case 2:
          a = l.Pos2.Pos;
          break;
        case 1:
          var o = l.Pos2.EntityId;
          var o =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
          (r = o?.Entity?.GetComponent(1)?.ActorLocationProxy),
            (e = l.Pos2.Offset);
          break;
        case 0:
          o =
            Global_1.Global.BaseCharacter?.CharacterActorComponent
              ?.ActorLocationProxy;
          o && (r = Vector_1.Vector.Create(o.X, o.Y, o.Z)), (e = l.Pos2.Offset);
      }
      (t = Vector_1.Vector.Create(0, 0, 0)),
        (t =
          (e && t.Set(e.X, e.Y, e.Z),
          (r = a ? Vector_1.Vector.Create(a.X ?? 0, a.Y ?? 0, a.Z ?? 0) : r) &&
            t.AdditionEqual(r),
          Transform_1.Transform.Create(
            Quat_1.Quat.IdentityProxy,
            t,
            Vector_1.Vector.OneVectorProxy,
          )));
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
        GlobalData_1.GlobalData.World,
        t.ToUeTransform(),
        l.Path,
        "[LevelEventSpawnEffect.ExecuteNew]",
      );
    }
  }
}
exports.LevelEventSpawnEffect = LevelEventSpawnEffect;
// # sourceMappingURL=LevelEventSpawnEffect.js.map
