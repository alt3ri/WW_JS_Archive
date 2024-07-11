"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropTypeOne = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SelectablePropComponentBase_1 = require("./SelectablePropComponentBase");
class SelectablePropTypeOne extends SelectablePropComponentBase_1.SelectablePropComponentBase {
  constructor() {
    super(...arguments),
      (this.PropData = void 0),
      (this.OnClickBtnBtnCall = (t) => {}),
      (this.Bke = (t) => {
        this.OnClickBtnBtnCall?.(t);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIExtendToggle],
      [13, UE.UIButtonComponent],
      [14, UE.UIItem],
      [15, UE.UIItem],
    ];
    this.BtnBindInfo = [
      [
        12,
        (t) => {
          this.Bke(t);
        },
      ],
    ];
  }
  SetToggleClick(t) {
    this.OnClickBtnBtnCall = t;
  }
  tbt() {
    this.SetItemIcon(this.GetTexture(1), this.PropData.ItemId),
      this.SetItemQualityIcon(this.GetSprite(2), this.PropData.ItemId);
    var t = this.GetSprite(0);
    this.PropData.ChipPath
      ? (t.SetUIActive(!0), this.SetSpriteByPath(this.PropData.ChipPath, t, !1))
      : t.SetUIActive(!1);
  }
  SetRoleIconState() {
    var t,
      e = this.GetItem(3);
    0 !== this.PropData.RoleId
      ? (e.SetUIActive(!0),
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          this.PropData.RoleId,
        )),
        this.SetRoleIcon(
          t.RoleHeadIcon,
          this.GetTexture(4),
          this.PropData.RoleId,
        ))
      : e.SetUIActive(!1);
  }
  ibt() {
    this.GetItem(7).SetUIActive(this.PropData.GetIsLock());
  }
  obt() {
    var t = this.GetItem(5);
    this.PropData.ResonanceLevel
      ? (t.SetUIActive(!0),
        this.GetText(6).SetText(this.PropData.ResonanceLevel.toString()))
      : t.SetUIActive(!1);
  }
  kTt() {
    this.GetText(8).SetText(this.PropData.LevelText);
  }
  Refresh(t, e, s) {
    (this.PropData = t),
      this.tbt(),
      this.kTt(),
      this.SetRoleIconState(),
      this.obt(),
      this.ibt();
  }
  GetSelectItem() {
    return this.GetItem(15);
  }
  GetReduceButton() {
    return this.GetButton(13);
  }
  GetControlItem() {
    return this.GetItem(9);
  }
  GetFinishSelectItem() {
    return this.GetItem(10);
  }
  GetSelectNumberText() {
    return this.GetText(11);
  }
  GetSelectableToggle() {
    return this.GetExtendToggle(12);
  }
}
exports.SelectablePropTypeOne = SelectablePropTypeOne;
//# sourceMappingURL=SelectablePropTypeOne.js.map
