"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographModel = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure"),
  PhotographDefine_1 = require("./PhotographDefine");
class PhotographModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.OWi = void 0),
      (this.PlayMontageEntity = void 0),
      (this.MontageId = 0),
      (this.kWi = new Map()),
      (this.FWi = new UE.Transform()),
      (this.RightValue = 0),
      (this.UpValue = 0),
      (this.VWi = 0),
      (this.HWi = void 0),
      (this.IsOpenPhotograph = !1),
      (this.SavePath = ""),
      (this.IsSaveButtonVisible = !1);
  }
  OnInit() {
    return (
      (this.SavePath =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "ScreenShotSavePath",
        )),
      !0
    );
  }
  OnClear() {
    return this.DestroyUiCamera(), !0;
  }
  OnLeaveLevel() {
    return this.DestroyUiCamera(), !0;
  }
  SpawnPhotographerStructure(t, e, r) {
    this.FWi.SetLocation(t), this.FWi.SetRotation(e), this.FWi.SetScale3D(r);
    t = UiCameraManager_1.UiCameraManager.Get();
    return (
      (this.OWi = t.PushStructure(
        UiCameraPhotographerStructure_1.UiCameraPhotographerStructure,
      )),
      this.OWi.SetActorTransform(this.FWi),
      t
        .GetUiCameraComponent(
          UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
        )
        .SetCameraFocalDistance(
          PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE,
        ),
      this.OWi
    );
  }
  DestroyUiCamera() {
    UiCameraManager_1.UiCameraManager.Destroy(
      PhotographDefine_1.PHOTOGRAPH_CAMERA_BLEND_OUT,
    ),
      (this.OWi = void 0);
  }
  GetPhotographerStructure() {
    return this.OWi;
  }
  SetPhotographOption(t, e) {
    this.kWi.set(t, e);
  }
  ClearPhotographOption() {
    this.kWi.clear();
  }
  GetPhotographOption(t) {
    return this.kWi.get(t);
  }
  GetAllPhotographOption() {
    return this.kWi;
  }
  SetEntityEnable(t, e) {
    t?.Valid &&
      t.Entity?.Valid &&
      t.Entity.Active !== e &&
      (e
        ? this.HWi && t.Id === this.HWi.Id
          ? (t.Entity.Enable(this.VWi, "PhotographModel.SetEntityEnable"),
            (this.VWi = void 0),
            (this.HWi = void 0))
          : this.ResetEntityEnable()
        : (this.HWi && this.ResetEntityEnable(),
          (this.MontageId = 0),
          (this.HWi = t),
          (this.VWi = t.Entity.Disable(
            "[PhotographModel.SetEntityEnable] bEnable为false",
          ))));
  }
  ResetEntityEnable() {
    this.HWi &&
      this.HWi.Entity?.Enable(this.VWi, "PhotographModel.ResetEntityEnable"),
      (this.VWi = void 0),
      (this.HWi = void 0);
  }
}
exports.PhotographModel = PhotographModel;
//# sourceMappingURL=PhotographModel.js.map
