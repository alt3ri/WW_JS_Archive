"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonInputViewController = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController"),
  FriendController_1 = require("../../../Friend/FriendController"),
  PersonalController_1 = require("../../../Personal/Controller/PersonalController"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CommonInputViewController extends UiControllerBase_1.UiControllerBase {
  static OpenSetRoleNameInputView() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
      t =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "SetName",
        ),
      t = {
        TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
        ConfirmFunc: PersonalController_1.PersonalController.RequestModifyName,
        InputText: e,
        DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "PrefabTextItem_3848209236_Text",
        ),
        IsCheckNone: !0,
        NeedFunctionButton: !1,
        BottomTipsText: "",
        NeedCheckBlank: !0,
      };
    UiManager_1.UiManager.OpenView("CommonModifyNameInputView", t);
  }
  static OpenSetPlayerRemarkNameInputView() {
    let e =
      ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
        ?.FriendRemark;
    StringUtils_1.StringUtils.IsEmpty(e) &&
      (e =
        ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()
          ?.PlayerName);
    var t =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "SetRemark",
        ),
      t = {
        TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
        ConfirmFunc: async (e) =>
          FriendController_1.FriendController.RequestFriendRemarkChange(
            ModelManager_1.ModelManager.FriendModel.GetCurrentOperationPlayerId(),
            e,
          ),
        InputText: e,
        DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "PrefabTextItem_3848209236_Text",
        ),
        IsCheckNone: !1,
        NeedFunctionButton: !1,
        BottomTipsText: "",
        NeedCheckBlank: !0,
      };
    UiManager_1.UiManager.OpenView("CommonSingleInputView", t);
  }
  static OpenPersonalSignInputView() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
      t =
        ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
          "SetSign",
        ),
      t = {
        TitleTextArgs: new LguiUtil_1.TableTextArgNew(t),
        ConfirmFunc:
          PersonalController_1.PersonalController.RequestModifySignature,
        DefaultText: ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "ComplianceWithTheLaw",
        ),
        InputText: e,
        IsCheckNone: !1,
        NeedFunctionButton: !1,
        BottomTipsText: "",
        NeedCheckBlank: !0,
      };
    UiManager_1.UiManager.OpenView("CommonMultiInputView", t);
  }
  static OpenCdKeyInputView() {
    var e = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew(
        "PrefabTextItem_CDKey_Title",
      ),
      ConfirmFunc: CdKeyInputController_1.CdKeyInputController.RequestCdKey,
      DefaultText:
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "CDKey_InputEmpty",
        ) ?? "",
      InputText: "",
      IsCheckNone: !0,
      NeedFunctionButton: !0,
      BottomTipsText: "",
      NeedCheckBlank: !0,
    };
    UiManager_1.UiManager.OpenView("CdKeyInputView", e);
  }
  static OpenSetVisionEquipGroupName(e, t, n = "") {
    n = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew("VisionAssembleSaveTips"),
      ConfirmFunc: async (e) => {
        return await t(e);
      },
      InputText: n,
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "VisionAssembleInputTips",
      ),
      IsCheckNone: !0,
      NeedFunctionButton: !1,
      BottomTipsText: e,
      BottomTipsColor: "000000",
      NeedCheckBlank: !0,
    };
    UiManager_1.UiManager.OpenView("VisionAssembleInputView", n);
  }
  static OpenChangeVisionEquipGroupName(e, t) {
    e = {
      TitleTextArgs: new LguiUtil_1.TableTextArgNew(
        "VisionAssembleChangeNameTips",
      ),
      ConfirmFunc: async (e) => {
        return await t(e);
      },
      InputText: "",
      DefaultText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "VisionAssembleInputTips",
      ),
      IsCheckNone: !1,
      NeedFunctionButton: !1,
      BottomTipsText: e,
      BottomTipsColor: "000000",
    };
    UiManager_1.UiManager.OpenView("CommonSingleInputView", e);
  }
}
exports.CommonInputViewController = CommonInputViewController;
//# sourceMappingURL=CommonInputViewController.js.map
