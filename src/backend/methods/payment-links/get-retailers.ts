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
    Retailer: {
      status: string;
      isActive: boolean;
      mcc: string;
      rate: string;
      name: string;
      url: string;
      merchantId: string;
      terminalId: string;
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
/* Метод для получения информации о ретейлере */
export const getRetailers = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode } = params!;

  const query = `?${stringify({ customerCode })}`;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/acquiring/${apiVersion}/retailers${query}`;

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
