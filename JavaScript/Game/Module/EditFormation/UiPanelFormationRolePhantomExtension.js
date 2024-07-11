"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPanelFormationRolePhantomExtension = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  TowerDefenceDefine_1 = require("../TowerDefence/TowerDefenceDefine");
class UiPanelFormationRolePhantomExtension extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.PlayerId = TowerDefenceDefine_1.DEFAULT_ID),
      (this.RoleCfgId = TowerDefenceDefine_1.DEFAULT_ID),
      (this.mzt = void 0),
      (this.yra = void 0),
      (this.Ira = void 0),
      (this.Ula = void 0),
      (this.xla = !1),
      (this.eTt = () => {
        var e;
        TowerDefenceController_1.TowerDefenseController.CheckIsSelf(
          this.PlayerId,
        ) &&
          ((e = { RoleCfgId: this.RoleCfgId }),
          UiManager_1.UiManager.OpenView("TowerDefencePhantomView", e));
      }),
      (this.mzt = e);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [19, UE.UIItem],
      [20, UE.UIButtonComponent],
      [21, UE.UIItem],
      [22, UE.UISprite],
      [23, UE.UISprite],
      [24, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[20, this.eTt]]);
  }
  OnBeforeDestroy() {
    (this.PlayerId = TowerDefenceDefine_1.DEFAULT_ID),
      (this.RoleCfgId = TowerDefenceDefine_1.DEFAULT_ID),
      this.yra?.StopCurrentSequence(),
      (this.yra = void 0),
      (this.xla = !1),
      this.Ira?.StopCurrentSequence(),
      (this.Ira = void 0),
      (this.Ula = void 0);
  }
  OnStart() {
    (this.yra = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetItem(19),
    )),
      (this.Ira = new LevelSequencePlayer_1.LevelSequencePlayer(this.mzt));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = this.GetButton(20)?.GetRootComponent();
    if (void 0 !== i) return [i, i];
  }
  SetRedDotActive(e) {
    this.GetItem(21).SetUIActive(e);
  }
  SetIcon(e, i = !0) {
    var t = this.GetSprite(22),
      s = this.GetSprite(23),
      o = this.GetTexture(24),
      n = ((this.GetButton(20).IsSelfInteractive = i), e !== this.Ula);
    (this.Ula = e)
      ? (t.SetUIActive(!1),
        s.SetUIActive(!1),
        o.SetUIActive(!0),
        this.SetTextureByPath(e, this.GetTexture(24)),
        n &&
          (i || (this.yra.StopCurrentSequence(), (this.xla = !1)),
          this.Ira.PlayLevelSequenceByName("VisionIn")))
      : (t.SetUIActive(i),
        s.SetUIActive(!i),
        o.SetUIActive(!1),
        i
          ? n && this.Ira.PlayLevelSequenceByName("VisionOut")
          : this.xla ||
            ((this.xla = !0), this.yra.PlayLevelSequenceByName("Loop")));
  }
  SetRelativeUiActive(e) {
    this.GetItem(19).SetUIActive(e);
  }
}
exports.UiPanelFormationRolePhantomExtension =
  UiPanelFormationRolePhantomExtension;
//# sourceMappingURL=UiPanelFormationRolePhantomExtension.js.map
