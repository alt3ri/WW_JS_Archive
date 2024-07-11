"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewMissionTips = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class NewMissionTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this._no = ""),
      (this.uno = ""),
      (this.mNe = 5),
      (this.cno = !1),
      (this.mno = () => {
        var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.uno);
        this.GetText(0)?.SetText(i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  OnBeforeCreate() {
    super.OnBeforeCreate();
    var i = this.OpenParam,
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
    e
      ? ((this._no =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(
            e.QuestMarkId,
          ) ?? ""),
        (this.uno = e.QuestNameTid),
        (this.mNe =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetNewTipsShowTime(
            e.Type,
          ) ?? 0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Quest",
          19,
          "Quest:NewMissionTips.OnBeforeCreate 找不到任务",
          ["questId", i],
        );
  }
  OnStart() {
    super.OnStart();
    var i = this.GetSprite(1),
      i =
        (i &&
          !StringUtils_1.StringUtils.IsBlank(this._no) &&
          (this.SetSpriteByPath(this._no, i, !1), i.SetUIActive(!0)),
        this.GetText(0));
    i.OnSelfLanguageChange.Bind(this.mno), this.mno(), i.SetUIActive(!0);
  }
  OnTick(i) {
    (this.mNe = Math.max(this.mNe - (i / 1e3) * Time_1.Time.TimeDilation, 0)),
      this.mNe <= 0 && !this.cno && this.$Oe();
  }
  $Oe() {
    (this.cno = !0), this.CloseMe();
  }
}
exports.NewMissionTips = NewMissionTips;
//# sourceMappingURL=NewMissionTips.js.map
