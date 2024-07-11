"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageLogic = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
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
    var o = [];
    this._Pi.clear();
    const r = new Map();
    var e = MenuController_1.MenuController.GetTargetConfig(51);
    for (const t of MenuTool_1.MenuTool.GetLanguageDefineData()) {
      var n = t.LanguageType,
        a =
          ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineById(n);
      a
        ? (n !== e && !a.IsShow) || (o.push(t), r.set(n, a.SortId))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TextLanguageSearch",
            38,
            "设置系统语言定义不存在,请检查s.设置系统 LanguageDefine",
            ["语言类型Id", n],
          );
    }
    o.sort((e, o) => {
      (e = r.get(e.LanguageType)), (o = r.get(o.LanguageType));
      return void 0 === e || void 0 === o ? 0 : e - o;
    });
    for (let e = 0; e < o.length; e++) this._Pi.set(o[e].LanguageType, e);
    return o;
  }
  GetDataTextId(e, o) {
    return new LguiUtil_1.TableTextArgNew(
      o.MenuDataOptionsNameList[e.LanguageType],
    );
  }
  TriggerSelectChange(e, o) {
    MenuController_1.MenuController.GetTargetConfig(o.MenuDataFunctionId) !==
      e.LanguageType &&
      (MenuController_1.MenuController.NoticeChange(o.MenuDataFunctionId),
      MenuController_1.MenuController.SetTargetConfig(
        o.MenuDataFunctionId,
        e.LanguageType,
      ),
      MenuController_1.MenuController.DoConfigFunction(o.MenuDataFunctionId),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "TextLanguageSearch",
        11,
        "设置语言",
        ["选择语言", MenuTool_1.MenuTool.GetLanguageCodeById(e.LanguageType)],
        ["实际语言", LanguageSystem_1.LanguageSystem.PackageLanguage],
      );
  }
  GetDefaultIndex(e) {
    e = MenuController_1.MenuController.GetTargetConfig(e.MenuDataFunctionId);
    return this._Pi.get(e) ?? 0;
  }
}
exports.LanguageLogic = LanguageLogic;
//# sourceMappingURL=LanguageLogic.js.map
