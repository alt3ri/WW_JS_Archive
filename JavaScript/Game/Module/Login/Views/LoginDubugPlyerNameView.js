"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginDebugPlayerNameView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  PersonalDefine_1 = require("../../Personal/Model/PersonalDefine");
class LoginDebugPlayerNameView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NEi = void 0),
      (this.OEi = (e) => {
        this.GetButton(3).SetSelfInteractive(0 < e.length);
      }),
      (this.uHe = () => {
        this.CloseMe();
      }),
      (this.L3e = () => {
        var e = this.GetInputText(0).GetText();
        StringUtils_1.StringUtils.GetStringRealCount(e) >
        PersonalDefine_1.MAX_NAME_LENGTH
          ? this.kEi()
          : (ModelManager_1.ModelManager.LoginModel.SetPlayerName(e),
            this.CloseMe(),
            this.NEi && this.NEi());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITextInputComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [2, this.uHe],
        [3, this.L3e],
      ]);
  }
  OnBeforeCreate() {
    this.NEi = this.OpenParam;
  }
  OnStart() {
    this.GetText(1).SetUIActive(!1),
      this.GetInputText(0).OnTextChange.Bind(this.OEi),
      this.GetButton(3).SetSelfInteractive(!1);
  }
  kEi() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(112);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
      e,
    );
  }
  OnBeforeDestroy() {
    this.NEi = void 0;
  }
}
exports.LoginDebugPlayerNameView = LoginDebugPlayerNameView;
//# sourceMappingURL=LoginDubugPlyerNameView.js.map
