"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpressionView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ChatExpressionGroupItem_1 = require("./ChatExpressionGroupItem");
const ChatExpressionItem_1 = require("./ChatExpressionItem");
class ChatExpressionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$9e = void 0),
      (this.JMt = new Map()),
      (this.zMt = void 0),
      (this.z9e = () => {
        const e = new ChatExpressionItem_1.ChatExpressionItem();
        return e.BindOnClicked(this.ZMt), e;
      }),
      (this.eSt = (e) => {
        this.tSt(e);
      }),
      (this.ZMt = (e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSelectExpression,
          e,
        ),
          UiManager_1.UiManager.CloseView("ChatExpressionView");
      }),
      (this.iSt = () => {
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
      (this.BtnBindInfo = [[5, this.iSt]]);
  }
  OnStart() {
    const e = this.GetItem(1);
    const i = this.GetItem(0);
    const t = i.GetOwner();
    (this.$9e = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(3),
      t,
      this.z9e,
    )),
      i.SetUIActive(!1),
      e.SetUIActive(!1),
      this.bl();
  }
  OnBeforeDestroy() {
    this.oSt(), this.JMt.clear(), (this.zMt = void 0), (this.$9e = void 0);
  }
  bl() {
    this.oSt();
    var e =
      ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig();
    if (e) {
      for (const i of e) this.rSt(i);
      var e = e[0];
      e && ((e = e?.Id), this.tSt(e));
    }
  }
  tSt(e) {
    this.zMt && this.zMt.SetState(0);
    var i = this.nSt(e);
    var i =
      (i.SetState(1),
      (this.zMt = i),
      ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(
        e,
      ));
    this.$9e.ReloadData(i);
  }
  rSt(e) {
    var i = this.GetItem(1).GetOwner();
    var i = LguiUtil_1.LguiUtil.DuplicateActor(i, this.GetItem(4));
    var i = new ChatExpressionGroupItem_1.ChatExpressionGroupItem(i);
    i.Refresh(e),
      i.SetState(0),
      i.BindOnClicked(this.eSt),
      i.SetActive(!0),
      this.JMt.set(e.Id, i);
  }
  nSt(e) {
    return this.JMt.get(e);
  }
  oSt() {
    for (const e of this.JMt.values()) e.Destroy();
  }
}
exports.ChatExpressionView = ChatExpressionView;
// # sourceMappingURL=ChatExpressionView.js.map
