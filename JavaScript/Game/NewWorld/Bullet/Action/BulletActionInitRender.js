"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitRender = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  CameraController_1 = require("../../../Camera/CameraController"),
  Global_1 = require("../../../Global"),
  SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager"),
  SceneObjectAirWallEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectAirWallEffect"),
  SceneObjectWaterEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectWaterEffect"),
  CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletModel_1 = require("../Model/BulletModel"),
  BulletActionBase_1 = require("./BulletActionBase"),
  PATH_DEFAULT_INTERACT =
    "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig";
class BulletActionInitRender extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.RVo = void 0), (this.RKs = void 0);
  }
  OnExecute() {
    BulletModel_1.BulletModel.DefaultBulletSceneInteraction ||
      (BulletModel_1.BulletModel.DefaultBulletSceneInteraction =
        ResourceSystem_1.ResourceSystem.Load(
          PATH_DEFAULT_INTERACT,
          UE.DefaultBulletSceneInteraction_C,
        ));
    var e = this.BulletInfo.BulletDataMain;
    if (e.Logic.InteractWithWater) {
      let t = e.Interact.WaterInteract;
      if ("" !== t)
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.BulletSceneInteraction_C,
          (e) => {
            this.UVo(e);
          },
        );
      else {
        var r =
            BulletModel_1.BulletModel.DefaultBulletSceneInteraction
              ?.ConditionConfig,
          i = r?.Num(),
          n = this.GetSize();
        for (let e = 0; e < i; e++) {
          var a = r.Get(e);
          if (!(n >= a.RangeMin)) break;
          t = a.Config.ToAssetPathName();
        }
        "" !== t &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.BulletSceneInteraction_C,
            (e) => {
              this.UVo(e);
            },
          );
      }
    }
    e.Logic.InteractWithAirWall &&
      ((this.RKs = new SceneObjectAirWallEffect_1.SceneObjectAirWallEffect()),
      this.RKs.Start(this.BulletInfo.CollisionInfo.CollisionComponent),
      SceneInteractionManager_1.SceneInteractionManager.Get().RegisterAirWallEffectObject(
        this.RKs,
      ));
    e = e.Render.AttackerCameraShakeOnStart;
    this.BulletInfo.Attacker?.Valid &&
      this.BulletInfo.IsAutonomousProxy &&
      BulletUtil_1.BulletUtil.IsPlayerOrSummons(this.BulletInfo) &&
      0 < e.length &&
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e) => {
        var t = Global_1.Global.CharacterCameraManager.GetCameraLocation();
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
  UVo(e) {
    (this.RVo = new SceneObjectWaterEffect_1.SceneObjectWaterEffect()),
      this.RVo.Start(
        e.WaterEffect,
        this.BulletInfo.CollisionInfo.CollisionComponent,
      ),
      SceneInteractionManager_1.SceneInteractionManager.Get().RegisterWaterEffectObject(
        this.RVo,
      );
  }
  Clear() {
    super.Clear(),
      this.RVo &&
        SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterWaterEffectObject(
          this.RVo,
        ),
      this.RKs &&
        (SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterAirWallEffectObject(
          this.RKs,
        ),
        (this.RKs = void 0));
  }
}
exports.BulletActionInitRender = BulletActionInitRender;
//# sourceMappingURL=BulletActionInitRender.js.map
