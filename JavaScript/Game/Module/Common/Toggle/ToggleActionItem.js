"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleActionItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer");
class ToggleActionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Toggle = void 0),
      (this.Text = void 0),
      (this.ToggleIndexInline = 0),
      (this.LevelSequencePlayer = void 0),
      (this.U4e = void 0),
      (this.ToggleClick = (e) => {
        this.U4e && this.U4e(e);
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  get ToggleIndex() {
    return this.ToggleIndexInline;
  }
  set ToggleIndex(e) {
    this.ToggleIndexInline = e;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[1, this.ToggleClick]]);
  }
  OnStart() {
    (this.Toggle = this.GetExtendToggle(1)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.Toggle.SetToggleStateForce(0, !1, !0);
  }
  OnBeforeDestroy() {
    (this.Toggle = void 0),
      (this.Text = void 0),
      this.LevelSequencePlayer && this.LevelSequencePlayer.Clear(),
      (this.LevelSequencePlayer = void 0);
  }
  ShowSequenceOnBegin() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
  SetFunction(e) {
    this.U4e = e;
  }
  GetToggleItem() {
    return this.Toggle;
  }
  SetToggleText(e) {
    (this.Text = e), this.GetText(0).SetText(e);
  }
  SetToggleTexture(e) {
    this.SetTextureByPath(e, this.GetTexture(2));
  }
  SetToggleTextGray(e) {
    this.GetText(0).SetIsGray(e);
  }
  GetToggleText() {
    return this.GetText(0);
  }
}
exports.ToggleActionItem = ToggleActionItem;
//# sourceMappingURL=ToggleActionItem.js.map
