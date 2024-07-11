"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToolWindowView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  HotPatch_1 = require("../../../../Launcher/HotPatch"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ToolWindowButtonItem_1 = require("./ToolWindowButtonItem");
class ToolWindowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.UBi = void 0),
      (this.ABi = void 0),
      (this.PBi = () => {
        UiManager_1.UiManager.OpenView("LogUploadView");
      }),
      (this.xBi = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(168);
        e.FunctionMap.set(2, () => {
          var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(186);
          e.SetAfterShowFunction(() => {
            HotPatch_1.HotPatch.ClearPatch();
          }),
            e.SetCloseFunction(() => {
              HotPatch_1.HotPatch.ClearPatch();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetText(0).ShowTextNew("PrefabTextItem_HotfixTool_Text"),
      (this.ABi = new ToolWindowButtonItem_1.ToolWindowButtonItem(
        this.GetItem(1),
      ));
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "PrefabTextItem_HotfixTool_clear_Text",
      ),
      e =
        (this.ABi.SetText(e),
        this.ABi.BindCallback(this.xBi),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_Tool_Clean",
        )),
      e =
        (this.ABi.RefreshIcon(e, () => {
          this.ABi.SetIconVisible(!0);
        }),
        (this.UBi = new ToolWindowButtonItem_1.ToolWindowButtonItem(
          this.GetItem(2),
        )),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "PrefabTextItem_HotfixTool_upload_Text",
        )),
      e =
        (this.UBi.SetText(e),
        this.UBi.BindCallback(this.PBi),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_Tool_Upload",
        ));
    this.UBi.RefreshIcon(e, () => {
      this.UBi.SetIconVisible(!0);
    }),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1);
  }
}
exports.ToolWindowView = ToolWindowView;
//# sourceMappingURL=ToolWindowView.js.map
