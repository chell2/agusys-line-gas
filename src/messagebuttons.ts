// 報告手順の誘導

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

function createReportButton(category: string) {
  const defaultAction = {
    type: "uri",
    label: "入力フォーム",
    uri: "https://agusys.herokuapp.com/",
  };
  const reportButton = [
    {
      type: "template",
      altText: category + "（2）状況を報告する",
      template: {
        type: "buttons",
        thumbnailImageUrl: "https://agusys.herokuapp.com/img/5.png",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "タップすると入力フォームが開きます",
        defaultAction: defaultAction,
        actions: [defaultAction],
      },
    },
  ];
  return reportButton;
}

function createPhotoButton(category: string) {
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
        thumbnailImageUrl: "https://agusys.herokuapp.com/img/3.png",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "現地（被災した作物、施設・機械）の状況がわかる写真を送ってください",
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
            text: "被災写真を送る",
          },
          {
            type: "message",
            label: "いいえ",
            text: "次の操作に進む",
          },
        ],
      },
    },
  ];
  return confilmTemplate;
}
