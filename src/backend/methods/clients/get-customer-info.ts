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
    customerType: string;
    isResident: boolean;
    taxCode: string;
    shortName: string;
    fullName: string;
    kpp: string;
    customerOgrn: string;
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
/* Метод для получения информации по конкретному клиенту */
export const getCustomerInfo = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/open-banking/${apiVersion}/customers/${customerCode}`;

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
