"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdKeyInputView = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const CommonInputViewBase_1 = require("../Common/InputView/View/CommonInputViewBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const CdKeyInputController_1 = require("./CdKeyInputController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class CdKeyInputView extends CommonInputViewBase_1.CommonInputViewBase {
  constructor() {
    super(...arguments), (this.zvt = 0), (this.Zvt = 0);
  }
  InitExtraParam() {
    const e =
      CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "CdKeyLengthLimit",
      );
    (this.Zvt = e[0]), (this.zvt = e[1]);
  }
  GetMaxLimit() {
    return this.zvt;
  }
  GetMinLimit() {
    return this.Zvt;
  }
  IsAllowMultiLine() {
    return !1;
  }
  ExecuteInputConfirm(e) {
    this.InputData.ConfirmFunc?.(e).then(
      (e) => {
        let r;
        e === Protocol_1.Aki.Protocol.lkn.Sys
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
    return !this.eMt() && !this.tMt(r);
  }
  eMt() {
    const e = CdKeyInputController_1.CdKeyInputController.CheckInCdKeyUseCd();
    return e && this.RefreshTips(6), e;
  }
  tMt(e) {
    e = StringUtils_1.StringUtils.CheckIsOnlyLettersAndNumbers(e);
    return e || this.RefreshTips(4), !e;
  }
}
exports.CdKeyInputView = CdKeyInputView;
// # sourceMappingURL=CdKeyInputView.js.map
