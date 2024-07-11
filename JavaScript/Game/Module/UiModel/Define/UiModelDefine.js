"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.uiModelCreateDataPreDefine = exports.uiModelActorDefine = void 0);
const TsSkeletalObserver_1 = require("../../SkeletalObserver/TsSkeletalObserver");
const TsUiSceneRoleActor_1 = require("../../UiComponent/TsUiSceneRoleActor");
const UiModelActorComponent_1 = require("../UiModelComponent/Common/UiModelActorComponent");
const UiModelAnimationComponent_1 = require("../UiModelComponent/Common/UiModelAnimationComponent");
const UiModelAnsControllerComponent_1 = require("../UiModelComponent/Common/UiModelAns/UiModelAnsControllerComponent");
const UiModelDataComponent_1 = require("../UiModelComponent/Common/UiModelDataComponent");
const UiModelEffectComponent_1 = require("../UiModelComponent/Common/UiModelEffectComponent");
const UiModelFadeComponent_1 = require("../UiModelComponent/Common/UiModelFadeComponent");
const UiModelLoadComponent_1 = require("../UiModelComponent/Common/UiModelLoadComponent");
const UiModelLoadingIconComponent_1 = require("../UiModelComponent/Common/UiModelLoadingIconComponent");
const UiModelRenderingMaterialComponent_1 = require("../UiModelComponent/Common/UiModelRenderingMaterialComponent");
const UiModelRotateComponent_1 = require("../UiModelComponent/Common/UiModelRotateComponent");
const UiModelTagComponent_1 = require("../UiModelComponent/Common/UiModelTagComponent");
const UiRoleDataComponent_1 = require("../UiModelComponent/Role/UiRoleDataComponent");
const UiRoleEyeHighLightComponent_1 = require("../UiModelComponent/Role/UiRoleEyeHighLightComponent");
const UiRoleHuluComponent_1 = require("../UiModelComponent/Role/UiRoleHuluComponent");
const UiRoleHuluLightSequenceComponent_1 = require("../UiModelComponent/Role/UiRoleHuluLightSequenceComponent");
const UiRoleLoadComponent_1 = require("../UiModelComponent/Role/UiRoleLoadComponent");
const UiRoleStateMachineComponent_1 = require("../UiModelComponent/Role/UiRoleStateMachineComponent");
const UiRoleWeaponComponent_1 = require("../UiModelComponent/Role/UiRoleWeaponComponent");
const UiWeaponBreachDaComponent_1 = require("../UiModelComponent/Weapon/UiWeaponBreachDaComponent");
const UiWeaponDataComponent_1 = require("../UiModelComponent/Weapon/UiWeaponDataComponent");
const UiModelCreateData_1 = require("../UiModelCreateData/UiModelCreateData");
(exports.uiModelActorDefine = {
  0: TsUiSceneRoleActor_1.default,
  1: TsSkeletalObserver_1.default,
}),
  (exports.uiModelCreateDataPreDefine = {
    0: new UiModelCreateData_1.UiModelCreateData(0, 0, 0, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
      UiRoleDataComponent_1.UiRoleDataComponent,
      UiRoleHuluComponent_1.UiRoleHuluComponent,
      UiRoleLoadComponent_1.UiRoleLoadComponent,
      UiRoleStateMachineComponent_1.UiRoleStateMachineComponent,
    ]),
    1: new UiModelCreateData_1.UiModelCreateData(0, 0, 1, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelLoadingIconComponent_1.UiModelLoadingIconComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
      UiModelFadeComponent_1.UiModelFadeComponent,
      UiModelTagComponent_1.UiModelTagComponent,
      UiRoleDataComponent_1.UiRoleDataComponent,
      UiRoleLoadComponent_1.UiRoleLoadComponent,
      UiRoleStateMachineComponent_1.UiRoleStateMachineComponent,
      UiRoleWeaponComponent_1.UiRoleWeaponComponent,
      UiRoleHuluComponent_1.UiRoleHuluComponent,
      UiRoleEyeHighLightComponent_1.UiRoleEyeHighLightComponent,
      UiRoleHuluLightSequenceComponent_1.UiRoleHuluLightSequenceComponent,
    ]),
    2: new UiModelCreateData_1.UiModelCreateData(1, 1, 2, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelLoadComponent_1.UiModelLoadComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
      UiWeaponDataComponent_1.UiWeaponDataComponent,
      UiWeaponBreachDaComponent_1.UiWeaponBreachDaComponent,
    ]),
    3: new UiModelCreateData_1.UiModelCreateData(1, 1, 3, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelLoadComponent_1.UiModelLoadComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
      UiModelRotateComponent_1.UiModelRotateComponent,
      UiWeaponDataComponent_1.UiWeaponDataComponent,
      UiWeaponBreachDaComponent_1.UiWeaponBreachDaComponent,
    ]),
    4: new UiModelCreateData_1.UiModelCreateData(3, 1, 4, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelLoadComponent_1.UiModelLoadComponent,
      UiModelRotateComponent_1.UiModelRotateComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
    ]),
    5: new UiModelCreateData_1.UiModelCreateData(2, 1, 5, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
    ]),
    6: new UiModelCreateData_1.UiModelCreateData(2, 1, 6, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelLoadComponent_1.UiModelLoadComponent,
      UiModelLoadingIconComponent_1.UiModelLoadingIconComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelAnimationComponent_1.UiModelAnimationComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
    ]),
    7: new UiModelCreateData_1.UiModelCreateData(0, 0, 7, [
      UiModelDataComponent_1.UiModelDataComponent,
      UiModelActorComponent_1.UiModelActorComponent,
      UiModelEffectComponent_1.UiModelEffectComponent,
      UiModelRenderingMaterialComponent_1.UiModelRenderingMaterialComponent,
      UiModelAnsControllerComponent_1.UiModelAnsControllerComponent,
      UiRoleDataComponent_1.UiRoleDataComponent,
      UiRoleLoadComponent_1.UiRoleLoadComponent,
      UiModelLoadingIconComponent_1.UiModelLoadingIconComponent,
      UiRoleStateMachineComponent_1.UiRoleStateMachineComponent,
    ]),
  });
// # sourceMappingURL=UiModelDefine.js.map
