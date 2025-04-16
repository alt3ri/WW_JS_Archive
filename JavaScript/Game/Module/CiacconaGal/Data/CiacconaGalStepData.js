"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepData = void 0);
const PublicUtil_1 = require("../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class CiacconaGalStepData {
  constructor(t) {
    (this.Lo = t), (this.Mbc = 0);
  }
  get Id() {
    return this.Lo.Id;
  }
  get Type() {
    return this.Lo.Type;
  }
  get TalkTid() {
    return this.Lo.Content;
  }
  get Content() {
    var t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.Lo.Content);
    return ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t);
  }
  get ImagePath() {
    var t;
    return this.Lo.ImageMale
      ? !this.Lo.ImageFemale ||
        1 ===
          (t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender())
        ? this.Lo.ImageMale
        : 0 === t
          ? this.Lo.ImageFemale
          : ""
      : this.Lo.ImageFemale;
  }
  get AudioEvent() {
    return this.Lo.Audio;
  }
  get MusicState() {
    return this.Lo.MusicState;
  }
  get AnimPath() {
    return this.Lo.Anim;
  }
  get TriggerSubEndingId() {
    return this.Lo.TriggerSubEnding;
  }
  get ChoiceIds() {
    return this.Lo.Choices;
  }
  get NextStepId() {
    return this.Lo.Id + 1;
  }
  get SubEndingId() {
    return this.Lo.TriggerSubEnding;
  }
  get TextAnimDefaultDuration() {
    return 3;
  }
  set ChosenId(t) {
    this.Mbc = t;
  }
  get ChosenId() {
    return this.Mbc;
  }
  get HasText() {
    return !!this.Lo.Content;
  }
}
exports.CiacconaGalStepData = CiacconaGalStepData;
//# sourceMappingURL=CiacconaGalStepData.js.map
