"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalCardPreviewView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class PersonalCardPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.isa = void 0),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UITexture],
      [9, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.Jvt]]);
  }
  OnStart() {
    (this.isa = this.OpenParam),
      this.isa
        ? this.Hqe(this.isa)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Personal",
            59,
            "PersonalCardPreviewView Invalid OpenParam",
          );
  }
  Hqe(e) {
    (e = ConfigManager_1.ConfigManager.InventoryConfig.GetCardItemConfig(
      e.CardId,
    )),
      this.GetText(4).ShowTextNew(e.Title),
      this.GetText(2).ShowTextNew(e.AttributesDescription),
      this.GetText(3).ShowTextNew(e.Tips),
      this.SetTextureShowUntilLoaded(e.CardPath, this.GetTexture(1)),
      this.SetTextureShowUntilLoaded(
        e.FunctionViewCardPath,
        this.GetTexture(5),
      ),
      this.SetTextureShowUntilLoaded(e.LongCardPath, this.GetTexture(8)),
      (e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4));
    const i = this.GetTexture(6),
      s =
        (i.SetUIActive(!1),
        this.SetRoleIcon("", i, e, void 0, () => {
          i.SetUIActive(!0);
        }),
        this.GetTexture(7));
    s.SetUIActive(!1),
      this.SetRoleIcon("", s, e, void 0, () => {
        s.SetUIActive(!0);
      }),
      this.GetText(9).SetText(
        ModelManager_1.ModelManager.FunctionModel.GetPlayerName(),
      );
  }
}
exports.PersonalCardPreviewView = PersonalCardPreviewView;
//# sourceMappingURL=PersonalCardPreviewView.js.map
