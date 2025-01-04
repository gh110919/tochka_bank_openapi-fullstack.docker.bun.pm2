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
    status: string;
    legalId: string;
    createdAt: string;
    address: string;
    city: string;
    countryCode: string;
    countrySubDivisionCode: string;
    zipCode: string;
    customerCode: string;
    entityType: string;
    inn: string;
    kpp: string;
    name: string;
    ogrn: string;
    bankCode: string;
    MerchantList: {
      status: string;
      createdAt: string;
      address: string;
      city: string;
      countryCode: string;
      countrySubDivisionCode: string;
      zipCode: string;
      merchantId: string;
      legalId: string;
      brandName: string;
      capabilities: string;
      contactPhoneNumber: string;
      mcc: string;
      additionalContacts: {}[];
    }[];
    AccountList: {
      accountId: string;
      status: string;
      createdAt: string;
      legalId: string;
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
  bankCode: string;
  data: T;
}>;

/* Метод для получения информации о клиенте в Системе быстрых платежей */
export const getCustomerInfo = async (
  params: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { customerCode, bankCode } = params!;

  const apiVersion = parsed?.API_VERSION;

  const url = `https://enter.tochka.com/uapi/sbp/${apiVersion}/customer/${customerCode}/${bankCode}`;

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
