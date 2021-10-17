// 写真保存フォルダの準備

// 対象フォルダの検索・作成
function setupFolder(category: string) {
  const farmId = "1021000000";
  if (category == DR) {
    var str = "DR";
  } else if (category == RC) {
    var str = "RC";
  }
  const folderName = farmId + "_" + str!;
  const parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const folderIterator = parentFolder.getFoldersByName(folderName);
  let targetFolder;
  if (folderIterator.hasNext()) {
    targetFolder = folderIterator.next();
    // 最終更新フラグのためリネーム
    targetFolder.setName(folderName);
  } else {
    targetFolder = parentFolder.createFolder(folderName);
  }
}

// 最終更新フォルダの取得
function getLastUpdatedFolder() {
  const parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const folders = parentFolder.getFolders();
  let folderlist = [];
  while (folders.hasNext()) {
    const folder = folders.next();
    folderlist.push(folder);
  }
  folderlist.sort(function (a, b) {
    if (a.getLastUpdated() > b.getLastUpdated()) return -1;
    if (a.getLastUpdated() < b.getLastUpdated()) return 1;
    return 0;
  });
  const sortResult = [];
  for (let value of folderlist) {
    sortResult.push([value.getId(), value.getName()]);
  }
  const lastUpdatedFolder = sortResult[0];
  return lastUpdatedFolder;
}
