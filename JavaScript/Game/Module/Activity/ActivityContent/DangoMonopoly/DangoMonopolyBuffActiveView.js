"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBuffActiveView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  DangoMonopolyBuffActiveGetPanel_1 = require("./DangoMonopolyBuffActiveGetPanel"),
  DangoMonopolyBuffActiveShowPanel_1 = require("./DangoMonopolyBuffActiveShowPanel"),
  DangoMonopolyViewBase_1 = require("./DangoMonopolyViewBase");
class DangoMonopolyBuffActiveView extends DangoMonopolyViewBase_1.DangoMonopolyViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.ShowPanel = void 0),
      (this.GetPanel = void 0),
      (this.DangoActorList = []),
      (this.b4c = () => {
        this.SetBtnEmptyActive(!0), this.PlayDangoAni();
      }),
      (this.OnClickClose = () => {
        this.GetPanel?.IsShow && this.CloseMe();
      }),
      (this.G4c = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.G4c]]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "DangoMonopoly",
        69,
        this.constructor.name,
        ["BoardId", this.OpenParam?.BoardId],
        ["GridId", this.OpenParam?.GridData.Id],
      );
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.ShowPanel =
        new DangoMonopolyBuffActiveShowPanel_1.DangoMonopolyBuffActiveShowPanel()),
      (this.GetPanel =
        new DangoMonopolyBuffActiveGetPanel_1.DangoMonopolyBuffActiveGetPanel());
    var o = this.OpenParam.GridData;
    await this.ShowPanel.Init(this.GetItem(0), o),
      await this.GetPanel.Init(this.GetItem(1), o),
      this.SetBtnEmptyActive(!1);
  }
  async InitDangoActorList() {
    var o = {
      UiModelUseWay: 13,
      DangoId: this.We1(),
      Odds: 0,
      DangoPointCase: "DangoMonopolyMeet",
      DangoCamera: StringUtils_1.EMPTY_STRING,
      DangoOffset: 0,
    };
    this.DangoActorList =
      await UiSceneManager_1.UiSceneManager.LoadDangoActorList([o]);
  }
  PlayDangoAni() {
    var o = this.DangoActorList[0],
      [e, t] =
        ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig.GetActiveDangoAniInfo(),
      o =
        (e && o.SetState(e, t),
        DangoManager_1.DangoManager.GetDangoData(this.We1()));
    o.DangoVoice && AudioSystem_1.AudioSystem.PostEvent(o.DangoVoice);
  }
  We1() {
    return this.OpenParam.GridData.GetDangoData()?.Id ?? 0;
  }
  _Nc() {
    for (const o of this.DangoActorList)
      UiSceneManager_1.UiSceneManager.DestroyDangoActor(o);
    this.DangoActorList = [];
  }
  OnStart() {
    this.ActivityData.UpdateBoardGridUiInfoShow(!1);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>关闭激活特性"),
      this._Nc(),
      this.OpenParam?.Promise?.SetResult(),
      this.ActivityData.UpdateBoardGridUiInfoShow(!0);
  }
  OnAfterDestroy() {}
  async UpdateData() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("DangoMonopoly", 69, "MoveDango=>展示激活特性"),
      this.ShowPanel?.SetActive(!0),
      this.GetPanel?.SetActive(!0),
      await Promise.all([
        this.PlaySequenceAsync("Start01"),
        this.InitDangoActorList(),
      ]),
      this.b4c();
  }
  OnHandleLoadScene() {}
  SetBtnEmptyActive(o) {
    this.GetButton(3)?.RootUIComp.SetUIActive(o);
  }
}
exports.DangoMonopolyBuffActiveView = DangoMonopolyBuffActiveView;
//# sourceMappingURL=DangoMonopolyBuffActiveView.js.map
