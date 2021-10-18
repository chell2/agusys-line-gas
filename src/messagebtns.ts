// ボタンメッセージによる報告手順の誘導

function createLocationButton(category: string, imageUrl: string) {
  const defaultAction = {
    type: "location",
    label: "位置情報を送る",
  };
  const locationButton = [
    {
      type: "template",
      altText: category + "（1）位置情報を送る",
      template: {
        type: "buttons",
        thumbnailImageUrl: imageUrl,
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "タップして位置情報を送信すると、農地の候補を表示します",
        defaultAction: defaultAction,
        actions: [defaultAction],
      },
    },
  ];
  return locationButton;
}

function createInputButton(category: string, imageUrl: string) {
  if (category == DR) {
    var formLink = "https://liff.line.me/1656534914-Y6r6yb3Q";
  } else if (category == RC) {
    var formLink = "https://liff.line.me/1656534914-yDK0YljN";
  }
  const defaultAction = {
    type: "uri",
    label: "入力フォームを開く",
    uri: formLink!,
  };
  const inputButton = [
    {
      type: "template",
      altText: category + "（2）状況を報告する",
      template: {
        type: "buttons",
        thumbnailImageUrl: imageUrl,
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "タップして状況を入力してください",
        defaultAction: defaultAction,
        actions: [defaultAction],
      },
    },
  ];
  return inputButton;
}

function createPhotoButton(category: string, imageUrl: string) {
  if (category == DR) {
    var description =
      "現地（作物、施設・機械等）の被害状況がわかる写真を送ってください";
  } else if (category == RC) {
    var description =
      "被害にあった施設・機械の復旧後の状況がわかる写真を送ってください";
  }
  const defaultAction = {
    type: "camera",
    label: "写真を撮る",
  };
  const photoButton = [
    {
      type: "template",
      altText: category + "（3）写真を送る",
      template: {
        type: "buttons",
        thumbnailImageUrl: imageUrl,
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: description!,
        defaultAction: defaultAction,
        actions: [
          defaultAction,
          {
            type: "cameraRoll",
            label: "撮影した写真から選ぶ",
          },
        ],
      },
    },
  ];
  return photoButton;
}

function createConfilmTemplate(category: string) {
  if (category == "DR") {
    var yes = "被災写真を送る";
  } else if (category == "RC") {
    var yes = "復旧写真を送る";
  }
  const confilmTemplate = [
    {
      type: "template",
      altText: category,
      template: {
        type: "confirm",
        text: "他にも写真を送りますか？",
        actions: [
          {
            type: "message",
            label: "はい",
            text: yes!,
          },
          {
            type: "message",
            label: "いいえ",
            text: "いいえ",
          },
        ],
      },
    },
  ];
  return confilmTemplate;
}
