"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleChildViewPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class BattleChildViewPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.X$e = []),
      (this.jQe = []),
      (this.ChildViewData = void 0),
      (this.ChildType = 0),
      (this.Visible = !1),
      (this.IsEnable = !1),
      (this.IsShowOnce = !1),
      (this.j$e = () => {
        var i = this.Visible;
        (this.Visible = this.ChildViewData.GetChildVisible(this.ChildType)),
          this.Q$e(i);
      });
  }
  async InitializeAsync() {}
  InitializeTemp() {}
  async OnBeforeStartAsync() {
    void 0 !== this.OpenParam && (this.ChildType = this.OpenParam),
      (this.ChildViewData =
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
      this.InitializeTemp(),
      await this.InitializeAsync(),
      this.IsDestroyOrDestroying ||
        ((this.Visible = this.ChildViewData.GetChildVisible(this.ChildType)),
        this.ChildViewData.AddCallback(this.ChildType, this.j$e),
        this.AddEvents());
  }
  ShowBattleChildViewPanel() {
    (this.IsEnable = !0),
      this.K$e(0, !0),
      this.SetActive(this.Visible),
      this.Visible && this.$$e();
  }
  HideBattleChildViewPanel() {
    this.IsEnable = !1;
    var i = this.Visible;
    this.K$e(0, !1),
      this.SetActive(this.Visible),
      i && this.OnHideBattleChildViewPanel();
  }
  Reset() {
    this.K$e(0, !1),
      this.Y$e(),
      this.RemoveEvents(),
      this.ClearAllTagSignificantChangedCallback(),
      this.ChildViewData &&
        (this.ChildViewData.RemoveCallback(this.ChildType, this.j$e),
        (this.ChildViewData = void 0));
  }
  SetActive(i) {
    this.Visible !== i
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          18,
          "战斗子界面不要直接调用SetActive, 请调用SetVisible",
        )
      : super.SetActive(i);
  }
  GetVisible() {
    return this.Visible;
  }
  SetVisible(i, t) {
    var e = this.Visible;
    this.K$e(i, t), this.Q$e(e);
  }
  Q$e(i) {
    this.IsEnable &&
      i !== (i = this.GetVisible()) &&
      (this.SetActive(i), i ? this.$$e() : this.OnHideBattleChildViewPanel());
  }
  K$e(i, t) {
    0 !== this.ChildType &&
      (this.Visible = this.ChildViewData.SetChildVisible(
        i,
        this.ChildType,
        t,
        !1,
      ));
  }
  $$e() {
    this.IsShowOnce
      ? this.OnShowBattleChildViewPanel(!1)
      : ((this.IsShowOnce = !0), this.OnShowBattleChildViewPanel(!0));
  }
  OnShowBattleChildViewPanel(i) {}
  OnHideBattleChildViewPanel() {}
  OnTickBattleChildViewPanel(i) {}
  OnAfterTickBattleChildViewPanel(i) {}
  AddEvents() {}
  RemoveEvents() {}
  async NewStaticChildViewAsync(i, t, e) {
    t = new t();
    return await t.NewByRootActorAsync(i, e), this.X$e.push(t), t;
  }
  Y$e() {
    for (const i of this.X$e) i && i.DestroyCompatible();
    this.X$e.length = 0;
  }
  async NewDynamicChildViewByResourceId(i, t, e, s = !1, h) {
    e = new e();
    try {
      await e.NewByResourceId(i, t, s, h);
    } catch (i) {
      i instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "UiCommon",
            18,
            "战斗界面子界面创建失败",
            i,
            ["资源名", t],
            ["错误", i.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCommon",
            18,
            "战斗界面子界面创建失败",
            ["资源名", t],
            ["错误", i],
          );
    }
    return e;
  }
  NewDynamicChildViewByResourceIdWithCallback(i, t, e, s = !1, h, a) {
    const n = new e();
    try {
      n.NewByResourceId(i, t, s, a).then(
        () => {
          h && h(n);
        },
        () => {},
      );
    } catch (i) {
      i instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "UiCommon",
            18,
            "战斗界面子界面创建失败",
            i,
            ["资源名", t],
            ["错误", i.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCommon",
            18,
            "战斗界面子界面创建失败",
            ["资源名", t],
            ["错误", i],
          );
    }
    return n;
  }
  async NewDynamicChildViewAsync(i, t, e) {
    t = new t();
    return await t.NewByRootActorAsync(i, e), t;
  }
  GetOperationType() {
    return ModelManager_1.ModelManager.PlatformModel.OperationType;
  }
  ListenForTagSignificantChanged(i, t, e) {
    var i = i.Entity.GetComponent(185);
    i && ((i = i.ListenForTagAddOrRemove(t, e)), this.jQe.push(i));
  }
  ClearAllTagSignificantChangedCallback() {
    if (this.jQe) {
      for (const i of this.jQe) i.EndTask();
      this.jQe.length = 0;
    }
  }
  ContainsTag(i, t) {
    i = i.Entity.GetComponent(185);
    return !!i && i.HasTag(t);
  }
  GetItem(i) {
    return super.GetItem(i);
  }
  GetUiActorForGuide() {}
}
exports.BattleChildViewPanel = BattleChildViewPanel;
//# sourceMappingURL=BattleChildViewPanel.js.map
