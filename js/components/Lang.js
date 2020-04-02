/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:46:44
 * @modify date 2020-03-31 21:53:05
 * @desc [description]
 */
const Lang = function(config) {
  let language = config.getKey('language');

  const values = {
    en: {
      name: 'English',
      'room/title': 'Room',
      'game/title': 'Game',
      'chat/title': 'Chat',
      'user/title': 'Users',
      'settings/title': 'Settings',

      'room/toolBar/search/placeholder': 'Search...',
      'room/toolBar/search/by': 'by',
      'room/toolBar/search/by/all': 'All',
      'room/toolBar/create/button': 'Create Room',
      'room/list/title': 'List Rooms',
      'room/list/refresh/button': 'Refresh',
      'room/list/table/join/button': 'Join',
      'room/list/table/headers': [
        '#',
        'Room',
        'Game',
        'Owner',
        'Users',
        'Action',
      ],
      'room/list/table/empty/placeholder':
        'There are no rooms. Create new one now.',

      'user/profile/title': 'Your Profile',
      'user/profile/id': 'ID',
      'user/profile/id/copy': 'Copy',
      'user/profile/id/copied': 'Copied',
      'user/profile/id/copy/error/title': 'Error! Can not Copy!',
      'user/profile/id/copy/error/text':
        'Your device does not support automatic copying, but you can still copy it manually.',
      'user/profile/username': 'Name',
      'user/profile/username/placeholder': 'Guest...',
      'user/profile/username/edit': 'Edit',
      'user/profile/username/edit/accept': 'Okay',
      'user/profile/username/edit/cancel': 'Cancel',

      'settings/language': 'Language',
      'settings/language/confirm/title': 'Need to Reload',
      'settings/language/confirm/text':
        'We need to reload the website to apply the new language',
      'settings/language/confirm/button/ok': 'Oke',
      'settings/language/confirm/button/cancel': 'Cancel',
      'settings/theme': 'Theme',
      'settings/theme/light': 'Light',
      'settings/theme/dark': 'Dark',
      'settings/reset': 'Clear all data',
      'settings/reset/button': 'Clear',
      'settings/reset/confirm/title': 'Are you sure?',
      'settings/reset/confirm/text':
        'All user data will be delete. All settings will be set to default.',
      'settings/reset/confirm/button/ok': 'Oke',
      'settings/reset/confirm/button/cancel': 'Cancel',
    },
    vn: {
      name: 'Tiếng Việt',
      'room/title': 'Phòng',
      'game/title': 'Trò chơi',
      'chat/title': 'Trò chuyện',
      'user/title': 'Người chơi',
      'settings/title': 'Cài đặt',

      'room/toolBar/search/placeholder': 'Tìm kiếm...',
      'room/toolBar/search/by': 'theo',
      'room/toolBar/search/by/all': 'Tất cả',
      'room/toolBar/create/button': 'Tạo Phòng',
      'room/list/title': 'Danh sách phòng',
      'room/list/refresh/button': 'Làm mới',
      'room/list/table/join/button': 'Vào',
      'room/list/table/headers': [
        '#',
        'Phòng',
        'Đang chơi',
        'Chủ',
        'Người',
        'Hành động',
      ],
      'room/list/table/empty/placeholder':
        'Hiện chưa có phòng nào. Hãy tạo mới ngay.',

      'user/profile/title': 'Hồ Sơ',
      'user/profile/id': 'Mã',
      'user/profile/id/copy': 'Sao chép',
      'user/profile/id/copied': 'Đã sao chép',
      'user/profile/id/copy/error/title': 'Lỗi! Không thể sao chép!',
      'user/profile/id/copy/error/text':
        'Thiết bị của bạn không hỗ trợ sao chép tự động, nhưng bạn vẫn có thể sao chép bằng cách thủ công.',
      'user/profile/username': 'Tên',
      'user/profile/username/placeholder': 'Khách...',
      'user/profile/username/edit': 'Sửa',
      'user/profile/username/edit/accept': 'Đồng ý',
      'user/profile/username/edit/cancel': 'Huỷ',

      'settings/language': 'Ngôn ngữ',
      'settings/language/confirm/title': 'Yêu cần tải lại',
      'settings/language/confirm/text':
        'Cần tải lại trang để việc thay đổi ngôn ngữ có hiệu lực',
      'settings/language/confirm/button/ok': 'Đồng ý',
      'settings/language/confirm/button/cancel': 'Huỷ',
      'settings/theme': 'Chủ đề',
      'settings/theme/light': 'Sáng',
      'settings/theme/dark': 'Tối',
      'settings/reset': 'Xoá sạch dữ liệu',
      'settings/reset/button': 'Xoá',
      'settings/reset/confirm/title': 'Xác nhận xoá?',
      'settings/reset/confirm/text':
        'Dữ liệu người dùng sẽ bị xoá. Cài đặt sẽ được đưa về mặc định',
      'settings/reset/confirm/button/ok': 'Xoá',
      'settings/reset/confirm/button/cancel': 'Huỷ',
    },
  };

  return {
    getKey(key, specificLang) {
      let result;
      if (specificLang) {
        result = values[specificLang][key] || '???';
      } else {
        result = values[language][key] || '???';
      }

      // if (replaceString) {
      //   if (value.indexOf('$') >= 0) {
      //     value = value.replace('$', replaceString);
      //   }
      // }

      return result;
    },
    set(lang) {
      if (!values[lang]) return;

      language = lang;
      config.setKey('language', lang);
    },
    getCurrentLang() {
      return language;
    },
    getAvailableLangs() {
      const availableLangs = {};
      Object.keys(values).forEach(key => {
        availableLangs[key] = values[key].name || '???';
      });
      return availableLangs;
    },
  };
};

export { Lang };
