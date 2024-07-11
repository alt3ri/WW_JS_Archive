"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpressionView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ChatExpressionGroupItem_1 = require("./ChatExpressionGroupItem"),
  ChatExpressionItem_1 = require("./ChatExpressionItem");
class ChatExpressionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lHe = void 0),
      (this.lSt = new Map()),
      (this._St = void 0),
      (this.cHe = () => {
        var e = new ChatExpressionItem_1.ChatExpressionItem();
        return e.BindOnClicked(this.uSt), e;
      }),
      (this.cSt = (e) => {
        this.mSt(e);
      }),
      (this.uSt = (e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSelectExpression,
          e,
        ),
          UiManager_1.UiManager.CloseView("ChatExpressionView");
      }),
      (this.dSt = () => {
        UiManager_1.UiManager.CloseView("ChatExpressionView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.dSt]]);
  }
  OnStart() {
    var e = this.GetItem(1),
      i = this.GetItem(0),
      t = i.GetOwner();
    (this.lHe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      t,
      this.cHe,
    )),
      i.SetUIActive(!1),
      e.SetUIActive(!1),
      this.bl();
  }
  OnBeforeDestroy() {
    this.CSt(), this.lSt.clear(), (this._St = void 0), (this.lHe = void 0);
  }
  bl() {
    this.CSt();
    var e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig();
    if (e) {
      for (const i of e) this.gSt(i);
      var e = e[0];
      e && ((e = e?.Id), this.mSt(e));
    }
  }
  mSt(e) {
    this._St && this._St.SetState(0);
    var i = this.fSt(e),
      i =
        (i.SetState(1),
        (this._St = i),
        ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(
          e,
        ));
    this.lHe.ReloadData(i);
  }
  gSt(e) {
    var i = this.GetItem(1).GetOwner(),
      i = LguiUtil_1.LguiUtil.DuplicateActor(i, this.GetItem(4)),
      i = new ChatExpressionGroupItem_1.ChatExpressionGroupItem(i);
    i.Refresh(e),
      i.SetState(0),
      i.BindOnClicked(this.cSt),
      i.SetActive(!0),
      this.lSt.set(e.Id, i);
  }
  fSt(e) {
    return this.lSt.get(e);
  }
  CSt() {
    for (const e of this.lSt.values()) e.Destroy();
  }
}
exports.ChatExpressionView = ChatExpressionView;
//# sourceMappingURL=ChatExpressionView.js.map
