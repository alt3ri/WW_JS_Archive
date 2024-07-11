"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillInputItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  KeyUtil_1 = require("../../Util/KeyUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleSkillTreeSkillSpriteItem_1 = require("./RoleSkillTreeSkillSpriteItem");
class RoleSkillInputItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.Imo = 0), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  Update(e) {
    (this.Imo = e), this.Refresh();
  }
  Refresh() {
    var e =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(
        this.Imo,
      );
    e &&
      (Info_1.Info.IsInKeyBoard()
        ? this.HandlePcInputText(e)
        : Info_1.Info.IsInTouch()
          ? this.HandleMobileInputText(e)
          : Info_1.Info.IsInGamepad() && this.HandleGamepadInputText(e));
  }
  HandlePcInputText(t) {
    var i = [],
      r = t.InputArray.length;
    for (let e = 0; e < r; e++) {
      var n = t.InputArray[e],
        n = KeyUtil_1.KeyUtil.GetPcKeyNameByAction(n),
        l = n[0],
        a = n[1],
        s = new StringBuilder_1.StringBuilder(),
        u = ConfigManager_1.ConfigManager.BattleUiConfig,
        g = l.length,
        o = a.length,
        _ = g + o;
      for (let e = 0; e < _; e++) {
        var p = e < g ? l[e] : a[e - g],
          p = u.GetPcKeyConfig(p);
        p.KeyIconPath &&
          (s.Append("<texture="), s.Append(p.KeyIconPath), s.Append("/>")),
          e === g - 1 && 0 < o ? s.Append("/") : e < _ - 1 && s.Append("+");
      }
      i.push(s.ToString());
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Description, ...i);
  }
  HandleGamepadInputText(t) {
    var i = [];
    const r = t.InputArray.length;
    for (let e = 0; e < r; e++) {
      var n = t.InputArray[e],
        l = new InputKeyDisplayData_1.InputKeyDisplayData();
      if (
        InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
          l,
          n,
        )
      ) {
        var a = l.GetDisplayKeyNameList();
        if (a) {
          var s = new StringBuilder_1.StringBuilder();
          const r = a.length;
          for (let e = 0; e < r; e++) {
            var u = a[e],
              u = InputSettings_1.InputSettings.GetKeyIconPath(u);
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
    var t = e.SkillArray,
      i = [],
      r = [],
      n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_RoleSkillIcon",
      ),
      l = new RegExp("{[0-9]+}", "g"),
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description),
      a = e.match(l);
    if (a) {
      const u = [];
      for (let e = 0; e < a.length; e++) {
        var s = a[e],
          s = parseInt(s.substring(1, s.length - 1));
        i.push(`<snidx=${e}/>`), r.push(n), u.push(t[s]);
      }
      l = StringUtils_1.StringUtils.FormatStaticBuilder(e, ...i);
      LguiUtil_1.LguiUtil.LoadAndSetText(this.GetText(0), l, r, (t) => {
        for (let e = 0; e < t.length; e++) {
          var i = t[e];
          new RoleSkillTreeSkillSpriteItem_1.RoleSkillTreeSkillSpriteItem(
            i,
          ).Update(u[e]);
        }
      });
    } else this.GetText(0).SetText(e);
  }
  SetBgActive(e) {
    var t = this.GetItem(1);
    t?.SetChangeColor(!e, t.changeColor);
  }
}
exports.RoleSkillInputItem = RoleSkillInputItem;
//# sourceMappingURL=RoleSkillInputItem.js.map
