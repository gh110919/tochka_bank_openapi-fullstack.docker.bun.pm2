import axios from "axios";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TError = {
  code: string;
  id: string;
  message: string;
  Errors: {
    errorCode: string;
    message: string;
    url: string;
  }[];
};

type TRequest = {
  Data: {
    accountId: string;
  };
};

type TResponse = {
  Data: {
    accountId: string;
    qrcId: string;
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  qrcId: string;
  data: T;
}>;
/* Метод для смены счёта зачисления кассового QR-кода */
export const changeCashboxQrcodeAccount = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { qrcId, data } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/cashbox-qr-code/${qrcId}/account`;

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
