"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinObtainView = exports.SkinObtainViewData = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil");
class SkinObtainViewData {
  constructor() {
    (this.ObtainSkinData = void 0), (this.OtherRewardData = void 0);
  }
}
exports.SkinObtainViewData = SkinObtainViewData;
class SkinObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Vyl = void 0),
      (this.Hyl = void 0),
      (this.s4e = void 0),
      (this.W2e = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.Awe = () => {
        this.CloseMe();
      }),
      (this.L3e = () => {
        var e;
        this.Vyl.GetIfHaveRole()
          ? (BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
              "Start",
              "OpenRoleSkinView",
            ),
            this.CloseMe(() => {
              ControllerHolder_1.ControllerHolder.SkinController.SkipToSkinView(
                this.Vyl.GetRoleId(),
                "RoleSkinTabView",
                !0,
                this.Vyl.GetItemId(),
                () => {
                  BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                    "Close",
                    "OpenRoleSkinView",
                  );
                },
              );
            }))
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(233)),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
              e,
            ));
      }),
      (this.JWi = () => {
        var e = {
          ScreenShot: !1,
          IsHiddenBattleView: !1,
          HandBookPhotoData: void 0,
          RoleSkinData: this.Vyl,
        };
        UiManager_1.UiManager.OpenView("PhotoSaveView", e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.SpineSkeletonAnimationComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Awe],
        [6, this.L3e],
        [7, this.JWi],
      ]);
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(4),
      this.W2e,
    );
    var e,
      i = this.OpenParam,
      t = i.ObtainSkinData[0].ConfigId,
      t =
        ((this.Vyl =
          ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t)),
        i.OtherRewardData);
    if (t) {
      this.Hyl = [];
      for (const r of t)
        10 !==
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            r.ConfigId,
          ) && ((e = { IncId: 0, ItemId: r.ConfigId }), this.Hyl.push([e, 0]));
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeHide() {}
  Og() {
    this.P5e(this.Vyl),
      this.jyl(this.Vyl),
      this.v4e(this.Vyl),
      this.P3l(this.Vyl),
      this.Wyl(this.Vyl),
      this.Qyl(this.Vyl);
  }
  P5e(e) {
    e
      ? ((e = e.GetTitleName()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e))
      : this.GetText(2).SetText("");
  }
  jyl(e) {
    e
      ? ((e = e.GetSubTitle()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e))
      : this.GetText(3).SetText("");
  }
  v4e(e) {
    var i;
    this.Hyl
      ? ((i = this.Hyl),
        this.s4e?.SetActive(0 !== i.length),
        this.s4e?.RefreshByData(i))
      : this.s4e?.SetActive(!1);
  }
  async P3l(e) {
    var i;
    e &&
      ((i = e.GetSmallSpineAtlas()),
      (e = e.GetSpineSkeletonData()),
      await this.SetSpineAssetByPath(i, e, this.GetSpine(1)),
      this.GetSpine(1).SetAnimation(0, "idle", !0));
  }
  Wyl(e) {
    e
      ? (this.GetTexture(8).SetUIActive(!0),
        (e = e.GetObtainFrameColor1()),
        (e = UE.Color.FromHex(e)),
        this.GetTexture(8).SetColor(e))
      : this.GetTexture(8).SetUIActive(!1);
  }
  Qyl(e) {
    e
      ? (this.GetTexture(9).SetUIActive(!0),
        (e = e.GetObtainFrameColor2()),
        (e = UE.Color.FromHex(e)),
        this.GetTexture(9).SetColor(e))
      : this.GetTexture(9).SetUIActive(!1);
  }
}
exports.SkinObtainView = SkinObtainView;
//# sourceMappingURL=SkinObtainView.js.map
