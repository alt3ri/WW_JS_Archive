"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TextInputComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class TextInputComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.zAt = i),
      (this.PAt = 0),
      (this.j3 = CommonDefine_1.INVALID_VALUE),
      (this.sKe = 0),
      (this.xAt = void 0),
      (this.yAt = void 0),
      (this.ZAt = void 0),
      (this._Et = CommonInputViewDefine_1.MAX_SINGLE_LENGTH),
      (this.uEt = 0),
      (this.BAt = (t) => {
        t && 1 === this.PAt && this.C4e(0);
      }),
      (this.qAt = () => {
        var t = this.yAt.GetText(),
          i = StringUtils_1.StringUtils.GetStringRealCount(t);
        i > this._Et
          ? (this.C4e(2), (this.j3 = 0))
          : 0 === i && this.zAt.IsCheckNone
            ? (this.C4e(1), (this.j3 = 0))
            : i < this.uEt
              ? (this.C4e(3), (this.j3 = 0))
              : this.zAt.ConfirmFunc?.(t).then(
                  (t) => {
                    this.IsDestroyOrDestroying ||
                      (t ===
                        Protocol_1.Aki.Protocol.O4n.Proto_ContainsDirtyWord &&
                        this.C4e(4),
                      this.zAt.ResultFunc?.(
                        t === Protocol_1.Aki.Protocol.O4n.NRs,
                      ));
                  },
                  () => {
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "UiCommon",
                        11,
                        "通用输入框执行出现未知错误",
                      );
                  },
                );
      }),
      (this.ePt = (t) => {
        StringUtils_1.StringUtils.GetStringRealCount(t) <= this._Et
          ? this.C4e(0)
          : this.C4e(2);
      }),
      (this.GAt = () => {
        this.GetItem(0).SetUIActive(!1),
          this.ZAt.SetSelfInteractive(!0),
          (this.j3 = CommonDefine_1.INVALID_VALUE);
      }),
      (this.NAt = () => {
        this.OAt("PrefabTextItem_Entertext_Text", 0);
      }),
      (this.kAt = () => {
        this.OAt(
          "PrefabTextItem_Textoverlength_Text",
          CommonDefine_1.INVALID_VALUE,
        ),
          this.ZAt.SetSelfInteractive(!1);
      }),
      (this.FAt = () => {
        this.OAt("CDKey_TooShort", 0), this.ZAt.SetSelfInteractive(!1);
      }),
      (this.VAt = () => {
        this.OAt("PrefabTextItem_Textillegality_Text", 0);
      }),
      (this.r6 = (t) => {
        this.j3 !== CommonDefine_1.INVALID_VALUE &&
          ((this.j3 += t),
          this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME) &&
          this.C4e(0);
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITextInputComponent],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.BAt],
        [4, this.qAt],
      ]);
  }
  C4e(t) {
    t !== this.PAt && ((this.PAt = t), this.xAt[t]());
  }
  OnStart() {
    (this.xAt = {
      [0]: this.GAt,
      1: this.NAt,
      2: this.kAt,
      3: this.FAt,
      4: this.VAt,
      5: () => {},
      6: () => {},
    }),
      (this.ZAt = this.GetButton(4)),
      (this.yAt = this.GetInputText(2)),
      this.yAt.OnTextChange.Bind(this.ePt),
      this.yAt.SetText(this.zAt.InputText, !0),
      this.zAt.DefaultText && this.GetText(3).SetText(this.zAt.DefaultText),
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.r6,
        "TextInputComponent",
        0,
        !0,
      ).Id);
  }
  JAt() {
    this.yAt.OnTextChange.Unbind();
  }
  OAt(t, i) {
    this.GetItem(0).SetUIActive(!0);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t), (this.j3 = i);
  }
  OnBeforeDestroy() {
    this.JAt(), TickSystem_1.TickSystem.Remove(this.sKe);
  }
  ClearText() {
    this.yAt.SetText("");
  }
}
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=TextInputComponent.js.map
