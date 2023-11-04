import type { EventAction, Framework, Page, Scope } from "@ruiapp/move-style";
import { Modal } from "antd";

export interface RockEventHandlerModalMessage {
  $action: "modalMessage";
  title: string;
}

export async function modalMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerModalMessage, eventArgs: any) {
  return new Promise((resolve, reject) => {
    Modal.info({
      title: eventHandler.title,
      onOk: () => {
        resolve(null);
      },

      onCancel: () => {
        resolve(null);
      }
    });
  });
}

export default {
  name: "modalMessage",
  handler: modalMessage,
} as EventAction<RockEventHandlerModalMessage>;