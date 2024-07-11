"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorContentItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.H5e = void 0),
      (this.e0t = void 0),
      (this.j5e = void 0),
      (this.Gke = void 0),
      (this.f_o = 1),
      (this.p_o = void 0),
      (this.CloseAudioDelegate = void 0),
      (this.OnMontageCompleted = void 0),
      (this.ToggleClick = (t) => {
        this.j5e &&
          (this.e0t.RootUIComp.SetUIActive((t = 1 === t)),
          this.j5e(t, this.ContentItemData, this));
      }),
      (this.ButtonClick = () => {
        this.Gke && this.Gke(this.ContentItemData, this);
      }),
      (this.v_o = (t) =>
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title)),
      (this.EndPlay = () => {
        this.M_o(1);
      }),
      (this.StartPlay = () => {
        this.M_o(0);
      }),
      (this.BNe = () => {
        let t = 0;
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
            this.ContentItemData.RoleId,
          ),
          s = i.GetFavorData();
        (t =
          2 === this.ContentItemData.FavorTabType
            ? ((i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
                i.GetRoleId(),
                this.ContentItemData.Config.Id,
              )),
              Number(i))
            : s.GetFavorItemState(
                this.ContentItemData.Config.Id,
                this.ContentItemData.FavorTabType,
              )),
          this.GetItem(5).SetUIActive(1 === t);
      }),
      (this.ContentItemData = t),
      this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIExtendToggle],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.ToggleClick],
        [6, this.ButtonClick],
      ]);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetButtonFunction(t) {
    this.Gke = t;
  }
  OnStart() {
    (this.H5e = this.GetExtendToggle(4)),
      (this.e0t = this.GetButton(6)),
      this.e0t.RootUIComp.SetUIActive(!1),
      this.Refresh();
  }
  Refresh() {
    switch (this.ContentItemData.FavorTabType) {
      case 2:
        this.E_o();
        break;
      case 1:
        this.S_o();
        break;
      case 0:
        this.y_o();
        break;
      case 3:
        this.I_o();
    }
  }
  T_o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorBaseInfo"),
      this.SetLockItemActive(!1),
      this.GetItem(5).SetUIActive(!1),
      (this.p_o = 2);
  }
  L_o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorPowerFile"),
      this.SetLockItemActive(!1),
      this.GetItem(5).SetUIActive(!1),
      (this.p_o = 2);
  }
  D_o() {
    this.R_o();
    var t = this.GetText(3),
      i = this.ContentItemData.Config,
      i = this.v_o(i);
    t.SetText(i), this.BNe();
  }
  S_o() {
    1 === this.ContentItemData.TypeParam
      ? this.T_o()
      : 2 === this.ContentItemData.TypeParam
        ? this.L_o()
        : this.D_o();
  }
  E_o() {
    this.R_o();
    var t = this.GetText(3),
      i = this.ContentItemData.Config,
      i = this.v_o(i);
    2 === this.p_o && this.M_o(1), this.U_o(), t.SetText(i), this.BNe();
  }
  y_o() {
    this.R_o();
    var t = this.ContentItemData.Config,
      i = this.GetText(3),
      t = this.v_o(t);
    2 === this.p_o && this.M_o(1), this.A_o(), i.SetText(t), this.BNe();
  }
  I_o() {
    this.R_o();
    var t = this.GetText(3),
      i = this.ContentItemData.Config;
    2 === this.p_o
      ? ((i = this.v_o(i)), t.SetText(i))
      : LguiUtil_1.LguiUtil.SetLocalText(t, "Unknown"),
      this.BNe();
  }
  U_o() {
    this.OnMontageCompleted ||
      (this.OnMontageCompleted = (t, i) => {
        i || this.EndPlay();
      });
  }
  A_o() {
    this.CloseAudioDelegate ||
      (this.CloseAudioDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.EndPlay,
      ));
  }
  OnBeforeDestroy() {
    (this.ContentItemData = void 0),
      (this.H5e = void 0),
      (this.e0t = void 0),
      (this.j5e = void 0),
      (this.Gke = void 0),
      (this.f_o = 1),
      (this.p_o = 0),
      this.CloseAudioDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.EndPlay),
        (this.CloseAudioDelegate = void 0)),
      this.OnMontageCompleted && (this.OnMontageCompleted = void 0);
  }
  R_o() {
    var t,
      i = this.ContentItemData.FavorTabType,
      s = this.ContentItemData.Config.Id;
    2 === i
      ? ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.ContentItemData.RoleId,
        )),
        (t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
          t.GetRoleId(),
          s,
        )),
        (this.p_o = Number(t)),
        this.SetLockItemActive(2 !== this.p_o))
      : ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.ContentItemData.RoleId,
        )
          .GetFavorData()
          .GetFavorItemState(s, i)),
        this.SetLockItemActive(0 === t),
        (this.p_o = t));
  }
  SetLockItemActive(t) {
    this.GetItem(0).SetUIActive(t),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1);
  }
  M_o(t) {
    var i;
    !this.ContentItemData ||
      (2 !== (i = this.ContentItemData.FavorTabType) && 0 !== i) ||
      (0 !== this.p_o &&
        ((this.f_o = t),
        this.GetItem(0).SetUIActive(!1),
        this.GetItem(1).SetUIActive(0 === t),
        this.GetItem(2).SetUIActive(1 === t)));
  }
  GetCurVoiceState() {
    return this.f_o;
  }
  SetToggleState(t) {
    this.H5e && this.H5e.SetToggleState(t);
  }
  SetButtonActive(t) {
    this.e0t && this.e0t.RootUIComp.SetUIActive(t);
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
}
exports.RoleFavorContentItem = RoleFavorContentItem;
//# sourceMappingURL=RoleFavorContentItem.js.map
