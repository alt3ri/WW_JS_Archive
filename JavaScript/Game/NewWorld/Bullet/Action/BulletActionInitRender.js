"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionInitRender = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const Global_1 = require("../../../Global");
const SceneInteractionManager_1 = require("../../../Render/Scene/Interaction/SceneInteractionManager");
const SceneObjectWaterEffect_1 = require("../../../Render/Scene/Interaction/SceneObjectWaterEffect");
const CharacterHitComponent_1 = require("../../Character/Common/Component/CharacterHitComponent");
const BulletUtil_1 = require("../BulletUtil");
const BulletModel_1 = require("../Model/BulletModel");
const BulletActionBase_1 = require("./BulletActionBase");
const PATH_DEFAULT_INTERACT =
  "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig";
class BulletActionInitRender extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.P5o = void 0);
  }
  OnExecute() {
    BulletModel_1.BulletModel.DefaultBulletSceneInteraction ||
      (BulletModel_1.BulletModel.DefaultBulletSceneInteraction =
        ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          PATH_DEFAULT_INTERACT,
          UE.DefaultBulletSceneInteraction_C,
        ));
    let e = this.BulletInfo.BulletDataMain;
    if (e.Logic.InteractWithWater) {
      let t = e.Interact.WaterInteract;
      if (t !== "")
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t,
          UE.BulletSceneInteraction_C,
          (e) => {
            this.x5o(e);
          },
        );
      else {
        const r =
          BulletModel_1.BulletModel.DefaultBulletSceneInteraction
            ?.ConditionConfig;
        const i = r?.Num();
        const l = this.GetSize();
        for (let e = 0; e < i; e++) {
          const n = r.Get(e);
          if (!(l >= n.RangeMin)) break;
          t = n.Config.ToAssetPathName();
        }
        t !== "" &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.BulletSceneInteraction_C,
            (e) => {
              this.x5o(e);
            },
          );
      }
    }
    e = e.Render.AttackerCameraShakeOnStart;
    this.BulletInfo.Attacker?.Valid &&
      this.BulletInfo.IsAutonomousProxy &&
      BulletUtil_1.BulletUtil.IsPlayerOrSummons(this.BulletInfo) &&
      e.length > 0 &&
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, (e) => {
        const t = Global_1.Global.CharacterCameraManager.GetCameraLocation();
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
    return this.BulletInfo.BulletDataMain.Base.Shape !== 0
      ? this.BulletInfo.Size.X
      : Math.max(this.BulletInfo.Size.X, this.BulletInfo.Size.Y);
  }
  x5o(e) {
    (this.P5o = new SceneObjectWaterEffect_1.SceneObjectWaterEffect()),
      this.P5o.Start(
        e.WaterEffect,
        this.BulletInfo.CollisionInfo.CollisionComponent,
      ),
      SceneInteractionManager_1.SceneInteractionManager.Get().RegisterWaterEffectObject(
        this.P5o,
      );
  }
  Clear() {
    super.Clear(),
      this.P5o &&
        SceneInteractionManager_1.SceneInteractionManager.Get().UnregisterWaterEffectObject(
          this.P5o,
        );
  }
}
exports.BulletActionInitRender = BulletActionInitRender;
// # sourceMappingURL=BulletActionInitRender.js.map
