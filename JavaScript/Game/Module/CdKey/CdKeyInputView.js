"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdKeyInputView = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  CommonInputViewBase_1 = require("../Common/InputView/View/CommonInputViewBase"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  CdKeyInputController_1 = require("./CdKeyInputController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class CdKeyInputView extends CommonInputViewBase_1.CommonInputViewBase {
  constructor() {
    super(...arguments), (this._Et = 0), (this.uEt = 0);
  }
  InitExtraParam() {
    var e =
      CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "CdKeyLengthLimit",
      );
    (this.uEt = e[0]), (this._Et = e[1]);
  }
  GetMaxLimit() {
    return this._Et;
  }
  GetMinLimit() {
    return this.uEt;
  }
  IsAllowMultiLine() {
    return !1;
  }
  ExecuteInputConfirm(e) {
    this.InputData.ConfirmFunc?.(e).then(
      (e) => {
        var r;
        e === Protocol_1.Aki.Protocol.O4n.NRs
          ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(148)),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              r,
            ),
            this.CloseMe())
          : ((r =
              ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                e,
              )),
            (this.CdKeyErrorText = r ?? this.CdKeyErrorText),
            this.RefreshTips(5));
      },
      () => {},
    );
  }
  ExtraConfirmCheck(e, r) {
    return !this.cEt() && !this.mEt(r);
  }
  cEt() {
    var e = CdKeyInputController_1.CdKeyInputController.CheckInCdKeyUseCd();
    return e && this.RefreshTips(6), e;
  }
  mEt(e) {
    e = StringUtils_1.StringUtils.CheckIsOnlyLettersAndNumbers(e);
    return e || this.RefreshTips(4), !e;
  }
}
exports.CdKeyInputView = CdKeyInputView;
//# sourceMappingURL=CdKeyInputView.js.map
