"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageLogic = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuTool_1 = require("../MenuTool"),
  DropDownLogicBase_1 = require("./DropDownLogicBase");
class LanguageLogic extends DropDownLogicBase_1.DropDownLogicBase {
  constructor() {
    super(...arguments), (this._Pi = new Map());
  }
  GetDropDownDataList() {
    var r = [];
    this._Pi.clear();
    const n = new Map();
    var e = MenuController_1.MenuController.GetTargetConfig(
      GameSettingsDefine_1.EFunction.TEXTLANGUAGE,
    );
    for (const t of MenuTool_1.MenuTool.GetLanguageDefineData()) {
      var a = t.LanguageType,
        o =
          ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineById(a);
      o
        ? (a !== e && !o.IsShow) || (r.push(t), n.set(a, o.SortId))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TextLanguageSearch",
            37,
            "设置系统语言定义不存在,请检查s.设置系统 LanguageDefine",
            ["语言类型Id", a],
          );
    }
    r.sort((e, r) => {
      (e = n.get(e.LanguageType)), (r = n.get(r.LanguageType));
      return void 0 === e || void 0 === r ? 0 : e - r;
    });
    for (let e = 0; e < r.length; e++) this._Pi.set(r[e].LanguageType, e);
    return r;
  }
  GetDataTextId(e, r) {
    return new LguiUtil_1.TableTextArgNew(r.OptionsNameList[e.LanguageType]);
  }
  TriggerSelectChange(e, r) {
    MenuController_1.MenuController.GetTargetConfig(r.FunctionId) !==
      e.LanguageType &&
      (GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        r.FunctionId,
        e.LanguageType,
        1,
      ),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "TextLanguageSearch",
        10,
        "设置语言",
        [
          "选择语言",
          GameSettingsManager_1.GameSettingsManager.GetLanguageCodeById(
            e.LanguageType,
          ),
        ],
        ["实际语言", LanguageSystem_1.LanguageSystem.PackageLanguage],
      );
  }
  GetDefaultIndex(e) {
    e = MenuController_1.MenuController.GetTargetConfig(e.FunctionId);
    return this._Pi.get(e) ?? 0;
  }
}
exports.LanguageLogic = LanguageLogic;
//# sourceMappingURL=LanguageLogic.js.map
