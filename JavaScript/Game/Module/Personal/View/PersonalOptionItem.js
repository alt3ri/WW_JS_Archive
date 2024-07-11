"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalOptionItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PersonalTipsById_1 = require("../../../../Core/Define/ConfigQuery/PersonalTipsById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const PersonalOptionController_1 = require("../Model/PersonalOptionController");
class PersonalOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.D5i = 0),
      (this.EBt = void 0),
      (this.jbe = (e) => {
        (this.EBt =
          PersonalOptionController_1.PersonalOptionController.GetOptionFunc(
            this.D5i,
          )),
          this.EBt();
      }),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UISpriteTransition],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  Refresh(e, r, o) {
    this.D5i = e;
    e = PersonalTipsById_1.configPersonalTipsById.GetConfig(this.D5i);
    if (e) {
      this.GetText(1).ShowTextNew(e.Description);
      const s = this.GetUiSpriteTransition(2);
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e.IconPath,
        UE.LGUISpriteData_BaseObject,
        (e, r) => {
          e.IsValid() && s.IsValid() && s.SetAllTransitionSprite(e);
        },
      );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 44, "个性化弹窗配置找不到,id为", [
          "config!.Id",
          e.Id,
        ]);
  }
}
exports.PersonalOptionItem = PersonalOptionItem;
// # sourceMappingURL=PersonalOptionItem.js.map
