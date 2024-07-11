"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommunicateView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  CommunicateById_1 = require("../../../../Core/Define/ConfigQuery/CommunicateById"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  GuideCountDownItem_1 = require("../../Guide/Views/GuideCountDownItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CommunicateView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.iqt = void 0),
      (this.oqt = 0),
      (this.rqt = 0),
      (this.nqt = !1),
      (this.sqt = 0),
      (this.hqt = () => {
        this.$Oe((e) => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CommunicateFinished,
            this.sqt,
          );
        });
      }),
      (this.$Oe = (e) => {
        this.CloseMe(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.hqt]]);
  }
  OnStart() {
    var e,
      i = this.GetText(4);
    i.SetRichText(!0),
      i.SetHeight(100),
      LguiUtil_1.LguiUtil.SetLocalText(i, "QuestCommunicateConnect"),
      (this.oqt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "CommunicateViewCloseTime",
      )),
      (this.rqt = this.oqt),
      (this.iqt = new GuideCountDownItem_1.GuideCountDownItem(this.oqt)),
      this.iqt.Init(this.GetItem(0)),
      (this.sqt = this.OpenParam),
      this.sqt &&
        ((i = CommunicateById_1.configCommunicateById.GetConfig(this.sqt))
          ? (e = SpeakerById_1.configSpeakerById.GetConfig(i.Talker))
            ? (this.uqt(e), this.cqt(e))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Quest", 19, "找不到通讯对话人配置", [
                "talkerId",
                i.Talker,
              ])
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "找不到通讯配置", [
              "communicateId",
              this.sqt,
            ]));
  }
  uqt(e) {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "QuestCommunicateRequest",
      ),
      t = this.GetText(1),
      e = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, e.Id);
    t.SetText(`【${e}】` + i);
  }
  cqt(e) {
    var i = this.GetTexture(2);
    this.SetTextureByPath(e.HeadIconAsset, i);
  }
  OnTick(e) {
    this.RootItem.bIsUIActive &&
      (this.rqt <= 0 && !this.nqt
        ? ((this.nqt = !0), this.$Oe())
        : ((this.rqt -= e), this.iqt.OnDurationChange(this.rqt)));
  }
}
exports.CommunicateView = CommunicateView;
//# sourceMappingURL=CommunicateView.js.map
