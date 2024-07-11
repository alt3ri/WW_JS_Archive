"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSpecialDetailView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeSelectSpecialStarItem_1 = require("./RoguelikeSelectSpecialStarItem");
class RoguelikeSpecialDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.URn = void 0),
      (this.$be = void 0),
      (this.zbe = () =>
        new RoguelikeSelectSpecialStarItem_1.RoguelikeSelectSpecialStarItem()),
      (this.PRn = () => {
        this.Hqe(this.URn);
      }),
      (this.Opt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UINiagara],
      [9, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [[7, this.Opt]]);
  }
  OnStart() {
    var e = this.OpenParam;
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Roguelike", 59, "RoguelikeSpecialDetailView无效输入")
      : ((this.URn = e),
        (this.$be = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(3),
          this.zbe,
        )),
        this.Hqe(e));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeDataUpdate,
      this.PRn,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeDataUpdate,
      this.PRn,
    );
  }
  Hqe(e) {
    var i =
      ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRoguelikeSpecialConfig(
        e.ConfigId,
      );
    if (void 0 !== i) {
      const r = this.GetTexture(0);
      r.SetUIActive(!1),
        this.SetTextureByPath(i.Icon, r, void 0, () => {
          r.SetUIActive(!0);
        }),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
      var t =
          0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
            ? i.BriefDescribe
            : i.Describe,
        t =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.StoryDescribe),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "RogueSpecialRemainTime",
            e.RestCount,
          ),
          this.GetText(4).SetUIActive(0 !== e.RestCount),
          1 === i.Category ? "FFFFFF" : "FFC3CC"),
        e = 1 === i.Category ? "FFFFFF" : "FFEEF4";
      this.GetUiNiagara(8).SetColor(UE.Color.FromHex(t)),
        this.GetUiNiagara(9).SetColor(UE.Color.FromHex(e)),
        this.Zbe(i.Level, i.MaxLevel);
    }
  }
  Zbe(i, t) {
    var r = [];
    for (let e = 0; e < t; e++) {
      var s = i > e;
      r.push(s);
    }
    this.$be.RefreshByData(r);
  }
}
exports.RoguelikeSpecialDetailView = RoguelikeSpecialDetailView;
//# sourceMappingURL=RoguelikeSpecialDetailView.js.map
