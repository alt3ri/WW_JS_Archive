"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowKeyItem = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uAi = void 0),
      (this.oPi = 0),
      (this.EAi = void 0),
      (this.zbn = void 0),
      (this.rPi = (t) => {
        t === 1 && this.uAi && this.EAi && this.EAi(this.uAi, this);
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
      (this.BtnBindInfo = [[1, this.rPi]]);
  }
  OnStart() {
    this.zbn = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
  }
  OnBeforeDestroy() {
    this.ClearData(),
      (this.EAi = void 0),
      this.zbn?.Clear(),
      (this.zbn = void 0);
  }
  ClearData() {
    (this.uAi = void 0), (this.oPi = 0);
  }
  BindOnWaitInput(t) {
    this.EAi = t;
  }
  Refresh(t, i) {
    t.GetRowType() === 2 &&
      ((this.uAi = t),
      (this.oPi = i),
      this.L0t(),
      this.nPi(),
      this.sPi(),
      this.IPt(),
      this.SetDetailItemVisible(t.IsExpandDetail));
  }
  L0t() {
    const t = this.GetText(0);
    const i = this.uAi.GetSettingName();
    StringUtils_1.StringUtils.IsEmpty(i)
      ? t.SetText(this.uAi.GetActionOrAxisName())
      : LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
  }
  nPi() {
    let i = this.uAi.ButtonTextId;
    if (i && !StringUtils_1.StringUtils.IsBlank(i))
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
    else {
      let t = "+";
      (i = this.uAi.BothActionName),
        (i =
          (i && i.length > 1 && (t = "/"),
          this.uAi.GetCurrentKeyNameRichText(this.oPi, t)));
      this.GetText(2)?.SetText(i);
    }
  }
  sPi() {
    const t = this.uAi.DetailTextId;
    StringUtils_1.StringUtils.IsEmpty(t)
      ? this.GetSprite(5)?.SetUIActive(!1)
      : (this.GetSprite(5)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t));
  }
  IPt() {
    const t = this.uAi.IsLock;
    this.GetSprite(6)?.SetUIActive(t),
      this.GetButton(1)?.SetSelfInteractive(!t);
  }
  SetSelected(t) {
    this.GetSprite(7)?.SetUIActive(t),
      this.GetExtendToggle(1)?.SetToggleState(t ? 1 : 0, !1),
      this.GetText(2)?.SetUIActive(!t),
      this.GetItem(8)?.SetUIActive(t),
      t
        ? this.zbn.PlayLevelSequenceByName("Loop")
        : this.zbn.StopCurrentSequence();
  }
  SetDetailItemVisible(t) {
    let i;
    const e = this.GetItem(3);
    !this.uAi ||
    ((i = this.uAi.DetailTextId), StringUtils_1.StringUtils.IsEmpty(i))
      ? e.SetUIActive(!1)
      : (e.SetUIActive(t), (this.uAi.IsExpandDetail = t));
  }
}
exports.KeySettingRowKeyItem = KeySettingRowKeyItem;
// # sourceMappingURL=KeySettingRowKeyItem.js.map
