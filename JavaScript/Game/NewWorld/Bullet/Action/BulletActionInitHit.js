"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitHit = exports.SELF_NUMBER = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletActionBase_1 = require("./BulletActionBase"),
  FRIEND_NUMBER = ((exports.SELF_NUMBER = 1), 2),
  TEAM_NUMBER = 3,
  ENEMY_NUMBER = 4,
  PLAYER_GROUP_NUMBER = 11,
  campNumbers = [
    exports.SELF_NUMBER,
    FRIEND_NUMBER,
    ENEMY_NUMBER,
    TEAM_NUMBER,
    PLAYER_GROUP_NUMBER,
  ],
  collisionChannelToObjectTypeQueryMap = new Map([
    [
      QueryTypeDefine_1.KuroCollisionChannel.Pawn,
      QueryTypeDefine_1.KuroObjectTypeQuery.Pawn,
    ],
    [
      QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer,
      QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
    ],
    [
      QueryTypeDefine_1.KuroCollisionChannel.PawnMonster,
      QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
    ],
  ]);
class BulletActionInitHit extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e,
      i = this.BulletInfo.BulletDataMain;
    (this.BulletInfo.CountByParent = i.Base.ShareCounter),
      this.BulletInfo.CountByParent &&
        ((e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
          this.BulletInfo.ParentEntityId,
        ))
          ? (e = e.GetBulletInfo()) &&
            (((this.BulletInfo.ParentBulletInfo =
              e).NeedNotifyChildrenWhenDestroy = !0),
            e.ChildEntityIds || (e.ChildEntityIds = []),
            e.ChildEntityIds.push(this.BulletInfo.BulletEntityId))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "子弹勾选了共享父子弹次数，但是生成时没有父子弹",
              ["BulletEntityId", this.BulletInfo.BulletEntityId],
              ["BulletRowName", this.BulletInfo.BulletRowName],
            )),
      i.Base.DaHitTypePreset
        ? (this.BulletInfo.BulletCamp = i.Base.BulletCamp)
        : (this.BulletInfo.BulletCamp = campNumbers[i.Base.HitType]),
      this.Z4o();
  }
  Z4o() {
    var e,
      i,
      t = this.e5o();
    t !== QueryTypeDefine_1.KuroCollisionChannel.Pawn &&
      ((e = this.BulletInfo.CollisionInfo),
      this.BulletInfo.BulletCamp & ENEMY_NUMBER ||
        ((i =
          QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer +
          QueryTypeDefine_1.KuroCollisionChannel.PawnMonster -
          t),
        e.IgnoreChannels.add(i),
        e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(i))),
      this.BulletInfo.BulletCamp & TEAM_NUMBER ||
        (e.IgnoreChannels.add(t),
        e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(t))),
      this.BulletInfo.BulletCamp === exports.SELF_NUMBER) &&
      ((i = QueryTypeDefine_1.KuroCollisionChannel.Pawn),
      e.IgnoreChannels.add(i),
      e.IgnoreQueries.add(collisionChannelToObjectTypeQueryMap.get(i)));
  }
  e5o() {
    return 0 === this.BulletInfo.AttackerCamp
      ? QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer
      : 1 === this.BulletInfo.AttackerCamp
        ? QueryTypeDefine_1.KuroCollisionChannel.PawnMonster
        : QueryTypeDefine_1.KuroCollisionChannel.Pawn;
  }
}
exports.BulletActionInitHit = BulletActionInitHit;
//# sourceMappingURL=BulletActionInitHit.js.map
