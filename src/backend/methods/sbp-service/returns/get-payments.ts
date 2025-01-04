import axios from "axios";
import { stringify } from "qs";
import { parsed } from "src/backend/main";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  Data: {
    Payments: {
      qrcId: string;
      status: string;
      message: string;
      refTransactionId: string;
    }[];
  };
  Links: {
    self: string;
  };
  Meta: {
    totalPages: number;
  };
};

type TParams<T> = Partial<{
  customerCode: string;
  data: T;
}>;
/* Метод для получения списка платежей в Системе быстрых платежей */
export const getPayments = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode } = params!;

  const query = `?${stringify({ customerCode })}`;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/get-sbp-payments${query}`;

  const headers = {
    Authorization: `Bearer ${parsed?.JWT_KEY_TOKEN}`,
  };

  try {
    return {
      success: true,
      message: await axios.get(url, { headers }),
    };
  } catch (error) {
    return {
      success: false,
      message: error as any,
    };
  }
};
