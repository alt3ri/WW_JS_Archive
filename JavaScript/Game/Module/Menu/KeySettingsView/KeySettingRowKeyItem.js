"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowKeyItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uPi = void 0),
      (this.oxi = 0),
      (this.SPi = void 0),
      (this.r2n = void 0),
      (this.rxi = (t) => {
        1 === t && this.uPi && this.SPi && this.SPi(this.uPi, this);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.rxi]]);
  }
  OnStart() {
    this.r2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
  }
  OnBeforeDestroy() {
    this.ClearData(),
      (this.SPi = void 0),
      this.r2n?.Clear(),
      (this.r2n = void 0);
  }
  ClearData() {
    (this.uPi = void 0), (this.oxi = 0);
  }
  BindOnWaitInput(t) {
    this.SPi = t;
  }
  Refresh(t, i) {
    2 === t.GetRowType() &&
      ((this.uPi = t),
      (this.oxi = i),
      this.Nft(),
      this.nxi(),
      this.sxi(),
      this.Rxt(),
      this.SetDetailItemVisible(t.IsExpandDetail));
  }
  Nft() {
    var t = this.GetText(0),
      i = this.uPi.GetSettingName();
    StringUtils_1.StringUtils.IsEmpty(i)
      ? t.SetText(this.uPi.GetActionOrAxisName())
      : LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
  }
  nxi() {
    var i = this.uPi.ButtonTextId;
    if (i && !StringUtils_1.StringUtils.IsBlank(i))
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
    else {
      let t = "+";
      (i = this.uPi.BothActionName),
        (i =
          (i && 1 < i.length && (t = "/"),
          this.uPi.GetCurrentKeyNameRichText(this.oxi, t)));
      this.GetText(2)?.SetText(i);
    }
  }
  sxi() {
    var t = this.uPi.DetailTextId;
    StringUtils_1.StringUtils.IsEmpty(t)
      ? this.GetSprite(5)?.SetUIActive(!1)
      : (this.GetSprite(5)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t));
  }
  Rxt() {
    var t = this.uPi.IsLock;
    this.GetSprite(6)?.SetUIActive(t),
      this.GetButton(1)?.SetSelfInteractive(!t);
  }
  SetSelected(t) {
    this.GetSprite(7)?.SetUIActive(t),
      this.GetExtendToggle(1)?.SetToggleState(t ? 1 : 0, !1),
      this.GetText(2)?.SetUIActive(!t),
      this.GetItem(8)?.SetUIActive(t),
      t
        ? this.r2n.PlayLevelSequenceByName("Loop")
        : this.r2n.StopCurrentSequence();
  }
  SetDetailItemVisible(t) {
    var i,
      e = this.GetItem(3);
    !this.uPi ||
    ((i = this.uPi.DetailTextId), StringUtils_1.StringUtils.IsEmpty(i))
      ? e.SetUIActive(!1)
      : (e.SetUIActive(t), (this.uPi.IsExpandDetail = t));
  }
}
exports.KeySettingRowKeyItem = KeySettingRowKeyItem;
//# sourceMappingURL=KeySettingRowKeyItem.js.map
