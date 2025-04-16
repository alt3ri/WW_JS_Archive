"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GlobalData_1 = require("../../GlobalData"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  UiCameraPhotographerStructure_1 = require("../UiCamera/UiCameraStructure/UiCameraPhotographerStructure"),
  PhotographController_1 = require("./PhotographController"),
  PhotographDefine_1 = require("./PhotographDefine");
class PhotographModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.OWi = void 0),
      (this.PlayMontageEntity = void 0),
      (this.MontageId = 0),
      (this.FilterId = 0),
      (this.kWi = new Map()),
      (this.j2_ = new Map()),
      (this.H2_ = new Map()),
      (this.FWi = new UE.TransformDouble()),
      (this.RightValue = 0),
      (this.UpValue = 0),
      (this.VWi = 0),
      (this.HWi = void 0),
      (this.IsOpenPhotograph = !1),
      (this.SavePath = ""),
      (this.IsSaveButtonVisible = !1),
      (this.IsFilterToggleOpen = !0);
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
  SetPhotographFilter(t) {
    this.FilterId = t;
  }
  ClearPhotographFilter() {
    this.ClearSelectedPhotographFilter(),
      this.H2_.clear(),
      (this.IsFilterToggleOpen = !0);
  }
  ClearSelectedPhotographFilter() {
    (this.FilterId = 0),
      PhotographController_1.PhotographController.InitPostProcessVolBlendWeight();
  }
  GetPhotographFilter() {
    return this.FilterId;
  }
  InitFilterPostProcessVolume() {
    var e = UE.NewArray(UE.Actor),
      t = (0, puerts_1.$ref)(e);
    if (
      (UE.GameplayStatics.GetAllActorsOfClassWithTag(
        GlobalData_1.GlobalData.World,
        UE.PostProcessVolume.StaticClass(),
        FNameUtil_1.FNameUtil.GetDynamicFName("Filter"),
        t,
      ),
      (e = (0, puerts_1.$unref)(t)))
    )
      for (let t = 0; t < e.Num(); t++) {
        var r,
          i = e.Get(t);
        (i.BlendWeight = 0),
          i.Tags.Num() < 2 ||
            ((r = i.Tags.Get(1).toString()), this.j2_.set(r, i));
      }
  }
  GetFilterPostProcessVolumeMap() {
    return this.j2_;
  }
  GetFilterStrengthByFilterId(t) {
    t = this.H2_.get(t);
    return void 0 === t
      ? PhotographDefine_1.FILTER_DEFAULT_STRENGTH /
          PhotographDefine_1.FILTER_MAX_STREGNTH
      : t;
  }
  SetFilterStrength(t, e) {
    this.H2_.set(t, e);
  }
  SetFilterToggleState(t) {
    this.IsFilterToggleOpen = t;
  }
  GetFilterToggleState() {
    return this.IsFilterToggleOpen;
  }
}
exports.PhotographModel = PhotographModel;
//# sourceMappingURL=PhotographModel.js.map
