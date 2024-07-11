"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GenericPromptFloatTipsBase = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class GenericPromptFloatTipsBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.TickDuration = 0),
      (this.TickTime = 0),
      (this.Data = void 0),
      (this.CJt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnBeforeCreate() {
    (this.Data = this.OpenParam),
      (this.CJt =
        ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
          this.Data.TypeId,
        ));
  }
  OnStart() {
    var i = this.Data.MainTextParams ?? [],
      i = (this.SetMainText(...i), this.Data.ExtraTextParams ?? []);
    this.SetExtraText(...i), this.gJt(), this.nJt();
  }
  SetMainText(...i) {
    var t = this.GetText(0);
    !this.Data.MainTextObj && !this.Data.PromptId && i?.length && i[0]
      ? StringUtils_1.StringUtils.IsEmpty(i[0])
        ? t.SetUIActive(!1)
        : (t.SetText(i[0]), t.SetUIActive(!0))
      : this.Data.MainTextObj
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            this.Data.MainTextObj.TextKey,
            ...i,
          ),
          t.SetUIActive(!0))
        : StringUtils_1.StringUtils.IsBlank(this.CJt.GeneralText)
          ? t.SetUIActive(!1)
          : (LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.CJt.GeneralText, ...i),
            t.SetUIActive(!0));
  }
  SetExtraText(...i) {
    var t = this.GetText(1);
    !this.Data.ExtraTextObj && !this.Data.PromptId && i?.length && i[0]
      ? (t.SetText(i[0]), t.SetUIActive(!0))
      : this.Data.ExtraTextObj
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
            t,
            this.Data.ExtraTextObj.TextKey,
            ...i,
          ),
          t.SetUIActive(!0))
        : StringUtils_1.StringUtils.IsBlank(this.CJt.GeneralExtraText)
          ? t.SetUIActive(!1)
          : (LguiUtil_1.LguiUtil.SetLocalTextNew(
              t,
              this.CJt.GeneralExtraText,
              ...i,
            ),
            t.SetUIActive(!0));
  }
  gJt() {
    var i;
    this.Data.PromptId &&
      ((i = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(
        this.Data.PromptId,
      )),
      (this.TickDuration = i.Duration)),
      0 === this.TickDuration && (this.TickDuration = this.CJt.Duration),
      0 === this.TickDuration && (this.TickTime = CommonDefine_1.INVALID_VALUE);
  }
  nJt() {
    var i;
    this.Data.TypeId &&
      0 !==
        (i =
          ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(
            this.Data.TypeId,
          )).OffsetY &&
      this.RootItem.SetAnchorOffsetY(i.OffsetY);
  }
  OnTick(i) {
    this.ClosePromise
      ? (this.TickTime = CommonDefine_1.INVALID_VALUE)
      : this.TickTime < 0 ||
        ((this.TickTime = this.TickTime + i),
        this.TickTime >
          this.TickDuration * CommonDefine_1.MILLIONSECOND_PER_SECOND &&
          this.CloseMe((i) => {
            i && this.Data.CloseCallback?.();
          }));
  }
  get MainText() {
    return this.GetText(0);
  }
  get ExtraText() {
    return this.GetText(1);
  }
}
exports.GenericPromptFloatTipsBase = GenericPromptFloatTipsBase;
//# sourceMappingURL=GenericPromptFloatTipsBase.js.map
