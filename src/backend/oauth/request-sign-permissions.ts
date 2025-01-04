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
  link: string;
};

type TParams<T> = Partial<{
  redirect_url: string /* ЛК Точки > Настройки > Интеграции и API > API Точки и ваши приложения > Ваше приложение oAuth 2.0 > Данные компании Redirect URL*/;
  client_id: string;
  client_secret: string;
  consent_id: string;
  data: T;
}>;
/* Сформируйте запрос на подписание списка разрешений и попросите пользователя подтвердить список */
export const requestSignPermissions = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, client_secret, consent_id, redirect_url } = params!;

  const redirectQuery = stringify(
    {
      scope: "accounts balances customers statements sbp payments acquiring",
      consent_id,
    },
    {
      encode: false,
    }
  );

  const redirect_uri = `${redirect_url}&${redirectQuery}`;

  const url = `https://enter.tochka.com/connect/authorize`;

  const query = stringify(
    {
      client_id,
      response_type: "code id_token",
      state: JSON.stringify({ client_id, client_secret }),
      redirect_uri,
    },
    {
      encode: false,
    }
  );

  const link = `${url}?${query}`;

  try {
    return {
      success: true,
      message: { data: { link } },
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
