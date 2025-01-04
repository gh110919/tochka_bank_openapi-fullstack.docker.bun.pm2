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
  code: string;
  data: T;
}>;
/* Обменяйте код на токен для доступа к API */
export const exchangeCodeAccess = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, client_secret, code } = params!;

  const url = `https://enter.tochka.com/connect/token`;

  const data = {
    client_id,
    client_secret,
    grant_type: "authorization_code",
    scope: "accounts balances customers statements sbp payments",
    code,
    redirect_uri: "https://127.0.0.1/request_sign_permissions",
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
