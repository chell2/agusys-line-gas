// メッセージ送信共通

function replyMessage(replyToken: string, messages: any) {
  UrlFetchApp.fetch(REPLY_END_POINT, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: messages,
    }),
  });
}
