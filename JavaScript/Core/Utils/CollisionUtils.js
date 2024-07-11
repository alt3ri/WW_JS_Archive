"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollisionUtils = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../Define/QueryTypeDefine");
class CollisionUtils {
  static GetCollisionResponseContainer() {
    return (
      UE.KismetSystemLibrary.SetAllChannels(this.DJ, 0),
      (0, puerts_1.$unref)(this.DJ)
    );
  }
  static SetCollisionResponseToPawn(e, i, s) {
    let r = [];
    i === 0
      ? (r = r.concat([
          QueryTypeDefine_1.KuroCollisionChannel.Pawn,
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
          QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
        ]))
      : i === 1
        ? r.push(QueryTypeDefine_1.KuroCollisionChannel.Pawn)
        : i === 2
          ? r.push(QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer)
          : i === 3 &&
            r.push(QueryTypeDefine_1.KuroCollisionChannel.PawnMonster);
    for (const t of r) e.SetCollisionResponseToChannel(t, s);
  }
}
(exports.CollisionUtils = CollisionUtils).DJ = (0, puerts_1.$ref)(void 0);
// # sourceMappingURL=CollisionUtils.js.map
