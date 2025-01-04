import axios from "axios";
import { stringify } from "qs";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  token_type: string;
  state: string;
  access_token: string;
  expires_in: number;
};

type TParams<T> = Partial<{
  client_id: string;
  client_secret: string;
  data: T;
}>;
/* Получите токен для работы с разрешениями */
export const getTokenPermissions = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, client_secret } = params!;

  const url = `https://enter.tochka.com/connect/token`;

  const data = {
    client_id,
    client_secret,
    grant_type: "client_credentials",
    scope: "accounts balances customers statements sbp payments",
    state: JSON.stringify({ client_id, client_secret }),
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
