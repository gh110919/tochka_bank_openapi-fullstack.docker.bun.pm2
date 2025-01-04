import axios from "axios";
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
    customerCode: string;
    accountId: string;
    transitAccount: string;
    status: string;
    statusUpdateDateTime: string;
    currency: string;
    accountType: string;
    accountSubType: string;
    registrationDate: string;
    accountDetails: {
      schemeName: string;
      identification: string;
      name: string;
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
  accountId: string;
  data: T;
}>;
/* Метод для получения информации по конкретному счёту */
export const getAccountInfo = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { accountId } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/open-banking/${apiVersion}/accounts/${accountId}`;

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
