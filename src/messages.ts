// 各種メッセージ作成（テキスト,ステッカー,カルーセル）

function createTextMessage(text: string) {
  const textMessage = [
    {
      type: "text",
      text: text,
    },
  ];
  return textMessage;
}

function createSticker() {
  const stickerMessage = [
    {
      type: "sticker",
      packageId: "789",
      stickerId: "10874",
    },
  ];
  return stickerMessage;
}

function createCarouselMessage(options: any[]) {
  var columnsArr = options.map(function (item) {
    const columnLabel = "場所を確認する";
    const columnUri =
      "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing";
    return {
      title: item[0],
      text: "この農地について記録しますか？",
      defaultAction: {
        type: "uri",
        label: columnLabel,
        uri: columnUri,
      },
      actions: [
        {
          type: "uri",
          label: columnLabel,
          uri: columnUri,
        },
        {
          type: "message",
          label: "この農地を選択",
          text: item[0] + "\n緯度:" + item[2] + "\n経度:" + item[1],
        },
      ],
    };
  });
  return [
    {
      type: "template",
      altText: "報告する農地を選んでください",
      template: { type: "carousel", columns: columnsArr },
    },
  ];
}
