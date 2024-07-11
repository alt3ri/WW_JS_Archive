"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginDebugPlayerNameView = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PersonalDefine_1 = require("../../Personal/Model/PersonalDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class LoginDebugPlayerNameView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NMi = void 0),
      (this.OMi = (e) => {
        this.GetButton(3).SetSelfInteractive(e.length > 0);
      }),
      (this.J9e = () => {
        this.CloseMe();
      }),
      (this._Fe = () => {
        const e = this.GetInputText(0).GetText();
        StringUtils_1.StringUtils.GetStringRealCount(e) >
        PersonalDefine_1.MAX_NAME_LENGTH
          ? this.kMi()
          : (ModelManager_1.ModelManager.LoginModel.SetPlayerName(e),
            this.CloseMe(),
            this.NMi && this.NMi());
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
        [2, this.J9e],
        [3, this._Fe],
      ]);
  }
  OnBeforeCreate() {
    this.NMi = this.OpenParam;
  }
  OnStart() {
    this.GetText(1).SetUIActive(!1),
      this.GetInputText(0).OnTextChange.Bind(this.OMi),
      this.GetButton(3).SetSelfInteractive(!1);
  }
  kMi() {
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(112);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
      e,
    );
  }
  OnBeforeDestroy() {
    this.NMi = void 0;
  }
}
exports.LoginDebugPlayerNameView = LoginDebugPlayerNameView;
// # sourceMappingURL=LoginDubugPlyerNameView.js.map
