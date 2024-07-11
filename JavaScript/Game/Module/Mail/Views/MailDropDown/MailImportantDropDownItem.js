"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailImportantDropDownItem = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MailDropDownItem_1 = require("./MailDropDownItem");
class MailImportantDropDownItem extends MailDropDownItem_1.MailDropDownItem {
  GetFilteredMailList() {
    const e = ModelManager_1.ModelManager.MailModel.GetImportantMails();
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Mail", 28, "邮件界面：获取重要邮件", [
          "length",
          e?.length,
        ]),
      e
    );
  }
  GetTitleText() {
    return this.GetFilteredMailList().length.toString();
  }
  OnShowDropDownItemBase(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
      this.SetMailCount(this.GetTitleText());
  }
}
exports.MailImportantDropDownItem = MailImportantDropDownItem;
// # sourceMappingURL=MailImportantDropDownItem.js.map
