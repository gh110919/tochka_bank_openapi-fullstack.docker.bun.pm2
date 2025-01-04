import axios from "axios";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = null;

type TParams<T> = Partial<{
  access_token: string;
  data: T;
}>;
/* Как проверить Access Token Hybrid */
export const checkAccessToken = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { access_token } = params!;

  const url = `https://enter.tochka.com/connect/introspect`;

  const data = {
    access_token,
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
