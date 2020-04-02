/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:34
 * @modify date 2020-03-30 00:21:53
 * @desc [description]
 */
const Socket = function(app) {
  const { config } = app;

  const loading = Swal.fire({
    title: 'Connecting..',
    text: `Đang kết nối tới máy chủ`,
    grow: 'row',
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  const socket = io.connect(config.getKey('serverUrl'), {
    reconnection: true,
    reconnectionDelay: 3000,
    reconnectionAttempts: Infinity,
    forceNew: true,
    secure: true,
    rejectUnauthorized: false,
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    loading.close();

    app.signals.socketConnected.dispatch(socket.id);
  });

  socket.on('disconnect', reason => {
    Swal.fire({
      icon: 'error',
      title: 'Mất kết nối',
    });
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });

  socket.on('reconnecting', attemptNumber => {
    Swal.fire({
      icon: 'error',
      title: 'Mất kết nối',
      text: `Đang thử kết nối lại... ${attemptNumber}`,
      grow: 'row',
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  });

  socket.on('reconnect', attemptNumber => {
    Swal.fire({
      icon: 'success',
      title: 'Đã kết nối lại',
      text: `Sau ${attemptNumber} lần thử.`,
    });
  });

  return socket;
};

export { Socket };
