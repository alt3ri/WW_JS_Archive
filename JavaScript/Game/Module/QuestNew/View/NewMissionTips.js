"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NewMissionTips = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class NewMissionTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.dro = ""),
      (this.Cro = ""),
      (this.mNe = 5),
      (this.gro = !1),
      (this.fro = () => {
        const i = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.Cro);
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
    const i = this.OpenParam;
    const e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i);
    e
      ? ((this.dro =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(
            e.QuestMarkId,
          ) ?? ""),
        (this.Cro = e.QuestNameTid),
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
    var i = this.GetSprite(1);
    var i =
      (i &&
        !StringUtils_1.StringUtils.IsBlank(this.dro) &&
        (this.SetSpriteByPath(this.dro, i, !1), i.SetUIActive(!0)),
      this.GetText(0));
    i.OnSelfLanguageChange.Bind(this.fro), this.fro(), i.SetUIActive(!0);
  }
  OnTick(i) {
    (this.mNe = Math.max(this.mNe - (i / 1e3) * Time_1.Time.TimeDilation, 0)),
      this.mNe <= 0 && !this.gro && this.$Oe();
  }
  $Oe() {
    (this.gro = !0), this.CloseMe();
  }
}
exports.NewMissionTips = NewMissionTips;
// # sourceMappingURL=NewMissionTips.js.map
