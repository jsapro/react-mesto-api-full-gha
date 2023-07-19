const allowedCors = [
  'http://getlike-jsapro.nomoredomains.xyz',
  'https://getlike-jsapro.nomoredomains.xyz',
  'http://158.160.19.48',
  'https://158.160.19.48',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // origin - источник запроса
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  // сохраняем список заголовков исходного запроса

  // res.header('Access-Control-Allow-Origin', '*'); // разрешает браузеру запросы из любого источ

  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', true);

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
