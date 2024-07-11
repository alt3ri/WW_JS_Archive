"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorContentItem = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.R4e = void 0),
      (this.VCt = void 0),
      (this.U4e = void 0),
      (this.Qyt = void 0),
      (this.S1o = 1),
      (this.E1o = void 0),
      (this.CloseAudioDelegate = void 0),
      (this.OnMontageCompleted = void 0),
      (this.ToggleClick = (t) => {
        this.U4e &&
          (this.VCt.RootUIComp.SetUIActive((t = t === 1)),
          this.U4e(t, this.ContentItemData, this));
      }),
      (this.ButtonClick = () => {
        this.Qyt && this.Qyt(this.ContentItemData, this);
      }),
      (this.y1o = (t) =>
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Title)),
      (this.EndPlay = () => {
        this.I1o(1);
      }),
      (this.StartPlay = () => {
        this.I1o(0);
      }),
      (this.BNe = () => {
        let t = 0;
        let i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.ContentItemData.RoleId,
        );
        const s = i.GetFavorData();
        (t =
          this.ContentItemData.FavorTabType === 2
            ? ((i = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
                i.GetRoleId(),
                this.ContentItemData.Config.Id,
              )),
              Number(i))
            : s.GetFavorItemState(
                this.ContentItemData.Config.Id,
                this.ContentItemData.FavorTabType,
              )),
          this.GetItem(5).SetUIActive(t === 1);
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
    this.U4e = t;
  }
  SetButtonFunction(t) {
    this.Qyt = t;
  }
  OnStart() {
    (this.R4e = this.GetExtendToggle(4)),
      (this.VCt = this.GetButton(6)),
      this.VCt.RootUIComp.SetUIActive(!1),
      this.Refresh();
  }
  Refresh() {
    switch (this.ContentItemData.FavorTabType) {
      case 2:
        this.T1o();
        break;
      case 1:
        this.L1o();
        break;
      case 0:
        this.D1o();
        break;
      case 3:
        this.R1o();
    }
  }
  U1o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorBaseInfo"),
      this.SetLockItemActive(!1),
      this.GetItem(5).SetUIActive(!1),
      (this.E1o = 2);
  }
  A1o() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FavorPowerFile"),
      this.SetLockItemActive(!1),
      this.GetItem(5).SetUIActive(!1),
      (this.E1o = 2);
  }
  P1o() {
    this.x1o();
    const t = this.GetText(3);
    var i = this.ContentItemData.Config;
    var i = this.y1o(i);
    t.SetText(i), this.BNe();
  }
  L1o() {
    this.ContentItemData.TypeParam === 1
      ? this.U1o()
      : this.ContentItemData.TypeParam === 2
        ? this.A1o()
        : this.P1o();
  }
  T1o() {
    this.x1o();
    const t = this.GetText(3);
    var i = this.ContentItemData.Config;
    var i = this.y1o(i);
    this.E1o === 2 && this.I1o(1), this.w1o(), t.SetText(i), this.BNe();
  }
  D1o() {
    this.x1o();
    var t = this.ContentItemData.Config;
    const i = this.GetText(3);
    var t = this.y1o(t);
    this.E1o === 2 && this.I1o(1), this.B1o(), i.SetText(t), this.BNe();
  }
  R1o() {
    this.x1o();
    const t = this.GetText(3);
    let i = this.ContentItemData.Config;
    this.E1o === 2
      ? ((i = this.y1o(i)), t.SetText(i))
      : LguiUtil_1.LguiUtil.SetLocalText(t, "Unknown"),
      this.BNe();
  }
  w1o() {
    this.OnMontageCompleted ||
      (this.OnMontageCompleted = (t, i) => {
        i || this.EndPlay();
      });
  }
  B1o() {
    this.CloseAudioDelegate ||
      (this.CloseAudioDelegate = (0, puerts_1.toManualReleaseDelegate)(
        this.EndPlay,
      ));
  }
  OnBeforeDestroy() {
    (this.ContentItemData = void 0),
      (this.R4e = void 0),
      (this.VCt = void 0),
      (this.U4e = void 0),
      (this.Qyt = void 0),
      (this.S1o = 1),
      (this.E1o = 0),
      this.CloseAudioDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.EndPlay),
        (this.CloseAudioDelegate = void 0)),
      this.OnMontageCompleted && (this.OnMontageCompleted = void 0);
  }
  x1o() {
    let t;
    const i = this.ContentItemData.FavorTabType;
    const s = this.ContentItemData.Config.Id;
    i === 2
      ? ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.ContentItemData.RoleId,
        )),
        (t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(
          t.GetRoleId(),
          s,
        )),
        (this.E1o = Number(t)),
        this.SetLockItemActive(this.E1o !== 2))
      : ((t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.ContentItemData.RoleId,
        )
          .GetFavorData()
          .GetFavorItemState(s, i)),
        this.SetLockItemActive(t === 0),
        (this.E1o = t));
  }
  SetLockItemActive(t) {
    this.GetItem(0).SetUIActive(t),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1);
  }
  I1o(t) {
    let i;
    !this.ContentItemData ||
      ((i = this.ContentItemData.FavorTabType) !== 2 && i !== 0) ||
      (this.E1o !== 0 &&
        ((this.S1o = t),
        this.GetItem(0).SetUIActive(!1),
        this.GetItem(1).SetUIActive(t === 0),
        this.GetItem(2).SetUIActive(t === 1)));
  }
  GetCurVoiceState() {
    return this.S1o;
  }
  SetToggleState(t) {
    this.R4e && this.R4e.SetToggleState(t);
  }
  SetButtonActive(t) {
    this.VCt && this.VCt.RootUIComp.SetUIActive(t);
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
}
exports.RoleFavorContentItem = RoleFavorContentItem;
// # sourceMappingURL=RoleFavorContentItem.js.map
