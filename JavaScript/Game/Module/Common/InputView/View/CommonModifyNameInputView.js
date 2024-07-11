"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonModifyNameInputView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine"),
  CommonInputViewBase_1 = require("./CommonInputViewBase");
class CommonModifyNameInputView extends CommonInputViewBase_1.CommonInputViewBase {
  constructor() {
    super(...arguments),
      (this.Jna = () => {
        this.Hqe();
      });
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnModifyNameStateChange,
        this.Jna,
      );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnModifyNameStateChange,
        this.Jna,
      );
  }
  GetMaxLimit() {
    return CommonInputViewDefine_1.MAX_SINGLE_LENGTH;
  }
  IsAllowMultiLine() {
    return !1;
  }
  InitExtraParam() {
    this.Hqe();
  }
  RefreshDuplicateName(e) {
    this.Hqe();
  }
  Hqe() {
    var e =
        ModelManager_1.ModelManager.PersonalModel.GetPersonalModifyNameState(),
      e =
        (this.SetBottomTipsShowState(!0),
        0 === e || 2 === e
          ? this.SetBottomTipsTextAndColor(
              "PersonalProfile_ChangeNameLimit",
              UE.Color.FromHex("6E6A62FF"),
            )
          : 1 === e &&
            this.SetBottomTipsTextAndColor(
              "PersonalProfile_ChangeNameProcess",
              UE.Color.FromHex("C25757FF"),
            ),
        0 === e),
      t = this.InputText.Text !== this.InputData.InputText,
      i =
        StringUtils_1.StringUtils.GetStringRealCount(this.InputText.Text) >
        this.GetMaxLimit();
    this.ConfirmButton.SetSelfInteractive(e && t && !i);
  }
  ExecuteInputConfirm(e) {
    this.InputData.ConfirmFunc?.(e).then(
      (e) => {
        e === Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord &&
          this.RefreshTips(4);
      },
      () => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("UiCommon", 11, "通用输入框执行出现未知错误");
      },
    );
  }
}
exports.CommonModifyNameInputView = CommonModifyNameInputView;
//# sourceMappingURL=CommonModifyNameInputView.js.map
