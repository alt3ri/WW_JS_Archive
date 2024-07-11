"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateChangeBtnItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class AdviceCreateChangeBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Xy = -0),
      (this.X8e = () => {
        this.w9e(), UiManager_1.UiManager.OpenView("AdviceWordView");
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.X8e]]);
  }
  w9e() {
    const e = ModelManager_1.ModelManager.AdviceModel;
    const i =
      ((e.CurrentChangeWordType = 0), e.CurrentSentenceWordMap.get(this.Xy));
    (e.CurrentSelectWordId = i), (e.CurrentPreSelectSentenceIndex = this.Xy);
  }
  SetIndex(e) {
    this.Xy = e;
  }
  UpdateCurrentLineMode(e) {
    this.B9e(e);
  }
  B9e(e) {
    e === 0
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ChangeOneLineWord")
      : this.Xy === 0
        ? LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(1),
            "ChangeFirstLineWord",
          )
        : LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(1),
            "ChangeLastLineWord",
          );
  }
}
exports.AdviceCreateChangeBtnItem = AdviceCreateChangeBtnItem;
// # sourceMappingURL=AdviceCreateChangeBtnItem.js.map
