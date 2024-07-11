"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProficiencyView = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CookController_1 = require("../CookController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uqt = void 0),
      (this.Gft = void 0),
      (this.OnChangeRoleClick = () => {
        this?.uqt();
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
    this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetButton(2).RootUIComp,
    );
  }
  OnBeforeDestroy() {
    this.Gft.Clear();
  }
  BindChangeRoleClick(e) {
    this.uqt = e;
  }
  SetExpNum(e, i, r, t) {
    var r = i * r;
    var e = e * i;
    const n = r - e;
    var e = StringUtils_1.StringUtils.Format(
      ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "CumulativeProficiency",
      ),
      e.toString(),
      r.toString(),
    );
    n > 0
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
    const r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.SetRoleIcon(
      r.GetRoleConfig().RoleHeadIconLarge,
      this.GetTexture(1),
      e,
    ),
      CookController_1.CookController.CheckIsBuffEx(e, i)
        ? this.Gft.GetCurrentSequence()
          ? this.Gft.ReplaySequenceByKey("Show")
          : this.Gft.PlayLevelSequenceByName("Show")
        : this.Gft?.StopCurrentSequence(!1, !0);
  }
  SetTypeContent(e = void 0) {
    const i = this.GetText(3);
    e ? (i.SetUIActive(!0), i.SetText(e)) : i.SetUIActive(!1);
  }
}
exports.ProficiencyView = ProficiencyView;
// # sourceMappingURL=CookProficiencyView.js.map
