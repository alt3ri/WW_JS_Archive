"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitRender = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager"),
  SceneObjectAirWallEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectAirWallEffect"),
  CharacterUtils_1 = require("../../Character/CharacterUtils"),
  CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionInitRender extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.RKs = void 0);
  }
  OnExecute() {
    var e = this.BulletInfo.BulletDataMain,
      e =
        (e.Logic.InteractWithAirWall &&
          ((this.RKs =
            new SceneObjectAirWallEffect_1.SceneObjectAirWallEffect()),
          this.RKs.Start(this.BulletInfo.CollisionInfo.CollisionComponent),
          SceneInteractionManager_1.SceneInteractionManager.Get().RegisterAirWallEffectObject(
            this.RKs,
          )),
        e.Render.AttackerCameraShakeOnStart);
    this.BulletInfo.AttackerHandle?.Valid &&
      CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        this.BulletInfo.AttackerHandle,
      ) &&
      this.BulletInfo.IsAutonomousProxy &&
      BulletUtil_1.BulletUtil.IsPlayerOrSummons(this.BulletInfo) &&
      0 < e.length &&
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e) => {
        var t = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
        CameraController_1.CameraController.PlayWorldCameraShake(
          e,
          t,
          0,
          CharacterHitComponent_1.OUTER_RADIUS,
          1,
          !1,
        );
      });
  }
  GetSize() {
    return 0 !== this.BulletInfo.BulletDataMain.Base.Shape
      ? this.BulletInfo.Size.X
      : Math.max(this.BulletInfo.Size.X, this.BulletInfo.Size.Y);
  }
  Clear() {
    super.Clear(),
      this.RKs &&
        (SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterAirWallEffectObject(
          this.RKs,
        ),
        (this.RKs = void 0));
  }
}
exports.BulletActionInitRender = BulletActionInitRender;
//# sourceMappingURL=BulletActionInitRender.js.map
