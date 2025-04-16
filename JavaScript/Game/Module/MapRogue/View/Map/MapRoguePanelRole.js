"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRoguePanelRole = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ListSliderControl_1 = require("../../../ItemHint/Views/ListSliderControl"),
  RogueGetListItem_1 = require("../Components/RogueGetListItem"),
  MALE_L_SPINE_ATLAS =
    "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroL/Avatar_HeroL.Avatar_HeroL-atlas",
  MALE_L_SPINE_SKELETON =
    "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroL/Avatar_HeroL.Avatar_HeroL-data",
  MALE_R_SPINE_ATLAS =
    "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroR/Avatar_HeroR.Avatar_HeroR-atlas",
  MALE_R_SPINE_SKELETON =
    "/Game/Aki/UI/UIResources/Common/Spine/RogueNanzhu/Avatar_HeroR/Avatar_HeroR.Avatar_HeroR-data";
class MapRoguePanelRole extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.GameInfo = e),
      (this.ListSliderControl = void 0),
      (this.zf1 =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MapRogueGetListMaxCount",
        ) ?? 1),
      (this.Jf1 =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "MapRogueGetListIntervalTime",
        ) ?? 0),
      (this.DirectionRight = !0),
      (this.wOt = () => this.zf1),
      (this.r0i = () => !this.GameInfo.IsGetItemDataEmpty()),
      (this.s0i = () => this.Jf1),
      (this.HDe = () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [3, UE.SpineSkeletonAnimationComponent],
      [4, UE.UIItem],
      [5, UE.SpineSkeletonAnimationComponent],
      [6, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await this.OKs(), this.Tp1();
  }
  OnTick(e) {
    this.IsShow && this.ListSliderControl?.Tick(e);
  }
  async OKs() {
    var e = this.GetSpine(3),
      t = this.GetSpine(5);
    1 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() &&
      (await Promise.all([
        this.SetSpineAssetByPath(MALE_L_SPINE_ATLAS, MALE_L_SPINE_SKELETON, e),
        this.SetSpineAssetByPath(MALE_R_SPINE_ATLAS, MALE_R_SPINE_SKELETON, t),
      ])),
      this.GetItem(4).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!0),
      e.SetAnimation(0, "Idle", !0),
      t.SetAnimation(0, "Idle", !0),
      this.SetRolePosItemVisible(!0);
  }
  SetRoleDirection(e) {
    (this.DirectionRight = e),
      this.GetItem(4).SetUIActive(!e),
      this.GetItem(6).SetUIActive(e);
  }
  SetRoleAnim(e, t = !0) {
    const i = this.GetSpine(3).SetAnimation(0, e, t),
      a = this.GetSpine(5).SetAnimation(0, e, t);
    if (!t) {
      const o = () => {
        this.GetSpine(3).SetAnimation(0, "Idle", !0),
          this.GetSpine(5).SetAnimation(0, "Idle", !0),
          i.AnimationComplete.Remove(o),
          a.AnimationComplete.Remove(o);
      };
      i.AnimationComplete.Add(o), a.AnimationComplete.Add(o);
    }
  }
  SetRolePosItemVisible(e) {
    this.GetItem(0).SetUIActive(e);
  }
  Tp1() {
    (this.ListSliderControl = new ListSliderControl_1.ListSliderControl(
      RogueGetListItem_1.RogueGetListItem,
      this.GetItem(2),
      this.wOt,
      this.r0i,
      this.s0i,
      this.HDe,
      1,
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "MapRogueGetListShowTime",
      ),
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "MapRogueGetListSilderTime",
      ),
      1,
    )),
      this.ListSliderControl.DisEnableParentLayout();
  }
}
exports.MapRoguePanelRole = MapRoguePanelRole;
//# sourceMappingURL=MapRoguePanelRole.js.map
