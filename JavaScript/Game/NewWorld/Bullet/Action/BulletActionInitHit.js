"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitHit = exports.SELF_NUMBER = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletActionBase_1 = require("./BulletActionBase");
const FRIEND_NUMBER = ((exports.SELF_NUMBER = 1), 2);
const TEAM_NUMBER = 3;
const ENEMY_NUMBER = 4;
const PLAYER_GROUP_NUMBER = 11;
const campNumbers = [
  exports.SELF_NUMBER,
  FRIEND_NUMBER,
  ENEMY_NUMBER,
  TEAM_NUMBER,
  PLAYER_GROUP_NUMBER,
];
const collisionChannelToObjectTypeQueryMap = new Map([
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
    let e;
    const i = this.BulletInfo.BulletDataMain;
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
    let e;
    let i;
    const t = this.e5o();
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
    return this.BulletInfo.AttackerCamp === 0
      ? QueryTypeDefine_1.KuroCollisionChannel.PawnPlayer
      : this.BulletInfo.AttackerCamp === 1
        ? QueryTypeDefine_1.KuroCollisionChannel.PawnMonster
        : QueryTypeDefine_1.KuroCollisionChannel.Pawn;
  }
}
exports.BulletActionInitHit = BulletActionInitHit;
// # sourceMappingURL=BulletActionInitHit.js.map
