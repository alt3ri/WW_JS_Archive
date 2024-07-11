"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleHandBookSelectionView = exports.ROLE_HAND_BOOK_BLENDNAME =
    void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  EffectUtil_1 = require("../../Utils/EffectUtil"),
  RoleController_1 = require("../RoleUi/RoleController"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager"),
  UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
  RoleHandBookSelectionComponent_1 = require("./RoleHandBookSelectionComponent");
exports.ROLE_HAND_BOOK_BLENDNAME = "10061";
class RoleHandBookSelectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleSelectionComponent = void 0),
      (this.Nlo = 0),
      (this.RoleList = void 0),
      (this.xVi = void 0),
      (this.RoleRootUiCameraHandleData = void 0),
      (this.TTt = () => {
        var e;
        this.RoleSelectionComponent &&
          (e = this.RoleSelectionComponent.GetCurSelectRoleId()) &&
          this.RoleSelectionComponent.UpdateItemByRoleId(e);
      }),
      (this.Olo = (e) => {
        this.RoleSelectionComponent &&
          (RoleController_1.RoleController.ShowUiSceneActorAndShadow(!1),
          this.SetActive(!1),
          this.RoleSelectionComponent.PlaySequence());
      }),
      (this.RoleSelectionSelectedEvent = (e) => {
        ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !== e &&
          (RoleController_1.RoleController.PlayRoleMontage(1),
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            "10061",
            !0,
            !0,
            "1001",
          ),
          this.RoleSelectionComponent) &&
          this.RoleSelectionComponent.UpdateRoleHandBookItem(e);
      });
  }
  OnHandleLoadScene() {
    this.RoleRootUiCameraHandleData =
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        RoleDefine_1.ROLE_CAMERA_SETTING_NAME,
        !1,
      );
  }
  OnHandleReleaseScene() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.RoleRootUiCameraHandleData,
    ),
      (this.RoleRootUiCameraHandleData = void 0);
  }
  OnStart() {
    (this.RoleSelectionComponent =
      new RoleHandBookSelectionComponent_1.RoleHandBookSelectionComponent()),
      this.LoadFloorEffect();
  }
  OnAfterShow() {
    var e;
    RoleController_1.RoleController.PlayRoleMontage(1),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        "10061",
        !0,
        !0,
        "1001",
      ),
      this.RoleSelectionComponent &&
        ((e = this.RoleSelectionComponent.GetCurSelectRoleId()),
        this.RoleSelectionComponent.UpdateComponent(this.RoleList),
        this.RoleSelectionComponent.UpdateRoleHandBookItem(e)),
      RoleController_1.RoleController.ShowUiSceneActorAndShadow(!0);
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleHandBookActive,
        this.Olo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.TTt,
      );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleHandBookActive,
        this.Olo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddCommonItemList,
        this.TTt,
      );
  }
  InitRoleList() {
    var t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
      ),
      i = (t.sort((e, t) => e.Id - t.Id), t.length);
    this.RoleList = [];
    for (let e = 0; e < i; e++) {
      var o = t[e];
      9 !== o.PartyId &&
        ((o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o.Id)),
        this.RoleList.push(o));
    }
  }
  LoadFloorEffect() {
    var e = UiSceneManager_1.UiSceneManager.GetActorByTag("RoleFloorCase");
    e &&
      (this.Nlo = EffectUtil_1.EffectUtil.SpawnUiEffect(
        "RoleSystemFloorEffect",
        "[RoleHandBookSelectionView.LoadFloorEffect]",
        e.GetTransform(),
        new EffectContext_1.EffectContext(void 0, e),
      ));
  }
  OnAfterHide() {
    EffectSystem_1.EffectSystem.IsValid(this.Nlo) &&
      EffectSystem_1.EffectSystem.StopEffectById(
        this.Nlo,
        "[RoleHandBookSelectionView.OnHide]",
        !1,
      );
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi),
      EffectSystem_1.EffectSystem.IsValid(this.Nlo) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Nlo,
          "[RoleHandBookSelectionView.OnDestroy]",
          !0,
        ),
        (this.Nlo = 0)),
      (this.RoleList = void 0);
  }
}
exports.RoleHandBookSelectionView = RoleHandBookSelectionView;
//# sourceMappingURL=RoleHandBookSelectionView.js.map
