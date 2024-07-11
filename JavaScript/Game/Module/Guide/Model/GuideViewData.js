"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideStepViewData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class GuideStepViewData {
  constructor(t) {
    (this._zt = !0),
      (this.xqe = void 0),
      (this.OQt = void 0),
      (this.uzt = void 0),
      (this.czt = void 0),
      (this.IsAttachToBattleView = !1),
      (this.mzt = void 0),
      (this.dzt = void 0),
      (this.OQt = t);
  }
  get ViewConf() {
    switch (this.OQt.Config.ContentType) {
      case 4:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocus(
          this.OQt.Id,
        );
        break;
      case 1:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTips(
          this.OQt.Id,
        );
        break;
      case 3:
        this.uzt = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(
          this.OQt.Id,
        );
    }
    return (
      this.uzt ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "引导步骤id找不到引导类型数据, 清检查配置",
            ["this.Owner!.Id", this.OQt.Id],
          )),
      this.uzt
    );
  }
  GetAttachedUiItem() {
    return this.mzt;
  }
  ResetAttachedUiItem() {
    this.mzt = void 0;
  }
  GetAttachedUiItemForShow() {
    return this.dzt ?? this.mzt;
  }
  SetAttachedUiItem(t) {
    4 !== this.OQt.Config.ContentType
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Guide",
          17,
          `引导步骤 ${this.OQt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点`,
        )
      : (this.mzt = t);
  }
  SetAttachedUiItemForShow(t) {
    4 !== this.OQt.Config.ContentType
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Guide",
          17,
          `引导步骤 ${this.OQt.Id} 的界面类型不是聚焦引导, 无法添加依附的Ui节点(显示用)`,
        )
      : (this.dzt = t);
  }
  TryLockScrollView(t) {
    (this.xqe = t), (this._zt = this.xqe.GetEnable()), this.xqe.SetEnable(!1);
  }
  TryUnLockScrollView() {
    this.xqe && this.xqe.SetEnable(this._zt);
  }
  GetAttachedView() {
    return this.czt;
  }
  SetAttachedView(t) {
    this.czt = t;
  }
  Clear() {
    this.TryUnLockScrollView(),
      (this.czt = void 0),
      (this.mzt = void 0),
      (this.dzt = void 0),
      (this.xqe = void 0);
  }
}
exports.GuideStepViewData = GuideStepViewData;
//# sourceMappingURL=GuideViewData.js.map
