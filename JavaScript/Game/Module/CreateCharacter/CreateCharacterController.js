"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreateCharacterController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager");
class CreateCharacterController extends UiControllerBase_1.UiControllerBase {
  static TriggerInputName() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CreateRoleShowInputName,
    );
  }
  static AddBurstEyeRenderingMaterial(e) {
    var n =
      ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()[
        e ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl
      ];
    var e = e
      ? "RoleMaleBurstEyeMaterialController"
      : "RoleFemaleBurstEyeMaterialController";
    var n = UiLoginSceneManager_1.UiLoginSceneManager.SetRoleRenderingMaterial(
      n,
      e,
    );
    UiLoginSceneManager_1.UiLoginSceneManager.SetBurstEyeMaterialId(n);
  }
  static RemoveBurstEyeRenderingMaterial(e) {
    var e =
      ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()[
        e ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl
      ];
    const n = UiLoginSceneManager_1.UiLoginSceneManager.GetBurstEyeMaterialId();
    UiLoginSceneManager_1.UiLoginSceneManager.RemoveRoleRenderingMaterial(e, n);
  }
}
exports.CreateCharacterController = CreateCharacterController;
// # sourceMappingURL=CreateCharacterController.js.map
