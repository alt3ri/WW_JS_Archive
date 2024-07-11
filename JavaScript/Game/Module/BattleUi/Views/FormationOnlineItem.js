"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationOnlineItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class FormationOnlineItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.rat = void 0),
      (this.nat = void 0),
      (this.sat = !1),
      (this.aat = !1),
      (this.hat = !1),
      (this.lat = void 0),
      this.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadOnline", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.lat = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1))),
      this._at();
  }
  OnBeforeDestroy() {
    this.lat.Clear(), (this.lat = void 0);
  }
  SetNameText(t) {
    var i;
    this.InAsyncLoading()
      ? (this.rat = t)
      : ((i = this.GetText(3)),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? i.SetUIActive(!1)
          : (i.SetUIActive(!0), i.SetText(t)));
  }
  SetOnlineNumber(t) {
    var i;
    this.InAsyncLoading()
      ? (this.nat = t)
      : ((i = this.GetTexture(2)),
        t < 0
          ? i.SetUIActive(!1)
          : (i.SetUIActive(!0),
            (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              `FormationOnline${t}PIcon`,
            )),
            this.SetTextureByPath(t, i)));
  }
  SetIsGrayByOtherControl(t) {
    var i;
    this.InAsyncLoading()
      ? (this.sat = t)
      : ((i = this.GetTexture(2)).SetChangeColor(t, i.changeColor),
        (i = this.GetText(3)).SetChangeColor(t, i.changeColor));
  }
  SetNetWeak(t) {
    this.InAsyncLoading() ? (this.aat = t) : this.GetItem(0).SetUIActive(t);
  }
  SetNetDisconnect(t) {
    this.InAsyncLoading() ? (this.hat = t) : this.uat(t);
  }
  uat(t) {
    this.GetItem(1).SetUIActive(t),
      this.lat.StopCurrentSequence(),
      t && this.lat.PlayLevelSequenceByName("AutoLoop");
  }
  _at() {
    void 0 !== this.rat && (this.SetNameText(this.rat), (this.rat = void 0)),
      this.nat && (this.SetOnlineNumber(this.nat), (this.nat = void 0)),
      this.GetItem(0).SetUIActive(this.aat),
      this.uat(this.hat),
      this.SetIsGrayByOtherControl(this.sat);
  }
}
exports.FormationOnlineItem = FormationOnlineItem;
//# sourceMappingURL=FormationOnlineItem.js.map
