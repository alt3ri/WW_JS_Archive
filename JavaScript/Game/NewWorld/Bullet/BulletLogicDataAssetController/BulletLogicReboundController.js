"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicReboundController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  BulletController_1 = require("../BulletController"),
  BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction"),
  BulletLogicController_1 = require("./BulletLogicController"),
  OUTER_RADIUS = 100;
class BulletLogicReboundController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.n$t = void 0),
      (this.a7o = void 0),
      (this.n$t = e.GetComponent(154)),
      (this.a7o = this.Bullet.GetBulletInfo());
  }
  OnInit() {
    this.Bullet.GetBulletInfo().BulletDataMain.Execution.ReboundBitMask |=
      this.LogicController.ReboundBitMask;
  }
  BulletLogicAction(t) {
    var e = t.BulletDataMain.Logic.ReboundChannel;
    if (!((this.LogicController.ReboundBitMask & e) <= 0)) {
      this.LogicController.EffectRebound &&
        UE.KismetSystemLibrary.IsValidSoftObjectReference(
          this.LogicController.EffectRebound,
        ) &&
        ((t = (e = t.Attacker).GetComponent(52)),
        (e = e.GetComponent(3)),
        (r = UE.KismetMathLibrary.TransformLocation(
          e.ActorTransform,
          this.LogicController.PositionOffset,
        )),
        (e = UE.KismetMathLibrary.TransformRotation(
          e.ActorTransform,
          this.LogicController.RotationOffset,
        )),
        (e = new UE.Transform(e, r, Vector_1.Vector.OneVector)),
        t.OnReboundSuccess(this.LogicController.EffectRebound, e)),
        this.LogicController.ScreenShake &&
          UE.KismetSystemLibrary.IsValidSoftClassReference(
            this.LogicController.ScreenShake,
          ) &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.LogicController.ScreenShake.ToAssetPathName(),
            UE.Class,
            (t) => {
              var e =
                Global_1.Global.CharacterCameraManager.GetCameraLocation();
              CameraController_1.CameraController.PlayWorldCameraShake(
                t,
                e,
                0,
                OUTER_RADIUS,
                1,
                !1,
              );
            },
          ),
        this.LogicController.CameraModified &&
          CameraController_1.CameraController.FightCamera.GetComponent(
            5,
          ).ApplyCameraModify(
            void 0,
            this.LogicController.CameraModified.持续时间,
            this.LogicController.CameraModified.淡入时间,
            this.LogicController.CameraModified.淡出时间,
            this.LogicController.CameraModified.摄像机配置,
            void 0,
          );
      var r,
        o = this.LogicController.BulletRowName.Num(),
        l = this.a7o.ContextId;
      for (let t = 0; t < o; t++) {
        var i = this.LogicController.BulletRowName.Get(t),
          i = BulletController_1.BulletController.CreateBulletCustomTarget(
            this.a7o.AttackerActorComp.Actor,
            i,
            this.n$t.ActorTransform,
            {
              SyncType: 1,
              ParentId: this.Bullet.Id,
              SkillId: this.a7o.BulletInitParams.SkillId,
              Source: Protocol_1.Aki.Protocol.C4s.Proto_ReboundSource,
              DtType: this.a7o.BulletInitParams.DtType,
            },
            l,
          );
        i?.Valid &&
          (i = i.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect &&
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(
            this.a7o,
            i,
          );
      }
    }
  }
}
exports.BulletLogicReboundController = BulletLogicReboundController;
//# sourceMappingURL=BulletLogicReboundController.js.map
