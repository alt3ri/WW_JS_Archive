"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookEntranceItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  HandBookController_1 = require("./HandBookController");
class HandBookEntranceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.Bei = void 0),
      (this.Lxt = () => {
        switch (this.Bei.Id) {
          case 0:
            UiManager_1.UiManager.OpenView("MonsterHandBookView");
            break;
          case 1:
            UiManager_1.UiManager.OpenView("PhantomHandBookView");
            break;
          case 2:
            UiManager_1.UiManager.OpenView("GeographyHandBookView");
            break;
          case 3:
            UiManager_1.UiManager.OpenView("WeaponHandBookView");
            break;
          case 4:
            UiManager_1.UiManager.OpenView("AnimalHandBookView");
            break;
          case 5:
            UiManager_1.UiManager.OpenView("ItemHandBookView");
            break;
          case 6:
            UiManager_1.UiManager.OpenView("ChipHandBookView");
            break;
          case 7:
            UiManager_1.UiManager.OpenView("QuestHandBookView");
            break;
          case 10:
            UiManager_1.UiManager.OpenView("HandBookRoleView");
            break;
          case 11:
            UiManager_1.UiManager.OpenView("NounHandBookView");
            break;
          default:
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("HandBook", 5, "没有找到图鉴入口类型，请检查", [
                "this.HandBookEntrance.Id",
                this.Bei.Id,
              ]);
        }
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.Lxt]]);
  }
  OnStart() {}
  Refresh(e, a, r) {
    (this.Bei = e),
      this.GetText(0).ShowTextNew(this.Bei.Name),
      this.SetTextureByPath(e.Texture, this.GetTexture(1)),
      this.RefreshRedDot(),
      this.RefreshCollectProgress();
  }
  RefreshRedDot() {
    var e = ModelManager_1.ModelManager.HandBookModel.IsShowRedDot(this.Bei.Id),
      a = this.GetItem(4);
    a && a.SetUIActive(e);
  }
  RefreshCollectProgress() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(
      this.Bei.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(2),
      "CollectProgress",
      e[0],
      e[1],
    ),
      this.GetText(2)?.SetUIActive(!1);
  }
}
exports.HandBookEntranceItem = HandBookEntranceItem;
//# sourceMappingURL=HandBookEntranceItem.js.map
