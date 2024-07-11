"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProficiencyView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  CookController_1 = require("../CookController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dGt = void 0),
      (this.$pt = void 0),
      (this.OnChangeRoleClick = () => {
        this?.dGt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.OnChangeRoleClick]]);
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetButton(2).RootUIComp,
    );
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BindChangeRoleClick(e) {
    this.dGt = e;
  }
  SetExpNum(e, i, r, t) {
    var r = i * r,
      e = e * i,
      n = r - e,
      e = StringUtils_1.StringUtils.Format(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "CumulativeProficiency",
        ),
        e.toString(),
        r.toString(),
      );
    0 < n
      ? ((r = Math.min(n, i * t)),
        (i = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "+" + Math.min(r, n),
        ).concat(" ", "(", e, ")")),
        this.GetText(0).SetText(i))
      : ((t = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "",
        ).concat(" ", "(", e, ")")),
        this.GetText(0).SetText(t));
  }
  SetRoleTexture(e, i) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.SetRoleIcon(
      r.GetRoleConfig().RoleHeadIconLarge,
      this.GetTexture(1),
      e,
    ),
      CookController_1.CookController.CheckIsBuffEx(e, i)
        ? this.$pt.GetCurrentSequence()
          ? this.$pt.ReplaySequenceByKey("Show")
          : this.$pt.PlayLevelSequenceByName("Show")
        : this.$pt?.StopCurrentSequence(!1, !0);
  }
  SetTypeContent(e = void 0) {
    var i = this.GetText(3);
    e ? (i.SetUIActive(!0), i.SetText(e)) : i.SetUIActive(!1);
  }
}
exports.ProficiencyView = ProficiencyView;
//# sourceMappingURL=CookProficiencyView.js.map
