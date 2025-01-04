import axios from "axios";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  webhooksList: string[];
  url: string;
};

type TResponse = {
  Data: {
    webhooksList: string[];
    url: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  client_id: string;
  data: T;
}>;
/* Метод для изменения URL и типа вебхука */
export const editWebhook = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { client_id, data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/webhook/${apiVersion}/${client_id}`;

  const headers = {
    Authorization: `Bearer ${parsed?.JWT_KEY_TOKEN}`,
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
