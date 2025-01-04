import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  refresh_token: string;
  token_type: string;
  access_token: string;
  expires_in: number;
};

type TParams<T> = Partial<{
  client_id: string;
  client_secret: string;
  refresh_token: string;
  data: T;
}>;
/* Обменяйте refresh токен на новую пару access/refresh токенов */
export const exchangeRefreshToken = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, client_secret, refresh_token } = params!;

  const url = `https://enter.tochka.com/connect/token`;

  const data = {
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token,
  };

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
