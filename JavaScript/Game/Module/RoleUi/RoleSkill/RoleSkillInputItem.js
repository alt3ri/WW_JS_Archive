"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInputItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeyUtil_1 = require("../../Util/KeyUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillTreeSkillSpriteItem_1 = require("./RoleSkillTreeSkillSpriteItem");
class RoleSkillInputItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.Rco = 0), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  Update(e) {
    (this.Rco = e), this.Refresh();
  }
  Refresh() {
    let e;
    const t =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(
        this.Rco,
      );
    t &&
      ((e = ModelManager_1.ModelManager.PlatformModel).IsPc()
        ? this.HandlePcInputText(t)
        : e.IsMobile()
          ? this.HandleMobileInputText(t)
          : e.IsGamepad() && this.HandleGamepadInputText(t));
  }
  HandlePcInputText(t) {
    const i = [];
    const r = t.InputArray.length;
    for (let e = 0; e < r; e++) {
      var n = t.InputArray[e];
      var n = KeyUtil_1.KeyUtil.GetPcKeyNameByAction(
        n,
        ModelManager_1.ModelManager.PlatformModel.PlatformType,
      );
      const l = n[0];
      const a = n[1];
      const s = new StringBuilder_1.StringBuilder();
      const u = ConfigManager_1.ConfigManager.BattleUiConfig;
      const g = l.length;
      const o = a.length;
      const _ = g + o;
      for (let e = 0; e < _; e++) {
        var p = e < g ? l[e] : a[e - g];
        var p = u.GetPcKeyConfig(p);
        p.KeyIconPath &&
          (s.Append("<texture="), s.Append(p.KeyIconPath), s.Append("/>")),
          e === g - 1 && o > 0 ? s.Append("/") : e < _ - 1 && s.Append("+");
      }
      i.push(s.ToString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Description, ...i);
  }
  HandleGamepadInputText(t) {
    const i = [];
    const r = t.InputArray.length;
    for (let e = 0; e < r; e++) {
      const n = t.InputArray[e];
      const l = new InputKeyDisplayData_1.InputKeyDisplayData();
      if (
        InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
          l,
          n,
        )
      ) {
        const a = l.GetDisplayKeyNameList();
        if (a) {
          const s = new StringBuilder_1.StringBuilder();
          const r = a.length;
          for (let e = 0; e < r; e++) {
            var u = a[e];
            var u = InputSettings_1.InputSettings.GetKeyIconPath(u);
            StringUtils_1.StringUtils.IsEmpty(u) || s.Append(`<texture=${u}>`),
              e < r - 1 && s.Append("+");
          }
          i.push(s.ToString());
        }
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Description, ...i);
  }
  HandleMobileInputText(e) {
    const t = e.SkillArray;
    const i = [];
    const r = [];
    const n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "UiItem_RoleSkillIcon",
    );
    let l = new RegExp("{[0-9]+}", "g");
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description);
    const a = e.match(l);
    if (a) {
      const u = [];
      for (let e = 0; e < a.length; e++) {
        var s = a[e];
        var s = parseInt(s.substring(1, s.length - 1));
        i.push(`<snidx=${e}/>`), r.push(n), u.push(t[s]);
      }
      l = StringUtils_1.StringUtils.FormatStaticBuilder(e, ...i);
      LguiUtil_1.LguiUtil.LoadAndSetText(this.GetText(0), l, r, (t) => {
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          new RoleSkillTreeSkillSpriteItem_1.RoleSkillTreeSkillSpriteItem(
            i,
          ).Update(u[e]);
        }
      });
    } else this.GetText(0).SetText(e);
  }
  SetBgActive(e) {
    const t = this.GetItem(1);
    t?.SetChangeColor(!e, t.changeColor);
  }
}
exports.RoleSkillInputItem = RoleSkillInputItem;
// # sourceMappingURL=RoleSkillInputItem.js.map
