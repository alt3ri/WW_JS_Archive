"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChipHandBookChildItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class ChipHandBookChildItem extends UiPanelBase_1.UiPanelBase {
  constructor(i = void 0) {
    super(),
      (this.Gzt = void 0),
      (this.Nzt = void 0),
      (this.RHt = !1),
      (this.Ozt = (i) => {
        this.Gzt && i === 1 && this.Gzt(this.Nzt);
      }),
      i && this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [4, UE.UIText],
      [3, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Ozt]]);
  }
  Refresh(i, t, e) {
    this.Nzt = i;
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
      6,
      this.Nzt.Id,
    );
    var s =
      ((this.RHt = void 0 === i),
      this.GetItem(2).SetUIActive(this.RHt),
      this.GetText(4).SetUIActive(!this.RHt),
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
        this.Nzt.Id,
      ));
    var s =
      (this.GetText(4).SetText(s), this.GetText(6).SetText(s), this.GetItem(7));
    const h = this.GetItem(8);
    var i = void 0 !== i && !i.IsRead;
    h.SetUIActive(this.RHt), this.RHt ? s.SetUIActive(!1) : s.SetUIActive(i);
  }
  SetNewState(i) {
    this.GetItem(7).SetUIActive(i);
  }
  GetData() {
    return this.Nzt;
  }
  BindToggleCallback(i) {
    this.Gzt = i;
  }
  SetToggleStateForce(i, t = 0) {
    this.GetExtendToggle(0).SetToggleState(i), i === 1 && this.Gzt?.(this.Nzt);
  }
  OnBeforeDestroy() {
    (this.Gzt = void 0), (this.Nzt = void 0), (this.RHt = !1);
  }
  GetTog() {
    return this.GetExtendToggle(0);
  }
}
exports.ChipHandBookChildItem = ChipHandBookChildItem;
// # sourceMappingURL=ChipHandBookChildItem.js.map
